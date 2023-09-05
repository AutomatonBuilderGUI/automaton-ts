import DFARunInstance from './DFARunInstance';
import DFA from './DFA';

export enum DFARunnerStatus {
  NotStarted,
  InProgress,
  Accepted,
  Rejected,
  InvalidDFA,
  InvalidInputTokens
}

export default class DFARunner {
  public runInstances: Array<DFARunInstance>;
  private status: DFARunnerStatus = DFARunnerStatus.NotStarted;
  private initialInputTokens: Array<string>;
  constructor(
    public dfa: DFA,
    public inputTokens: Array<string>
  ) {
    // TODO: verify that input token array is made up of elements in alphabet
    this.runInstances = [new DFARunInstance(dfa.startState, [...inputTokens])];
    this.initialInputTokens = [...inputTokens];
  }

  getStatus() {
    return this.status;
  }

  hasConcluded() {
    return (
      this.status !== DFARunnerStatus.NotStarted &&
      this.status !== DFARunnerStatus.InProgress
    );
  }

  getInitialInputTokens() {
    return [...this.initialInputTokens];
  }

  runStep() {
    if (this.hasConcluded()) {
      return;
    }

    // First, confirm that the DFA is valid
    if (this.dfa.getErrors().length > 0)
    {
      this.status = DFARunnerStatus.InvalidDFA;
      return;
    }

    // Next, confirm that the input tokens are valid
    for (let i = 0; i < this.initialInputTokens.length; i++)
    {
      if (!this.dfa.inputAlphabet.includes(this.initialInputTokens[i])) {
        this.status = DFARunnerStatus.InvalidInputTokens;
        return;
      }
    }

    this.status = DFARunnerStatus.InProgress;

    let newRunInstances = new Array<DFARunInstance>();

    for (
      let runInstanceIdx = 0;
      runInstanceIdx < this.runInstances.length;
      runInstanceIdx++
    ) {
      const runInstance = this.runInstances[runInstanceIdx];

      for (
        let transitionIdx = 0;
        transitionIdx < this.dfa.transitions.length;
        transitionIdx++
      ) {
        const transition = this.dfa.transitions[transitionIdx];
        const currentToken = runInstance.remainingTokens[0];

        if (
          runInstance.currentState !== transition.currentState ||
          transition.inputToken !== currentToken
        ) {
          continue;
        }

        const newInstance = new DFARunInstance(
          transition.targetState,
          runInstance.remainingTokens.slice(1)
        );
        newRunInstances.push(newInstance);
      }
    }

    // Now, check if any of them are successful (empty tokens and in accept state)
    const doneInstances = newRunInstances.filter(
      i => i.remainingTokens.length === 0
    );

    for (
      let doneInstanceIdx = 0;
      doneInstanceIdx < doneInstances.length;
      doneInstanceIdx++
    ) {
      const doneInstance = doneInstances[doneInstanceIdx];

      if (this.dfa.acceptStates.includes(doneInstance.currentState)) {
        this.status = DFARunnerStatus.Accepted;
        return;
      } else {
        // DFA didn't accept this string and it's all exhausted,
        // so remove it from the run instances
        newRunInstances = newRunInstances.filter(i => i !== doneInstance);
      }
    }

    this.runInstances = newRunInstances;

    if (this.runInstances.length === 0) {
      this.status = DFARunnerStatus.Rejected;
      return;
    }
  }

  runUntilConclusion() {
    while (!this.hasConcluded()) {
      this.runStep();
    }
  }
}
