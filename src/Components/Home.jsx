import {useEffect, useState} from 'react'
import {deleteGame, getAllGames} from '../api-comm'
import Game from './Game/Game.jsx'
import "../styles.css"

function Home({history, setHistory, gameId, setIsLoading, handleCreateGame, handleNav}) {
	setIsLoading(false)

	return (
        <div>
	        <div className="top-btns">
	          <button className="newgame" onClick={handleCreateGame}>New Game</button>
	          <div className="in-up">
	          	<button className="login-btn" onClick={() => handleNav('/login')}>Login</button>
	          	<a onClick={() => handleNav('/signup')}>Sign Up</a>
	          	<a onClick={() => handleNav('/accounts/profile')}>Profile</a>
	          </div>
	        </div>
	        <div>
				<Game history={history} setHistory={setHistory} gameId={gameId} />
	        </div>
        </div>
	)
}

export default Home