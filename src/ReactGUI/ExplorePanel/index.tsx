import React, {
    useState,
    useEffect,
    FC,
} from 'react';
import './index.scss';

type ExplorePanelProps = {
    onChangeScene: (key: string) => void,
    currentScene: string,
    titleMap: {[key: string]: { name: string, desc: string }}
}

const ExplorePanel: FC<ExplorePanelProps> = props => {
    const {
        onChangeScene,
        currentScene,
        titleMap,
    } = props;
    const [showPanel, setShowPanel] = useState(false);
    const [showDescription, setShowDescription] = useState<string | null>(null);

    const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
        const { key } = e.currentTarget.dataset;
        if (key && currentScene !== key) {
            setShowPanel(false);
            setShowDescription(null)
            onChangeScene(key);
        }
    };

    useEffect(() => setShowDescription(currentScene), [currentScene]);

    return (
        <>
            <div
                aria-label="Explore more"
                className="explore"
            >
                <div className="explore-separator" />
                <button type="button" onClick={() => setShowPanel(prev => !prev)}>
                    Explore more
                </button>
            </div>
            <div
                aria-label="Table of content"
                className={`content ${showPanel ? 'content--show' : ''}`}
            >
                <ul>
                    {Object.keys(titleMap).map(key => (
                        <li key={key}>
                            <button
                                data-key={key}
                                type="button"
                                onPointerDown={handlePointerDown}
                            >
                                {titleMap[key].name}
                            </button>
                        </li>
                    ))}
                    <li className="links">
                        <a href="https://github.com/LeonidGrr/leonidgrr.github.io">
                            GitHub
                        </a>
                    </li>
                </ul>
            </div>
            <div className={`description ${showDescription ? 'description--show' : ''}`}>
                <span aria-label="Description">
                    {titleMap[currentScene].desc}
                </span>
            </div>
        </>
    );
};

export default ExplorePanel;