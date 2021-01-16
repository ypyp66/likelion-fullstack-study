import { useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [success, setSuccess] = useState('');
  const [idCheck, setIdCheck] = useState(null);
  const [passCheck, setPassCheck] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await axios.post('/auth/login', {
        username: user,
        password,
      });
      console.log(result);
      if (result) {
        setSuccess(`Hello ${user}`);
        setTimeout(() => {
          alert(this);
          setErrorMsg('');
        }, 1000);
      }
    } catch (error) {
      setSuccess('');
      setErrorMsg('아이디 또는 비밀번호가 올바르지 않습니다');
      setTimeout(() => {
        alert(errorMsg);
      }, 100);
      console.log(error.response);
      // error.response
    }
  }

  function handleChange(e) {
    const {
      target: { value, name },
    } = e;
    if (name === 'user') {
      setUser(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  async function checkID(username) {
    const result = await axios.post('/auth/check', {
      user: username,
    });
    if (result) {
      setIdCheck(false);
    } else {
      setIdCheck('중복된 아이디입니다.');
    }
  }

  return (
    <div className="flex flex-col items-center pt-20 font-mono ">
      <h1 className="text-6xl mb-10">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-auto">
        <div className="flex mb-2">
          <div className="w-32">ID</div>
          <div className="flex flex-col">
            <input
              type="text"
              name="user"
              value={user}
              onChange={handleChange}
              placeholder="아이디"
              className="border"
            />
            {idCheck}
          </div>
        </div>
        <div className="flex mb-2">
          <div className="w-32 ">Password</div>
          <div className="flex flex-col">
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="비밀번호"
              className="border"
            />
            {passCheck}
          </div>
        </div>
        <button type="submit" className="text-white rounded bg-gray-600 p-2">
          로그인
        </button>
      </form>
      {success}
      {errorMsg}
    </div>
  );
}

export default Login;
