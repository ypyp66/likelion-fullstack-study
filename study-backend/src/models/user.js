import mongoose, { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { func } from 'joi';
//required : true면 반드시 입력해야하는값
const UserSchema = new Schema({
  id: { type: String, required: true }, //이름
  password: { type: String, required: true },
  nickname: { type: String, unique: true, required: true },
  email: { type: String, required: true, unique: true },
  phoneNum: { type: String, required: true, unique: true },
  type: {
    type: String,
    enum: ['Admin', 'Users'],
  },
});

UserSchema.methods.setPassword = async function (password) {
  //사용자가 입력한 password를 받아서 암호화 후 return해주는 함수
  //인스턴스 메소드, 한 사람에 대해서만 작동하는 함수
  const hash = await bcrypt.hash(password, 10);
  this.password = hash;
  //화살표 함수를 사용하면 this는 UserSchema를 가리키지 못하게됨
};

UserSchema.methods.checkPassword = async function (password) {
  //사용자가 입력한 password를 받아서 db의 password와 맞는지 검증해주는 함수
  const result = await bcrypt.compare(password, this.password);
  return result;
};

UserSchema.statics.findByUsername = function (username) {
  //스태틱 메소드, User스키마 전체에서 동작하는 함수
  return this.findOne({ username });
  //this는 Userschema를 가리킴
};

UserSchema.methods.serialize = function () {
  /*로그인 후 암호화 된 비밀번호를 return해주면 어떤 방식으로 암호화 되었는지 알 수 있으므로
    암호를 빼고 return해줘야 한다.*/
  const data = this.toJSON();
  delete data.password;
  return data;
};
const User = mongoose.model('User', UserSchema);

export default User;
