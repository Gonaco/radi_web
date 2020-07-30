import { WEBGL } from './scripts/WebGL.js';
import { OrbitControls } from './scripts/OrbitControls.js';
import { OBJLoader } from './scripts/OBJLoader.js';

if (WEBGL.isWebGLAvailable()) {
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	var renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setClearColor('#e5e5e5');
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;

		camera.updateProjectionMatrix();
	});

	var controls = new OrbitControls(camera, renderer.domElement);
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
	camera.position.z = 5;

	var animate = function () {
		requestAnimationFrame(animate);
		controls.update();
		renderer.render(scene, camera);
	};

	animate();
} else {
	var warning = WEBGL.getWebGLErrorMessage();
	document.getElementById('container').appendChild(warning);
}
