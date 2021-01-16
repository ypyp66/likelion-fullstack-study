function Preview() {
  return (
    <div className="rounded shadow-lg items-between min-w-30">
      <div>
        <img
          src="https://i.ytimg.com/vi/ohtkpDDezLo/maxresdefault.jpg"
          className="rounded"
        />
        <div className="text-2xl text-center">제목 is 제목</div>
        <div className="text-center">대충 내용</div>
      </div>
      <div className="flex justify-between">
        <div>프로필</div>
        <div>좋아요</div>
      </div>
    </div>
  );
}

export default Preview;
