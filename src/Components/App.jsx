import {useEffect, useState} from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"
import {createGame, getGame} from '../api-comm'
import Game from './Game/Game'
import Home from './Home'
import '../styles.css'

function App() {
  const [history, setHistory] = useState([Array(9).fill(0)])
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameId, setGameId] = useState([])
  const [games, setGames] = useState([])
  const navigate = useNavigate()

    function handleCreateGame() {
        return createGame()
        .then(res => {
            setGames([...games, res])
            setGameId(res.id)
            setHistory(res.history)
            setIsPlaying(true)
            navigate(`/games/${res.id}`)
        })
    }

    function handleGetGame(gameId) {
        return getGame(gameId)
        .then(res => {
            setHistory(JSON.parse(res.history))
            setGameId(gameId)
            setIsPlaying(true)
            navigate(`/games/${gameId}`)
        })
    }

    function handleClick() {
        setIsPlaying(false)
        navigate('/')
    }

  return (
    <>
      {isLoading && <p>loading...</p>}
      {isPlaying && 
        <div className="homeflex">
            <button className="home" onClick={handleClick}>Home</button>
        </div>  
      }
      <Routes>
        <Route path="/" element={<Home games={games} setGames={setGames} setIsLoading={setIsLoading} handleGetGame={handleGetGame} handleCreateGame={handleCreateGame} />} />
        <Route path="/games/:id" element={<Game history={history} setHistory={setHistory} gameId={gameId} />} />
      </Routes>
    </>
  )
}

export default App