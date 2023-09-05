import AutomatonElement from './AutomatonElement';
import BaseAutomaton from './BaseAutomaton';

export default class AutomatonState<T extends BaseAutomaton> extends AutomatonElement<T> {
  constructor(
    public label: string | undefined = undefined
  ) {
    super();
  }
}
