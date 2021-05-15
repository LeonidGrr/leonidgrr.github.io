import React, {
    FC,
    useContext,
    useState,
    useEffect,
} from 'react';
import Header from './Header';
import ExplorePanel from './ExplorePanel';
import './index.scss';

type ReactGUIProps = {
    onChangeScene: (sceneName: string) => void,
};

const titleMap: {[key: string]: { name: string, header: string, desc: string }} = {
    desktop: {
        name: 'My dev lair',
        header: 'my dev lair',
        desc: `
            Hello! This is just a little personal page. Feel free to hover and click around.
        `,
    },
    drillrig: {
        name: 'Before software development!',
        header: 'Drilling',
        desc: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Dui ut ornare lectus sit amet est placerat in. Euismod in pellentesque massa placerat duis. Amet mauris commodo quis imperdiet. Commodo nulla facilisi nullam vehicula ipsum. Velit ut tortor pretium viverra suspendisse. Mi tempus imperdiet nulla malesuada pellentesque. A diam maecenas sed enim ut sem viverra aliquet. Nunc mi ipsum faucibus vitae aliquet nec. Vulputate odio ut enim blandit. Dui faucibus in ornare quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing.
            Et tortor consequat id porta nibh venenatis cras sed felis. Netus et malesuada fames ac turpis egestas sed tempus. Malesuada pellentesque elit eget gravida cum. Erat nam at lectus urna duis. Leo vel fringilla est ullamcorper eget nulla facilisi etiam. Aliquet enim tortor at auctor urna nunc id. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Accumsan lacus vel facilisis volutpat. Cras semper auctor neque vitae tempus quam pellentesque. Sit amet commodo nulla facilisi. Ac tincidunt vitae semper quis lectus nulla at. Turpis egestas maecenas pharetra convallis. Pellentesque habitant morbi tristique senectus. Adipiscing diam donec adipiscing tristique risus nec. At volutpat diam ut venenatis tellus in metus vulputate eu. Non odio euismod lacinia at quis risus. Dignissim sodales ut eu sem integer vitae justo. Nisl rhoncus mattis rhoncus urna neque viverra. Donec ultrices tincidunt arcu non sodales neque. Feugiat pretium nibh ipsum consequat nisl vel.
        `,
    },
    saturn: {
        name: 'SATURN / SPPR projects',
        header: 'SATURN',
        desc: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Dui ut ornare lectus sit amet est placerat in. Euismod in pellentesque massa placerat duis. Amet mauris commodo quis imperdiet. Commodo nulla facilisi nullam vehicula ipsum. Velit ut tortor pretium viverra suspendisse. Mi tempus imperdiet nulla malesuada pellentesque. A diam maecenas sed enim ut sem viverra aliquet. Nunc mi ipsum faucibus vitae aliquet nec. Vulputate odio ut enim blandit. Dui faucibus in ornare quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing.
            Et tortor consequat id porta nibh venenatis cras sed felis. Netus et malesuada fames ac turpis egestas sed tempus. Malesuada pellentesque elit eget gravida cum. Erat nam at lectus urna duis. Leo vel fringilla est ullamcorper eget nulla facilisi etiam. Aliquet enim tortor at auctor urna nunc id. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Accumsan lacus vel facilisis volutpat. Cras semper auctor neque vitae tempus quam pellentesque. Sit amet commodo nulla facilisi. Ac tincidunt vitae semper quis lectus nulla at. Turpis egestas maecenas pharetra convallis. Pellentesque habitant morbi tristique senectus. Adipiscing diam donec adipiscing tristique risus nec. At volutpat diam ut venenatis tellus in metus vulputate eu. Non odio euismod lacinia at quis risus. Dignissim sodales ut eu sem integer vitae justo. Nisl rhoncus mattis rhoncus urna neque viverra. Donec ultrices tincidunt arcu non sodales neque. Feugiat pretium nibh ipsum consequat nisl vel.
        `,
    },
    now: {
        name: 'Currently',
        header: 'Currently',
        desc: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Dui ut ornare lectus sit amet est placerat in. Euismod in pellentesque massa placerat duis. Amet mauris commodo quis imperdiet. Commodo nulla facilisi nullam vehicula ipsum. Velit ut tortor pretium viverra suspendisse. Mi tempus imperdiet nulla malesuada pellentesque. A diam maecenas sed enim ut sem viverra aliquet. Nunc mi ipsum faucibus vitae aliquet nec. Vulputate odio ut enim blandit. Dui faucibus in ornare quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing.
            Et tortor consequat id porta nibh venenatis cras sed felis. Netus et malesuada fames ac turpis egestas sed tempus. Malesuada pellentesque elit eget gravida cum. Erat nam at lectus urna duis. Leo vel fringilla est ullamcorper eget nulla facilisi etiam. Aliquet enim tortor at auctor urna nunc id. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Accumsan lacus vel facilisis volutpat. Cras semper auctor neque vitae tempus quam pellentesque. Sit amet commodo nulla facilisi. Ac tincidunt vitae semper quis lectus nulla at. Turpis egestas maecenas pharetra convallis. Pellentesque habitant morbi tristique senectus. Adipiscing diam donec adipiscing tristique risus nec. At volutpat diam ut venenatis tellus in metus vulputate eu. Non odio euismod lacinia at quis risus. Dignissim sodales ut eu sem integer vitae justo. Nisl rhoncus mattis rhoncus urna neque viverra. Donec ultrices tincidunt arcu non sodales neque. Feugiat pretium nibh ipsum consequat nisl vel.
        `,
    },
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
            {/* <ExplorePanel
                currentScene={currentScene}
                onChangeScene={handleChangeScene}
                titleMap={titleMap}
            /> */}
        </React.StrictMode>
    );
};