import {
    useState,
    useEffect,
    useRef,
} from 'preact/hooks';
import { Config } from '../index';
import './index.scss';

type ExplorePanelProps = {
    onChangeCamera: (key: string) => void,
    currentCamera: string,
    titleMap: Config,
}

const Explore = (props: ExplorePanelProps) => {
    const {
        onChangeCamera,
        currentCamera,
        titleMap,
    } = props;
    const [showContent, setShowContent] = useState(false);
    const [showDescription, setShowDescription] = useState<string | null>(null);

    const contentRef = useRef<null | HTMLDivElement>(null);
    const isSmallScreen = () => {
        if (contentRef.current) {
            return contentRef.current.offsetWidth >= document.body.clientWidth / 2;
        }
        return false;
    };

    const handleCamera = (e: any) => {
        e.stopPropagation();
        const { key } = e.currentTarget.dataset;
        if (key && currentCamera !== key) {
            onChangeCamera(key);
            if (isSmallScreen()) {
                setShowContent(false);
            }
        }
    };

    const handleShowContent = (e: any) => {
        e.stopPropagation();
        setShowContent(prev => !prev);
    };

    useEffect(() => {
        setShowDescription(titleMap?.sub[currentCamera]?.desc
        || titleMap?.desc);
    }, [currentCamera]);

    return (
        <>
            <div
                aria-label="Explore more"
                className="explore"
            >
                <div className="explore-separator" />
                <button type="button" onClick={handleShowContent}>
                    Explore more
                </button>
            </div>
            {/* <div
                aria-label="Table of content"
                ref={contentRef}
                className={`content ${showContent ? 'content--show' : ''}`}
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
            </div> */}
            <div className={`description ${showDescription ? 'description--show' : ''}`}>
                <span aria-label="Description">
                    {showDescription}
                </span>
            </div>
        </>
    );
};

export default Explore;