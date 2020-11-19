import Post from '../../models/post';

export const write = async ctx => {
  const { author, title, category, photo, video, content, views, publishedDate } = ctx.request.body;
  const post = new Post({
    //Post객체 생성
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
    ctx.throw(500, e);
  }
};

export const list = ctx => {};

export const read = ctx => {};

export const remove = ctx => {};

export const update = ctx => {};
