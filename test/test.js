'use strict';

const expect = require('chai').expect;

const { default: DFAState } = require('../lib/dfa/DFAState');
const { default: DFA } = require('../lib/dfa/DFA');
const { default: DFATransition } = require('../lib/dfa/DFATransition');
const { default: DFARunner, DFARunnerStatus } = require('../lib/dfa/DFARunner');

function runAcceptAndRejectTests(dfa, stringsToAccept, stringsToReject) {
  it('should not have errors', () => {
    expect(dfa.getErrors().length).to.equal(0);
  });

  stringsToAccept.forEach((s) => {
    it(`should accept the string \'${s}\'`, () => {
      let runner = new DFARunner(dfa, s);
      runner.runUntilConclusion();
      expect(runner.getStatus()).to.equal(DFARunnerStatus.Accepted);
    });
  });

  stringsToReject.forEach(s => {
    it(`should reject the string \'${s}\'`, () => {
      let runner = new DFARunner(dfa, s);
      runner.runUntilConclusion();
      expect(runner.getStatus()).to.equal(DFARunnerStatus.Rejected);
    });
  });
}

describe('create a DFA accepting strings with at least one \'a\'', () => {
  var q0 = new DFAState();
  var q1 = new DFAState();

  var dfa = new DFA();
  dfa.states = [q0, q1];
  dfa.inputAlphabet = ["a", "b"];
  dfa.transitions = [
    new DFATransition(q0, "a", q1),
    new DFATransition(q0, "b", q0),

    new DFATransition(q1, "a", q1),
    new DFATransition(q1, "b", q1)
  ];
  dfa.startState = q0;
  dfa.acceptStates = [q1];

  let stringsToAccept = ['baba', 'aaaa', 'a', 'bbbba', 'bbab', 'abbbabb'].map(a => a.split(''));
  let stringsToReject = ['b', 'bbb', 'bb', 'bbbbbb'].map(a => a.split(''));

  runAcceptAndRejectTests(dfa, stringsToAccept, stringsToReject);
});

describe('give an error when the the start state is invalid', () => {
  let dfa = new DFA();
  let q0 = new DFAState("q0");
  dfa.startState = q0;
  let errorStrings = dfa.getErrors().map(e => e.errorString());
  it('should return the error \'Start state \"q0\" is invalid\'', () => {
    expect(errorStrings[0]).to.equal('Start state "q0" is invalid');
  });
});

describe('give an error when the the start state is not provided', () => {
  let dfa = new DFA();
  let errorStrings = dfa.getErrors().map(e => e.errorString());
  it('should return the error \'Start state is not provided\'', () => {
    expect(errorStrings[0]).to.equal('Start state is not provided');
  });
});

describe('give an error when a state has no transitions', () => {
  let dfa = new DFA();
  let q0 = new DFAState("q0");
  dfa.inputAlphabet = ["a"];
  dfa.states = [q0];
  dfa.startState = q0;

  let errorStrings = dfa.getErrors().map(e => e.errorString());
  it('should return the error \'State "q0" has 0 transitions for token "a" when it should have exactly 1\'', () => {
    expect(errorStrings[0]).to.equal('State "q0" has 0 transitions for token "a" when it should have exactly 1');
  });
});

describe('give an error when a state has too many transitions', () => {
  let dfa = new DFA();
  let q0 = new DFAState("q0");
  let q1 = new DFAState("q1");
  dfa.inputAlphabet = ["a"];
  dfa.states = [q0, q1];
  dfa.startState = q0;
  dfa.transitions = [
    new DFATransition(q0, "a", q0),
    new DFATransition(q0, "a", q1),

    new DFATransition(q1, "a", q1),
  ];

  let errorStrings = dfa.getErrors().map(e => e.errorString());
  it('should return the error \'State "q0" has 2 transitions for token "a" when it should have exactly 1\'', () => {
    expect(errorStrings[0]).to.equal('State "q0" has 2 transitions for token "a" when it should have exactly 1');
  });
});