import {useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Game from './Game/Game'

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
    return (
      <ul>
        {games.map(g => (<li key={g.id}>
          <p>{g.id}</p>
          <Link to={`/games/${g.id}`}>View</Link>
          <button onClick={() => deleteGame(g.id)}>Delete Game</button>
        </li>))}
      </ul>
    )
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
    <>
      <Router>
        <div>
          <button onClick={startNewGame}>New Game</button>
          <h2>Games</h2> 
          {displayExistingGames()}

          <Routes>
            <Route path="/games/:id" component={Game} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App