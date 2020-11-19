import Router from 'koa-router';
import * as postCtrl from './post.ctrl';

const post = new Router();

post.get('/', postCtrl.list); //글 읽기 post.ctrl.js의 const list
post.get('/:id', postCtrl.read); //특정글 읽기
post.post('/', postCtrl.write); //글 작성
post.patch('/:id', postCtrl.update); //특정 글에 대해 수정
post.delete('/:id', postCtrl.remove); //특정 글에 대해 삭제
