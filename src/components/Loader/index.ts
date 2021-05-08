import * as THREE from 'three';

export const Loader = (onLoad: () => void) => {
    THREE.DefaultLoadingManager.onStart = function(url, itemsLoaded, itemsTotal) {
        console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    };

    THREE.DefaultLoadingManager.onLoad = function() {
        console.log('Loading Complete!');
        const loadingScreen = document.querySelector('div.loader-wrapper')!;
		setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            onLoad();
        }, 3000);
    };
    
    THREE.DefaultLoadingManager.onProgress = function(url, itemsLoaded, itemsTotal) {
        console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
        const loader = document.querySelector('#loader')!;
        loader.setAttribute('value', `${itemsLoaded/itemsTotal * 100}`);
    };
    
    THREE.DefaultLoadingManager.onError = function(url) {
        console.log('There was an error loading ' + url);
    };
};
