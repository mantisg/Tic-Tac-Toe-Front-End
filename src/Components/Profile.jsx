import {useEffect} from 'react'
import {deleteGame, getAllGames} from '../api-comm'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import "../styles.css"

export default function Profile({games, setGames, setGameId, isLoading, setIsLoading, handleCreateGame}) {
	useEffect(() => {
        getAllGames()
        .then(res => {
            setGames(res)
            setIsLoading(false)
        })
    }, [games])

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
	          		<p>{g.create_time}</p>
	          		<button onClick={() => setGameId(g.id)}>View</button>
	          		<button className="delete" onClick={() => deleteGame(g.id)}>Delete Game</button>
	        	</li>))}
	        </ul>
		</div>
	)
}