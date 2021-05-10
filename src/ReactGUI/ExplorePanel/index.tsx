import React, { useContext, useState, FC } from 'react';
import { useWindowSize } from '../hooks';
import { GUIcontext } from '..';
import './index.scss';

const ExplorePanel: FC = () => {
    const { langKeyMap, lang } = useContext(GUIcontext);
    const { size, remValue } = useWindowSize();
    const [showPanel, setShowPanel] = useState(false);

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
                        <button type="button">
                            ///
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default ExplorePanel;