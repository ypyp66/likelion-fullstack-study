import User from '../../model/user';
import Joi from 'joi'; //400번대 에러에서 씀

export const register = async (ctx, next) => {
  const schema = Joi.object().keys({
    username,
    password,
    nickname: Joi.string.min(2).required(),
    email: Joi.string().email().required(),
    phoneNum: Joi.string.pattern(/\b\d{11,11}\b/).required(),
    //joi 문법 참고
  });

  const result = schema.validate(ctx.request.body);
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
    //findOne은 {}의 값과 같은 값이 있느냐?
    const nicknameExist = await User.findOne({ nickname });
    const phoneNumExist = await User.findOne({ phoneNum });

    if (emailExist || nicknameExist || phoneNumExist) {
      //중복되면 안되는데 중복되는 값이 있는가?
      ctx.status = 409; //db에서 체크 후 409번 에러를 return
      return; //종료
    }
    const user = new User({
      //User스키마를 받아옴
      password, //password (user.js에 있는거) : password(이 파일 안에 있는거)
      email,
      nickname,
      phoneNum,
      type,
    });

    await user.save(); //db에 저장, awiat를 쓰는 이유는 db와 통신에 시간이 걸리기 때문

    //ctx.status = 200; //응답코드가 200
    ctx.body = user; //응답body가 user ctx.response.body = user, 응답코드 200번대를 내포
  } catch (e) {
    //ctx.throw(500, e) === res.status(500).send(e)
    //try실행 중 error발생하면 바로 error실행
    ctx.throw(500, e); //DB에 저장하려했으나 에러가 났을때
  }
};
