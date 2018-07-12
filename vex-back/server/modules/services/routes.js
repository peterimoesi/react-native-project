import { Router } from 'express';

import { requireJwtAuth } from '../../utils/requireJwtAuth';
import * as ServiceController from './controller';

const routes = new Router();

routes.post('/services/:userId/register', requireJwtAuth, ServiceController.registerService);
routes.get('/services/:name', requireJwtAuth, ServiceController.findService);
// routes.get('/services/user/:userId', ServiceController.findUserService);

export default routes;
