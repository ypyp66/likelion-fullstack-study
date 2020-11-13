import Router from 'koa-router';

const auth = new Router(); // /auth이후의 주소들

//auth다음에 http 메소드를 적어줌

// auth.get(); //read
// auth.post(); //create
// auth.patch(); //update
// auth.delete(); //remove

// ~~/api/auth/여기부터작성

//회원가입
auth.post('/register', ()); 
// auth.post('/login', ());
// auth.get('/check', ());
// auth.post('/logout', ());

// auth.patch('/update', ()); //권한이 있는 유저라면 업데이트
// auth.patch('/delete', ()); //권한이 있는 유저라면 리무브