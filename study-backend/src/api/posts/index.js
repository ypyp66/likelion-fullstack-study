import Router from 'koa-router';
import jwtMiddleware from '../../lib/jwtMiddleware';
import * as postsCtrl from './posts.ctrl';

const posts = new Router();

posts.post('/', postsCtrl.checkObjectId, postsCtrl.write); //글 작성
posts.get('/', postsCtrl.list); //글 읽기 post.ctrl.js의 const list

/*
const post = new Router();
post.get('/', postsCtrl.read); //특정글 읽기
post.patch('/', postsCtrl.update); //특정 글에 대해 수정
post.delete('/', postsCtrl.remove); //특정 글에 대해 삭제

posts.use('/:id', postsCtrl.checkObjectId, post.routes());

*/
posts.get('/:id', postsCtrl.read); //특정글 읽기
posts.patch('/:id', postsCtrl.checkObjectId, postsCtrl.update); //특정 글에 대해 수정
posts.delete('/:id', postsCtrl.checkObjectId, postsCtrl.remove); //특정 글에 대해 삭제

export default posts;
