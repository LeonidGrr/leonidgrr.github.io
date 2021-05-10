import React, { useContext, useState, FC } from 'react';
import { GUIcontext } from '..';
import { useWindowSize } from '../hooks';
import './index.scss';

const ExplorePanel: FC = () => {
    const {
        onChangeScene,
    } = useContext(GUIcontext);
    const { size, remValue } = useWindowSize();
    const [showPanel, setShowPanel] = useState(false);
    const [currentScene, setCurrentScene] = useState('desktop')

    const handleClick = (e: React.PointerEvent<HTMLButtonElement>) => {
        const { key } = e.currentTarget.dataset;
        if (key && currentScene !== key) {
            onChangeScene(key);
            setCurrentScene(key);
        }
    };

    return (
        <>
            <div
                className="explore"
                style={{
                    top: remValue * 5,
                    left: size[0] / 2,
                }}
            >
                <button type="button" onClick={() => setShowPanel(prev => !prev)}>
                    Explore
                </button>
            </div>
            <div
                className="panel"
                style={{
                    left: size[0] / 2,
                    height: showPanel ? size[1] - remValue * 9 : 0,
                }}
            >
                <ul>
                    <li>
                        <button
                            data-key="desktop"
                            type="button"
                            onPointerDown={handleClick}
                        >
                            My dev lair
                        </button>
                    </li>
                    <li>
                        <button
                            data-key="drillrig"
                            type="button"
                            onPointerDown={handleClick}
                        >
                            Before software development!
                        </button>
                    </li>
                    <li>
                        <button
                            data-key="saturn"
                            type="button"
                            onPointerDown={handleClick}
                        >
                            SATURN / SPPR projects
                        </button>
                    </li>
                    <li>
                        <button
                            data-key="now"
                            type="button"
                            onPointerDown={handleClick}
                        >
                            Currently
                        </button>
                    </li>
                    <li className="links">
                        <a href="https://github.com/LeonidGrr/leonidgrr.github.io">
                            GitHub
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default ExplorePanel;