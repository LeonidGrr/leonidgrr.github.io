import { useState, useEffect, useRef, useMemo } from 'preact/hooks';
import { createContext, FunctionComponent } from 'preact';
import { init } from '../3D'
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
	    {isEnabled && webGLAvailable && <Loader />
            <canvas className="webgl" tabIndex={1} ref={canvasRef}/>
        </>
    );
};
