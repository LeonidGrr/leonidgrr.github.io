import { useState, useEffect, useRef, useMemo } from 'preact/hooks';
import { createContext, FunctionComponent } from 'preact';
import { init } from '../3D'
import Loader from '../Loader';
import { route } from 'preact-router';

type Context3dProps = {
    loader: preact.JSX.Element | null,
    changeCamera: (key: string) => void,
    disable3d: () => void,
    currentCamera: string,
};

export const Context3D = createContext<Context3dProps>({
    loader: null,
    changeCamera: (key: string) => {},
    disable3d: () => {},
    currentCamera: 'base',
});

export const Context3DProvider: FunctionComponent = props => {
    const handlersRef = useRef<any>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isEnabled, setIsEnabled] = useState(true);
    const [currentCamera, setCameraDOM] = useState('base');

    const changeCamera = (key: string) => {
        if (key && currentCamera !== key) {
            setCameraDOM(key);
        }
    };

    const disable3d = () => setIsEnabled(false);

    const webGLAvailable = useMemo(() => {
        if (typeof window !== "undefined") {
            return !!window.WebGLRenderingContext;
        }
        return false;
    }, []);

    useEffect(() => {
        if (isEnabled && webGLAvailable && canvasRef.current) {
            setTimeout(() => handlersRef.current = init(setCameraDOM, canvasRef.current!), 2500);
        }
    }, [isEnabled, webGLAvailable]);

    useEffect(() => {
        if (handlersRef.current) {
            const { setCameraWebGL } = handlersRef.current;
            setCameraWebGL(currentCamera);
        }        
    }, [currentCamera]);

	useEffect(() => {
		if (!webGLAvailable && isEnabled) {
			route('/nowebgl', true);
		}
	}, [webGLAvailable, isEnabled]);

    return (
        <Context3D.Provider value={{
            loader: webGLAvailable && isEnabled ? <Loader /> : null,
            changeCamera,
            currentCamera,
            disable3d,
        }}>
            {props.children}
            <canvas className="webgl" tabIndex={1} ref={canvasRef}/>
        </Context3D.Provider>
    );
};
