import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import './index.scss';

export const Tooltip = (camera: THREE.PerspectiveCamera, scene: THREE.Scene) => {
     const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.overflow = 'visible';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.height = '0px';
    labelRenderer.domElement.style.width = '0px';
    document.body.appendChild(labelRenderer.domElement);

    const targets: THREE.Mesh[] = [];
    const tooltips: {[key: string]: CSS2DObject} = {};

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    document.addEventListener('pointermove', (e: MouseEvent) => {
        // the following line would stop any other event handler from firing
        // (such as the mouse's TrackballControls)
        // event.preventDefault();
        pointer.x = (e.clientX / document.body.clientWidth) * 2 - 1;
        pointer.y = -(e.clientY / document.body.clientHeight) * 2 + 1;
    }, false);

    let intersected: string | null = null;
    const render = () => {
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(targets); 
        if (intersects.length > 0) {
            intersected = intersects[0].object.uuid;
            const tooltip = tooltips[intersected];
            if (tooltip) {
                tooltip.element.style.opacity = '1';
            }
        } else if (intersected) {
            const tooltip = tooltips[intersected];
            if (tooltip) {
                tooltip.element.style.opacity = '0';
            }
            intersected = null;
        }

        labelRenderer.render(scene, camera);
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    const addTarget = (mesh: THREE.Mesh, text: string) => {
        targets.push(mesh);
        const tooltipDiv = document.createElement('div');
        tooltipDiv.className = 'tooltip';
        tooltipDiv.textContent = text;
        const tooltip = new CSS2DObject(tooltipDiv);
        tooltip.position.set(0, 0, 0);

		mesh.add(tooltip);
        tooltips[mesh.uuid] = tooltip;
    };

    return {
        addTarget,
    }
};
