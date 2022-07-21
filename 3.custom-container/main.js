const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {

    //Normal way to add video as a tracking target
    navigator.mediaDevices.getUserMedia = () => {
        return new Promise((resolve, reject) => {
            const video = document.createElement("video");
            video.setAttribute("src", "./video-target.mp4");
            video.setAttribute("loop", "");

            video.oncanplay = () => {
                video.play();
                resolve(video.captureStream());
            }
        }); 
    }

    // initialize MindAR
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.querySelector("#my-ar-container"), 
        imageTargetSrc: "./targets.mind"
    });
    const {renderer, scene, camera} = mindarThree;

    // create AR object
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({color : 0x00ffff, transparant: true, opacity: 0.5});
    const plane = new THREE.Mesh(geometry, material);

    // create anchor
    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane); // THREE.Group

    // start AR
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
    }
    start();
});