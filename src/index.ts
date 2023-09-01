import DFA from "./DFA";
import AutomatonState from "./AutomatonState";
import DFATransition from "./DFATransition";
import DFARunner from "./DFARunner";

let newDFA = new DFA(
    [
        new AutomatonState(0, 0),
        new AutomatonState(100, 0),
        new AutomatonState(200, 0),
    ],
    ["0", "1"],
    [
        new DFATransition(0, "0", 0),
        new DFATransition(0, "1", 1),

        new DFATransition(1, "0", 2),
        new DFATransition(1, "1", 1),

        new DFATransition(2, "0", 1),
        new DFATransition(2, "1", 1),
    ],
    0,
    [1]
);

let runner = new DFARunner(newDFA, ["1", "1", "0", "1"]);
runner.runUntilConclusion();
console.log(`String ${runner.getInitialInputTokens()} finished with result ${runner.getStatus()}`)

runner = new DFARunner(newDFA, ["1", "1", "0"]);
runner.runUntilConclusion();
console.log(`String ${runner.getInitialInputTokens()} finished with result ${runner.getStatus()}`)