import { route, Router } from 'preact-router';
import { useEffect, useErrorBoundary } from 'preact/hooks';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/profile';
import NotFound from '../routes/notfound';
import ErrorPage from '../routes/error';
import NoWebGl from '../routes/nowebgl';
import { Context3DProvider } from './Context3D';

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
			<Context3DProvider>
				<Router>
					<Home path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<ErrorPage path="/error" />
					<NoWebGl path="/nowebgl" />
					<NotFound default />
				</Router>
			</Context3DProvider>
		</div>
	);
};

export default App;
