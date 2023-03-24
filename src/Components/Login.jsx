import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import '../styles.css'

export default function Login({handleNav, username, password}) {
	const navigate = useNavigate()
	return (
		<div>
			<button onClick={() => handleNav('/')}>Back</button>
			<div>
				<input placeholder="Username"/>
			</div>
			<div>
				<input placeholder="Password"/>
			</div>
			<button>Submit</button>
		</div>
	)
}