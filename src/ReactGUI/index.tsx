import React, {
    FC,
    useContext,
    useState,
    useEffect,
} from 'react';
import Header from './Header';
import ExplorePanel from './ExplorePanel';

type ReactGUIProps = {
    onChangeScene: (sceneName: string) => void,
};

const titleMap: {[key: string]: { name: string, header: string, desc: string }} = {
    desktop: {
        name: 'My dev lair',
        header: 'my dev lair',
        desc: `
            Hello! This is just a little personal page. Feel free to tap and click around.
        `,
    },
    drillrig: {
        name: 'Some day i will finish this page...',
        header: 'Some day i will finish this page...',
        desc: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Dui ut ornare lectus sit amet est placerat in. Euismod in pellentesque massa placerat duis. Amet mauris commodo quis imperdiet. Commodo nulla facilisi nullam vehicula ipsum. Velit ut tortor pretium viverra suspendisse. Mi tempus imperdiet nulla malesuada pellentesque. A diam maecenas sed enim ut sem viverra aliquet. Nunc mi ipsum faucibus vitae aliquet nec. Vulputate odio ut enim blandit. Dui faucibus in ornare quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing.
        `,
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

export const ReactGUI: FC<ReactGUIProps> = props => {
    const {
        onChangeScene,
    } = props;

    const [currentScene, setCurrentScene] = useState('desktop');
    const handleChangeScene = (key: string) => {
        if (key && currentScene !== key) {
            onChangeScene(key);
            setCurrentScene(key);
        }
    };

    return (
        <React.StrictMode>
            <Header header={titleMap[currentScene].header} />
            <ExplorePanel
                currentScene={currentScene}
                onChangeScene={handleChangeScene}
                titleMap={titleMap}
            />
        </React.StrictMode>
    );
};