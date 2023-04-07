import {useEffect} from 'react'
import {deleteGame, getGame, getAllGames} from '../api-comm'
import Game from './Game/Game.jsx'
import "../styles.css"

function Home({history, setHistory, gameId, setGameId, isLoading, setIsLoading, handleNav}) {
	useEffect(() => {
		getGame(1)
		.then(res => {
			setHistory(JSON.parse(res.history))
			setGameId(res.id)
		})
	}, [])

	return (
        <div>
	        <div className="top-btns">
	          <div className="in-up">
	          	<button className="login-btn" onClick={() => handleNav('/login')}>Login</button>
	          	<a onClick={() => handleNav('/signup')}>Sign Up</a>
	          	<a onClick={() => handleNav('/accounts/profile')}>Profile</a>
	          </div>
	        </div>
	        <div>
	        	{isLoading ? <p>loading...</p> : <Game history={history} setHistory={setHistory} gameId={gameId} />}
	        </div>
        </div>
	)
}

export default Home