import * as THREE from 'three';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import fontTtf from '../../../assets/fonts/Prime-Regular.ttf'; 
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

export const TextLight = async (text: string, scene: THREE.Scene) => {
    // Font
    const ttfLoader = new TTFLoader();
    const fontLoader = new FontLoader()
    let font = await ttfLoader.loadAsync(fontTtf);
    font = fontLoader.parse(font);
    const material = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        flatShading: true,
        emissive: 0xffffff,
        emissiveIntensity: 1,
    });

    const geometry = new TextGeometry(text, {
        font: font as any,
        size: 0.45,
        height: 0.3,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name="text_mesh"
    mesh.layers.enable(1);

    mesh.position.set(-4, 9.75, -17);
    mesh.rotateY(Math.PI / 12);
    mesh.rotateX(-Math.PI / 10);

    scene.add(mesh)

    const clock = new THREE.Clock();
    const render = () => {
        requestAnimationFrame(render);
        const sin = Math.sin(clock.getElapsedTime());
        material.emissiveIntensity *= sin * 0.5;
        mesh.position.y += sin * Math.random() * 0.0005;
    };
    requestAnimationFrame(render);
};

// var height,
//   width,
//   particles = [],
//   textCanvas,
//   textCtx,
//   textPixels = [],
//   input;
// var colors = ['#F7A541', '#F45D4C', '#FA2E59', '#4783c3', '#9c6cb7'];

// function randomPos(vector) {
//     var radius = width * 3;
//     var centerX = 0;
//     var centerY = 0;
  
//     // ensure that p(r) ~ r instead of p(r) ~ constant
//     var r = width + radius * Math.random();
//     var angle = Math.random() * Math.PI * 2;
  
//     // compute desired coordinates
//     vector.x = centerX + r * Math.cos(angle);
//     vector.y = centerY + r * Math.sin(angle);
//   }

// function Particle() {
//     this.vx = Math.random() * 0.05;
//     this.vy = Math.random() * 0.05;
//   }
  
//   Particle.prototype.init = function(i) {
//     var particle = new THREE.Object3D();
//     var geometryCore = new THREE.BoxGeometry(20, 20, 20);
//     var materialCore = new THREE.MeshLambertMaterial({
//       color: colors[i % colors.length],
//       shading: THREE.FlatShading
//     });
//     var box = new THREE.Mesh(geometryCore, materialCore);
//     box.geometry.__dirtyVertices = true;
//     box.geometry.dynamic = true;
//     particle.targetPosition = new THREE.Vector3((textPixels[i].x - (width / 2)) * 4, (textPixels[i].y) * 5, -10 * Math.random() + 20);
//     particle.position.set(width * 0.5, height * 0.5, -10 * Math.random() + 20);
//     randomPos(particle.position);
  
//     for (var i = 0; i < box.geometry.vertices.length; i++) {
//       box.geometry.vertices[i].x += -10 + Math.random() * 20;
//       box.geometry.vertices[i].y += -10 + Math.random() * 20;
//       box.geometry.vertices[i].z += -10 + Math.random() * 20;
//     }
  
//     particle.add(box);
//     this.particle = particle;
//   }
  
//   Particle.prototype.updateRotation = function() {
//     this.particle.rotation.x += this.vx;
//     this.particle.rotation.y += this.vy;
//   }
  
//   Particle.prototype.updatePosition = function() {
//     this.particle.position.lerp(this.particle.targetPosition, 0.02);
//   }

// function updateParticles() {
//     for (var i = 0, l = particles.length; i < l; i++) {
//       particles[i].updateRotation();
//       particles[i].updatePosition();
//     }
//   }

// function setParticles() {
//     for (var i = 0; i < textPixels.length; i++) {
//       if (particles[i]) {
//         particles[i].particle.targetPosition.x = (textPixels[i].x - (width / 2)) * 4;
//         particles[i].particle.targetPosition.y = (textPixels[i].y) * 5;
//         particles[i].particle.targetPosition.z = -10 * Math.random() + 20;
//       } else {
//         var p = new Particle();
//         p.init(i);
//         scene.add(p.particle);
//         particles[i] = p;
//       }
//     }
  
//     for (var i = textPixels.length; i < particles.length; i++) {
//       randomPos(particles[i].particle.targetPosition);
//     }
//   }

// function initCanvas() {
//     textCanvas = document.getElementById('text');
//     textCanvas.style.width = width + 'px';
//     textCanvas.style.height = 200 + 'px';
//     textCanvas.width = width;
//     textCanvas.height = 200;
//     textCtx = textCanvas.getContext('2d');
//     textCtx.font = '700 100px Arial';
//     textCtx.fillStyle = '#555';
//   }

// function initInput() {
//     input = document.getElementById('input');
//     input.addEventListener('keyup', updateText);
//     input.value = 'EDIT ME';
//   }

// function updateText() {
//     var fontSize = (width / (input.value.length*1.3));
//     if (fontSize > 120) fontSize = 120;
//     textCtx.font = '700 ' + fontSize + 'px Arial';
//     textCtx.clearRect(0, 0, width, 200);
//     textCtx.textAlign = 'center';
//     textCtx.textBaseline = "middle";
//     textCtx.fillText(input.value.toUpperCase(), width / 2, 50);
  
//     var pix = textCtx.getImageData(0, 0, width, 200).data;
//     textPixels = [];
//     for (var i = pix.length; i >= 0; i -= 4) {
//       if (pix[i] != 0) {
//         var x = (i / 4) % width;
//         var y = Math.floor(Math.floor(i / width) / 4);
  
//         if ((x && x % 6 == 0) && (y && y % 6 == 0)) textPixels.push({
//           x: x,
//           y: 200-y + -120
//         });
//       }
//     }
//     setParticles();
// }