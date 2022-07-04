import classNames from 'classnames';
import { useState, useEffect } from 'preact/hooks';
import * as THREE from 'three';
import css from './Loader.module.css';

const Loader = () => {
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        // THREE.DefaultLoadingManager.onStart = function(url, itemsLoaded, itemsTotal) {
            // console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
        // };
    
        THREE.DefaultLoadingManager.onLoad = function() {
            // console.log('Loading Complete!');
                setLoaded(true);
        };
        
        THREE.DefaultLoadingManager.onProgress = function(url, itemsLoaded, itemsTotal) {
            // console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
            setProgress(itemsLoaded/itemsTotal * 100);
        };
        
        // THREE.DefaultLoadingManager.onError = function(url) {
            // console.log('There was an error loading ' + url);
        // };
    }, []);

    return (
        <div className={classNames(css['loader-wrapper'], loaded && css['fade-out'])}>
            <div className={css['loader-progress']}>
                <label for="loader">Loading assets</label>
                <progress id="loader" max="100" value={progress}></progress>
            </div>
        </div>
    );
};

export default Loader;
