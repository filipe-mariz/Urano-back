import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup'
import User from '../model/UserModel';
import UserView from '../view/UserView';

export default {
    async update(request: Request, response: Response) {
    /*const { id } = request.params
        const {
            name,
            email,
            number,
            userName,
        } = request.body;

        const userRepository = getRepository(User)
        /*
        const emailExist = userRepository.findOne({ where: { email } })
        if (emailExist) {
            return response.status(401).json({ message: 'E-mail is in use' });
        }
        const userNameExist = userRepository.findOne({ where: { userName } });
        if (userNameExist) {
            return response.status(401).json({ message: 'This user name is in use' });
        }

        const user = userRepository.save(request.body);
        return response.json(user);*/

        const user = await getRepository(User).findOne(request.params.id)

        if (user) {
            getRepository(User).merge(user, request.body)
            const results = await getRepository(User).save(user)
            return response.json(results)
        }

        return response.status(404).json({ message: "User not found" })
        
    }
}