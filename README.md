# AutomatonKit
This is a library for designing and running finite automata.

**NOTE: This library is still in development, and has not been super thoroughly tested. If you encounter issues with its performance, please submit an issue to the repository so we can try to fix it!**

## Installation
You should be able to install the library with the following command:
```
npm install git+https://github.com/Meorge/automaton-ts.git
```

## Example usage
Here's a sample snippet of code adapted from one of the test cases:
```ts
// Import the relevant classes
import DFAState from 'automaton-kit/lib/dfa/DFAState';
import DFA from 'automaton-kit/lib/dfa/DFA';
import DFATransition from 'automaton-kit/lib/dfa/DFATransition';
import DFARunner, { DFARunnerStatus } from 'automaton-kit/lib/dfa/DFARunner';

// Create states for the DFA
let q0 = new DFAState();
let q1 = new DFAState();

// Create the DFA itself
let dfa = new DFA();
dfa.states = [q0, q1];  // Set (array) of states
dfa.inputAlphabet = ["a", "b"];  // Set (array) of input alphabet tokens
dfa.transitions = [  // Transition function (array of valid transitions)
  new DFATransition(q0, "a", q1),
  new DFATransition(q0, "b", q0),
  new DFATransition(q1, "a", q1),
  new DFATransition(q1, "b", q1)
];
dfa.startState = q0;  // Single state that is the initial state
dfa.acceptStates = [q1];  // Set (array) of states that will cause it to accept

// Create a DFARunner to run the DFA on the string 'baba'
// Since there is at least one a, it should accept
let runner = new DFARunner(dfa, ['b', 'a', 'b', 'a']);
runner.runUntilConclusion();
let result = runner.getStatus();
console.log(`Result was ${result}, should be ${DFARunnerStatus.Accepted}`);

// Run the DFA on the string 'bbbb'
// Since there are no a's, it should reject
let runner2 = new DFARunner(dfa, ['b', 'b', 'b', 'b']);
runner2.runUntilConclusion();
let result2 = runner2.getStatus();
console.log(`Result was ${result2}, should be ${DFARunnerStatus.Rejected}`);
```