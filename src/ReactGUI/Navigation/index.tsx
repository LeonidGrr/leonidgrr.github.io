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
                    mn,h
                </button>
                {show.experience && (
                    <ul>
                        <li>
                            <button type="button">
                                ///
                            </button>
                        </li>
                        
                    </ul>
                )}
            </div>
        </div>

    );
};

export default Navigation;