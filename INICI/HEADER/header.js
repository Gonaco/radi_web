import { WEBGL } from './scripts/WebGL.js';
import { OrbitControls } from './scripts/OrbitControls.js';
import { OBJLoader } from './scripts/OBJLoader.js';

var controls;
var renderer, scene, camera;
Init();

function Init() {
	if (WEBGL.isWebGLAvailable()) {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setClearColor('#e5e5e5');
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		window.addEventListener('resize', () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.aspect = window.innerWidth / window.innerHeight;

			camera.updateProjectionMatrix();
		});
		camera.position.z = 50;

		controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.campingFactor = 0.25;
		controls.enableZoom = true;

		var loader = new OBJLoader();
		loader.load(
			'./3d/lowres-radi.obj',
			function (gltf) {
				scene.add(gltf);
			},
			undefined,
			function (error) {
				console.error(error);
			}
		);
		loader.load(
			'./3d/mon-latest.obj',
			function (gltf) {
				gltf.position.x = -50;
				scene.add(gltf);
			},
			undefined,
			function (error) {
				console.error(error);
			}
		);
		loader.load(
			'./3d/radi-world.obj',
			function (gltf) {
				gltf.position.x = 70;
				scene.add(gltf);
			},
			undefined,
			function (error) {
				console.error(error);
			}
		);

		var ambientLight = new THREE.AmbientLight(0x404040);
		scene.add(ambientLight);

		animate();
	} else {
		var warning = WEBGL.getWebGLErrorMessage();
		document.getElementById('container').appendChild(warning);
	}
}

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}
