import AutomatonElementError from "./AutomatonElementError";
import DFATransition from "../dfa/DFATransition";

export default class AutomatonTransitionInvalidTargetStateError extends AutomatonElementError {
    constructor(
        protected override element: DFATransition
    ) {
        super(element);
    }

    override errorString(): string {
        return `Target state ${this.element.targetState} is out of range`
    }
}