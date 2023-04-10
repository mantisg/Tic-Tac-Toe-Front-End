import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { InputText } from 'primereact/inputtext';
import {Password} from "primereact/password"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import '../styles.css'

export default function Login({username, password}) {
	const [loginData, setLoginData] = useState([])
	const navigate = useNavigate()
	
	return (
		<div>
			<form>
				<div className="p-float-label signup-margins">
					<InputText
						name="username"
						className="p-inputtext-lg"
					/>
					<label htmlFor="username">Username</label>
				</div>
				<div className="p-float-label signup-margins">
					<Password
						name="password"
						type="password"
						className="p-inputtext-lg"
						feedback={false}
						toggleMask={true}
					/>
					<label htmlFor="password">Password</label>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	)
}