(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory); // AMD
  } else if (typeof exports === 'object') {
    module.exports = factory(); // CommonJS
  } else {
    global.cx = factory(); // Globals
  }
}(this, function() {
  'use strict';

  var prefixes = {
    modifiers: '{name}--',
    states: 'is-'
  };

  var push  = Array.prototype.push;
  var slice = Array.prototype.slice;
  var toString = Object.prototype.toString;

  /**
   * toType([]) -> 'array'
   *
   * @param {*} object
   * @return {string}
   */
  function toType(object) {
    return toString.call(object).slice(8, -1).toLowerCase();
  }

  /**
   * is.array([]) -> true
   *
   * @param {*} object
   * @return {string}
   */
  var is = {};
  ['string', 'boolean', 'array', 'object'].forEach(function(type) {
    is[type] = function(object) {
      return toType(object) === type;
    };
  });

  /**
   * uniq(['a', 'b', 'a', 'b']) -> ['a', 'b']
   *
   * @param {Array} array
   * @return {Array}
   */
  function uniq(array) {
    return array.filter(function(el, i) {
      return array.indexOf(el) === i;
    });
  }

  /**
   * exclude([null, undefined, 1, 0, true, false, '', 'a', ' b  ']) -> ['a', 'b']
   *
   * @param {Array} array
   * @return {string[]}
   */
  function exclude(array) {
    return array
      .filter(function(el) {
        return is.string(el) && el.trim() !== '';
      })
      .map(function(className) {
        return className.trim();
      });
  }

  /**
   * split(' a  b  ') -> ['a', 'b']
   *
   * @param {string} className
   * @return {string[]}
   */
  function split(className) {
    return className.trim().split(/ +/);
  }

  /**
   * toClassName(['a', 'b']) -> 'a b'
   *
   * @param {string[]} names
   * @return {string}
   */
  function toClassName(names) {
    return names.join(' ').trim();
  }

  /**
   * detectPrefix('modifiers', { name: 'foo' }) -> 'foo--'
   *
   * @param {string} prefixName
   * @param {Object} classes
   * @return {string}
   */
  function detectPrefix(prefixName, classes) {
    return (prefixes[prefixName] || '').replace(/\{([\w-]*?)\}/g, function (match, p1) {
      return classes[p1] || '';
    });
  }

  /**
   * getClassNamesByProps(['a'], { a: 'foo' }, '-') -> [ '-foo' ]
   *
   * @param {string[]} propNames
   * @param {Object} props
   * @param {string} [prefix]
   * @return {string[]}
   */
  function getClassNamesByProps(propNames, props, prefix) {
    prefix = prefix || '';

    return propNames
      .filter(function(name) {
        return !!props[name];
      })
      .map(function(name) {
        return prefix + (is.boolean(props[name]) ? name : props[name]);
      });
  }

  /**
   * @param {Object} classes
   * @param {...Object|string} [props|className]
   * @return {string}
   */
  function cx(classes/* , [...props|className] */) {
    if (!classes) {
      return '';
    }

    var args = slice.call(arguments).slice(1);
    var classNames = [];

    Object.keys(classes).forEach(function(name) {
      switch (toType(classes[name])) {
        case 'string':
          push.apply(classNames, split(classes[name]));
          break;
        case 'array':
          args.forEach(function (arg) {
            if (is.object(arg)) {
              var names = getClassNamesByProps(classes[name], arg, detectPrefix(name, classes));
              push.apply(classNames, names);
            }
          });
          break;
        default:
      }
    });

    args.forEach(function (arg) {
      switch (toType(arg)) {
        case 'string':
          push.apply(classNames, split(arg));
          break;
        case 'array':
          push.apply(classNames, arg);
          break;
        default:
      }
    });

    return toClassName(exclude(uniq(classNames)));
  }

  cx.prefixes = prefixes;

  return cx;
}));
