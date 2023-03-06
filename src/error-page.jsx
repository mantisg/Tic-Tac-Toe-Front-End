import {useRouteError} from 'react-router-dom'

export default function ErrorPage() {
	const error = useRouteError()
	console.error(error)

	return (
		<div id='error-page'>
			<h1>Apologies...</h1>
			<p>We're sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	)
}