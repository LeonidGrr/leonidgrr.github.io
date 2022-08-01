import classNames from 'classnames';
import css from './Loader.module.css';

const Loader = (props: { loaded: boolean, progress: number }) => (
    <div className={classNames(css['loader-wrapper'], props.loaded && css['fade-out'])}>
        <div className={css['loader-progress']}>
            <label for="loader">Loading assets</label>
            <progress id="loader" max="100" value={props.progress}></progress>
        </div>
    </div>
);

export default Loader;
