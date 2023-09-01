import AutomatonElement from "./AutomatonElement";

export default class AutomatonState extends AutomatonElement {
    constructor(
        public x: number,
        public y: number
    ) {
        super();
    }
}