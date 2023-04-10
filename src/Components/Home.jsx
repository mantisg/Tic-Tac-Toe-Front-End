import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {deleteGame, getGame, getAllGames} from '../api-comm'
import Game from './Game/Game.jsx'
import "../styles.css"


function Home({history, setHistory, gameId, setGameId, isLoading}) {
	const navigate = useNavigate()

	return (
        <div>
	        <div className="top-btns">
	          <div className="in-up">
	          	<button className="login-btn" onClick={() => navigate('/login')}>Login</button>
	          	<a onClick={() => navigate('/signup')}>Sign Up</a>
	          	<a onClick={() => navigate('/accounts/profile')}>Profile</a>
	          </div>
	        </div>
	        <div>
	        	{isLoading ? <p>loading...</p> : <Game history={history} setHistory={setHistory} gameId={gameId} />}
	        </div>
        </div>
	)
}

export default Home