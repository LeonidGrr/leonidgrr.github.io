import React, { FC } from 'react';
import './index.scss';

type HeaderProps = {
    header: string,
};

const Header: FC<HeaderProps> = props => {
    const { header } = props;
    return (
        <header>
            <h1>{header}</h1>
        </header>
    );
};

export default Header;