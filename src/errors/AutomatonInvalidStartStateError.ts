import BaseAutomatonError from './BaseAutomatonError';
import BaseAutomaton from '../BaseAutomaton';
import AutomatonState from '../AutomatonState';
export default class AutomatonInvalidStartStateError<T extends BaseAutomaton> extends BaseAutomatonError {
  constructor(
    private state: AutomatonState<T> | null = null,
    private automaton: BaseAutomaton
  ) {
    super();
  }

  override errorString(): string {
    if (this.state === null || this.state === undefined) {
      return `Start state is not provided`;
    }
    if (this.state.label === undefined) {
      return `Start state (unnamed) is invalid`;
    }
    return `Start state "${this.state.label}" is invalid`;
  }
}
