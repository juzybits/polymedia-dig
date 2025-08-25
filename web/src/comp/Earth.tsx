import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export const EarthVisualization = () => {
	const mountRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!mountRef.current) return;

		// get container dimensions
		const container = mountRef.current;
		const containerWidth = container.clientWidth;
		const containerHeight = container.clientHeight;

		// scene setup
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			containerWidth / containerHeight,
			0.1,
			1000,
		);
		const renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(containerWidth, containerHeight);
		mountRef.current.appendChild(renderer.domElement);

		// earth
		const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
		const earthMaterial = new THREE.MeshBasicMaterial({
			color: 0x4488ff,
			transparent: true,
			opacity: 0.3,
			wireframe: true,
		});
		const earth = new THREE.Mesh(earthGeometry, earthMaterial);
		scene.add(earth);

		camera.position.z = 1.8;
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableZoom = false; // disable zoom to prevent scroll hijacking

		// convert lat/lng to 3D coordinates
		function latLngToVector3(
			lat: number,
			lng: number,
			radius: number = 1,
		): THREE.Vector3 {
			const phi = (90 - lat) * (Math.PI / 180);
			const theta = (lng + 180) * (Math.PI / 180);
			const x = -(radius * Math.sin(phi) * Math.cos(theta));
			const z = radius * Math.sin(phi) * Math.sin(theta);
			const y = radius * Math.cos(phi);
			return new THREE.Vector3(x, y, z);
		}

		// create city marker with bright green dot and label
		function createCityMarker(position: THREE.Vector3, cityName: string) {
			// bright green dot
			const dotGeometry = new THREE.SphereGeometry(0.025, 16, 16);
			const dotMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
			const dot = new THREE.Mesh(dotGeometry, dotMaterial);
			dot.position.copy(position);
			scene.add(dot);

			// text label
			const canvas = document.createElement("canvas");
			const context = canvas.getContext("2d");
			if (!context) return;

			canvas.width = 512;
			canvas.height = 128;
			context.font = "48px Arial";
			context.fillStyle = "white";
			context.strokeStyle = "black";
			context.lineWidth = 2;
			context.textAlign = "center";

			context.strokeText(cityName, canvas.width / 2, 70);
			context.fillText(cityName, canvas.width / 2, 70);

			const texture = new THREE.CanvasTexture(canvas);
			const labelMaterial = new THREE.SpriteMaterial({
				map: texture,
				transparent: true,
			});
			const sprite = new THREE.Sprite(labelMaterial);
			sprite.scale.set(1, 0.25, 1);
			sprite.position.copy(position.clone().multiplyScalar(1.15));
			scene.add(sprite);
		}

		// draw partial tunnel line based on digging percentage
		function createTunnelLine(
			lat1: number,
			lng1: number,
			lat2: number,
			lng2: number,
			digProgress: number, // 0 to 1
		) {
			const startPoint = latLngToVector3(lat1, lng1);
			const endPoint = latLngToVector3(lat2, lng2);

			// calculate current dig endpoint
			const currentEnd = new THREE.Vector3().lerpVectors(
				startPoint,
				endPoint,
				digProgress,
			);

			// create a curve from start to current end
			const curve = new THREE.LineCurve3(startPoint, currentEnd);

			// create tube geometry for thick line
			const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.012, 8, false);
			const tubeMaterial = new THREE.MeshBasicMaterial({
				color: 0xff0000,
			});

			return new THREE.Mesh(tubeGeometry, tubeMaterial);
		}

		const argentina = { lat: -34.6037, lng: -58.3816 };
		const japan = { lat: 35.6762, lng: 139.6503 };

		// add bright green city markers
		createCityMarker(latLngToVector3(argentina.lat, argentina.lng), "Argentina");
		createCityMarker(latLngToVector3(japan.lat, japan.lng), "Japan");

		// fixed 33% tunnel progress
		const digProgress = 0.33;
		const tunnelLine = createTunnelLine(
			argentina.lat,
			argentina.lng,
			japan.lat,
			japan.lng,
			digProgress,
		);
		scene.add(tunnelLine);

		function animate() {
			requestAnimationFrame(animate);
			earth.rotation.y += 0.003;
			controls.update();
			renderer.render(scene, camera);
		}
		animate();

		// handle window resize
		const handleResize = () => {
			const newWidth = container.clientWidth;
			const newHeight = container.clientHeight;

			camera.aspect = newWidth / newHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(newWidth, newHeight);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			if (mountRef.current && renderer.domElement) {
				mountRef.current.removeChild(renderer.domElement);
			}
		};
	}, []);

	return (
		<div
			className="earth"
			ref={mountRef}
			style={{
				width: "100%",
				aspectRatio: "1 / 1",
			}}
		/>
	);
};
