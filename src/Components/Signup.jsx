import {useState} from 'react'
import { InputText } from 'primereact/inputtext';
import {Password} from "primereact/password"
import {useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "../styles.css"

export default function Signup({handleNav, setUsername, setPassword}) {
	const validationSchema = Yup.object().shape({
		password: Yup.string()
			.required("Password is required"),
		confirmPassword: Yup.string()
			.required("Password confirmation required")
			.oneOf([Yup.ref('password'), "Passwords must match"])
	})

	const {register, handleSubmit, formState} = useForm({
		resolver: yupResolver(validationSchema)
	})
	const {errors} = formState

	function onSubmit(data) {
		console.log("Success!\n\n" + JSON.stringify(data, null, 4))
		return false
	}
	return(
		<div>
			<button onClick={() => handleNav('/')}>Back</button>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="p-float-label signup-margins">
					<InputText
						name="username"
						className="p-inputtext-lg"
						//onSubmit={(e) => setUsername(e.target.value)}
					/>
					<label htmlFor="username">Username</label>
				</div>
				<div className="p-float-label signup-margins">
					<Password
						name="password"
						type="password" {...register('password')}
						className="p-inputtext-lg"
						weakLabel="Do Better"
						mediumLabel="Almost"
						strongLabel="There We Go"
						toggleMask={true}
						strongRegex="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$"
					/>
					<label htmlFor="password">Password</label>
				</div>
				<div className="p-float-label signup-margins">
					<Password
						className="p-invalid"
						name="confirmPassword"
						type="password" {...register('confirmPassword')}
						className="p-inputtext-lg"
						feedback={false}
						toggleMask={true}
					/>
					<label htmlFor="confirmPassword">Confirm Password</label>
				</div>
				<button type='submit'>Submit</button>
			</form>
		</div>
	)
}