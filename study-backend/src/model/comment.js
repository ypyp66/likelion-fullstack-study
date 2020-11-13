import { model, Schema } from 'mongoose';

const CommentSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    //누구의 댓글인지
    content: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
    //어떤글의 댓글인지
    parent: { type: Schema.Types.ObjectId, ref: 'Post' },
    //대댓글의 부모가 누구인가? 첫댓글은 부모가 없으므로 required:false
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

const Comment = model('Comment', CommentSchema);

export default Comment;
