import AutomatonElementError from "./AutomatonElementError";
import DFATransition from "../dfa/DFATransition";

export default class AutomatonTransitionInvalidCurrentStateError extends AutomatonElementError {
    constructor(
        protected override element: DFATransition
    ) {
        super(element);
    }

    override errorString(): string {
        return `Current state ${this.element.currentState} is out of range`
    }
}