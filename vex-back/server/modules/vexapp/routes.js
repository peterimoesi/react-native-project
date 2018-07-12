import { Router } from 'express';
import * as VexappController from './controller';
import { requireJwtAuth } from '../../utils/requireJwtAuth';

const routes = new Router();

routes.post('/vexapp', VexappController.testVexapp);
routes.get('/vexapp', requireJwtAuth, VexappController.getVexapp);


export default routes;