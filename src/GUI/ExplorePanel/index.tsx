import { useState, useEffect } from 'preact/hooks';
import { Config } from '../index';
import './index.scss';

type ExplorePanelProps = {
    onChangeScene: (key: string) => void,
    onChangeCamera: (key: string) => void,
    currentScene: string,
    currentCamera: string,
    titleMap: Config,
}

const ExplorePanel = (props: ExplorePanelProps) => {
    const {
        onChangeScene,
        onChangeCamera,
        currentScene,
        currentCamera,
        titleMap,
    } = props;
    const [showPanel, setShowPanel] = useState(false);
    const [showDescription, setShowDescription] = useState<string | null>(null);

    const handleScene = (e: any) => {
        const { key } = e.currentTarget.dataset;
        if (key && currentScene !== key) {
            setShowPanel(false);
            setShowDescription(null)
            onChangeScene(key);
        } else {
            onChangeCamera('base');
        }
    };

    const handleCamera = (e: any) => {
        e.stopPropagation();
        const { key } = e.currentTarget.dataset;
        if (key && currentCamera !== key) {
            setShowDescription(null)
            onChangeCamera(key);
        }
    };

    useEffect(() => {
        setShowDescription(titleMap[currentScene]?.sub[currentCamera]?.desc
        || titleMap[currentScene]?.desc);
    }, [currentScene, currentCamera]);

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
                <ul className="scenes">
                    {Object.keys(titleMap).map(key => (
                        <li key={key}>
                            <button
                                data-key={key}
                                type="button"
                                onPointerDown={handleScene}
                            >
                                {titleMap[key].name}
                            </button>
                            <ul className="cameras">
                                {currentScene === key && (
                                    Object.keys(titleMap[key]?.sub).map(key2 => (
                                        <li key={key2}>
                                            <button
                                                data-key={key2}
                                                type="button"
                                                onPointerDown={handleCamera}
                                            >
                                                - {titleMap[key]?.sub[key2].name}
                                            </button>
                                        </li>
                                    )
                                ))}
                            </ul>
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
                    {showDescription}
                </span>
            </div>
        </>
    );
};

export default ExplorePanel;