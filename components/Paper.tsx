'use client'
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const TheScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dataFetchedRef = useRef(false);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    if (typeof window !== 'undefined') {
        // Initialize Scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({
            preserveDrawingBuffer: true,
            antialias: false,
            alpha: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement)
        scene.background = new THREE.Color( 0xeeebe2 );

        // Load lights
        scene.add(new THREE.AmbientLight(0xfff4e6,3))
        const pointLightLeft = new THREE.PointLight(0xfef5e7, 20)
        pointLightLeft.position.set(1,1,1)
        scene.add(pointLightLeft)
        const pointLightRight = new THREE.PointLight(0xfdf5e6, 20)
        pointLightRight.position.set(2,2,2)
        scene.add(pointLightRight)
        const pointLightTop = new THREE.PointLight(0xfdf5e6, 20)
        pointLightTop.position.set(3,3,3)
        scene.add(pointLightTop)

        THREE.ImageUtils.crossOrigin = '';

        // Load textures
        const texture = new THREE.TextureLoader().load("/pdogm3.jpg" )
        const materialTopBottom = new THREE.MeshStandardMaterial({
          map: texture,
          metalness:0.6,
          roughness:0.3,
        })
        const materialSides = new THREE.MeshStandardMaterial({
          color: 0xCAC1AB,
          metalness:0.6,
          roughness:0.3,
        })

        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        canvas.width = 256
        canvas.height = 256

        const ftexture = new THREE.CanvasTexture(canvas)
        let ftext = "coming soon"
        let ftextInterval = setInterval(() => {
          switch(ftext) {
            case "coming soon": ftext = "coming soon."; break;
            case "coming soon.": ftext = "coming soon.."; break;
            case "coming soon..": ftext = "coming soon..."; break;
            default: ftext = "coming soon"; break;
          }
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0,0,canvas.width,canvas.height)
          ctx.fillStyle = "#000000"
          ctx.font = "24px Menlo"
          ctx.fillText(ftext, 30, 135)
          ftexture.needsUpdate = true;
        }, 1000)

        const sideMaterial = new THREE.MeshStandardMaterial({
          map: ftexture,
          metalness: 0.6,
          roughness: 0.3
        })

        // Create token
        const radiusTop = 1.8;
        const radiusBottom = 1.8;
        const height = 0.18;
        const radialSegments = 100;
        const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
        const mesh = new THREE.Mesh(geometry, [materialSides, materialTopBottom, sideMaterial]);
        
        scene.add(mesh);
        camera.position.set(0,0,7)

        mesh.rotation.x = 0.33
        mesh.rotation.y = 1.17

        // Animate
        const renderScene = () => {
            mesh.rotation.x +=0.007
            mesh.rotation.y +=0.00033
            requestAnimationFrame(renderScene);
            renderer.render(scene, camera);
          };
          
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);
        
        
        renderScene();
        dataFetchedRef.current = true;

        // Clean up the event listener when the component is unmounted
        //return () => {
        //  window.removeEventListener('resize', handleResize);
        //};
        
    }
  }, []);
  return <div ref={containerRef} />;
};
export default TheScene;