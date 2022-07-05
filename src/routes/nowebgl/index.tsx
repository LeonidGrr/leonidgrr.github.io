import { FunctionComponent } from 'preact';
import { RoutableProps } from 'preact-router';
import { Link } from 'preact-router/match';
import { useContext } from 'preact/hooks';
import { Context3D } from '../../components/Context3D';
import css from './NoWebGl.module.css';

const NoWebGl: FunctionComponent<RoutableProps> = () => {
    const { disable3d } = useContext(Context3D);

    return (
        <div class={css.NoWebGl}>
            <h1>Seems like your browser does not support WebGL</h1>
            <p>Check <a href="https://get.webgl.org">https://get.webgl.org</a> for troubleshooting.</p>
            <Link href="/" onClick={disable3d}>
                <h4>Continue without 3d scene...</h4>
            </Link>
        </div>
    );
};

export default NoWebGl;