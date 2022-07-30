import { useState, useEffect, useRef, useMemo } from 'preact/hooks';
import { FunctionComponent } from 'preact';
import { init } from '../3D';
import { Link } from 'preact-router/match';
import { DefaultLoadingManager } from 'three';
import Loader from '../Loader';

export const Scene3D: FunctionComponent = props => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isEnabled, setIsEnabled] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    const disable3d = () => setIsEnabled(false);

    useEffect(() => {
        // DefaultLoadingManager.onStart = function(url, itemsLoaded, itemsTotal) {
            // console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
        // };
    
        DefaultLoadingManager.onLoad = function() {
            // console.log('Loading Complete!');
            setTimeout(() => setLoaded(true), 1000);
        };
        
        DefaultLoadingManager.onProgress = function(url, itemsLoaded, itemsTotal) {
            // console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
            setProgress(itemsLoaded/itemsTotal * 100);
        };
        
        // DefaultLoadingManager.onError = function(url) {
            // console.log('There was an error loading ' + url);
        // };
    }, []);

    const webGLAvailable = useMemo(() => {
        if (typeof window !== "undefined") {
            return !!window.WebGLRenderingContext;
        }
        return true;
    }, []);

    useEffect(() => {
        if (isEnabled && webGLAvailable && canvasRef.current) {
            setTimeout(() => init(canvasRef.current!), 2500);
        }
    }, [isEnabled, webGLAvailable]);

    return (
        <>
            {!isEnabled && !webGLAvailable && props.children}
            {isEnabled && webGLAvailable && loaded && props.children}
            {isEnabled && !webGLAvailable && (
                <div class="message">
                <h1>Looks like your browser does not support WebGL</h1>
                <p>Check <a href="https://get.webgl.org">https://get.webgl.org</a> for troubleshooting.</p>
                <Link href="/" onClick={disable3d}>
                    <h4>Continue without 3d scene...</h4>
                </Link>
            </div>
            )}
            {isEnabled && webGLAvailable && <Loader loaded={loaded} progress={progress}/>}
            <canvas className="webgl" tabIndex={1} ref={canvasRef}/>
        </>
    );
};
