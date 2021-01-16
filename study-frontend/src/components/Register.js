import { useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [success, setSuccess] = useState(false);
  const [idCheck, setIdCheck] = useState(null);
  const [passCheck, setPassCheck] = useState(null);
  const [emailCheck, setEmailCheck] = useState(null);
  const [phoneCheck, setPhoneCheck] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post('/auth/register', {
        username: user,
        password,
        nickname,
        email,
        phoneNum: phone,
      });
      setSuccess(`Hello ${nickname}`);
      setErrorMsg('');
    } catch (error) {
      setSuccess('');
      console.log(error.response);
      setErrorMsg(error.response.data);
      // error.response
    }
  }

  function handleChange(e) {
    const {
      target: { value, name },
    } = e;
    if (name === 'user') {
      if (value.length < 5) {
        setIdCheck('아이디는 5자 이상입니다');
        setErrorMsg();
      } else {
        setIdCheck('');
      }
      setUser(value);
    } else if (name === 'password') {
      if (value.length < 5) {
        setPassCheck('비밀번호는 5자 이상입니다');
      } else {
        setPassCheck('');
      }
      setPassword(value);
    } else if (name === 'nickname') {
      setNickname(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'phone') {
      setPhone(value);
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
      <h1 className="text-6xl mb-10">Register</h1>
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
        <div className="flex mb-2">
          <div className="w-32">Nickname</div>
          <input
            type="text"
            name="nickname"
            value={nickname}
            onChange={handleChange}
            placeholder="닉네임"
            className="border"
          />
        </div>
        <div className="flex mb-2">
          <div className=" w-32">Email</div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="이메일"
            className="border"
          />
        </div>
        <div className="flex mb-5">
          <div className="w-32">Phone</div>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={handleChange}
            placeholder="ex) 01012345678"
            className="border"
          />
        </div>
        <button type="submit" className="text-white rounded bg-gray-600 p-2">
          회원가입
        </button>
      </form>
      {success}
      {errorMsg}
    </div>
  );
}

export default Register;
