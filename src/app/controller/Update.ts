import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import User from '../model/UserModel';

export default {
    async update(request: Request, response: Response) {
                
        const { password } = request.body

        const user = await getRepository(User).findOne(request.params.id) 
        const passwordCheck = await bcrypt.compare(password, user.password)

        if (user && passwordCheck) {
            getRepository(User).merge(user, request.body);
            const results = await getRepository(User).save(user);
            return response.json(results);
        }

        if (!user || !passwordCheck) {
            return response.status(401).json({
                message: "This operation is not valid",
                try: "Make sure your username or password is correct"
            })
        }
        
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
