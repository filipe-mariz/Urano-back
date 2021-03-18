import { Router } from 'express';
import authMiddleware from '../app/middleware/AuthMiddleware';
import Auth from '../app/controller/authController';
import Create from '../app/controller/Create';
import Read from '../app/controller/Read';
import Update from '../app/controller/Update';
import Delete from '../app/controller/Delete';

const routes = Router();

routes.post('/auth', Auth.login);
routes.post('/create', Create.create);
routes.get('/view', authMiddleware, Read.view);
routes.get('/view/:id', authMiddleware, Read.show);
routes.put('/update/:id',authMiddleware, Update.update);
routes.delete('/delet/:id', authMiddleware, Delete.delete);

export default routes