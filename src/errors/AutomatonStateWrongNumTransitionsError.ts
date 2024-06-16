import AutomatonElementError from './AutomatonElementError';
import AutomatonState from '../AutomatonState';
import BaseAutomaton from '../BaseAutomaton';
export default class AutomatonStateWrongNumTransitionsError extends AutomatonElementError {
  constructor(
    protected override element: AutomatonState<BaseAutomaton>,
    private numTransitionsWithToken: number,
    private token: string
  ) {
    super(element);
  }

  override errorString(): string {
    let stateName = this.element.label !== undefined ? `State "${this.element.label}"` : `Unnamed state`;
    return `${stateName} has ${this.numTransitionsWithToken} transitions for token "${this.token}" when it should have exactly 1`;
  }
}
