import React, {
    useState,
    useEffect,
    FC,
} from 'react';
import { useWindowSize } from '../hooks';
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
    const { size, remValue } = useWindowSize();
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
                style={{ top: size[1] - 4 * remValue }}
            >
                <div className="explore-separator" />
                <button type="button" onClick={() => setShowPanel(prev => !prev)}>
                    Explore more
                </button>
            </div>
            <div
                aria-label="Table of content"
                className="content"
                style={{ height: showPanel ? size[1] - 10.25 * remValue : 0 }}
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
            <div
                className="description"
                style={{
                    height: showDescription ? 'auto' : 0,
                    maxHeight: showDescription ? size[1] - 10.25 * remValue : 0
                }}
            >
                <span aria-label="Description">
                    {titleMap[currentScene].desc}
                </span>
            </div>
        </>
    );
};

export default ExplorePanel;