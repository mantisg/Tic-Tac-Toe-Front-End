import {useEffect} from 'react'
import {deleteGame, getAllGames} from '../api-comm'

function Home({games, setGames, setIsLoading, handleGetGame, handleCreateGame}) {
	useEffect(() => {
		getAllGames()
    	.then(res => {
    			console.log('got here!')
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
          <button onClick={handleCreateGame}>New Game</button>
          <h2>Games</h2> 
	      <ul>
	        {games.length > 0 && games.map(g => (<li key={g.id}>
	          <p>{g.id}</p>
	          <button onClick={() => handleGetGame(g.id)}>View</button>
	          <button onClick={() => handleDeleteGame(g.id)}>Delete Game</button>
	        </li>))}
	      </ul>
        </div>
	)
}

export default Home