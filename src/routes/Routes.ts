import { Router } from 'express';
import User from '../app/controller/UserControler';

const routes = Router();

routes.post('/create', User.create);
routes.get('/view', User.view);
routes.get('/view/:id', User.show);
routes.put('/update/:id', User.update);

export default routes