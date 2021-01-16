import { useState } from 'react';
import axios from 'axios';

function Auth() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [success, setSuccess] = useState(false);

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
      const { status } = error.response;
      console.error(error);
      if (status === 400) {
        setErrorMsg('Bad Request');
      } else if (status === 409) {
        setErrorMsg('Conflict');
      } else {
        setErrorMsg('Server Error');
      }
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
    } else if (name === 'nickname') {
      setNickname(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'phone') {
      setPhone(value);
    }
  }

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-40">
        <input
          type="text"
          name="user"
          value={user}
          onChange={handleChange}
          placeholder="아이디"
          className="border"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="비밀번호"
          className="border"
        />
        <input
          type="text"
          name="nickname"
          value={nickname}
          onChange={handleChange}
          placeholder="닉네임"
          className="border"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="이메일"
          className="border"
        />
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={handleChange}
          placeholder="핸드폰번호"
          className="border"
        />
        <button type="submit" className="bg-blue-300">
          회원가입
        </button>
      </form>
      {success}
      {errorMsg}
    </>
  );
}

export default Auth;
