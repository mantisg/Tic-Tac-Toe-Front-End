import {useEffect} from 'react'
import {deleteGame, getAllGames} from '../api-comm'
import "../styles.css"

export default function Profile({games, setGames, setIsLoading, handleGetGame, handleCreateGame}) {
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
			<h1>User Profile</h1>
			<div className="user-info">
				<img src="https://placekitten.com/150/150"/>
				<span>Name</span>
				<div className="create-space"></div>
			</div>
			<button className="newgame" onClick={handleCreateGame}>New Game</button>
			<h2 className="game-title">Games</h2> 
	        <ul className="game-list">
	        	{games.length > 0 && games.map(g => (<li className="game-link" key={g.id}>
	          		<p>{g.timestamp}</p>
	          		<button onClick={() => handleGetGame(g.id)}>View</button>
	          		<button className="delete" onClick={() => handleDeleteGame(g.id)}>Delete Game</button>
	        	</li>))}
	        </ul>
		</div>
	)
}