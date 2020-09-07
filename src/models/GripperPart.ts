import THREE = require("three")

import { GripperPartSettings } from "./GripperPartSettings";
import { MeasuringService } from "../services/MeasuringService";
import { Vector3, Object3D } from "three";

export class GripperPart extends THREE.Group {

    private leftPart: THREE.Mesh;
    private rightPart: THREE.Mesh;
    private viewPoint: Vector3

    private constructor() {
        super();
    }


    public getViewPoint(): Vector3 {
        return this.viewPoint;
    }

    public static createDefaultPart(): GripperPart {
        return GripperPart.createPart(new GripperPartSettings(50, 40, 15, 20, 5));
    }

    public static createPart(settings: GripperPartSettings): GripperPart {
        console.log(JSON.stringify(settings));
        let gripperPart = new GripperPart();

        gripperPart.add(this.createLeftPart(settings));
        gripperPart.add(this.createRightPart(settings));
        this.createMeasurements(settings).forEach(measurement => {
            gripperPart.add(measurement);
        });

        gripperPart.viewPoint = new Vector3(
            settings.leftPartHeight/2, 
            (settings.leftPartWidth + settings.rightPartWidth)/2,
            settings.depth/2);

        return gripperPart;
    }

    private static createLeftPart(settings: GripperPartSettings): Object3D {
        let material = new THREE.MeshBasicMaterial({color: 0xcc99ff});
        let leftPartGeometry = new THREE.BoxBufferGeometry( 
            settings.leftPartWidth, 
            settings.leftPartHeight, 
            settings.depth);

        let leftPart = new THREE.Mesh(leftPartGeometry, material);

        leftPart.position.set(
            settings.leftPartWidth/2,
            settings.leftPartHeight/2,
            settings.depth/2);

        return leftPart;
    }

    private static createRightPart(settings: GripperPartSettings): Object3D {
        let material = new THREE.MeshBasicMaterial({color: 0xcc99ff});
        let rightPartGeometry = new THREE.BoxBufferGeometry( 
            settings.rightPartWidth, 
            settings.rightPartHeight, 
            settings.depth);

        let rightPart = new THREE.Mesh(rightPartGeometry, material);

        rightPart.position.set(
            settings.leftPartWidth + settings.rightPartWidth/2, 
            settings.rightPartHeight/2, 
            settings.depth/2);

        return rightPart;        
    }

    private static createMeasurements(settings: GripperPartSettings): Object3D[] {
        let measurements = [];

        //p4
        measurements.push(
            MeasuringService.createMeasurement(
                new Vector3(0, settings.leftPartHeight, settings.depth),
                new Vector3(settings.leftPartWidth, settings.leftPartHeight, settings.depth),
                new Vector3(settings.leftPartWidth, settings.leftPartHeight, 0)
                )
        );

        //p1
        measurements.push(
            MeasuringService.createMeasurement(
                new Vector3(0, 0, settings.depth),
                new Vector3(0, settings.leftPartHeight, settings.depth),
                new Vector3(0, settings.leftPartHeight, 0)
                )
        );

        //p2
        measurements.push(
            MeasuringService.createMeasurement(
                new Vector3(0, 0, settings.depth),
                new Vector3(settings.leftPartWidth + settings.rightPartWidth, 0, settings.depth),
                new Vector3(0, settings.rightPartHeight, settings.depth)
                )
        );

        //p3
        let measurementSettings = MeasuringService.getDefaultSettings();
        measurementSettings.invertNormalVector = true;

        measurements.push(
            MeasuringService.createMeasurement(
                new Vector3(settings.leftPartWidth + settings.rightPartWidth, 0, settings.depth),
                new Vector3(settings.leftPartWidth + settings.rightPartWidth, settings.rightPartHeight, settings.depth),
                new Vector3(settings.leftPartWidth + settings.rightPartWidth, settings.rightPartHeight, 0),
                measurementSettings
                )
        );

        //p5
        measurements.push(
            MeasuringService.createMeasurement(
                new Vector3(settings.leftPartWidth + settings.rightPartWidth, 0, settings.depth),
                new Vector3(settings.leftPartWidth + settings.rightPartWidth, 0, 0),
                new Vector3(settings.leftPartWidth + settings.rightPartWidth, settings.rightPartHeight, settings.depth)
                )
        );

        return measurements;
    }
}