import { LineBasicMaterial } from "../../node_modules/three/src/materials/LineBasicMaterial";

export class MeasurementSettings {
    offset: number;
    invertNormalVector: boolean;
    material: LineBasicMaterial; 
    
    constructor(offset: number, material: LineBasicMaterial, invertNormalVector: boolean) {
        this.offset = offset;
        this.material = material;
        this.invertNormalVector = invertNormalVector;
    }
}