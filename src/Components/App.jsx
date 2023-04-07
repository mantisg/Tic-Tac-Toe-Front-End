import {useState, useEffect} from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"
import CottageIcon from '@mui/icons-material/Cottage';
import {getAppData, createGame, getGame, getAllGames, deleteGame} from '../api-comm'
import Game from './Game/Game'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import '../styles.css'

export default function App() {
    const [history, setHistory] = useState([])
    const [gameId, setGameId] = useState([])
    const [games, setGames] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getAllGames()
        getGame(1)
        .then(res => {
            setHistory(JSON.parse(res.history))
            setGameId(res.id)
            setIsLoading(false)
        })
    }, [])

    function handleCreateGame() {
        return createGame()
        .then(res => {
            setGameId(res.id)
            setHistory(JSON.parse(res.history))
            setIsPlaying(true)
            navigate(`/game/${res.id}`)
        })
    }

    function handleGetGame(id) {
        return getGame(id)
        .then(res => {
            setHistory(JSON.parse(res.history))
            setGameId(res.id)
            setIsPlaying(true)
            navigate(`/game/${id}`)
        })
    }

    function handleDeleteGame(id) {
        deleteGame(id)
    }

    function handleNav(path) {
        navigate(path)
    }

    function handleClick(path) {
        getGame(1)
        .then(res => {
            setHistory(JSON.parse(res.history))
            setGameId(res.id)
            setIsPlaying(false)
            setIsLoading(false)
        })
        handleNav(path)
    }

    return (
        <>
            <div className="homeflex">
                <CottageIcon onClick={() => handleClick('/')} />
                {isPlaying &&
                    <button className="back" onClick={() => handleClick('/accounts/profile')}>Back to Profile</button>
                }
            </div>
            <Routes>
                <Route path="/" element={
                    <Home
                        handleNav={handleNav}
                        history={history}
                        setHistory={setHistory}
                        gameId={gameId}
                        setGameId={setGameId}
                        isLoading={isLoading}
                    />}
                />
                <Route path='/game/:id' element={
                    <Game
                        history={history}
                        setHistory={setHistory}
                        gameId={gameId} 
                    />}
                />
                <Route path='/login' element={
                    <Login
                        handleNav={handleNav} 
                    />}
                />
                <Route path='/signup' element={
                    <Signup
                        handleNav={handleNav} 
                    />}
                />
                <Route path='/accounts/profile' element={
                    <Profile
                        games={games}
                        setGames={setGames}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        handleCreateGame={handleCreateGame}
                        handleGetGame={handleGetGame}
                        handleDeleteGame={handleDeleteGame}
                    />}
                />
            </Routes>
        </>
    )
}