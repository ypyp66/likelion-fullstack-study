function Main() {
  return (
    <div style={{ zIndex: -10, position: 'sticky', top: 0 }}>
      <div className="flex flex-col justify-between bg-green-200 h-screen">
        <div className="flex flex-col items-center">
          <img
            src="https://dotsungfiles.s3.ap-northeast-2.amazonaws.com/main_image_1.png"
            width="600"
            height="100%"
            alt="main"
          />
          <div className="text-4xl">&quot;Blog Project&quot;</div>
        </div>
        <svg
          className="animate-bounce w-6 h-6 mt-8 self-center"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}

export default Main;
