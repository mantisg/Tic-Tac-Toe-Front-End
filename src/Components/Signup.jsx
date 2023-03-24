import {useState} from 'react'
import { InputText } from 'primereact/inputtext';
import {Password} from "primereact/password"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

export default function Signup({handleNav, setUsername, setPassword}) {
	const [input, setInput] = useState({
		username: '',
		password: '',
		confirmPassword: ''
	})

	const [error, setError] = useState({
		username: '',
		password: '',
		confirmPassword: ''
	})

	function onInputChange(e) {
		const {name, value} = e.target
		setInput(prev => ({
			...prev,
			[name]: value
		}))
		validateInput(e)
	}

	function validateInput(e) {
		let {name, value} = e.target
		setError(prev => {
			const stateObj = {...prev, [name]: ""}

			switch (name) {
				case "password":
					if (!value) {
						stateObj[name] = "Please enter password."
					} else if (input.confirmPassword && value !== input.confirmPassword) {
						stateObj["confirmPassword"] = "Password does not match."
					} else {
						stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword
					}
					break
				case "confirmPassword":
					if (!value) {
						stateObj[name] = "Please enter password."
					} else if (input.password && value !== input.password) {
						stateObj[name] = "Password does not match."
					}
					break
			}
			return stateObj
		})
	}

	return(
		<div>
			<button onClick={() => handleNav('/')}>Back</button>
			<div>
				<h3>Choose a Username:</h3>
				<InputText
					name="username"
					value={input.username}
					placeholder="Username"
					className="p-inputtext-lg"
					onChange={onInputChange}
					onBlur={validateInput}
					//onSubmit={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<h3>Choose a Password:</h3>
				<Password
					name="password"
					value={input.password}
					placeholder="Password"
					className="p-inputtext-lg"
					weakLabel="Do Better"
					mediumLabel="Almost"
					strongLabel="There We Go"
					toggleMask={true}
					strongRegex="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$"
					onChange={onInputChange}
					onBlur={validateInput}
				/>
				{error.password && <span>{error.password}</span>}
			</div>
			<div>
				<h3>Confirm your Password:</h3>
				<Password
					name="confirmPassword"
					value={input.confirmPassword}
					placeholder="Confirm Password"
					className="p-inputtext-lg"
					feedback={false}
					toggleMask={true}
					onChange={onInputChange}
					onBlur={validateInput}
				/>
				{error.confirmPassword && <span>{error.confirmPassword}</span>}
			</div>
			<button>Submit</button>
		</div>
	)
}