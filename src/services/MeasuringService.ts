import { Vector3, Object3D, Line, BufferGeometry, Vector2 } from "three";
import { SpriteText2D, textAlign } from 'three-text2d'

import { LineBasicMaterial } from "../../node_modules/three/src/materials/LineBasicMaterial";
import { MeasurementSettings } from "../models/MeasurementSettings";
import { TextOptions } from "three-text2d/lib/Text2D";

export class MeasuringService {
    public static createMeasurement(start: Vector3, end: Vector3, planePoint: Vector3, settings: MeasurementSettings = null): Object3D {
        if (!settings) {
            settings = this.getDefaultSettings();
        }
        
        let normalVector = this.getPlaneNormalVector(start, end, planePoint, settings.offset);
        if (settings.invertNormalVector) {
            normalVector = normalVector.multiplyScalar(-1);
        }

        var lineGeometry = new BufferGeometry().setFromPoints( [start.add(normalVector), end.add(normalVector)] );
        
        var line = new Line( lineGeometry, settings.material );
        line.add(this.createBrace(start, normalVector, settings.material));
        line.add(this.createBrace(end, normalVector, settings.material));
        line.add(this.createValueSprite(start, end, normalVector, settings.textOptions))

        return line;
    }

    public static getDefaultSettings(): MeasurementSettings {
        return new MeasurementSettings(10, new LineBasicMaterial( { color: 0x000000 } ), false, this.getDefaultTextOptions());
    }

    public static getDefaultTextOptions(): TextOptions {
        return { align: textAlign.center,  font: '15px Arial', fillStyle: '#000000' , antialias: false };
    }

    private static getPlaneNormalVector(p1: Vector3, p2:Vector3, p3: Vector3, length: number): Vector3 {
        let p1p2 = new Vector3().subVectors(p2, p1);
        let p1p3 = new Vector3().subVectors(p3, p1);
        return new Vector3().crossVectors(p1p2, p1p3).normalize().multiplyScalar(length);
    }

    private static createBrace(center: Vector3, normalVector: Vector3, material: LineBasicMaterial): Object3D {
        let braceVector = normalVector.normalize().multiplyScalar(2);

        let p1 = new Vector3().addVectors(center, braceVector);
        let p2 = new Vector3().subVectors(center, braceVector);
        let points = [p1, p2];

        let geometry = new BufferGeometry().setFromPoints(points);
        return new Line( geometry, material );
    }

    private static createValueSprite(start: Vector3, end: Vector3, normalVector: Vector3, options: TextOptions): Object3D {
        var textSprite = new SpriteText2D(new Vector3().add(end).sub(start).length().toString(), options)
        var position = new Vector3().add(end).add(normalVector).add(start).add(normalVector).multiplyScalar(0.5)
        textSprite.position.set(position.x, position.y, position.z)
        return textSprite
    }
}