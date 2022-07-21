import {loadGLTF, loadVideo} from "../libs/loader.js";
import {mockWithVideo} from "../libs/camera-mock.js";
import {createChromaMaterial} from "../libs/chroma-video.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {
    //mockWithVideo("../assets/mock-videos/video-target.mp4");
    // initialize MindAR
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: "../assets/targets/targetSample.mind",
    });
    const {renderer, scene, camera} = mindarThree;
  
    const video = await loadVideo("../assets/videos/guitar-player.mp4");
    video.play();
    video.pause();
    const texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(1, 1080/1920);
    const material = createChromaMaterial(texture, 0x00ff00);
    const plane = new THREE.Mesh(geometry, material);

    //plane.rotation.x = Math.PI / 2;
   // plane.position.y = 0.7;
    plane.scale.multiplyScalar(3);
    
    // create anchor
    const anchor = mindarThree.addAnchor(0);    
    anchor.group.add(plane);

    anchor.onTargetFound = () => {
        video.play();
      }
      anchor.onTargetLost = () => {
        video.pause();
      }
    

    // start AR
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
    }
    start();
});