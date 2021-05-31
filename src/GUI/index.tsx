import { useState, useEffect } from 'preact/hooks';

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
        }
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

    useEffect(() => init(), []);

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