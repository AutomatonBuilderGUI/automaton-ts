export default class DFARunInstance {
  constructor(
    public currentState: number,
    public remainingTokens: Array<string>
  ) {}
}
