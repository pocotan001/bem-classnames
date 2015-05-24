var assert = require('assert');
var cx = require('./');

describe('cx', function() {

  cx.prefixes.modifiers = '-';
  cx.prefixes.foo = '{name}-_-';

  var classes = {
    name: 'button',
    modifiers: ['color', 'size', 'block'],
    states: ['loading', 'disabled'],
    foo: ['bar', 'baz'],
  };

  it('should return empty string', function() {
    assert.equal(cx(), '');
  });

  it('should return block name', function() {
    assert.equal(cx(classes), 'button');
  });

  it('should ignore, except for string and objects', function() {
    assert.equal(cx(classes, 0, null, undefined, true, 1, { color: 'green' }, 'a'), 'button -green a');
  });

  it('should return modifiers', function() {
    assert.equal(cx(classes, { color: 'green', size: 'xl' }), 'button -green -xl');
    assert.equal(cx(classes, { block: true }), 'button -block');
    assert.equal(cx(classes, { color: 'green' }, { block: true }), 'button -green -block');
  });

  it('should return states', function() {
    assert.equal(cx(classes, { loading: true, disabled: false }), 'button is-loading');
    assert.equal(cx(classes, { loading: true }, { disabled: true }), 'button is-loading is-disabled');
	});

  it('should return custom rules', function() {
    assert.equal(cx(classes, { bar: true, baz: true }), 'button button-_-bar button-_-baz');
	});

  it('supports a string of class names', function() {
    assert.equal(cx(classes, 'a', 'b c'), 'button a b c');
    assert.equal(cx(classes, { color: 'green' }, 'a'), 'button -green a');
  });

  it('should be trimmed', function() {
    assert.equal(cx(classes, '', ' b  ', ' '), 'button b');
  });

  it('should dedupe', function () {
		assert.equal(cx(classes, 'foo', 'bar', 'foo', 'bar'), 'button foo bar');
	});

  it('should be custom prefixes', function () {
		assert.equal(cx.prefixes.modifiers, '-');
    assert.equal(cx(classes, { color: 'green', bar: true }), 'button -green button-_-bar');
	});

});
