import React, { FC } from 'react';
import Header from './Header';
import ExplorePanel from './ExplorePanel';
import './index.scss';

type ReactGUIProps = {
    onChangeScene: (sceneName: string) => void,
};

export const GUIcontext: any = React.createContext({});

export const ReactGUI: FC<ReactGUIProps> = props => {
    return (
        <React.StrictMode>
            <GUIcontext.Provider value={{ ...props }}>
                <Header />
                <ExplorePanel />
            </GUIcontext.Provider>
        </React.StrictMode>
    );
};