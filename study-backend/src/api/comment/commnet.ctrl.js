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
};
