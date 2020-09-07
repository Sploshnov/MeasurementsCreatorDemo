export class GripperPartSettings {
    leftPartHeight: number;
    leftPartWidth: number;
    rightPartHeight: number;
    rightPartWidth: number;
    depth: number;

    constructor(p1: number, p2: number, p3: number, p4: number, p5: number) {
        this.leftPartHeight = p1;
        this.leftPartWidth = p4;

        this.rightPartHeight = p3;
        this.rightPartWidth = p2 - p4;

        this.depth = p5;
    }
}