import { Router } from 'express';
import User from '../app/controller/UserControler';
import Read from '../app/controller/Read';

const routes = Router();

routes.post('/create', User.create);
routes.get('/view', Read.view);
routes.get('/view/:id', Read.show);
routes.put('/update/:id', User.update);
routes.delete('/delet/:id', User.delete);

export default routes