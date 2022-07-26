import { useState, useEffect, useRef, useMemo } from 'preact/hooks';
import { createContext, FunctionComponent } from 'preact';
import { init } from '../3D';
import { Link } from 'preact-router/match';
import Loader from '../Loader';

export const Scene3D: FunctionComponent = props => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isEnabled, setIsEnabled] = useState(true);

    const disable3d = () => setIsEnabled(false);

    const webGLAvailable = useMemo(() => {
        if (typeof window !== "undefined") {
            return !!window.WebGLRenderingContext;
        }
        return false;
    }, []);

    useEffect(() => {
        if (isEnabled && webGLAvailable && canvasRef.current) {
            setTimeout(() => init(canvasRef.current!), 2500);
        }
    }, [isEnabled, webGLAvailable]);

    return (
        <>
            {props.children}
	    {isEnabled && !webGLAvailable && (
	        <div class="message">
            <h1>Looks like your browser does not support WebGL</h1>
            <p>Check <a href="https://get.webgl.org">https://get.webgl.org</a> for troubleshooting.</p>
            <Link href="/" onClick={disable3d}>
                <h4>Continue without 3d scene...</h4>
            </Link>
        </div>
	    )}
	    {isEnabled && webGLAvailable && <Loader />}
            <canvas className="webgl" tabIndex={1} ref={canvasRef}/>
        </>
    );
};
