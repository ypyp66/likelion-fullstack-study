import { model, Schema } from 'mongoose';
import User from './user';

const PostSchema = new Schema(
  {
    author: { type: String, required: true, ref: User },
    //누구의 글인지
    title: { type: String, required: true }, //글 제목
    category: { type: String, required: true, ref: 'Category' }, //Category와 join할 예정
    content: { type: String, required: true }, //글 내용
    views: { type: Number, required: true }, //조회수
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

const Post = model('Post', PostSchema);

export default Post;
