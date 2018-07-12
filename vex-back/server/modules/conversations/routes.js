import { Router } from 'express';

import { requireJwtAuth } from '../../utils/requireJwtAuth';
import * as ConversationController from './controller';

const routes = new Router;

routes.post('/conversation', requireJwtAuth, ConversationController.newConversation);
routes.get('/conversation/:id', requireJwtAuth, ConversationController.getConversation);
routes.get('/conversation/requestid/:userId/:recipentId', requireJwtAuth, ConversationController.getConversationId);
routes.get('/conversation/all/:userId', requireJwtAuth, ConversationController.getAllConversations);
routes.post('/conversation/reply', requireJwtAuth, ConversationController.saveConversationMessage);

export default routes;
