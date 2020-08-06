import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsControllers from './controllers/ConnectionsControllers';


const routes = express.Router();
const classesControllers = new ClassesController();
const connections = new ConnectionsControllers




routes.get('/classes', classesControllers.index);
routes.post('/classes', classesControllers.create);

routes.get('/connections', connections.index);
routes.post('/connections', connections.create);

export default routes;