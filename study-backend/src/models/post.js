import { model, Schema } from 'mongoose';

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  //누구의 글인지
  title: { type: String, required: true }, //글 제목
  category: { type: String, required: true }, //Category와 join
  photo: { type: String, required: true }, //사진 url
  video: { type: String, required: true }, //동영상 url
  content: { type: String, required: true }, //글 내용
  views: { type: Number, required: true }, //조회수
  publishedDate: {
    //글 작성일
    type: Date,
    default: Date.now,
  },
});

const Post = model('Post', PostSchema);

export default Post;
