import {loadGLTF} from "../libs/loader.js";
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

    // load 3D object two
    const bear = await loadGLTF("../assets/models/musicband-bear/scene.gltf");
    bear.scene.scale.set(0.1, 0.1, 0.1);
    bear.scene.position.set(0, -0.4, 0);
    
    // create anchor
    const racoonAnchor = mindarThree.addAnchor(0);    
    racoonAnchor.group.add(raccoon.scene);

    const bearAnchor = mindarThree.addAnchor(1);
    bearAnchor.group.add(bear.scene);

    // start AR
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
    }
    start();
});