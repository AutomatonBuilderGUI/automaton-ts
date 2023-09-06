import AutomatonElement from './../AutomatonElement';
import DFA from './DFA';
import DFAState from './DFAState';

export default class DFATransition extends AutomatonElement<DFA> {
  constructor(
    public currentState: DFAState,
    public inputToken: string,
    public targetState: DFAState
  ) {
    super();
  }

  toString(): string {
    return `${this.currentState} x ${this.inputToken} -> ${this.targetState}`;
  }
}
