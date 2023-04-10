import {useState, useEffect} from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"
import CottageIcon from '@mui/icons-material/Cottage';
import {getAppData, createGame, getGame, getAllGames, deleteGame, updateHistory} from '../api-comm'
import Game from './Game/Game'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import '../styles.css'

export default function App() {
    const [history, setHistory] = useState([])
    const [gameId, setGameId] = useState(null)
    const [games, setGames] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        !gameId
        ? (
            getAppData()
            .then(res => {
                setHistory(res.history)
                setIsLoading(false)
            })
        ) : (
            getGame(gameId)
            .then(res => {
                setHistory(JSON.parse(res.history))
                setIsPlaying(true)
                setIsLoading(false)
                navigate(`/game/${gameId}`)
            })
        )
    }, [gameId])

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

    useEffect(() => {
        if (gameId !== null) {
            updateHistory(gameId, history)
        }
    }, [history])

    function handleHomeNav() {
        //setGameId(null)
        setIsPlaying(false)
        navigate('/')
    }

    return (
        <>
            {isLoading
            ? (<p>loading...</p>)
            : (<>
                <div className="homeflex">
                    <CottageIcon onClick={() => handleHomeNav()} />
                    {isPlaying &&
                        <button className="back" onClick={() => navigate('/accounts/profile')}>Back to Profile</button>
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
                        <Login/>}
                    />
                    <Route path='/signup' element={
                        <Signup/>}
                    />
                    <Route path='/accounts/profile' element={
                        <Profile
                            games={games}
                            setGames={setGames}
                            setGameId={setGameId}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            handleCreateGame={handleCreateGame}
                        />}
                    />
                </Routes>
            </>)
            }
        </>
    )   
}