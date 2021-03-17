import { response } from 'express';
import Auth from '../../src/app/controller/authController';

describe('Authenticate', () => {
    it('should receive JWT token when authenticate with valid credential', async () => {
        const user = await Auth.login({
            email: 'filipe@hotmail.com',
            password: '12345'            
        }, );  
        console.log(user);

        expect(user.email).toBe('filipe@hotmail.com');
    });
})

