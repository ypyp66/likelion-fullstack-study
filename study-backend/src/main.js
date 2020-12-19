import Koa from 'koa';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser'; //미들웨어
import api from './api';

dotenv.config(); //.env파일에서 설정을 가져옴
//.env에 올리면 안되는 걸 적고 dotenv.config()로 불러옴
const { PORT, MONGO_URI } = process.env;

if (!MONGO_URI) {
  //.env파일이 없으면
  throw Error('mongodb uri가 존재하지 않습니다');
}
async function connectDB() {
  //몽고db연결은 동기적으로 실행해야함
  try {
    //정상적으로 실행되면
    await mongoose.connect(MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('몽고디비 연결됨');
  } catch (e) {
    //에러가 난다면
    console.error(e);
  }
}

connectDB(); //이게 정상적으로 실행되기 전엔 밑에 실행하지 말기

const app = new Koa();
const router = new Router();
router.get('/', ctx => {
  ctx.body = '홈';
});
router.get('/about', ctx => {
  ctx.body = '소개';
});

app.use(bodyParser()); // 라우터 적용 전에 bodyParser 적용

router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000; //PORT가 있으면 PORT를 넣고 없으면 4000을 넣어라

app.listen(port, () => {
  console.log(`리스닝 온 ${port}`);
  //2번째 인자는 함수로 받아서 실행
});
