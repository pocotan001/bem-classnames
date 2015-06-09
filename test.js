var assert = require('assert');
var cx = require('./');

describe('cx', function() {

  var classes = {
    name: 'button',
    modifiers: ['color', 'block'],
    states: ['loading', 'disabled']
  };

  it('should return empty string', function() {
    assert.equal(cx(), '');
  });

  it('should return block name', function() {
    assert.equal(cx(classes), 'button');
  });

  it('should return modifiers', function() {
    assert.equal(cx(classes, { color: 'green' }), 'button button--green');
    assert.equal(cx(classes, { color: 'green', block: true }), 'button button--green button--block');
    assert.equal(cx(classes, { color: 'green' }, { block: true }), 'button button--green button--block');
  });

  it('should return states', function() {
    assert.equal(cx(classes, { loading: true }), 'button is-loading');
    assert.equal(cx(classes, { loading: true, disabled: true }), 'button is-loading is-disabled');
    assert.equal(cx(classes, { loading: true }, { disabled: true }), 'button is-loading is-disabled');
  });

  it('supports a string of class names', function() {
    assert.equal(cx({ name: 'button' }, 'a'), 'button a');
    assert.equal(cx(classes, 'a'), 'button a');
    assert.equal(cx(classes, 'a', 'b c'), 'button a b c');
  });

  it('supports an array of class names', function() {
    assert.equal(cx(classes, ['a']), 'button a');
    assert.equal(cx(classes, ['a'], ['b', 'c']), 'button a b c');
  });

  it('should ignore, except for valid objects', function() {
    assert.equal(cx(classes, null, undefined, 1, 0, true, false, '', { color: 'green' }, 'a', ['b', 'c']), 'button button--green a b c');
  });

  it('should be trimmed', function() {
    assert.equal(cx(classes, '', ' b  ', [' ']), 'button b');
  });

  it('should dedupe', function() {
    assert.equal(cx(classes, 'foo', 'bar', 'foo', 'bar'), 'button foo bar');
  });

  it('should be custom prefixes', function() {
    cx.prefixes.modifiers = '-';
    assert.equal(cx(classes, { color: 'green', block: true }), 'button -green -block');
  });

  it('should be custom rules', function() {
    cx.prefixes.foo = 'foo-';
    classes.foo = ['a', 'b'];
    assert.equal(cx(classes, { a: true, b: true }), 'button foo-a foo-b');
  });

});
