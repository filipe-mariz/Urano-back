import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
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

        const token = jwt.sign({ id: user.id }, process.env.TOKEN, {expiresIn: '1d'} )

        return response.status(200).json({            
            message: "User successfully logged in",
            token
        })
    }
}