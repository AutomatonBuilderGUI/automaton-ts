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
    // If this DFA running instance has already finished, then there is no
    // reason to continue.
    if (this.hasConcluded()) {
      return;
    }

    // If the DFA has any errors, then it cannot run. Thus, we should report
    // to the user that the DFA is invalid, and not try to do anything more.
    if (this.dfa.getErrors().length > 0)
    {
      this.status = DFARunnerStatus.InvalidDFA;
      return;
    }

    // The DFA itself may not have errors, but we need to confirm that the
    // input string consists of tokens in the alphabet set. If not, then
    // the DFA should not run.
    for (let i = 0; i < this.initialInputTokens.length; i++)
    {
      if (!this.dfa.inputAlphabet.includes(this.initialInputTokens[i])) {
        this.status = DFARunnerStatus.InvalidInputTokens;
        return;
      }
    }

    // Both the automaton and the input string are valid, so we can start
    // trying to run the automaton on the string!
    this.status = DFARunnerStatus.InProgress;


    // The "next state" of the automaton will consist of an array of
    // DFARunInstance objects. Each DFARunInstance contains a current position
    // in the automaton, and a remaining string of input tokens.
    let newRunInstances = new Array<DFARunInstance>();

    // Here, we iterate through all of the current run instance objects to
    // determine what the next set of run instance objects will be. Note that
    // a run instance object never lasts more than a single step - if it doesn't
    // spawn a new run instance object via a transition, that "thread" will die
    // out.
    for (
      let runInstanceIdx = 0;
      runInstanceIdx < this.runInstances.length;
      runInstanceIdx++
    ) {
      const runInstance = this.runInstances[runInstanceIdx];

      // For each run instance, we want to see if it matches any of the
      // transitions in this automaton.
      for (
        let transitionIdx = 0;
        transitionIdx < this.dfa.transitions.length;
        transitionIdx++
      ) {
        // We only want to look at transitions from the current state of this
        // run instance, and that take as input the same input token as this
        // run instance's current token.
        const transition = this.dfa.transitions[transitionIdx];
        const currentToken = runInstance.remainingTokens[0];
        if (
          runInstance.currentState !== transition.currentState ||
          transition.inputToken !== currentToken
        ) {
          continue;
        }

        // The new run instance spawned off of this current one will be in the
        // state that this transition is targeting. Its input string will be
        // whatever remains of the current input string after removing the
        // first token in line.
        const newInstance = new DFARunInstance(
          transition.targetState,
          runInstance.remainingTokens.slice(1)
        );
        newRunInstances.push(newInstance);
      }
    }

    // Now that the automaton has been moved one step forward, we need to check
    // if any run instances have exhausted their input strings.
    const doneInstances = newRunInstances.filter(
      i => i.remainingTokens.length === 0
    );

    for (
      let doneInstanceIdx = 0;
      doneInstanceIdx < doneInstances.length;
      doneInstanceIdx++
    ) {
      const doneInstance = doneInstances[doneInstanceIdx];

      // If this run instance exhausted its input string while in an accept
      // state, then the automaton has accepted this input string, and no more
      // computation is necessary.
      if (doneInstance.currentState !== null && this.dfa.acceptStates.includes(doneInstance.currentState)) {
        this.status = DFARunnerStatus.Accepted;
        return;
      }
      
      // Otherwise, this run instance has exhausted its input string while
      // *not* in an accept state. This doesn't mean that the string has been
      // rejected, just that this "thread" will not lead to the string being
      // accepted.
      // Thus, we just need to remove this run instance from the array of
      // current run instances.
      else {
        newRunInstances = newRunInstances.filter(i => i !== doneInstance);
      }
    }

    // Update the runner object's array of run instances to the new array
    // we calculated in this function.
    this.runInstances = newRunInstances;

    // The automaton only rejects the string once all run instances have died
    // out on non-accept states.
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
  runStepDebug() {
        let retLable = " ";
        

        // If this DFA running instance has already finished, then there is no
        // reason to continue.
        if (this.hasConcluded()) {
            return retLable;
        }
        // If the DFA has any errors, then it cannot run. Thus, we should report
        // to the user that the DFA is invalid, and not try to do anything more.
        if (this.dfa.getErrors().length > 0) {
            this.status = DFARunnerStatus.InvalidDFA;
            return retLable;
        }
        // The DFA itself may not have errors, but we need to confirm that the
        // input string consists of tokens in the alphabet set. If not, then
        // the DFA should not run.
        for (let i = 0; i < this.initialInputTokens.length; i++) {
            if (!this.dfa.inputAlphabet.includes(this.initialInputTokens[i])) {
                this.status = DFARunnerStatus.InvalidInputTokens;
                return retLable;
            }
        }
        // Both the automaton and the input string are valid, so we can start
        // trying to run the automaton on the string!
        this.status = DFARunnerStatus.InProgress;
        // The "next state" of the automaton will consist of an array of
        // DFARunInstance objects. Each DFARunInstance contains a current position
        // in the automaton, and a remaining string of input tokens.
        
        let newRunInstances = new Array<DFARunInstance>();
        // Here, we iterate through all of the current run instance objects to
        // determine what the next set of run instance objects will be. Note that
        // a run instance object never lasts more than a single step - if it doesn't
        // spawn a new run instance object via a transition, that "thread" will die
        // out.
        for (let runInstanceIdx = 0; runInstanceIdx < this.runInstances.length; runInstanceIdx++) {
            const runInstance = this.runInstances[runInstanceIdx];
            
            // For each run instance, we want to see if it matches any of the
            // transitions in this automaton.
            for (let transitionIdx = 0; transitionIdx < this.dfa.transitions.length; transitionIdx++) {
                // We only want to look at transitions from the current state of this
                // run instance, and that take as input the same input token as this
                // run instance's current token.
                const transition = this.dfa.transitions[transitionIdx];
                const currentToken = runInstance.remainingTokens[0];
                if (runInstance.currentState !== transition.currentState ||
                    transition.inputToken !== currentToken) {
                    continue;
                }
                // The new run instance spawned off of this current one will be in the
                // state that this transition is targeting. Its input string will be
                // whatever remains of the current input string after removing the
                // first token in line.
                const newInstance = new DFARunInstance(
          		transition.targetState,
          		runInstance.remainingTokens.slice(1)
        	);
                
                newRunInstances.push(newInstance);
                retLable = newInstance.currentState?.label ?? "";
            }
            
        }
        
        
        // Now that the automaton has been moved one step forward, we need to check
        // if any run instances have exhausted their input strings.
        const doneInstances = newRunInstances.filter(i => i.remainingTokens.length === 0);
        //console.log("touched");
        //console.log(newRunInstances)
        for (let doneInstanceIdx = 0; doneInstanceIdx < doneInstances.length; doneInstanceIdx++) {
            const doneInstance = doneInstances[doneInstanceIdx];
            // If this run instance exhausted its input string while in an accept
            // state, then the automaton has accepted this input string, and no more
            // computation is necessary.
            if (doneInstance.currentState !== null && this.dfa.acceptStates.includes(doneInstance.currentState)) {
                //console.log("done");
                //console.log(doneInstance)
                this.status = DFARunnerStatus.Accepted;
                return retLable;
            }
            // Otherwise, this run instance has exhausted its input string while
            // *not* in an accept state. This doesn't mean that the string has been
            // rejected, just that this "thread" will not lead to the string being
            // accepted.
            // Thus, we just need to remove this run instance from the array of
            // current run instances.
            else {
                newRunInstances = newRunInstances.filter(i => i !== doneInstance);
                
            }
        }
        // Update the runner object's array of run instances to the new array
        // we calculated in this function.
        this.runInstances = newRunInstances;
        
        // The automaton only rejects the string once all run instances have died
        // out on non-accept states.
        if (this.runInstances.length === 0) {
            this.status = DFARunnerStatus.Rejected;
            return retLable;
        }
        return retLable;
    }



    runUntilConclusionDebug() {
        let returnarray = [];
        returnarray.push(this.runInstances[0].currentState?.label ?? "");
        while (!this.hasConcluded()) {
            returnarray.push(this.runStepDebug());
        }
        return returnarray;
    }
}
