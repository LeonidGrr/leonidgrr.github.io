import {
    useState,
    useEffect,
    useCallback,
} from 'preact/hooks';
import classNames from 'classnames';
import css from './Explore.module.css';
import { Config } from 'src/routes/home';
import { SceneThemeMode } from '../3D/components/Scene';

type ExplorePanelProps = {
    titleMap: Config,
}

const Explore = (props: ExplorePanelProps) => {
    const {
        titleMap,
    } = props;
    const [showContent, setShowContent] = useState(false);
    const [debug, setDebug] = useState(false);
    const [mode, setMode] = useState<Omit<SceneThemeMode, SceneThemeMode.FREE>>(SceneThemeMode.NIGHT);
    const [showDescription, setShowDescription] = useState<string | null>(titleMap.sub.about.desc);

    useEffect(() => {
        const updateState = (m: MessageEvent<string>) => {
            if (typeof m.data === 'string') {
                const data = m.data.split(':');
                if (data[0] === 'change_camera_from_webgl') {
                    setShowDescription(titleMap.sub[data[1]]?.desc);
                }
            }
        };
    
        window.addEventListener('message', updateState);

        return () => {
            window.removeEventListener('message', updateState);
        };
    }, []);

    const handleCamera = (e: any) => {
        e.stopPropagation();
        const { key } = e.currentTarget.dataset;
        if (key && showDescription !== key) {
            postMessage(`change_camera_from_dom:${key}`);
            setShowDescription(titleMap.sub[key]?.desc);
            setShowContent(false);
        }
    };

    const handleShowContent = useCallback(() => {
        setShowContent(prev => !prev);
    }, []);

    const handleDebug = useCallback(() => {
        setDebug(prev => {
            postMessage(`debug:${!prev}`);
            return !prev;
        });
        handleShowContent();
    }, []);

    const handleDarkMode = useCallback(() => {
        setMode(prev => {
            let nextMode = prev;
            if (prev === SceneThemeMode.NIGHT) {
                nextMode = SceneThemeMode.DAWN;
            }
            if (prev === SceneThemeMode.DAWN) {
                nextMode = SceneThemeMode.DAY;
            }
            if (prev === SceneThemeMode.DAY) {
                nextMode = SceneThemeMode.NIGHT;
            }
            postMessage(`mode:${nextMode}`);
            return nextMode;
        });
        handleShowContent();
    }, []);

    const handleHideDescription = useCallback(() => {
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
                    Explore more
                </button>
            </div>
            <div
                aria-label="Table of content"
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
                            onPointerDown={handleDarkMode}
                        >
                            Theme&nbsp;
                            <span className={classNames(css.mode)}>{mode}</span>
                        </button>
                    </li>
            
                    <li className={css.links}>
                        <button
                            type="button"
                            onPointerDown={handleDebug}
                        >
                            {debug
                                ? <span className={classNames(debug && css.mode)}>Hide debug</span>
                                : <span className={classNames(!debug && css.mode)}>Show debug</span>}
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
