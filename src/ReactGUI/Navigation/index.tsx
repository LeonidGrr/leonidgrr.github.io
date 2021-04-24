import React, { useContext, useState } from 'react';
import { GUIcontext } from '..';

import './index.scss';

const Navigation = () => {
    const { langKeyMap, lang } = useContext(GUIcontext);
    const [show, setShow] = useState<{[key: string]: boolean}>({
        experience: false,
    });

    const handleShow = (e: React.MouseEvent<HTMLElement>) => {
        const type = e.currentTarget.getAttribute('data-type');
        if (type) {
            setShow(prev => ({
                ...prev,
                [type]: !prev[type],
            }));
        }
    };

    return (
        <div className="navigation">
            <div>
                <button
                    type="button"
                    className="navigation-button"
                    onClick={handleShow}
                    data-type="experience"
                >
                    {langKeyMap.navigation.experience[lang]}
                </button>
                {show.experience && (
                    <ul>
                        <li>
                            <button type="button">
                                {langKeyMap.navigation.before[lang]}
                            </button>
                        </li>
                        <li>
                            <button type="button">
                                {langKeyMap.navigation.sibintek[lang]}                      
                            </button>
                        </li>
                        <li>
                            <button type="button">
                                {langKeyMap.navigation.ase[lang]}
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </div>

    );
};

export default Navigation;