import {useEffect, useState} from 'react'
import Game from './Components/game-component.js'
import './styles.css'

function App() {
  const [games, setGames] = useState([])
  const [history, setHistory] = useState([Array(9).fill(null)])

  useEffect(() => {
    fetch("http://127.0.0.1:5000/games")
    .then(response => response.json())
    .then(data => setGames(data.res))
    .catch((err) => console.log('error'))
  }, [])

  function createGame() {
    fetch("http://127.0.0.1:5000/game",
      {method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({history: []})}
    )
  }

  function getGame(id) {
    fetch(`http://127.0.0.1:5000/game/${id}`)
      .then((res) => res.json())
      .then((result) => setHistory(result.res))
      .catch((err) => console.log('error'))
  }

  function deleteGame(id) {
    fetch(`http://127.0.0.1:5000/game/${id}`,
      {method: 'DELETE'}
    )
  }

  function displayExistingGames() {
    const existingGames = games.map(g => (<div key={g.id}>
      <p>{g.id}</p>
      <button onClick={() => deleteGame(g.id)}>Delete Game</button>
    </div>))

    return existingGames
  }

  function startNewGame() {
    createGame()
    return (
      <div>
        <Game history={history} setHistory={setHistory} />
      </div>
    )
  }

  return (
    <div className='App'>
      {displayExistingGames()}
      <button onClick={startNewGame}>New Game</button>
    </div>
  )
}
export default App