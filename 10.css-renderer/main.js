import {CSS3DObject} from "../libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: "../assets/targets/targetSample.mind",
    });
    const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;

    // make 3D object from html <div> component
    const obj =  new CSS3DObject(document.querySelector("#ar-div"));
      
    // create anchor
    const cssAnchor = mindarThree.addCSSAnchor(0);    
    cssAnchor.group.add(obj);

    // start AR
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        cssRenderer.render(cssScene, camera);
    });
    }
    start();
});