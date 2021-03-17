import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup'
import User from '../model/UserModel';
import UserView from '../view/UserView';

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
        /*
        const emailExist = userRepository.findOne({ where: { email } })
        if (emailExist) {
            return response.status(401).json({ message: 'E-mail is in use' });
        }
        const userNameExist = userRepository.findOne({ where: { userName } });
        if (userNameExist) {
            return response.status(401).json({ message: 'This user name is in use' });
        }*/

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
        return response.status(201).json({ user });
    },

    async view(request: Request, response: Response) {
        const userRepository = getRepository(User);

        const user = await userRepository.find()

        return response.json(UserView.renderMany(user))
        
    },

    async show(request: Request, response: Response) {
        const { id } = request.params
        
        const user = await getRepository(User).findOneOrFail(id);
        
        return response.json(UserView.Render(user))
        
    },

    async update(request: Request, response: Response) {
        /*const { id } = request.params
        const results = await getRepository(User).delete(request.params.id);
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

        const user = userRepository.merge(request.body);
        return response.json(user);*/

        const user = await getRepository(User).findOne(request.params.id)

        if (user) {
            getRepository(User).merge(user, request.body)
            const results = await getRepository(User).save(user)
            return response.json(results)
        }

        return response.status(404).json({ message: "User not found" })
    },

    async delete(request: Request, response: Response) {
        const results = await getRepository(User).delete(request.params.id);

        if (results) {
            return response.json({ message: "User deleted"});
        }
    }

}
