'use strict';

const expect = require('chai').expect;

const { default: DFA } = require('../lib/dfa/DFA');

describe('create DFA', () => {
  it('should return true', () => {
    expect('hello world').to.equal('hello world');
  });
});
