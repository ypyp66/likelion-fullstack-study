import jwt from 'jsonwebtoken';
import User from '../models/user';

const jwtMiddleware = async (ctx, next) => {
  //const token = ctx.cookies.get('access_token');
  //if (!token) return next();

  if (!ctx.req.headers.authorization) {
    return next();
  }
  const token = ctx.req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded', decoded);
    //jwt.verify(토큰, 시크릿키) -> 시크릿 키값을 가지고 내가 만든게 맞나 확인해줌
    const user = await User.findById(decoded.id);
    ctx.state.user = {
      _id: user.id,
      username: user.username,
    };
    //토큰의 남은 기간이 3.5일 미만이면 재발급
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.generateToken();
      const token = ctx.req.headers.authorization.split(' ')[1];
    }
    return next();
  } catch (e) {
    return next();
  }
};

export default jwtMiddleware;
