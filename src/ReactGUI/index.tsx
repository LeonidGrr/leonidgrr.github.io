import React, { FC, useState } from 'react';
import Header from './Header';
// import Navigation from './Navigation';
 
export const GUIcontext: any = React.createContext({});
const langKeyMap = {
    header: {
        lair: {
            ru: 'my dev lair',
            en: 'my dev lair',
        },
        name: {
            ru: 'Леонид Гребенщиков',
            en: 'Leonid Grebenschikov',
        },
    },
};

export const ReactGUI: FC = () => {
    const [lang, setLang] = useState('en');

    return (
        <React.StrictMode>
            <GUIcontext.Provider value={{ langKeyMap, lang }}>
            <Header />
            {/* <div className="main">
                <Navigation />
            </div> */}
            </GUIcontext.Provider>
        </React.StrictMode>
    );
};