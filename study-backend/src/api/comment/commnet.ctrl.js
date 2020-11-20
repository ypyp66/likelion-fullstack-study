import Comment from '../../models/comment';

export const write = async ctx => {
  //댓글 작성 -> 특정 게시글에 대해 작성
  const { author, content, parent, publishedDate } = ctx.request.body;
  const comment = new Comment({
    //댓글 인스턴스 생성
    author,
    content,
    parent,
    publishedDate,
  });
  try {
    await comment.save();
    ctx.body = comment;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Comment.findbyId(id).exec();
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