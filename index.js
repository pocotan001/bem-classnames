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

  /**
   * @param {Array} array
   * @return {Array}
   */
  function uniq(array) {
    return array.filter(function(el, i) {
      return !!(el.trim()) && array.indexOf(el) === i;
    });
  }

  /**
   * @param {string} className
   * @return {string[]}
   */
  function split(className) {
    return className.trim().split(/ +/);
  }

  /**
   * @param {string[]} classNames
   * @return {string}
   */
  function toString(classNames) {
    return classNames.join(' ').trim();
  }

  /**
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
   * @param {string[]} propNames
   * @param {Object} props
   * @param {string} prefix
   * @return {string[]}
   */
  function getClassNamesByProps(propNames, props, prefix) {
    return propNames
      .filter(function(name) {
        return !!props[name];
      })
      .map(function(name) {
        return prefix + (typeof props[name] === 'boolean' ? name : props[name]);
      });
  }

  /**
   * @param {Object} classes
   * @param {...Object|string} [props|className]
   * @return {string}
   */
  function cx(classes/* , [...props|className] */) {
    var args = Array.prototype.slice.call(arguments).slice(1);
    var classNames = [];

    if (!classes) {
      return '';
    }

    Object.keys(classes).forEach(function(name) {
      if (typeof classes[name] === 'string') {
        classNames = classNames.concat(split(classes[name]));
      } else {
        args.forEach(function (arg) {
          switch (!!arg && typeof arg) {
            case 'string':
              classNames = classNames.concat(split(arg));
              break;
            case 'object':
              classNames = classNames.concat(
                getClassNamesByProps(classes[name], arg, detectPrefix(name, classes))
              );
              break;
            default:
          }
        });
      }
    });

    return toString(uniq(classNames));
  }

  cx.prefixes = prefixes;

  return cx;
}));
