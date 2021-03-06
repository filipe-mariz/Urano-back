import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup'
import User from '../model/UserModel';

export default {
    async create(request: Request, response: Response) {
                
        const {
            name,
            email,
            number,
            userName,
            password
        } = request.body;   
        
        const userRepository = getRepository(User);
        
        const emailExist = await userRepository.findOne({ where: { email } })
        if (emailExist) {
            return response.status(409).json({ message: "This e-mail is in use" })
        }

        const userNameExist = await userRepository.findOne({ where: { userName } });
        if (userNameExist) {
            return response.status(409).json({ message: "This user name is in use" })
        }

        const data = {
            name,
            email,
            number,
            userName,
            password
        }

        const schemma = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            number: Yup.string().required(),
            userName: Yup.string().required(),
            password: Yup.string().required()
        })

        await schemma.validate(data, {
            abortEarly: false
        })

        const user = userRepository.create(data);
        await userRepository.save(user);
        const token = jwt.sign({ id: user.id }, process.env.TOKEN, {expiresIn: '1d'} )

        return response.status(200).json({ user, token });       

    }    
}
