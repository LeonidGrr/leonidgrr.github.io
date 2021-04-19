import React, { useContext, FC } from 'react';
import { GUIcontext } from '..';
import './index.scss';

const Header: FC = () => {
    const { langKeyMap, lang } = useContext(GUIcontext);

    return (
        <header>
            {langKeyMap.header.name[lang]}
        </header>
    );
};

export default Header;