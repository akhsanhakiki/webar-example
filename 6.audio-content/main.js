import {loadGLTF, loadAudio} from "../libs/loader.js";
import { GLTFLoader } from "../libs/three.js-r132/examples/jsm/loaders/GLTFLoader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {

    // initialize MindAR
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: "../assets/targets/musicband.mind",
        maxTrack: 2,
    });
    const {renderer, scene, camera} = mindarThree;

    // create light
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    // load 3D object one
    const raccoon = await loadGLTF("../assets/models/musicband-raccoon/scene.gltf");
    raccoon.scene.scale.set(0.1, 0.1, 0.1);
    raccoon.scene.position.set(0, -0.4, 0);

    // create anchor
    const racoonAnchor = mindarThree.addAnchor(0);    
    racoonAnchor.group.add(raccoon.scene);

    // add audio
    const audioClip = await loadAudio("../assets/sounds/musicband-background.mp3");

    const listener = new THREE.AudioListener();
    const audio = new THREE.PositionalAudio(listener);

    camera.add(listener);
    racoonAnchor.group.add(audio);

    audio.setRefDistance(100);
    audio.setBuffer(audioClip);
    audio.setLoop(true);

    // gltf.animation
    const mixer = new THREE.AnimationMixer(raccoon.scene);
    const action = mixer.clipAction(raccoon.animations[0]);
    action.play();

    const clock = new THREE.Clock();
    
    racoonAnchor.onTargetFound = () => {
        console.log("on target found");
        audio.play();
    }

    racoonAnchor.onTargetLost = () => {
        console.log("on target lost");
        audio.pause();
    }

    // start AR
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        const delta = clock.getDelta();

        raccoon.scene.rotation.set(0, raccoon.scene.rotation.y + delta, 0);

        mixer.update(delta);
        renderer.render(scene, camera);
    });
    }
    start();
});