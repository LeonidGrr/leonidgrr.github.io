import React, { useContext, FC } from 'react';
import { GUIcontext } from '..';
import './index.scss';

const Header: FC = () => {
    const { langKeyMap, lang } = useContext(GUIcontext);

    return (
        <header>
            <h1>{langKeyMap.header.lair[lang]}</h1>
        </header>
    );
};

export default Header;