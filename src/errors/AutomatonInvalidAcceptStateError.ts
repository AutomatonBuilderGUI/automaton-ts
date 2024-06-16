import BaseAutomatonError from './BaseAutomatonError';
import DFA from '../dfa/DFA';
import AutomatonState from '../AutomatonState';
import BaseAutomaton from '../BaseAutomaton';
export default class AutomatonInvalidAcceptStateError<T extends BaseAutomaton> extends BaseAutomatonError {
  constructor(
    private state: AutomatonState<T> | null,
    private automaton: BaseAutomaton
  ) {
    super();
  }

  override errorString(): string {
    if (this.state === null) {
      return `Accept state is invalid`;
    }
    return `Accept state "${this.state.label}" is invalid`;
  }
}
