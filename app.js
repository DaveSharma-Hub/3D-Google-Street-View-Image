window.addEventListener('resize', onWindowResize);

var camera,renderer;
function main(){

    const canvas = document.querySelector('#world')

    const fov = 40 //degrees
    const aspect =canvas.clientWidth/canvas.clientHeight // twice as wide as high
    const near = 0.1 //clipping plane, any objects less than near object will disappear
    const far = 2000 //far cliping plane 

    camera = new THREE.PerspectiveCamera(fov,aspect,near,far)
    camera.position.z = 1

    renderer = new THREE.WebGLRenderer({ canvas })
    const width = canvas.clientWidth
    const height = canvas.clientHeight

    const controls = new THREE.OrbitControls(camera,renderer.domElement) //required for orbital control

    controls.target.set(4.5, 0, 4.5);
    
    controls.enablePan = true;
    controls.maxPolarAngle = Math.PI/2;
    
    controls.enableDamping = true;
    console.log(width)
    console.log(height)

    renderer.setSize(width,height)
    const scene = new THREE.Scene()
    const textureLoader = new THREE.TextureLoader()

    const texture = textureLoader.load(
        // 'https://t3.ftcdn.net/jpg/02/62/99/94/360_F_262999452_lhnAwOWLRofZe0AO2Ok8KvCHHiNzZwfB.jpg',
        // 'https://www.jamesfmackenzie.com/img/posts/equirectangular-pano.png',
        // 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Equirectangular-projection.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/5/55/MKZD_Bratcevo_2015-10_Equirectangular.jpg',
        //'https://t3.ftcdn.net/jpg/02/84/78/28/360_F_284782898_CjN6hBNICO41rbwOlNlcPKhitZrJvhHx.jpg',
        () => {
            const renderTarget = new THREE.WebGLCubeRenderTarget(texture.image.height)
            renderTarget.fromEquirectangularTexture(renderer,texture)
            scene.background= renderTarget.texture
        }
    )
    function render(){
        controls.update();
        renderer.render(scene,camera)
        requestAnimationFrame(render)
    }

    requestAnimationFrame(render)

       
}
function onWindowResize() {
 
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
   
    renderer.setSize( window.innerWidth, window.innerHeight );
   
  }
main() //call main function

