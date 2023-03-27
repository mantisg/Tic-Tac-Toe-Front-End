import {useState} from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"
import CottageIcon from '@mui/icons-material/Cottage';
import {createGame, getGame} from '../api-comm'
import Game from './Game/Game'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import '../styles.css'

function App() {
  const [history, setHistory] = useState([Array(9).fill(0)])
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameId, setGameId] = useState([])
  const [games, setGames] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
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

    function handleNav(path) {
        return navigate(path)
    }

    function handleClick(path) {
        setIsPlaying(false)
        handleNav(path)
    }

  return (
    <>
      {isLoading && <p>loading...</p>} 
        <div className="homeflex">
            <CottageIcon onClick={() => handleClick('/')} />
            {isPlaying &&
                <button className="back" onClick={() => handleClick('/accounts/profile')}>Back to Profile</button>
            }
        </div>  
      <Routes>
        <Route path="/" element={
            <Home
                history={history}
                setHistory={setHistory}
                gameId={gameId}
                setIsLoading={setIsLoading}
                handleCreateGame={handleCreateGame}
                handleNav={handleNav}
            />}
        />
        <Route path="/games/:id" element={<Game history={history} setHistory={setHistory} gameId={gameId} />} />
        <Route path="/login" element={<Login handleNav={handleNav} username={username} password={password} />}/>
        <Route path="/signup" element={<Signup handleNav={handleNav} setUsername={setUsername} setPassword={setPassword} />}/>
        <Route path="/accounts/profile" element={<Profile games={games} setGames={setGames} setIsLoading={setIsLoading} handleGetGame={handleGetGame} handleCreateGame={handleCreateGame} />}/>
      </Routes>
    </>
  )
}

export default App