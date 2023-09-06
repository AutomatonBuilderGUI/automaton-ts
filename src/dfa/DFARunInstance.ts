import DFAState from "./DFAState";

export default class DFARunInstance {
  constructor(
    public currentState: DFAState | null,
    public remainingTokens: Array<string>
  ) {}
}
