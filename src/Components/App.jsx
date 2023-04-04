import {useState, useEffect} from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"
import CottageIcon from '@mui/icons-material/Cottage';
import {getAppData, createGame, getGame} from '../api-comm'
import Game from './Game/Game'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import '../styles.css'

function App() {
    const [appData, setAppData] = useState(null)
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [players, setPlayers] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getAppData()
        .then(res => {
            setHistory(res.history)
            setIsLoading(false)
        })
    }, [])

    return (
        <>
            {isLoading 
            ? (<p>loading...</p>)
            : (<>
                <AppRender
                    appData={appData}
                    history={history}
                    setHistory={setHistory}
                    players={players}
                    setPlayers={setPlayers}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            </>)}
        </>
    )
}

export default App

function AppRender({appData, history, setHistory, players, setPlayers, isLoading, setIsLoading}) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [gameId, setGameId] = useState(1)
    const [games, setGames] = useState([])
    const navigate = useNavigate()

    function handleCreateGame() {
        return createGame()
        .then(res => {
            setGameId(res.id)
            setHistory(res.history)
            setIsPlaying(true)
            navigate(`/games/${res.id}`)
        })
    }

    function handleGetGame(gameId) {
        return getGame(gameId)
        .then(res => {
            setGameId(res.id)
            setHistory(res.history)
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
            <div className="homeflex">
                <CottageIcon onClick={() => handleNav('/')} />
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
                        setGameId={setGameId}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        handleNav={handleNav}
                    />}
                />
                <Route path="/games/:id" element={
                    <Game
                        history={history}
                        setHistory={setHistory}
                        gameId={gameId}
                    />}
                />
                <Route path="/login" element={
                    <Login
                        handleNav={handleNav}
                    />}
                />
                <Route path="/signup" element={
                    <Signup
                        handleNav={handleNav}
                    />}
                />
                <Route path="/accounts/profile" element={
                    <Profile
                        games={games}
                        setGames={setGames}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        handleGetGame={handleGetGame}
                        handleCreateGame={handleCreateGame}
                    />}
                />
            </Routes>
        </>
    )   
}