import css from './NoWebGL.module.css';

const NoWebGL = () => {
    return (
        <div className={css.noWebGL}>
            <span>
                Sorry, your browser does not support WebGL.
            </span>
            <span>
                Check <a href="https://get.webgl.org">https://get.webgl.org</a> for troubleshooting.
            </span>
        </div>
    );
};

export default NoWebGL;