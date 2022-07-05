import { useState, useEffect, useRef, useMemo } from 'preact/hooks';
import { createContext, FunctionComponent } from 'preact';
import { init } from '../3D'

export const Context3D = createContext({
    webGLAvailable: false,
    changeCamera: (key: string) => {},
    isEnabled: false,
    disable3d: () => console.log('disable'),
    currentCamera: 'base',
});

export const Context3DProvider: FunctionComponent = props => {
    const handlersRef = useRef<any>(null);

    const [isEnabled, setIsEnabled] = useState(true);
    const [currentCamera, setCameraDOM] = useState('base');

    const changeCamera = (key: string) => {
        if (key && currentCamera !== key) {
            setCameraDOM(key);
        }
    };

    const disable3d = () => setIsEnabled(false);

    useEffect(() => {
        if (isEnabled && !!window.WebGLRenderingContext) {
            const canvas = document.querySelector('canvas');
            const context = canvas?.getContext('webgl');
            if (context) {
                setTimeout(() => handlersRef.current = init(setCameraDOM), 2500);
            }
        }
    }, [isEnabled]);

    useEffect(() => {
        if (handlersRef.current) {
            const { setCameraWebGL } = handlersRef.current;
            setCameraWebGL(currentCamera);
        }        
    }, [currentCamera]);

    return (
        <Context3D.Provider value={{
            webGLAvailable: !!window.WebGLRenderingContext,
            changeCamera,
            isEnabled,
            currentCamera,
            disable3d,
        }}>
            {props.children}
        </Context3D.Provider>
    );
};
