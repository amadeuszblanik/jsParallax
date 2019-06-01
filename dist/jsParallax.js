"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var JsParallax =
/*#__PURE__*/
function () {
  function JsParallax(elements) {
    var react = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var decimals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, JsParallax);

    //@todo: Better React support
    this.state = {
      react: react,
      //@todo: Better React support
      data: elements,
      decimals: decimals
    };
    this.mouse = {
      x: 0,
      y: 0
    };
  }

  _createClass(JsParallax, [{
    key: "isInView",
    value: function isInView(selector) {
      return selector.getBoundingClientRect().top <= window.innerHeight && selector.getBoundingClientRect().bottom >= 0;
    }
  }, {
    key: "querySelector",
    value: function querySelector(selector) {
      if (typeof selector === "string") {
        var element = document.querySelector(selector);

        if (_typeof(element) !== "object") {
          console.error("Can't query selector \"".concat(selector, "\" in your document"));
          return false;
        } else if (element === null) {
          console.error("Can't query selector \"".concat(selector, "\" in your document"));
          return false;
        } else {
          return element;
        }
      } else if (_typeof(selector) === "object") {
        if (!(selector instanceof HTMLElement)) {
          if (!this.state.react) {
            console.error("Provided element didn't exists in DOM", {
              selector: selector
            });
            return false;
          } else {
            if (true == false) {
              //@todo: Better React support
              console.error("Provided element is not valid React element", {
                selector: selector
              });
            } else {
              if (_typeof(selector.current) !== "object") {
                console.error("Provided element.current is not valid React element", {
                  selector: selector
                });
                return false;
              } else {
                return selector.current;
              }
            }
          }
        } else {
          return selector;
        }

        console.error("Unexpected error has occured");
        return false;
      } else {
        console.error("Selector must be defined as DOM Element, React ref or selector");
        return false;
      }

      console.error("Unexpected error has occured");
      return false;
    }
  }, {
    key: "calcDifference",
    value: function calcDifference(from, to, multiplier) {
      if (to == from) {
        return to;
      } else {
        return from + (to - from) * multiplier;
      }
    }
  }, {
    key: "makeWindow",
    value: function makeWindow(from, to) {
      var multipler = window.scrollY / (document.body.clientHeight - window.innerHeight);
      var response = parseFloat(this.calcDifference(from, to, multipler)).toFixed(this.state.decimals);

      if (from < to) {
        if (response > to) {
          return to;
        } else if (response < from) {
          return from;
        } else {
          return response;
        }
      } else if (from > to) {
        if (response < to) {
          return to;
        } else if (response > from) {
          return from;
        } else {
          return response;
        }
      }

      console.error("Unexpected error has occured!");
      return false;
    }
  }, {
    key: "makeScroll",
    value: function makeScroll(from, to, multipler, element) {
      if (!this.isInView(element)) {
        return false;
      } else {
        var response = parseFloat(this.calcDifference(from, to, multipler)).toFixed(this.state.decimals);

        if (from < to) {
          if (response > to) {
            return to;
          } else if (response < from) {
            return from;
          } else {
            return response;
          }
        } else if (from > to) {
          if (response < to) {
            return to;
          } else if (response > from) {
            return from;
          } else {
            return response;
          }
        }

        console.error("Unexpected error has occured!");
        return false;
      }
    }
  }, {
    key: "render",
    value: function render(values, element) {
      var style = "";
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var value = _step.value;
          var result = 0;

          if (value.type === "window") {
            result = this.makeWindow(value.from, value.to);
          } else if (value.type === "toTop") {
            result = this.makeScroll(value.from, value.to, element.getClientRects()[0].top / window.innerHeight, element);
          } else if (value.type === "toBottom") {
            result = this.makeScroll(value.from, value.to, element.getClientRects()[0].bottom / window.innerHeight, element);
          } else if (value.type === "mouseX") {
            result = this.makeScroll(value.from, value.to, this.mouse.x, element);
          } else if (value.type === "mouseY") {
            result = this.makeScroll(value.from, value.to, this.mouse.y, element);
          }

          style += "--".concat(value.name, ": ").concat(result).concat(value.unit, ";");
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (element === false) {
        console.warn("Unexpected error has occurred");
        return false;
      } else {
        element.style = style;
      }
    }
  }, {
    key: "updateMouse",
    value: function updateMouse(event) {
      this.mouse = {
        x: event.screenX / window.innerWidth,
        y: event.screenY / window.innerHeight
      };
    }
  }, {
    key: "mount",
    value: function mount() {
      var _this = this;

      if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== "object") {
        console.warn("This library works only in Client-Side Rendered JavaScripts.");
      } else {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          var _loop = function _loop() {
            var data = _step2.value;

            var element = _this.querySelector(data.selector);

            _this.render(data.values, element);

            window.addEventListener("scroll", function () {
              _this.render(data.values, element);
            });
            window.addEventListener("mousemove", function (evt) {
              _this.updateMouse(evt);

              _this.render(data.values, element);
            });
          };

          for (var _iterator2 = this.state.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            _loop();
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }
  }]);

  return JsParallax;
}();

exports["default"] = JsParallax;