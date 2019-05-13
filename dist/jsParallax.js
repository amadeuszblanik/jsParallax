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
    _classCallCheck(this, JsParallax);

    this.state = {
      data: elements
    };
  }

  _createClass(JsParallax, [{
    key: "makeMovement",
    value: function makeMovement(element) {
      var selector = _typeof(element.selector) === "object" ? element.selector.current : document.querySelector(element.selector);

      if (_typeof(selector) === "object") {
        var isInView = false;

        if (typeof selector.getBoundingClientRect === "function") {
          isInView = selector.getBoundingClientRect().top <= window.innerHeight && selector.getBoundingClientRect().bottom >= 0;
        } else {
          console.log("Selector doesn't have getBoundingClientRect()", {
            selector: selector
          });
        }

        if (isInView) {
          var valueCurr = (selector.getBoundingClientRect().bottom / (selector.offsetTop + selector.clientHeight)).toFixed(2);
          var valueCurrWindow = (window.scrollY / window.innerHeight).toFixed(2);
          var style = "";
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = element.values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var value = _step.value;
              var valueToSet = false;

              if (value.type == "window") {
                valueToSet = valueCurrWindow * value.to;
              } else {
                valueToSet = valueCurr * value.to;
              }

              if (valueToSet < value.from) {
                valueToSet = value.from;
              } else if (valueToSet > value.to) {
                valueToSet = value.to;
              }

              style += "--" + value.name + ": " + valueToSet + value.unit + ";";
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

          selector.style = style;
        }
      } else {
        console.warn("Selector is not an object", {
          selector: selector
        });
      }
    }
  }, {
    key: "mount",
    value: function mount() {
      var _this = this;

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        var _loop = function _loop() {
          var element = _step2.value;

          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") {
            _this.makeMovement(element);

            window.addEventListener("scroll", function (event) {
              return _this.makeMovement(element);
            });
          } else {
            console.warn("Window is not an object!");
          }
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
  }]);

  return JsParallax;
}();

exports["default"] = JsParallax;