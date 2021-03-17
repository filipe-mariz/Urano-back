import { Request, response, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../model/UserModel';

export default {
    async create(request: Request, Response: Response) {
        const {
            name,
            email,
            number,
            userName,
            password
        } = request.body;

        const userRepository = getRepository(User);

        const data = {
            name,
            email,
            number,
            userName,
            password
        }

        const user = userRepository.create(data);
        await userRepository.save(user);
        return response.status(201).json({ user });
    }
}
