import {useEffect, useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {deleteGame, getAllGames} from '../api-comm'

function Home({games, setGames, setIsLoading, handleGetGame, handleCreateGame}) {
  	const navigate = useNavigate()
  
	useEffect(() => {
		getAllGames()
    	.then(res => {
      		setGames(res)
      		setIsLoading(false)
    	})
  	}, [])

  	function handleDeleteGame(gameId) {
  		return deleteGame(gameId)
  		.then(res => setGames(res))
  	}
	
	return (
        <div>
          <button onClick={handleCreateGame}>New Game</button>
          <h2>Games</h2> 
	      <ul>
	        {games.map(g => (<li key={g.id}>
	          <p>{g.id}</p>
	          <button onClick={() => handleGetGame(g.id)}>View</button>
	          <button onClick={() => handleDeleteGame(g.id)}>Delete Game</button>
	        </li>))}
	      </ul>
        </div>
	)
}

export default Home