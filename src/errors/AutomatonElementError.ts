import BaseAutomatonError from './BaseAutomatonError';
import AutomatonElement from '../AutomatonElement';
import BaseAutomaton from '../BaseAutomaton';
export default class AutomatonElementError extends BaseAutomatonError {
  constructor(protected element: AutomatonElement<BaseAutomaton>) {
    super();
  }

  getElement(): AutomatonElement<BaseAutomaton> {
    return this.element;
  }
}
