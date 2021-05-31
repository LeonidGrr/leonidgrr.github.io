import { useState, useEffect, useRef } from 'preact/hooks';

import Header from './Header';
import ExplorePanel from './ExplorePanel';
import Loader from './Loader';
import { init } from '../3D'
import './index.scss';

const changeScene = (key: string) => {};
const changeCamera = (key: string) => {};

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
            Hello! This is just a little personal page. Feel free to tap and click around.
        `,
        sub: {
            screen: {
                name: 'Screen',
                desc: 'screen',
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
};

export const GUI = ()  => {
    const handlersRef = useRef<any>(null);
    const [loaded, setLoaded] = useState(false);
    const [currentScene, setCurrentScene] = useState('desktop');
    const handleChangeScene = (key: string) => {
        if (key && currentScene !== key) {
            changeScene(key);
            setCurrentScene(key);
            setCurrentCamera('base');
        }
    };

    const [currentCamera, setCurrentCamera] = useState('base');
    const handleChangeCamera = (key: string) => {
        if (key && currentCamera !== key) {
            changeCamera(key);
            setCurrentCamera(key);
        }
    };

    useEffect(() => {
        const canvas: HTMLCanvasElement = document.querySelector('canvas.webgl')!;
        const context = canvas.getContext("webgl");
        if (!window.WebGLRenderingContext) {
            // the browser doesn't even know what WebGL is
            // const link = new Location;
            // link.href = "http://get.webgl.org";
            // window.location = link;
        } else if (!context) {
            // browser supports WebGL but initialization failed.
            // const link = new Location;
            // link.href = "http://get.webgl.org/troubleshooting";
            // window.location = link;
        } else {
            handlersRef.current = init(setCurrentCamera);
        }
    }, []);

    useEffect(() => {
        if (handlersRef.current) {
            const { changeScene } = handlersRef.current;
            changeScene(currentScene);
        }        
    }, [handlersRef.current, currentScene]);

    useEffect(() => {
        if (handlersRef.current) {
            const { changeCamera } = handlersRef.current;
            changeCamera(currentCamera);
        }        
    }, [handlersRef.current, currentCamera]);

    return (
        <>
            {loaded && (
                <>
                    <Header header={titleMap[currentScene].header} />
                    <ExplorePanel
                        currentScene={currentScene}
                        currentCamera={currentCamera}
                        onChangeScene={handleChangeScene}
                        onChangeCamera={handleChangeCamera}
                        titleMap={titleMap}
                    />
                </>
            )}
            
            <canvas className="webgl" tabIndex={1} />
            <Loader onLoad={() => setLoaded(true)} />
        </>
    );
};