import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export const PageHome = () => {
	const mountRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!mountRef.current) return;

		// Scene setup
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000,
		);
		const renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		mountRef.current.appendChild(renderer.domElement);

		// Transparent Earth
		const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
		const earthMaterial = new THREE.MeshBasicMaterial({
			color: 0x4488ff,
			transparent: true,
			opacity: 0.3,
			wireframe: true,
		});
		const earth = new THREE.Mesh(earthGeometry, earthMaterial);
		scene.add(earth);

		// Camera position
		camera.position.z = 3;

		// Orbit Controls
		const controls = new OrbitControls(camera, renderer.domElement);

		// Convert lat/lng to 3D coordinates
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

		// Draw straight line through earth (tunnel)
		function drawLineBetweenPoints(
			lat1: number,
			lng1: number,
			lat2: number,
			lng2: number,
		) {
			const point1 = latLngToVector3(lat1, lng1);
			const point2 = latLngToVector3(lat2, lng2);

			const points = [point1, point2];
			const geometry = new THREE.BufferGeometry().setFromPoints(points);
			const material = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 });
			const line = new THREE.Line(geometry, material);

			scene.add(line);
		}

		// Argentina (-34.6037, -58.3816) to Japan (35.6762, 139.6503)
		drawLineBetweenPoints(-34.6037, -58.3816, 35.6762, 139.6503);

		// Animation loop
		function animate() {
			requestAnimationFrame(animate);
			earth.rotation.y += 0.005; // rotate earth
			controls.update();
			renderer.render(scene, camera);
		}
		animate();

		// Cleanup
		return () => {
			if (mountRef.current && renderer.domElement) {
				mountRef.current.removeChild(renderer.domElement);
			}
		};
	}, []);

	return (
		<div className="page-regular">
			<div className="page-title">HOME</div>
			<div ref={mountRef} style={{ width: "100%", height: "500px" }} />
		</div>
	);
};
