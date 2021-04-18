import React, { FC } from 'react';
import Header from './Header';
import Navigation from './Navigation';
 
export const GUIcontext = React.createContext({});
export const ReactGUI: FC = props => {
    return (
        <React.StrictMode>
            <GUIcontext.Provider value={{ ...props }}>
            <Header />
            <div className="main">
                <Navigation />
                <div className="terminal">
                    
                </div>
            </div>
            </GUIcontext.Provider>
        </React.StrictMode>
    );
};