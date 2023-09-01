import BaseAutomatonError from "./BaseAutomatonError";
import DFA from "../DFA";
export default class AutomatonInvalidStartStateError extends BaseAutomatonError {
    constructor(
        private stateIdx: number,
        private automaton: DFA
    )
    {
        super();
    }

    override errorString(): string {
        return `Start state ${this.stateIdx} is invalid; the highest state index is ${this.automaton.states.length - 1}`
    }
}