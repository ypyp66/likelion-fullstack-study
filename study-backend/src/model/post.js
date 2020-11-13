import { model, Schema } from 'mongoose';

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  //누구의 글인지
  title: { type: String, required: true },
  category: { type: String, required: true }, //Category에서 가져옴
  photo: { type: String, required: true },
  video: { type: String, required: true },
  content: { type: String, required: true },
  views: { type: Number, required: true },
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

const Post = model('Post', PostSchema);

export default Post;
