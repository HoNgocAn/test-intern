import React, { useState, useEffect } from "react";
import './App.css';

function App() {

  const [title, setTitle] = useState(<h3>LET'S PLAY</h3>);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [number, setNumber] = useState(0);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const [orderedNumbers, setOrderedNumbers] = useState([]);
  const [titleButton, setTitleButton] = useState(true);
  const [clickedNumbers, setClickedNumbers] = useState({});

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (number > 0) {
      const numbers = getRandomizedNumbers(number);
      setRandomNumbers(numbers);
      setOrderedNumbers(Array.from({ length: number }, (_, index) => index + 1));
      setCurrentNumberIndex(0);
      setClickedNumbers({});
    }
  }, [number]);

  const handleRestart = () => {
    setTime(0);
    setIsRunning(true);
    setNumber(parseInt(inputValue, 10));
    setTitleButton(false);
    setCurrentNumberIndex(0);
    setTitle(<h3>LET'S PLAY</h3>);
    setClickedNumbers({})
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const getRandomizedNumbers = (num) => {
    const arr = Array.from({ length: num }, (_, index) => index + 1);
    return arr.sort(() => Math.random() - 0.5);
  };

  const handleNumberClick = (clickedNumber) => {
    if (orderedNumbers[currentNumberIndex] === clickedNumber) {
      setClickedNumbers((prevState) => ({
        ...prevState,
        [clickedNumber]: "red"
      }));
      setCurrentNumberIndex((prevIndex) => prevIndex + 1);
      if (currentNumberIndex + 1 === orderedNumbers.length) {
        setIsRunning(false);
        setTitle(<h3 style={{ color: "green" }}>ALL CLEARED</h3>);
      }
    } else {
      setIsRunning(false);
      setTitle(<h3 style={{ color: "red" }}>GAME-OVER</h3>);
    }
  };

  return (
    <div className="App">
      <form>
        <table>
          {title}
          <tbody>
            <tr>
              <td>Points</td>
              <td>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Time</td>
              <td>{time.toFixed(1)} s</td>
            </tr>
            <tr>
              <td colSpan="2">
                <button
                  type="button"
                  onClick={() => handleRestart()}
                >
                  {titleButton ? "Play" : "Restart"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div className='body'>
        <div className="circle-container">
          {randomNumbers.map((num, index) => (
            <div
              key={index}
              className="circle"
              style={{ backgroundColor: clickedNumbers[num] || "gray" }}
              onClick={() => handleNumberClick(num)}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;