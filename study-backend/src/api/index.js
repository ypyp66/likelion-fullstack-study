import Router from 'koa-router';
import posts from './posts';
import auth from './auth';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', posts.routes());

export default api;
