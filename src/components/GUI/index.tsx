import { useState, useEffect, useRef } from 'preact/hooks';
import Header from '../HeaderOld';
import Explore from '../Explore';
import Loader from '../Loader';
import NoWebGL from '../NoWebGL';
import { init } from '../3D'

export type Config = {
    name: string,
    header: string,
    desc: string,
    sub: {[key: string]: {
        name: string,
        desc: string,
    }},
};

const titleMap: Config = {
    name: 'My dev lair',
    header: 'my dev lair',
    desc: `Hello! My name is Leonid. I am just humble programmer trying to learn something in a spare time.\n This is little demo page. Feel free to tap and click around. `,
    sub: {
        screen: {
            name: 'Screen',
            desc: 'For now this is just an example of THREEJS render target...',
        },
    },
};

export const GUI = ()  => {
    const handlersRef = useRef<any>(null);
    const [webGLAvailible, setWebGLAvailible] = useState(true);

    const [currentCamera, setCameraDOM] = useState('base');
    const handleChangeCamera = (key: string) => {
        if (key && currentCamera !== key) {
            setCameraDOM(key);
        }
    };

    useEffect(() => {
        const canvas: HTMLCanvasElement = document.querySelector('canvas')!;
        const context = canvas.getContext("webgl");
        if (!window.WebGLRenderingContext) {
            setWebGLAvailible(false);
        } else if (!context) {
            setWebGLAvailible(false);
        } else {
            setTimeout(() => handlersRef.current = init(setCameraDOM), 1500);
        }
    }, []);

    useEffect(() => {
        if (handlersRef.current) {
            const { setCameraWebGL } = handlersRef.current;
            setCameraWebGL(currentCamera);
        }        
    }, [handlersRef.current, currentCamera]);

    return (
        <>
            <Header header={titleMap.header} />
            <Explore
                currentCamera={currentCamera}
                onChangeCamera={handleChangeCamera}
                titleMap={titleMap}
            />
            {webGLAvailible
                ? (
                    <>    
                        <canvas className="webgl" tabIndex={1} />
                        <Loader />
                    </>
                )
                : <NoWebGL />
            }
        </>
    );
};