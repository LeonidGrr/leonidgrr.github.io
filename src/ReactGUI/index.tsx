import React, { FC, useState } from 'react';
import Header from './Header';
import Navigation from './Navigation';
 
export const GUIcontext: any = React.createContext({});
const langKeyMap = {
    header: {
        name: {
            ru: 'Леонид Гребенщиков',
            en: 'Leonid Grebenschikov',
        },
    },
    navigation: {
        experience: {
            ru: 'Путь',
            en: 'Path',
        },
        before: {
            ru: 'Полевой инженер - Baker Hughes',
            en: 'Before sofware development',
        },
        sibintek: {
            ru: 'Разработчик - Сибинтек Софт',
            en: 'Frontend Dev - SibintekSoft',
        },
        ase: {
            ru: 'Разработчик - АСЭ',
            en: 'Frontend Dev - ASE',
        },
    }
};

export const ReactGUI: FC = () => {
    const [lang, setLang] = useState('en');

    return (
        <React.StrictMode>
            <GUIcontext.Provider value={{ langKeyMap, lang }}>
            <Header />
            <div className="main">
                <Navigation />
            </div>
            </GUIcontext.Provider>
        </React.StrictMode>
    );
};