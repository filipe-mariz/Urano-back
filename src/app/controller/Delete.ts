import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../model/UserModel';

export default {
    async delete(request: Request, response: Response) {
        
        const user = await getRepository(User).findOne(request.params.id); 

        const results = await getRepository(User).delete(request.params.id);
               
        return response.json({ message: 'User deleted'});        
        
    }

}
