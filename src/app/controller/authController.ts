import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs'
import User from '../model/UserModel';

export default  {
    async login(request: Request, response: Response) {
        const repository = getRepository(User);
        const {
            userName,
            password
        } = request.body       

        const user = await repository.findOne({ where: { userName } })
        if (!user) {
            return response.status(401).json({ message: 'User not found' })
        }
        const passwordCheck = await bcrypt.compare(password, user.password)
        if (!passwordCheck) {
            return response.status(401).json({ message: 'This password is not match'})
        }
    }
}