import {loadGLTF, loadTexture} from "../libs/loader.js";
const THREE = window.MINDAR.FACE.THREE;

const capture = (mindarThree) => {
    const {video, renderer, scene, camera} = mindarThree;
    const renderCanvas = renderer.domElement;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = renderCanvas.width;
    canvas.height = renderCanvas.height;

    const sx = (video.clientWidth - renderCanvas.clientWidth) /2 * video.videoWidth / video.clientWidth;
    const sy = (video.clientHeight - renderCanvas.clientHeight) /2 * video.videoHeight / video.clientHeight;
    const sw = video.videoWidth - sx * 2;
    const sh = video.videoHeight - sy * 2;

    context.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    
    renderer.preserveDrawingBuffer = true;
    renderer.render(scene, camera);
    context.drawImage(renderCanvas, 0, 0, canvas.width, canvas.height);
    renderer.preserveDrawingBuffer = false;

    const link = document.createElement("a");
    link.download = "photo.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {
    const mindarThree = new window.MINDAR.FACE.MindARThree({
       container: document.body,
        
    });
    const {renderer, scene, camera} = mindarThree;
    
    // add lighting
    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1);
    scene.add(light);

    // add faceMesh texture
    const faceMesh = mindarThree.addFaceMesh();
    const texture = await loadTexture("../assets/facemesh/face-mask-template/Face_Mask_Template.png");
    faceMesh.material.map = texture;
    faceMesh.material.transparent = true;
    faceMesh.material.needsUpdate = true;
    scene.add(faceMesh);
    
    document.querySelector("#capture").addEventListener("click", () => {
        capture(mindarThree);
    });

    // start AR
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
    }
    start();
});