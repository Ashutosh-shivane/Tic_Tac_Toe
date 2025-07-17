
import { useState } from "react";

function Board({xIsNext,squares,onplay}) {

  


   const result = calculateWinner(squares);
const winner = result ? result[0] : null;
const winningLine = result ? result[1] : [];
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }




  



     function handleClick(i) {


        if (squares[i] || calculateWinner(squares)) {
    return;
  }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext? "X":"O";
    onplay(nextSquares);


  }

  return (
  
    <>
    <div className="status">{status}</div>
    <div className="board-row">
    <Square value={squares[0]} onSquareClick={()=>handleClick(0)}   isWinner={winningLine.includes(0)} />
    <Square value={squares[1]} onSquareClick={()=>handleClick(1)}    isWinner={winningLine.includes(1)}/>
    <Square  value={squares[2]} onSquareClick={()=>handleClick(2)}   isWinner={winningLine.includes(2)} />
    </div>
          <div className="board-row">
        <Square value={squares[3]} onSquareClick={()=>handleClick(3)}   isWinner={winningLine.includes(3)}  />
        <Square value={squares[4]} onSquareClick={()=>handleClick(4)}   isWinner={winningLine.includes(4)} />
        <Square value={squares[5]} onSquareClick={()=>handleClick(5)}   isWinner={winningLine.includes(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={()=>handleClick(6)} isWinner={winningLine.includes(6)}/>
        <Square value={squares[7]} onSquareClick={()=>handleClick(7)} isWinner={winningLine.includes(7)} />
        <Square  value={squares[8]} onSquareClick={()=>handleClick(8)} isWinner={winningLine.includes(8)} />
      </div>
    </>

  );
}

function Square({value ,onSquareClick,isWinner}) {

  

  return (<button  className={`square ${isWinner ? "winner" : ""}`} onClick={onSquareClick} >{value}</button>);
}

export default function Game() {

 
  const[history,setHistory]=useState([Array(9).fill(null)]);
  
  const [currentMove,setCurrentMove]=useState(0);
    const xIsNext = currentMove % 2 === 0;

  const currentState=history[currentMove];

    function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
  setHistory(nextHistory);
  setCurrentMove(nextHistory.length - 1);
    
    
  }

    function jumpTo(nextMove) {

          setCurrentMove(nextMove);
   
    // TODO
  }

  function clearboard(){
     setHistory([Array(9).fill(null)]); // Reset to empty board
  setCurrentMove(0); 
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
     <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (

    <>
    <h1 style={{ fontSize: "40px" }}>Tic Tac Toe</h1>
    <div className="game">
      
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentState} onplay={handlePlay} />
      </div>
      <div className="game-info">
        <h3>History</h3>
       <ol>{moves}</ol>
      </div>

      
    </div>

    <div style={{ marginTop: '20px', textAlign: 'center' }}>
  <button onClick={clearboard} style={{
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    cursor: 'pointer',
    transition: '0.3s'
  }}>
    Clear
  </button>
</div>

    </>
  );
}



function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

   for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
       return [squares[a], [a, b, c]];
    }
  }
  return null;

}