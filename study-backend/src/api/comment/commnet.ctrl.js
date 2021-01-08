import Comment from 'models/comment';
import Joi from 'joi';

export const write = async ctx => {
  //댓글 작성 -> 특정 게시글에 대해 작성
  const { author, content, parent } = ctx.request.body;
  const comment = new Comment({
    //댓글 인스턴스 생성
    author : Joi.object().min(3).required(),
    content : Joi.string().min(1).required(),
    post : Joi.object().min(3).required(),
    parent : Joi.object().min(3),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; //Bad request
    ctx.body = result.error;
  }

  const { author, content, post, parent} = ctx.request.body;
  try {
    const comment = new Comment({
      author,
      content,
      post,
      parent
    });

    await comment.save();
    const data = comment.toJSON();
    ctx.body = data;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Comment.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const list = async ctx => {
  try {
    const comments = await Comment.find().exec();
    ctx.body = comments;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const 