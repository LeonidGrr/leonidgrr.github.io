import {
    useState,
    useEffect,
    useRef,
    useCallback,
} from 'preact/hooks';
import classNames from 'classnames';
import css from './Explore.module.css';
import { Config } from 'src/routes/home';

type ExplorePanelProps = {
    titleMap: Config,
}

const Explore = (props: ExplorePanelProps) => {
    const {
        titleMap,
    } = props;
    const [showContent, setShowContent] = useState(false);
    const [showDescription, setShowDescription] = useState<string | null>(titleMap.sub.about.desc);

    useEffect(() => {
        const updateState = (m: MessageEvent<string>) => {
            let data = m.data.split(':');
            if (data[0] === 'change_camera_from_webgl') {
                setShowDescription(titleMap.sub[data[1]]?.desc);
            }
        };
    
        window.addEventListener('message', updateState);

        return () => {
            window.removeEventListener('message', updateState);
        };
    }, []);

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
        if (key && showDescription !== key) {
            postMessage(`change_camera_from_dom:${key}`);
            setShowDescription(titleMap.sub[key]?.desc);
            if (isSmallScreen()) {
                setShowContent(false);
            }
        }
    };

    const handleShowContent = (e: Event) => {
        setShowContent(prev => !prev);
    };

    const handleDebug = () => {};

    const handleHideDescription = useCallback((e: Event) => {
        setShowDescription(null);
    }, []);

    return (
        <>
            <div
                aria-label="Explore more"
                className={css.explore}
            >
                <div className={css['explore-separator']} />
                <button type="button" onClick={handleShowContent}>
                    Explore
                </button>
            </div>
            <div
                aria-label="Table of content"
                ref={contentRef}
                className={classNames(css.content, showContent && css.contentShow)}
            >
                <ul className={css.scenes}>
                    {Object.keys(titleMap.sub).map((key: string) => (
                        <li key={key}>
                            <button
                                data-key={key}
                                type="button"
                                onPointerDown={handleCamera}
                            >
                                {titleMap.sub[key].name}
                            </button>
                        </li>
                    ))}
                    
                    <li className={css.links}>
                        <button
                            type="button"
                            onPointerDown={handleDebug}
                        >
                            Debug
                        </button>
                    </li>

                    <li className={css.links}>
                        <a href="https://github.com/LeonidGrr/leonidgrr.github.io">
                            GitHub
                        </a>
                    </li>
                </ul>
            </div>
            <div className={classNames(css.description, showDescription && css.descriptionShow)} > 
                <span aria-label="Description" dangerouslySetInnerHTML={{ __html: showDescription || '' }} />
                <button title="Close" className={css.closeButton} onClick={handleHideDescription}>&#10799;</button>
            </div>
        </>
    );
};

export default Explore;