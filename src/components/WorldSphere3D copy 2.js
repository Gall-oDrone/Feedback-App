import React from "react";
import "../assets/purchasePageAndFooter.css";
import * as THREE from 'three';
import jsonf from "../svg-to-coordinates-master-Globe/points.json";
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
const globeRadius = 50;
const globeWidth = 4098 / 2;
const globeHeight = 1968 / 2;
class SphereCont extends React.PureComponent {
      
        convertFlatCoordsToSphereCoords(x, y) {
          let latitude = ((x - globeWidth) / globeWidth) * -180;
          let longitude = ((y - globeHeight) / globeHeight) * -90;
          latitude = (latitude * Math.PI) / 180;
          longitude = (longitude * Math.PI) / 180;
          const radius = Math.cos(longitude) * globeRadius;
      
          return {
            x: Math.cos(latitude) * radius,
            y: Math.sin(longitude) * globeRadius,
            z: Math.sin(latitude) * radius
          };
        }
  
        componentDidMount() {
            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera( 45, 480/450, 0.1, 1000 );
            camera.position.set(0,0,250);
            var renderer = new THREE.WebGLRenderer();
            renderer.setSize( 480, 450 );
            this.mount.appendChild( renderer.domElement );
            var group = new THREE.Object3D();
      
            const light = new THREE.HemisphereLight( 0xffffb0, 0x080820, 1 );
            scene.add( light );
            const points = jsonf.points
            
            for (let point of points) {
                let width = 180 
                let height = 150
                const { x, y, z } = this.convertFlatCoordsToSphereCoords(
                    point.x,
                    point.y,
                    width,
                    height
                );
        
                var geometry = new THREE.SphereGeometry(0.1, 1, 1);
                const material = new THREE.MeshStandardMaterial( {color: 0xffff00,  wireframe: true});
                const mesh = new THREE.Mesh( geometry, material );
                mesh.position.x = x;
                mesh.position.y = y;
                mesh.position.z = z;
                group.add(mesh);
            }            
            // scene.add(group);
            const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
                group, false);
            const material = new THREE.MeshBasicMaterial({color:'red'});
            const mesh = new THREE.Mesh(mergedGeometry, material);
            scene.add(mesh);
            var animate = function () {
                requestAnimationFrame( animate );
                var rotateX = group.rotation.x + 0.00;
                var rotateY = group.rotation.y + 0.01;
                var rotateZ = group.rotation.z + 0.00;
                group.rotation.set( rotateX, rotateY, rotateZ );
                renderer.render( scene, camera );
                camera.lookAt(scene.position);
            };
            animate();
        }
      
   render() {
        return (
            <div ref={ref => (this.mount = ref)} />
        );
    }
}

export default (SphereCont);