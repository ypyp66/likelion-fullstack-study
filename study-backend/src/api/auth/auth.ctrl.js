import User from '../../model/user';
import Joi from 'joi'; //400번대 에러에서 씀

export const register = async ctx => {
  const schema = Joi.object().keys({
    id: Joi.string.min(5).required(),
    password: Joi.string.min(5).required(),
    nickname: Joi.string.min(2).required(),
    email: Joi.string().email().required(),
    phoneNum: Joi.string.pattern(/\b\d{11,11}\b/).required(),
    //joi 문법 참고
  });

  const result = schema.validate(ctx.request.body);
  //사용자가 압력한 값(ctx.request.body)이 schema(형태)에 부합하는가?
  //return true / false
  if (result.error) {
    ctx.status = 400; //Bad Request
    ctx.body = result.error;
    return;
  }
  //ctx에 req, res가 둘다 담겨있다
  const { id, password, nickname, email, phoneNum, type } = ctx.request.body;
  //ctx.request.body에 있는 값들을 분리시켜서 넣어줌
  try {
    //try안에를 실행함

    const emailExist = await User.findOne({ email }); //없으면 null이 return됨
    //findOne은 {}의 값과 같은 값이 있느냐?
    const nicknameExist = await User.findOne({ nickname });
    const phoneNumExist = await User.findOne({ phoneNum });
    const idExist = await User.findOne({ id });

    if (emailExist || nicknameExist || phoneNumExist || idExist) {
      //중복되면 안되는데 중복되는 값이 있는가?
      ctx.status = 409; //db에서 체크 후 409번 에러를 return
      return; //종료
    }
    const user = new User({
      //User스키마를 받아옴
      id,
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
    //암호화된 비밀번호를 제외하고 return
  } catch (e) {
    //ctx.throw(500, e) === res.status(500).send(e)
    //try실행 중 error발생하면 바로 error실행
    ctx.throw(500, e); //DB에 저장하려했으나 에러가 났을때
  }
};
export const login = async ctx => {
  const { id, password } = ctx.request.body;

  if (!id || !password) {
    //username이나 password에 아무것도 입력을 안했으면
    ctx.status = 400; //사용자의 잘못된 요청을 처리할 수 없음
    return;
  }

  try {
    const userid = await User.findByUsername(id);
    if (!userid) {
      //db에 id가 없으면
      ctx.status = 401; //unathourized
      return;
    }
    const pwdValid = await User.checkPassword(password);
    //static 메소드 -> 스키마 전체에 던지는 메소드
    //User 스키마 전체에서 찾음
    if (!pwdValid) {
      //db에 패스워드가 틀렸으면
      ctx.status = 401;
      return;
    }
    ctx.body = User.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const logout = async ctx => {
  ctx.cookies.set('access_token');
  ctx.status = 204; //응답은 성공했으나 반환할 데이터가 없는 경우
};
