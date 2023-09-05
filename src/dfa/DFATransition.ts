import AutomatonElement from './../AutomatonElement';
import DFA from './DFA';

export default class DFATransition extends AutomatonElement<DFA> {
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
