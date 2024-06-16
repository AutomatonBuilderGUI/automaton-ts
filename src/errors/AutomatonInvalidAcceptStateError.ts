import BaseAutomatonError from './BaseAutomatonError';
import DFA from '../dfa/DFA';
import AutomatonState from '../AutomatonState';
import BaseAutomaton from '../BaseAutomaton';
export default class AutomatonInvalidAcceptStateError<T extends BaseAutomaton> extends BaseAutomatonError {
  constructor(
    private state: AutomatonState<T> | null = null,
    private automaton: BaseAutomaton
  ) {
    super();
  }

  override errorString(): string {
    if (this.state === null || this.state === undefined) {
      return `Accept state is invalid`;
    }
    if (this.state.label === undefined) {
      return `Accept state (unnamed) is invalid`;
    }
    return `Accept state "${this.state.label}" is invalid`;
  }
}
