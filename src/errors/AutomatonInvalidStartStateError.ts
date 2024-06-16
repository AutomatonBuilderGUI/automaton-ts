import BaseAutomatonError from './BaseAutomatonError';
import BaseAutomaton from '../BaseAutomaton';
import AutomatonState from '../AutomatonState';
export default class AutomatonInvalidStartStateError<T extends BaseAutomaton> extends BaseAutomatonError {
  constructor(
    private state: AutomatonState<T> | null,
    private automaton: BaseAutomaton
  ) {
    super();
  }

  override errorString(): string {
    if (this.state === null) {
      return `Start state is not provided`;
    }
    return `Start state "${this.state.label}" is invalid`;
  }
}
