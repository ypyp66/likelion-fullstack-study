import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';

const post = new Router();

post.get('/', postsCtrl.list); //글 읽기 post.ctrl.js의 const list
post.get('/:id', postsCtrl.read); //특정글 읽기
post.post('/', postsCtrl.write); //글 작성
post.patch('/:id', postsCtrl.update); //특정 글에 대해 수정
post.delete('/:id', postsCtrl.remove); //특정 글에 대해 삭제

export default posts;
