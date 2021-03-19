import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import User from '../model/UserModel';

export default {
    async update(request: Request, response: Response) {
               
        const userRepository = getRepository(User);

        const { email, userName } = request.body

        const user = await getRepository(User).findOne(request.params.id) 
               
        const emailExist = await userRepository.findOne({ where: { email } })
        if (emailExist) {
            return response.status(409).json({ message: "This e-mail is in use" })
        }
        const userNameExist = await userRepository.findOne({ where: { userName } });
        if (userNameExist) {
            return response.status(409).json({ message: "This user name is in use" })
        }

        getRepository(User).merge(user, request.body);
        const results = await getRepository(User).save(user);
        return response.json(results);
        
        
    },

    async password(request: Request, response: Response) {
        const user = await getRepository(User).findOne(request.params.id);
        const { oldPassword, password } = request.body
        const passwordCheck = await bcrypt.compare(oldPassword, user.password)

        if (!passwordCheck) {
            return response.status(401).json({ message: 'This password is not match'})
        }     
         
        getRepository(User).merge(user, request.body)
        const results = await getRepository(User).save(user)
        return response.json(results)
        
    }

}
