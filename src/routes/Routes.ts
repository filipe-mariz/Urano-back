import { Router } from 'express';
import Auth from '../app/controller/authController';
import Create from '../app/controller/Create';
import Read from '../app/controller/Read';
import Update from '../app/controller/Update';
import Delete from '../app/controller/Delete';

const routes = Router();

routes.post('/auth', Auth.login);
routes.post('/create', Create.create);
routes.get('/view', Read.view);
routes.get('/view/:id', Read.show);
routes.put('/update/:id', Update.update);
routes.delete('/delet/:id', Delete.delete);

export default routes