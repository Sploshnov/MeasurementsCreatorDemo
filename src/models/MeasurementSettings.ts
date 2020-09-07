import { LineBasicMaterial } from "../../node_modules/three/src/materials/LineBasicMaterial";
import { TextOptions } from "three-text2d/lib/Text2D";

export class MeasurementSettings {
    offset: number;
    invertNormalVector: boolean;
    material: LineBasicMaterial;
    textOptions: TextOptions
    
    constructor(offset: number, material: LineBasicMaterial, invertNormalVector: boolean, textOptions: TextOptions) {
        this.offset = offset;
        this.material = material;
        this.invertNormalVector = invertNormalVector;
        this.textOptions = textOptions;

    }
}