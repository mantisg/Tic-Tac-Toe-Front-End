import {useState, useEffect} from 'react'
import {updateHistory} from '../../api-comm'
import Board from './Board'
import './game.css'

function Game({history, setHistory, gameId}) {
  const [currentMove, setCurrentMove] = useState(history.length - 1)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  /*useEffect(() => {
    updateHistory(gameId, history)
  }, [gameId, history])*/

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function resetGame() {
    setHistory([])
    setCurrentMove(0)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  const moves = history.map((squares, move) => {
    let description
    if (move > 0) {
      description = "Go to Move #:" + move
    }
    else description = "Go to Game Start"

    return (
      <li key={move} >
        <button onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    )
  })
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={resetGame}>Reset Game</button>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

export default Game