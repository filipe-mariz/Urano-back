import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup'
import User from '../model/UserModel';
import UserView from '../view/UserView';

export default {
    async view(request: Request, response: Response) {
        const userRepository = getRepository(User);
    
        const user = await userRepository.find()
    
        return response.json(UserView.renderMany(user))
        
    },
    
    async show(request: Request, response: Response) {
        const { id } = request.params
        
        const user = await getRepository(User).findOneOrFail(id);
        
        return response.json(UserView.Render(user))
        
    }
}
