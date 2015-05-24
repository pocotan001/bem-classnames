# bem-classnames

[![NPM Version](https://img.shields.io/npm/v/bem-classnames.svg)](https://npmjs.org/package/bem-classnames)
[![Circle CI](https://img.shields.io/circleci/project/pocotan001/bem-classnames.svg)](https://circleci.com/gh/pocotan001/bem-classnames)

``` sh
npm install bem-classnames
```

bem-classnames is a simple utility to manage BEM class names on React.

Inspired by [classnames](https://github.com/JedWatson/classnames).

## Usage

``` js
var cx = require('bem-classnames');

cx(/* classes, [...props|className] */);
```

**Simple**

``` js
var classes = {
  name: 'button',
  modifiers: ['color', 'block'],
  states: ['disabled']
};

cx(classes, { color: 'green', block: true });  // "button button--green button--block"
cx(classes, { disabled: true });  // "button is-disabled"
cx(classes, 'foo', 'bar baz');  // "button foo bar baz"
```

**Custom prefix**

``` js
// Default prefixes:
//
// cx.prefixes = {
//   modifiers: '{name}--',
//   states: 'is-'
// };

cx.prefixes.modifiers = '-';
cx(classes, { color: 'green' });  // "button -green"

// You can add the prefixes
cx.prefixes.foo = 'foo-';
classes.foo = ['a', 'b'];
cx(classes, { a: true, b: true });  // "button foo-a foo-b"
```

**with React and ES6**

``` js
class Button extends React.Component {
  render() {
    let classes = {
      name: 'button',
      modifiers: ['color', 'size'],
      states: ['disabled']
    };

    return (
      <button className={cx(classes, this.props, this.props.className)}>
        {this.props.children}
      </button>
    );
  }
}

React.render(
  <Button color="green" size="xl" disabled={true} className="a b">Alo!</Button>,
  document.getElementById('example')
);

// "button button--green button--xl a b is-disabled"
```
