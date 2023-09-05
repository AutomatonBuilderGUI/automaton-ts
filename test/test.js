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
  var dfa = new DFA();
  dfa.states = [
    new DFAState(),
    new DFAState()
  ];
  dfa.inputAlphabet = ["a", "b"];
  dfa.transitions = [
    new DFATransition(0, "a", 1),
    new DFATransition(0, "b", 0),

    new DFATransition(1, "a", 1),
    new DFATransition(1, "b", 1)
  ];
  dfa.acceptStates = [1];

  let stringsToAccept = ['baba', 'aaaa', 'a', 'bbbba', 'bbab', 'abbbabb'].map(a => a.split(''));
  let stringsToReject = ['b', 'bbb', 'bb', 'bbbbbb'].map(a => a.split(''));

  runAcceptAndRejectTests(dfa, stringsToAccept, stringsToReject);
});
