import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../model/UserModel';

export default {
    async delete(request: Request, response: Response) {
        const results = await getRepository(User).delete(request.params.id);
    
        if (results) {
            return response.json({ message: "User deleted"});
        } else {
            return response.json({ message: "User not found"});
        }
    }

}
