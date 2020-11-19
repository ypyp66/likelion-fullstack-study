import Post from '../../models/post';

export const write = async ctx => {
  //ctx에는 request와 response가 담겨있음
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
    ctx.throw(500, e); //내부서버오류
  }
};

export const list = async ctx => {
  //게시글 조회
  try {
    const posts = await Post.find().exec();
    //find()함수 호출 후 exec()를 붙어주어야 서버에 쿼리를 요청함
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const read = ctx => {
  //특정글 읽기(id로 찾아서 조회)
  const { id } = ctx.params;
};

export const remove = ctx => {};

export const update = ctx => {};
