import React, {
    useContext,
    useState,
    useEffect,
    FC,
} from 'react';
import { GUIcontext } from '..';
import { useWindowSize } from '../hooks';
import './index.scss';

const titleMap: {[key: string]: { name: string, desc: string }} = {
    desktop: {
        name: 'My dev lair',
        desc: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Dui ut ornare lectus sit amet est placerat in. Euismod in pellentesque massa placerat duis. Amet mauris commodo quis imperdiet. Commodo nulla facilisi nullam vehicula ipsum. Velit ut tortor pretium viverra suspendisse. Mi tempus imperdiet nulla malesuada pellentesque. A diam maecenas sed enim ut sem viverra aliquet. Nunc mi ipsum faucibus vitae aliquet nec. Vulputate odio ut enim blandit. Dui faucibus in ornare quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing.
            Et tortor consequat id porta nibh venenatis cras sed felis. Netus et malesuada fames ac turpis egestas sed tempus. Malesuada pellentesque elit eget gravida cum. Erat nam at lectus urna duis. Leo vel fringilla est ullamcorper eget nulla facilisi etiam. Aliquet enim tortor at auctor urna nunc id. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Accumsan lacus vel facilisis volutpat. Cras semper auctor neque vitae tempus quam pellentesque. Sit amet commodo nulla facilisi. Ac tincidunt vitae semper quis lectus nulla at. Turpis egestas maecenas pharetra convallis. Pellentesque habitant morbi tristique senectus. Adipiscing diam donec adipiscing tristique risus nec. At volutpat diam ut venenatis tellus in metus vulputate eu. Non odio euismod lacinia at quis risus. Dignissim sodales ut eu sem integer vitae justo. Nisl rhoncus mattis rhoncus urna neque viverra. Donec ultrices tincidunt arcu non sodales neque. Feugiat pretium nibh ipsum consequat nisl vel.
        `,
    },
    drillrig: {
        name: 'Before software development!',
        desc: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Dui ut ornare lectus sit amet est placerat in. Euismod in pellentesque massa placerat duis. Amet mauris commodo quis imperdiet. Commodo nulla facilisi nullam vehicula ipsum. Velit ut tortor pretium viverra suspendisse. Mi tempus imperdiet nulla malesuada pellentesque. A diam maecenas sed enim ut sem viverra aliquet. Nunc mi ipsum faucibus vitae aliquet nec. Vulputate odio ut enim blandit. Dui faucibus in ornare quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing.
            Et tortor consequat id porta nibh venenatis cras sed felis. Netus et malesuada fames ac turpis egestas sed tempus. Malesuada pellentesque elit eget gravida cum. Erat nam at lectus urna duis. Leo vel fringilla est ullamcorper eget nulla facilisi etiam. Aliquet enim tortor at auctor urna nunc id. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Accumsan lacus vel facilisis volutpat. Cras semper auctor neque vitae tempus quam pellentesque. Sit amet commodo nulla facilisi. Ac tincidunt vitae semper quis lectus nulla at. Turpis egestas maecenas pharetra convallis. Pellentesque habitant morbi tristique senectus. Adipiscing diam donec adipiscing tristique risus nec. At volutpat diam ut venenatis tellus in metus vulputate eu. Non odio euismod lacinia at quis risus. Dignissim sodales ut eu sem integer vitae justo. Nisl rhoncus mattis rhoncus urna neque viverra. Donec ultrices tincidunt arcu non sodales neque. Feugiat pretium nibh ipsum consequat nisl vel.
        `,
    },
    saturn: {
        name: 'SATURN / SPPR projects',
        desc: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Dui ut ornare lectus sit amet est placerat in. Euismod in pellentesque massa placerat duis. Amet mauris commodo quis imperdiet. Commodo nulla facilisi nullam vehicula ipsum. Velit ut tortor pretium viverra suspendisse. Mi tempus imperdiet nulla malesuada pellentesque. A diam maecenas sed enim ut sem viverra aliquet. Nunc mi ipsum faucibus vitae aliquet nec. Vulputate odio ut enim blandit. Dui faucibus in ornare quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing.
            Et tortor consequat id porta nibh venenatis cras sed felis. Netus et malesuada fames ac turpis egestas sed tempus. Malesuada pellentesque elit eget gravida cum. Erat nam at lectus urna duis. Leo vel fringilla est ullamcorper eget nulla facilisi etiam. Aliquet enim tortor at auctor urna nunc id. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Accumsan lacus vel facilisis volutpat. Cras semper auctor neque vitae tempus quam pellentesque. Sit amet commodo nulla facilisi. Ac tincidunt vitae semper quis lectus nulla at. Turpis egestas maecenas pharetra convallis. Pellentesque habitant morbi tristique senectus. Adipiscing diam donec adipiscing tristique risus nec. At volutpat diam ut venenatis tellus in metus vulputate eu. Non odio euismod lacinia at quis risus. Dignissim sodales ut eu sem integer vitae justo. Nisl rhoncus mattis rhoncus urna neque viverra. Donec ultrices tincidunt arcu non sodales neque. Feugiat pretium nibh ipsum consequat nisl vel.
        `,
    },
    now: {
        name: 'Currently',
        desc: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing. Dui ut ornare lectus sit amet est placerat in. Euismod in pellentesque massa placerat duis. Amet mauris commodo quis imperdiet. Commodo nulla facilisi nullam vehicula ipsum. Velit ut tortor pretium viverra suspendisse. Mi tempus imperdiet nulla malesuada pellentesque. A diam maecenas sed enim ut sem viverra aliquet. Nunc mi ipsum faucibus vitae aliquet nec. Vulputate odio ut enim blandit. Dui faucibus in ornare quam. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing.
            Et tortor consequat id porta nibh venenatis cras sed felis. Netus et malesuada fames ac turpis egestas sed tempus. Malesuada pellentesque elit eget gravida cum. Erat nam at lectus urna duis. Leo vel fringilla est ullamcorper eget nulla facilisi etiam. Aliquet enim tortor at auctor urna nunc id. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Accumsan lacus vel facilisis volutpat. Cras semper auctor neque vitae tempus quam pellentesque. Sit amet commodo nulla facilisi. Ac tincidunt vitae semper quis lectus nulla at. Turpis egestas maecenas pharetra convallis. Pellentesque habitant morbi tristique senectus. Adipiscing diam donec adipiscing tristique risus nec. At volutpat diam ut venenatis tellus in metus vulputate eu. Non odio euismod lacinia at quis risus. Dignissim sodales ut eu sem integer vitae justo. Nisl rhoncus mattis rhoncus urna neque viverra. Donec ultrices tincidunt arcu non sodales neque. Feugiat pretium nibh ipsum consequat nisl vel.
        `,
    },
};

const ExplorePanel: FC = () => {
    const {
        onChangeScene,
    } = useContext(GUIcontext);
    const { size, remValue } = useWindowSize();
    const [showPanel, setShowPanel] = useState(false);
    const [showDescription, setShowDescription] = useState<string | null>(null);
    const [currentScene, setCurrentScene] = useState('desktop');

    const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
        const { key } = e.currentTarget.dataset;
        if (key && currentScene !== key) {
            onChangeScene(key);
            setCurrentScene(key);
            setShowPanel(false);
        }
    };

    useEffect(() => {
        setShowDescription(currentScene);
    }, [currentScene]);

    return (
        <>
            <div
                aria-label="Explore more"
                className="explore"
                style={{ top: size[1] - 4 * remValue }}
            >
                <div className="explore-separator" />
                <button type="button" onClick={() => setShowPanel(prev => !prev)}>
                    Explore more
                </button>
            </div>
            <div
                aria-label="Table of content"
                className="content"
                style={{ height: showPanel ? size[1] - 10 * remValue : 0 }}
            >
                <ul>
                    {Object.keys(titleMap).map(key => (
                        <li key={key}>
                            <button
                                data-key={key}
                                type="button"
                                onPointerDown={handlePointerDown}
                            >
                                {titleMap[key].name}
                            </button>
                        </li>
                    ))}
                    <li className="links">
                        <a href="https://github.com/LeonidGrr/leonidgrr.github.io">
                            GitHub
                        </a>
                    </li>
                </ul>
            </div>
            <div
                className="description"
                style={{
                    // top: size[1] - remValue * 10,
                    top: remValue,
                    height: showDescription ? 'auto' : 0,
                }}
            >
                <span aria-label="Description">
                    {titleMap[currentScene].desc}
                </span>
            </div>
        </>
    );
};

export default ExplorePanel;