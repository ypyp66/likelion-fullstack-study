import Router from 'koa-router';
import * as commentCtrl from './commnet.ctrl.ctrl';

const post = new Router();

post.get('/comment/:id', commentCtrl.list); //내가 쓴 댓글
post.post('/comment/wirte', commentCtrl.write); //댓글 작성
post.patch('/comment/:id', commentCtrl.update); //댓글 수정
post.delete('/comment/:id', commentCtrl.remove); //댓글 삭제
