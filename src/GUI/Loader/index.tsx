import { useState, useEffect } from 'preact/hooks';
import * as THREE from 'three';
import './index.scss';

type LoaderProps = {
    onLoad: () => void,
}
const Loader = (props: LoaderProps) => {
    const { onLoad } = props;
    const [loaded, setLoaded] = useState(0);
    useEffect(() => {
        THREE.DefaultLoadingManager.onStart = function(url, itemsLoaded, itemsTotal) {
            console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
        };
    
        THREE.DefaultLoadingManager.onLoad = function() {
            console.log('Loading Complete!');
            setTimeout(() => onLoad(), 3000);
        };
        
        THREE.DefaultLoadingManager.onProgress = function(url, itemsLoaded, itemsTotal) {
            console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
            setLoaded(itemsLoaded/itemsTotal * 100);
        };
        
        THREE.DefaultLoadingManager.onError = function(url) {
            console.log('There was an error loading ' + url);
        };
    }, []);

    return (
        <div className={`loader-wrapper ${loaded === 100 ? 'fade-out' : ''}`}>
            <div className="loader-progress">
                <label for="loader">Loading assets</label>
                <progress id="loader" max="100" value={loaded}></progress>
            </div>
        </div>
    );
};

export default Loader;