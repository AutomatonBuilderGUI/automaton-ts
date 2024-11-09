import BaseAutomaton from "./BaseAutomaton";

export default class AutomatonElement<T extends BaseAutomaton> {
    public label?: string;
  
    constructor(label?: string) {
      this.label = label;
    }
}
  
