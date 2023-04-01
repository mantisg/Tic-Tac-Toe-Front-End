import {useEffect} from 'react'
import {deleteGame, getAllGames} from '../api-comm'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
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
			<div className='profile-top'>
				<div className="user-info">
					<img src="https://placekitten.com/150/150"/>
					<span>Name</span>
				</div>
				<div className="add-friend">
					<PersonAddAlt1Icon/>
				</div>
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