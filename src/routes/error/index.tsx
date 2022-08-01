import { FunctionComponent } from 'preact';
import { RoutableProps } from 'preact-router';
import { Link } from 'preact-router/match';

const ErrorPage: FunctionComponent<RoutableProps> = () => {
    return (
        <div class="message">
            <h1>Something happened</h1>
            <p>No worries, it&apos;s just a little error...</p>
            <Link href="/">
                <h4>Back to Home</h4>
            </Link>
        </div>
    );
};

export default ErrorPage;