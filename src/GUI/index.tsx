import { useState, useEffect, useRef } from 'preact/hooks';

import Header from './Header';
import Explore from './Explore';
import Loader from './Loader';
import NoWebGL from './NoWebGL';
import { init } from '../3D'
import './index.scss';

export type Config = {[key: string]: {
    name: string,
    header: string,
    desc: string,
    sub: {[key: string]: {
        name: string,
        desc: string,
    }},
}};

const titleMap: Config = {
    desktop: {
        name: 'My dev lair',
        header: 'my dev lair',
        desc: `
            Hello! Nice to see your here! This is just a little personal page. Feel free to tap and click around.
        `,
        sub: {
            screen: {
                name: 'Screen',
                desc: 'For now this is just an example of THREEJS render target...',
            },
        },
    },
    drillrig: {
        name: 'Some day i will finish this page...',
        header: 'Work in progress',
        desc: `
            Some day i will finish this page...
        `,
        sub: {},
    },
    // drillrig: {
    //     name: 'Before software development!',
    //     header: 'Drilling',
    //     desc: `
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Dui ut ornare lectus sit amet est placerat in. Euismod in pellentesque massa placerat duis. Amet mauris commodo quis imperdiet. Commodo nulla facilisi nullam vehicula ipsum. Velit ut tortor pretium viverra suspendisse. Mi tempus imperdiet nulla malesuada pellentesque. A diam maecenas sed enim ut sem viverra aliquet. Nunc mi ipsum faucibus vitae aliquet nec. Vulputate odio ut enim blandit. Dui faucibus in ornare quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing.
    //     `,
    // },
    // saturn: {
    //     name: 'SATURN / SPPR projects',
    //     header: 'SATURN',
    //     desc: `
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Dui ut ornare lectus sit amet est placerat in. Euismod in pellentesque massa placerat duis. Amet mauris commodo quis imperdiet. Commodo nulla facilisi nullam vehicula ipsum. Velit ut tortor pretium viverra suspendisse. Mi tempus imperdiet nulla malesuada pellentesque. A diam maecenas sed enim ut sem viverra aliquet. Nunc mi ipsum faucibus vitae aliquet nec. Vulputate odio ut enim blandit. Dui faucibus in ornare quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing.
    //     `,
    // },
    // now: {
    //     name: 'Now',
    //     header: 'Now',
    //     desc: `
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Dui ut ornare lectus sit amet est placerat in. Euismod in pellentesque massa placerat duis. Amet mauris commodo quis imperdiet. Commodo nulla facilisi nullam vehicula ipsum. Velit ut tortor pretium viverra suspendisse. Mi tempus imperdiet nulla malesuada pellentesque. A diam maecenas sed enim ut sem viverra aliquet. Nunc mi ipsum faucibus vitae aliquet nec. Vulputate odio ut enim blandit. Dui faucibus in ornare quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing.
    //     `,
    // },
    about: {
        name: 'About',
        header: 'About',
        desc: `
            My name is Leonid Grebenschikov, I am a just humble programmer. Trying to learn something in a spare time.
        `,
        sub: {},
    },
};

export const GUI = ()  => {
    const handlersRef = useRef<any>(null);
    const [loaded, setLoaded] = useState(false);
    const [currentScene, setCurrentScene] = useState('desktop');
    const [webGLAvailible, setWebGLAvailible] = useState(true);
    const handleChangeScene = (key: string) => {
        if (key && currentScene !== key) {
            setCurrentScene(key);
            setCameraDOM('base');
        }
    };

    const [currentCamera, setCameraDOM] = useState('base');
    const handleChangeCamera = (key: string) => {
        if (key && currentCamera !== key) {
            setCameraDOM(key);
        }
    };

    useEffect(() => {
        const canvas: HTMLCanvasElement = document.querySelector('canvas.webgl')!;
        const context = canvas.getContext("webgl");
        if (!window.WebGLRenderingContext) {
            setWebGLAvailible(false);
            setLoaded(true);
        } else if (!context) {
            setWebGLAvailible(false);
            setLoaded(true);
        } else {
            handlersRef.current = init(setCameraDOM);
        }
    }, []);

    useEffect(() => {
        if (handlersRef.current) {
            const { setSceneWebGL } = handlersRef.current;
            setSceneWebGL(currentScene);
        }        
    }, [handlersRef.current, currentScene]);

    useEffect(() => {
        if (handlersRef.current) {
            const { setCameraWebGL } = handlersRef.current;
            setCameraWebGL(currentCamera);
        }        
    }, [handlersRef.current, currentCamera]);

    return (
        <>
            {loaded && (
                <>
                    <Header header={titleMap[currentScene].header} />
                    <Explore
                        currentScene={currentScene}
                        currentCamera={currentCamera}
                        onChangeScene={handleChangeScene}
                        onChangeCamera={handleChangeCamera}
                        titleMap={titleMap}
                    />
                </>
            )}
            {webGLAvailible
                ? (
                    <>    
                        <canvas className="webgl" tabIndex={1} />
                        <Loader onLoad={() => setLoaded(true)} />
                    </>
                )
                : <NoWebGL />
            }
        </>
    );
};