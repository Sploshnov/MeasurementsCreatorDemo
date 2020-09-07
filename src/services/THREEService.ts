import { Scene, PerspectiveCamera, WebGLRenderer, Vector3, FontLoader, Mesh, Font, TextGeometry, MeshPhongMaterial } from "three";
import { OrbitControls } from 'three-examples/controls/OrbitControls';
import { GripperPart } from "../models/GripperPart";
import { GripperPartSettings } from "models/GripperPartSettings"

import THREE = require("three");

export class THREEService {
    private canvas: HTMLCanvasElement;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private orbitControls : OrbitControls;
    private scene: THREE.Scene;
    private fontLoader: FontLoader = new FontLoader();

    private gripperPart: GripperPart;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.setupScene();
        this.setupRenderer();
    }

    public init(): void  {
        this.gripperPart = GripperPart.createDefaultPart();
        this.scene.add( this.gripperPart );

        //axes visualisation
        var axesHelper = new THREE.AxesHelper( 75 );
        this.scene.add( axesHelper );

        this.camera.position.x = 50;
        this.camera.position.y = 20;
        this.camera.position.z = 75;

        this.setupOrbitControls(this.canvas);
        this.animate();
    }

    public updatePart(settings: GripperPartSettings): void {
        this.scene.remove(this.gripperPart);
        this.gripperPart = GripperPart.createPart(settings);
        this.scene.add(this.gripperPart);
    }

    public updateCamera(target: Vector3, position: Vector3): void {
        this.camera.position.x = position.x;
        this.camera.position.y = position.y;
        this.camera.position.z = position.z;

        this.orbitControls.target.set(target.x, target.y, target.z);
        this.orbitControls.update()
    } 

    private animate():void {
        requestAnimationFrame( () => { this.animate(); });
	    this.renderer.render( this.scene, this.camera );
    }

    private setupScene():void {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera( 75, this.canvas.width/this.canvas.height, 0.1, 1000 );
    }

    private setupRenderer():void {
        this.renderer = this.renderer = new WebGLRenderer(
            {
                canvas: this.canvas,
                antialias: true
            });
            this.renderer.setClearColor(0xe5e5e5);
            this.renderer.setSize(this.canvas.width, this.canvas.height);
    }

    private setupOrbitControls(canvas: HTMLCanvasElement) {
        
        this.orbitControls = new OrbitControls(this.camera, canvas);

        // set the focus point the object orbits around
        let viewPoint = this.gripperPart.getViewPoint();
        this.orbitControls.target.set(viewPoint.x, viewPoint.y, viewPoint.z);

        const wallAngleOffset = 0.3

        // this.orbitControls.maxPolarAngle = 180 * Math.PI/180 - wallAngleOffset;
        // this.orbitControls.minPolarAngle = wallAngleOffset;

        // this.orbitControls.maxAzimuthAngle = 90 * Math.PI/180 - wallAngleOffset;
        // this.orbitControls.minAzimuthAngle = -this.orbitControls.maxAzimuthAngle;

        // this.orbitControls.enablePan = false;
        
        this.orbitControls.update();
    }
}