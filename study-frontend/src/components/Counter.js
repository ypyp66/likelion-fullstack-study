import { useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(0);

  function handleClick(e) {
    const { name } = e.target;

    if (name === 'plus') {
      setNumber(number + 1);
    } else if (name === 'minus') {
      setNumber(number - 1);
    } else {
      setNumber(0);
    }
  }
  return (
    <div className="p-3">
      Counter:
      <h1>{number}</h1>
      <button
        type="button"
        name="plus"
        onClick={handleClick}
        className="mr-4 border border-gray-600 w-10"
      >
        +
      </button>
      <button
        type="button"
        name="minus"
        onClick={handleClick}
        className="mr-4 border border-gray-600 w-10"
      >
        -
      </button>
      <button
        type="button"
        name="reset"
        onClick={handleClick}
        className="border border-gray-600"
      >
        초기화
      </button>
    </div>
  );
}

export default Counter;
