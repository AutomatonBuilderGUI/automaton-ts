import BaseAutomatonError from './BaseAutomatonError';
import AutomatonElement from '../AutomatonElement';
export default class AutomatonElementError extends BaseAutomatonError {
  constructor(protected element: AutomatonElement) {
    super();
  }

  getElement(): AutomatonElement {
    return this.element;
  }
}
