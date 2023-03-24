import {useEffect} from 'react'
import {deleteGame, getAllGames} from '../api-comm'
import "../styles.css"

function Home({games, setGames, setIsLoading, handleGetGame, handleCreateGame, handleNav}) {
	useEffect(() => {
		getAllGames()
    	.then(res => {
      		setGames(res)
      		setIsLoading(false)
    	})
  	}, [setGames, setIsLoading])

  	function handleDeleteGame(gameId) {
  		return deleteGame(gameId)
  		.then(res => setGames(res))
  	}
	
	return (
        <div>
	        <div className="top-btns">
	          <button className="newgame" onClick={handleCreateGame}>New Game</button>
	          <div className="in-up">
	          	<button className="login-btn" onClick={() => handleNav('/login')}>Login</button>
	          	<a onClick={() => handleNav('/signup')}>Sign Up</a>
	          </div>
	        </div>
          <h2 className="game-title">Games</h2> 
	      <ul className="game-list">
	        {games.length > 0 && games.map(g => (<li className="game-link" key={g.id}>
	          <p>{g.id}</p>
	          <button onClick={() => handleGetGame(g.id)}>View</button>
	          <button className="delete" onClick={() => handleDeleteGame(g.id)}>Delete Game</button>
	        </li>))}
	      </ul>
        </div>
	)
}

export default Home