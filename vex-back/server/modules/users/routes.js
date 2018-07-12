import { Router } from 'express';

import { requireJwtAuth } from '../../utils/requireJwtAuth';
import * as UserController from './controller';

const routes = new Router();

routes.post('/users/register', UserController.userRegister);
routes.post('/users/login', UserController.userLogin);
routes.patch('/users/profile/:userId', requireJwtAuth, UserController.userUpdate);

export default routes;
