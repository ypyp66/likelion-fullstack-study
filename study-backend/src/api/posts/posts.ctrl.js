import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi'; //형식검증

//게시글 작성
export const write = async ctx => {
  //ctx에는 request와 response가 담겨있음
  const schema = Joi.object().keys({
    author: Joi.string.min(5).required(),
    title: Joi.string.min(1).required(),
    category: Joi.string.min(2).required(),
    photo: Joi.string(),
    video: Joi.string(),
    content: Joi.string.min(1).required(),
    views: Joi.number().default(0),
    publishedDate: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400; //Bad request
    ctx.body = result.error;
  }
  const { author, title, category, photo, video, content, views, publishedDate } = ctx.request.body;
  const post = new Post({
    //Post 인스턴스 생성
    author,
    title,
    category,
    photo,
    video,
    content,
    views,
    publishedDate,
  }); //이거를 데이터베이스에 저장할 것
  try {
    await post.save(); //데이터베이스에 저장하는데 시간이 걸리므로 비동기처리를 해줌
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e); //내부서버오류
  }
};

//게시글 조회
export const list = async ctx => {
  try {
    const posts = await Post.find().exec();
    //find()함수 호출 후 exec()를 붙어주어야 서버에 쿼리를 요청함
    ctx.body = posts; //post를 body에 담음 -> 아마 이걸 화면에 보여주는듯
  } catch (e) {
    ctx.throw(500, e);
  }
};

//특정글 읽기(id로 찾아서 조회)
export const read = async ctx => {
  const { id } = ctx.params; //:id가 params에 담기는듯
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      //post가 없으면
      ctx.status = 404; //not found
      return;
    }
    ctx.body = post; //불러온 post를 보여주는듯?
  } catch (e) {
    ctx.throw(500, e); //서버에러
  }
};

//게시물 삭제
export const remove = async ctx => {
  const { id } = ctx.params; //삭제할 글의 id를 받아옴
  try {
    await Post.findById(id).exec();
    ctx.status = 204; //요청은 성공했지만 응답할 데이터가 없는 경우
  } catch (e) {
    ctx.throw(500, e);
  }
};

//게시물 수정
export const update = async ctx => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id, ctx.request.body, {
      //첫번째는 id, 2번째는 업데이트 내용, 3번째는 업데이트 옵션을 넣어줌
      new: true, //이 값을 설정하면 업데이트된 데이터를 반환함
      //false이면 업데이트 전의 데이터를 반환
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
