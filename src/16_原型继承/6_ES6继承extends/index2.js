"use strict";

function _possibleConstructorReturn (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Parent = function Parent () {
  _classCallCheck(this, Parent);
};

var Child = function (_Parent) {
  _inherits(Child, _Parent);

  function Child () {
    _classCallCheck(this, Child);
    return _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this));
  }

  return Child;
}(Parent);
