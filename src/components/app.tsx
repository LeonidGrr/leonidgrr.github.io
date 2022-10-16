import { route, Router } from 'preact-router';
import { useEffect, useErrorBoundary } from 'preact/hooks';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import NotFound from '../routes/notfound';
import ErrorPage from '../routes/error';

const App = () => {
	const [error, resetError] = useErrorBoundary();
	useEffect(() => {
		if (error) {
			route('/error', true);
			resetError();
		}
	}, [error]);

	return (
		<div id="app">
				<Router>
					<Home path="/" />
					<ErrorPage path="/error" />
					<NotFound default />
				</Router>
		</div>
	);
};

export default App;
