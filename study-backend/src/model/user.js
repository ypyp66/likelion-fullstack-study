import { model, Schema } from 'mongoose';
//required : true면 반드시 입력해야하는값
const UserSchema = new Schema({
  password: { type: String, required: true },
  nickname: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  phoneNum: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['Admin', 'Users'],
  },
});

const User = model('User', UserSchema);

export default User;
