import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import User from '../model/UserModel';

export default {
    async delete(request: Request, response: Response) {
        
        const { password } = request.body

        const user = await getRepository(User).findOne(request.params.id) 
        const passwordCheck = await bcrypt.compare(password, user.password)
        
        if (passwordCheck) {
            const results = await getRepository(User).delete(request.params.id);
            return response.status(401).json({ message: 'User deleted'})
        }
        if (!passwordCheck) {
            return response.send(401).json({ message: 'Incorret password'})
        }

        
    }

}
