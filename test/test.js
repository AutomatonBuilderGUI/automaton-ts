'use strict';

const expect = require('chai').expect;

const { default: AutomatonState } = require('../lib/AutomatonState');
const { default: DFA } = require('../lib/dfa/DFA');
const { default: DFATransition } = require('../lib/dfa/DFATransition');
const { default: DFARunner, DFARunnerStatus } = require('../lib/dfa/DFARunner');

describe('create a DFA accepting strings with at least one \'a\'', () => {
  var dfa1 = new DFA();
  dfa1.states = [
    new AutomatonState(0,0),
    new AutomatonState(0,0)
  ];
  dfa1.inputAlphabet = ["a", "b"];
  dfa1.transitions = [
    new DFATransition(0, "a", 1),
    new DFATransition(0, "b", 0),

    new DFATransition(1, "a", 1),
    new DFATransition(1, "b", 1)
  ];
  dfa1.acceptStates = [1];

  it('should not have errors', () => {
    expect(dfa1.getErrors().length).to.equal(0);
  });

  let stringsToAccept = ['baba', 'aaaa', 'a', 'bbbba', 'bbab', 'abbbabb'].map(a => a.split(''));
  let stringsToReject = ['b', 'bbb', 'bb', 'bbbbbb'].map(a => a.split(''));

  stringsToAccept.forEach((s) => {
    it(`should accept the string \'${s}\'`, () => {
      let runner = new DFARunner(dfa1, s);
      runner.runUntilConclusion();
      expect(runner.getStatus()).to.equal(DFARunnerStatus.Accepted);
    });
  });

  stringsToReject.forEach(s => {
    it(`should reject the string \'${s}\'`, () => {
      let runner = new DFARunner(dfa1, s);
      runner.runUntilConclusion();
      expect(runner.getStatus()).to.equal(DFARunnerStatus.Rejected);
    });
  });

});
