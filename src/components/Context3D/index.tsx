import { useState, useEffect, useRef, useMemo } from 'preact/hooks';
import { createContext, FunctionComponent } from 'preact';
import { init } from '../3D'
import Loader from '../Loader';
import { route } from 'preact-router';

type Context3dProps = {
    loader: preact.JSX.Element | null,
    disable3d: () => void,
};

export const Context3D = createContext<Context3dProps>({
    loader: null,
    disable3d: () => {},
});

export const Context3DProvider: FunctionComponent = props => {
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

	useEffect(() => {
		if (!webGLAvailable && isEnabled) {
			route('/nowebgl', true);
		}
	}, [webGLAvailable, isEnabled]);

    return (
        <Context3D.Provider value={{
            loader: webGLAvailable && isEnabled ? <Loader /> : null,
            disable3d,
        }}>
            {props.children}
            <canvas className="webgl" tabIndex={1} ref={canvasRef}/>
        </Context3D.Provider>
    );
};
