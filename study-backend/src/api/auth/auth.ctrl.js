import User from 'models/user';
import Joi from 'joi'; //400번대 에러에서 씀
import * as jwt from 'jsonwebtoken';

//회원가입
//유효성검사 -> 중복값 검사 -> db저장 -> 회원가입 성공
export const register = async ctx => {
  const schema = Joi.object().keys({
    username: Joi.string().min(5).required(),
    password: Joi.string().min(5).required(),
    nickname: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phoneNum: Joi.string()
      .pattern(/\b\d{11,11}\b/)
      .required(),
    //joi 문법 참고
    type: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);
  //사용자가 입력한 값(ctx.request.body)이 schema(형태)에 부합하는가? true | false
  if (result.error) {
    ctx.status = 400; //Bad Request
    ctx.body = result.error;
    return;
  }
  //ctx에 req, res가 둘다 담겨있다
  const { username, password, nickname, email, phoneNum, type } = ctx.request.body;
  //ctx.request.body에 있는 값들을 분리시켜서 넣어줌
  try {
    //try안에를 실행함

    const emailExist = await User.findOne({ email }); //없으면 null이 return됨
    //await를 쓰는 이유는 db와 통신하는데 시간이 걸리기 때문에 비동기적으로 처리하기 위함.
    //findOne은 {}의 값과 같은 값이 있느냐?
    const nicknameExist = await User.findOne({ nickname });
    const phoneNumExist = await User.findOne({ phoneNum });
    const idExist = await User.findOne({ username });

    if (emailExist || nicknameExist || phoneNumExist || idExist) {
      //중복되면 안되는데 중복되는 값이 있는가?
      ctx.status = 409; //db에서 체크 후 409번 에러를 return
      return; //종료
    }
    const user = new User({
      //User스키마를 받아옴
      username,
      password, //password (user.js에 있는거) : password(이 파일 안에 있는거)
      email,
      nickname,
      phoneNum,
      type,
    });

    await user.setPassword(password);
    await user.save(); //db에 저장, awiat를 쓰는 이유는 db와 통신에 시간이 걸리기 때문

    //ctx.status = 200; //응답코드가 200
    ctx.body = user.serialize(); //응답body가 user ctx.response.body = user, 응답코드 200번대를 내포
    const token = userValid.generateToken();
    //암호화된 비밀번호를 제외하고 return
  } catch (e) {
    //ctx.throw(500, e) === res.status(500).send(e)
    //try실행 중 error발생하면 바로 error실행
    ctx.throw(500, e); //DB에 저장하려했으나 에러가 났을때
  }
};

//로그인
export const login = async ctx => {
  const schema = Joi.object().keys({
    username: Joi.string().min(2).required(),
    password: Joi.string().min(5).required(),
  });

  const result = schema.validate(ctx.request.body);
  //사용자가 압력한 값(ctx.request.body)이 schema(형태)에 부합하는가? true | false
  if (result.error) {
    ctx.status = 400; //Bad Request
    ctx.body = result.error;
    return;
  }
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    //username이나 password에 아무것도 입력을 안했으면
    ctx.status = 400; //사용자의 잘못된 요청을 처리할 수 없음
    return;
  }

  try {
    const userValid = await User.findByUsername(username);
    if (!userValid) {
      //db에 id가 없으면
      ctx.status = 402; //unathourized
      return;
    }
    const pwdValid = await userValid.checkPassword(password);
    //static 메소드 -> 스키마 전체에 던지는 메소드
    //User 스키마 전체에서 찾음
    if (!pwdValid) {
      //db에 패스워드가 틀렸으면
      ctx.status = 401; //Unathourized
      return;
    }
    console.log('123', userValid);
    /*payload = user의 고유id를 넣어줌, SECRET Key, 7일뒤에 만료됨*/
    ctx.body = userValid.serialize();
    const token = userValid.generateToken();
    // ctx.cookies.set('access_token', token, {
    //   maxAge: 1000 * 60 * 60 * 24 * 7,
    //   httpOnly: true,
    // });
  } catch (e) {
    ctx.throw(500, e);
  }
};

//로그아웃
export const logout = async ctx => {
  ctx.cookies.set('access_token');
  ctx.status = 204; //응답은 성공했으나 반환할 데이터가 없는 경우
};

export const check = async ctx => {
  const { user } = ctx.state;
  if (!user) {
    ctx.status = 401;
    return;
  }
  ctx.body = user;
};

// exports.create = async ctx => {
//   const { username, password, email, nickname, phoneNum, type } = ctx.request.body;
//   const user = new User({ username, password, email, nickname, phoneNum, type });

//   try {
//     await user.save();
//   } catch (e) {
//     // HTTP 상태 500 와 Internal Error 라는 메시지를 반환하고,
//     // 에러를 기록합니다.
//     return ctx.throw(500, e);
//   }

//   ctx.body = user;
// };
