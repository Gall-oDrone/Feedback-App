import React from "react";
import "../assets/purchasePageAndFooter.css";
import * as THREE from 'three';
import jsonf from "../svg-to-coordinates-master-Globe/points.json";
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const globeRadius = 100;
const globeWidth = 4098 / 2;
const globeHeight = 1968 / 2;
var scene = new THREE.Scene();
let renderRequested = false;
class SphereCont extends React.PureComponent {
      
        constructor(props) {
          super(props);
          this.state = { 
            test: null,
          };
        }
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

        async loadFile(url) {
          const req = await fetch(url);
          return req.text();
        }

        parseData(text) {
          const data = [];
          const settings = {data};
          let max;
          let min;
          // split into lines
          console.log("DATA: ", text)
          text.split('\n').forEach((line) => {
            // split the line by whitespace
            const parts = line.trim().split(/\s+/);
            if (parts.length === 2) {
              // only 2 parts, must be a key/value pair
              settings[parts[0]] = parseFloat(parts[1]);
            } else if (parts.length > 2) {
              // more than 2 parts, must be data
              const values = parts.map((v) => {
                const value = parseFloat(v);
                if (value === settings.NODATA_value) {
                  return undefined;
                }
                max = Math.max(max === undefined ? value : max, value);
                min = Math.min(min === undefined ? value : min, value);
                return value;
              });
              data.push(values);
            }
          });
          
          return Object.assign(settings, {min, max});
        }
        addBoxes(file) {
          const {min, max, data} = file;
          const range = max - min;
      
          // these helpers will make it easy to position the boxes
          // We can rotate the lon helper on its Y axis to the longitude
          const lonHelper = new THREE.Object3D();
          scene.add(lonHelper);
          // We rotate the latHelper on its X axis to the latitude
          const latHelper = new THREE.Object3D();
          lonHelper.add(latHelper);
          // The position helper moves the object to the edge of the sphere
          const positionHelper = new THREE.Object3D();
          positionHelper.position.z = 1;
          latHelper.add(positionHelper);
          // Used to move the center of the cube so it scales from the position Z axis
          const originHelper = new THREE.Object3D();
          originHelper.position.z = 0.5;
          positionHelper.add(originHelper);
      
          const lonFudge = Math.PI * .5;
          const latFudge = Math.PI * -0.135;
          const geometries = [];
          data.forEach((row, latNdx) => {
            row.forEach((value, lonNdx) => {
              if (value === undefined) {
                return;
              }
              const amount = (value - min) / range;
      
              const boxWidth = 1;
              const boxHeight = 1;
              const boxDepth = 1;
              const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
      
              // adjust the helpers to point to the latitude and longitude
              lonHelper.rotation.y = THREE.MathUtils.degToRad(lonNdx + file.xllcorner) + lonFudge;
              latHelper.rotation.x = THREE.MathUtils.degToRad(latNdx + file.yllcorner) + latFudge;
      
              // use the world matrix of the origin helper to
              // position this geometry
              positionHelper.scale.set(0.005, 0.005, THREE.MathUtils.lerp(0.01, 0.5, 0.01));
              originHelper.updateWorldMatrix(true, false);
              geometry.applyMatrix4(originHelper.matrixWorld);
      
              geometries.push(geometry);
            });
          });
      
          const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
              geometries, false);
          const material = new THREE.MeshBasicMaterial({color:'black'});
          const mesh = new THREE.Mesh(mergedGeometry, material);
          scene.add(mesh);
          return mesh;
        }

        resizeRendererToDisplaySize(renderer) {
          const canvas = renderer.domElement;
          const width = canvas.clientWidth;
          const height = canvas.clientHeight;
          const needResize = canvas.width !== width || canvas.height !== height;
          if (needResize) {
            renderer.setSize(width, height, false);
          }
          return needResize;
        }

        render2(renderer, camera, controls, mesh) {
          renderRequested = undefined;
            requestAnimationFrame( this.render2() );
              var rotateX = mesh.rotation.x + 0.00;
              var rotateY = mesh.rotation.y + 0.01;
              var rotateZ = mesh.rotation.z + 0.00;
              mesh.rotation.set( rotateX, rotateY, rotateZ );

          if (this.resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
          }
      
          controls.update();
          renderer.render(scene, camera);
        }
      
  
        componentDidMount() {
            const fov = 60;
            const aspect = 2;  // the canvas default
            const near = 0.1;
            const far = 10;
            const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
            camera.position.z = 2.5;
            scene.background = new THREE.Color('white');
           
            var renderer = new THREE.WebGLRenderer();
            renderer.setSize( 1200, 1100 );
            this.mount.appendChild( renderer.domElement );
            var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
            scene.add(light);

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.enablePan = false;
            controls.minDistance = 1.2;
            controls.maxDistance = 4;
            controls.update();

            const points = jsonf.points
            const vertices = []
            for (let point of points) {
                let width = 180 
                let height = 150
                const { x, y, z } = this.convertFlatCoordsToSphereCoords(
                    point.x,
                    point.y,
                    width,
                    height
                );
        
                vertices.push(x, y, z)
            }
            this.loadFile('https://threejsfundamentals.org/threejs/resources/data/gpw/gpw_v4_basic_demographic_characteristics_rev10_a000_014mt_2010_cntm_1_deg.asc')
            .then(this.parseData)
            .then(this.addBoxes)
            .then(mesh => 
                {var animate = function () {
                  requestAnimationFrame( animate );
                  var rotateX = mesh.rotation.x + 0.00;
                  var rotateY = mesh.rotation.y + 0.001;
                  var rotateZ = mesh.rotation.z + 0.00;
                  mesh.rotation.set( rotateX, rotateY, rotateZ );
                  renderer.render( scene, camera );
                  camera.lookAt(scene.position);
                };
                animate();
                // this.render2(renderer,camera, controls, res)
              });
        }
      
   render() {
        return (
            <div ref={ref => (this.mount = ref)} />
        );
    }
}

export default (SphereCont);