import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="border-b-2 flex justify-between p-4 items-center bg-white sticky top-0">
      <Link to="/#link">
        <div id="link" className="font-bold	text-2xl font-mono	">
          FULL STACK - BLOG
        </div>
      </Link>
      <div>
        <Link to="/login">
          <button
            type="button"
            className="mr-1 bg-gray-400 text-white p-2 rounded-lg text-sm hover:bg-gray-300 focus:ring-10"
          >
            로그인
          </button>
        </Link>
        <Link to="/register">
          <button
            type="button"
            className="bg-gray-600 text-white p-2 rounded-lg text-sm hover:bg-gray-500 focus:ring-2"
          >
            회원가입
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
