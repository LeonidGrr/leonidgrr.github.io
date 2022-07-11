import { useState, useEffect, useRef, useMemo } from 'preact/hooks';
import { createContext, FunctionComponent } from 'preact';
import { init } from '../3D'
import Loader from '../Loader';
import { route } from 'preact-router';
import { CameraState } from '../3D/components/CameraManager';

type Context3dProps = {
    loader: preact.JSX.Element | null,
    changeCamera: (key: CameraState) => void,
    disable3d: () => void,
    currentCamera: CameraState,
};

export const Context3D = createContext<Context3dProps>({
    loader: null,
    changeCamera: (key: CameraState) => {},
    disable3d: () => {},
    currentCamera: CameraState.BASE,
});

export const Context3DProvider: FunctionComponent = props => {
    const handlersRef = useRef<any>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isEnabled, setIsEnabled] = useState(true);
    const [currentCamera, setCameraDOM] = useState(CameraState.BASE);

    const changeCamera = (key: CameraState) => {
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
