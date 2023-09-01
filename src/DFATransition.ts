import AutomatonElement from "./AutomatonElement";

export default class DFATransition extends AutomatonElement {
    constructor(
        public currentState: number,
        public inputToken: string,
        public targetState: number
    ) {
        super();
    }

    toString(): string {
        return `${this.currentState} x ${this.inputToken} -> ${this.targetState}`;
    }
}