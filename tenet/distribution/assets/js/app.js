(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict"; // import functions

var _classlist_polyfill = _interopRequireDefault(require("./modules/classlist_polyfill"));

var _foreach_polyfill = _interopRequireDefault(require("./modules/foreach_polyfill"));

var _focus_accessibility = _interopRequireDefault(require("./modules/focus_accessibility"));

var _type_ratio_interpolation = _interopRequireDefault(require("./modules/type_ratio_interpolation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
    polyfill to enable use of forEach on node lists in IE11
*/
(0, _foreach_polyfill["default"])();
/*
    polyfill to allow use of replace method
    on a classList in internet explorer
*/

(0, _classlist_polyfill["default"])();
/*
    interpolate between type ratio minimum and maximum values,
    and store the result in a CSS custom property
*/

(0, _type_ratio_interpolation["default"])();
/*
    allow enchanced focus detection (depends on a11y.js)
*/

(0, _focus_accessibility["default"])();

},{"./modules/classlist_polyfill":2,"./modules/focus_accessibility":3,"./modules/foreach_polyfill":4,"./modules/type_ratio_interpolation":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/*
    polyfill to allow use of replace method on a classList in internet explorer
*/
function _default() {
  if (!("replace" in document.createElement("_").classList)) {
    DOMTokenList.prototype.replace = function (token, replacementToken) {
      var tokens = this.toString().split(" ");
      var index = tokens.indexOf(token + "");

      if (~index) {
        tokens = tokens.slice(index);
        this.remove.apply(this, tokens);
        this.add(replacementToken);
        this.add.apply(this, tokens.slice(1));
      }
    };
  }
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/*
    allow enchanced focus detection (depends on a11y.js)
*/
function _default() {
  /* global ally */
  // inform the developer that a11y.js has loaded
  console.info("loaded version", ally.version, "of a11y.js"); // detect focus source using a11y.js, which will be stored
  // as CSS classes on the `html` element

  var focusSource = ally.style.focusSource(); // eslint-disable-line no-unused-vars
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/*
    polyfill to enable use of forEach on node lists in IE11
*/
function _default() {
  if ("NodeList" in window && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;

      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function scaleRatio(currentViewportWidth, minimumValue, maximumValue) {
  // store the minimum viewport width at which `--ratio`
  // custom property will be set. this must match values
  // set in `breakpoints.styl` & `typography.styl`.
  var minRange = 480; // store the maximum viewport width at which `--ratio`
  // custom property will be set. this must match values
  // set in `breakpoints.styl` & `typography.styl`.

  var maxRange = 1680; // calculate and store the rate at wich our ratio changes
  // when the viewport width changes by 1px

  var rateOfChange = (maximumValue - minimumValue) / (maxRange - minRange); // store the intercept (the value of Y when all X=0)

  var valueAtViewportZero = minimumValue - rateOfChange * minRange; // if we follow a linear progression from ratio m at viewport M,
  // to ratio n at viewport N, calculate and store the ratio at viewport X

  var interpolatedRatio = currentViewportWidth * rateOfChange + valueAtViewportZero; // use `interpolatedRatio` value if it's within range.
  // if it would be smaller than the smallest acceptable ratio, use the smallest.
  // if it would be larger than the largest acceptable ratio, use the largest.

  var boundedRatio = Math.max(minimumValue, Math.min(interpolatedRatio, maximumValue)); // store final ratio in CSS custom property `--ratio`

  document.documentElement.style.setProperty("--ratio", boundedRatio);
}
/*
    interpolate between type ratio minimum and maximum values,
    and store the result in a CSS custom property
*/


function _default() {
  // store the lowest ratio to use for our typographic scale.
  // This must match the value set in `typographic-variables.styl`.
  var typeRatioLow = 1.16; // store the highest ratio to use for our typographic scale.
  // This must match the value set in `typographic-variables.styl`.

  var typeRatioHigh = 1.28; // store the current viewport width

  var screenWidth = window.innerWidth; // apply the ratio scaling function, to apply
  // the ratio for the current viewport width

  scaleRatio(screenWidth, typeRatioLow, typeRatioHigh); // watch for change in the viewport width

  window.addEventListener("resize", function () {
    // store the current viewport width
    var screenWidth = window.innerWidth; // recalculate ratio when change is detected

    scaleRatio(screenWidth, typeRatioLow, typeRatioHigh);
  });
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL0Rvd25sb2Fkcy9ub2RlX21vZHVsZXNfZm9yX190aGVfYm9uZXlhcmQvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4uL2J1aWxkX2Fzc2V0cy9qcy9hcHAuanMiLCIuLi9idWlsZF9hc3NldHMvanMvbW9kdWxlcy9jbGFzc2xpc3RfcG9seWZpbGwuanMiLCIuLi9idWlsZF9hc3NldHMvanMvbW9kdWxlcy9mb2N1c19hY2Nlc3NpYmlsaXR5LmpzIiwiLi4vYnVpbGRfYXNzZXRzL2pzL21vZHVsZXMvZm9yZWFjaF9wb2x5ZmlsbC5qcyIsIi4uL2J1aWxkX2Fzc2V0cy9qcy9tb2R1bGVzL3R5cGVfcmF0aW9faW50ZXJwb2xhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLGEsQ0FDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDZSxvQkFBWTtBQUN2QixNQUFJLEVBQUUsYUFBYSxRQUFRLENBQUMsYUFBVCxDQUF1QixHQUF2QixFQUE0QixTQUEzQyxDQUFKLEVBQTJEO0FBQ3ZELElBQUEsWUFBWSxDQUFDLFNBQWIsQ0FBdUIsT0FBdkIsR0FBaUMsVUFBVSxLQUFWLEVBQWlCLGdCQUFqQixFQUFtQztBQUNoRSxVQUFJLE1BQU0sR0FBRyxLQUFLLFFBQUwsR0FBZ0IsS0FBaEIsQ0FBc0IsR0FBdEIsQ0FBYjtBQUNBLFVBQU0sS0FBSyxHQUFJLE1BQU0sQ0FBQyxPQUFQLENBQWUsS0FBSyxHQUFHLEVBQXZCLENBQWY7O0FBQ0EsVUFBSSxDQUFDLEtBQUwsRUFBWTtBQUNSLFFBQUEsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFQLENBQWEs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bGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuLy8gaW1wb3J0IGZ1bmN0aW9uc1xuaW1wb3J0IENsYXNzTGlzdFBvbHlmaWxsIGZyb20gXCIuL21vZHVsZXMvY2xhc3NsaXN0X3BvbHlmaWxsXCI7XG5pbXBvcnQgRm9yRWFjaFBvbHlmaWxsIGZyb20gXCIuL21vZHVsZXMvZm9yZWFjaF9wb2x5ZmlsbFwiO1xuaW1wb3J0IEZvY3VzQWNjZXNzaWJpbGl0eSBmcm9tIFwiLi9tb2R1bGVzL2ZvY3VzX2FjY2Vzc2liaWxpdHlcIjtcbmltcG9ydCBUeXBlUmF0aW9JbnRlcnBvbGF0aW9uIGZyb20gXCIuL21vZHVsZXMvdHlwZV9yYXRpb19pbnRlcnBvbGF0aW9uXCI7XG4vKlxuICAgIHBvbHlmaWxsIHRvIGVuYWJsZSB1c2Ugb2YgZm9yRWFjaCBvbiBub2RlIGxpc3RzIGluIElFMTFcbiovXG5Gb3JFYWNoUG9seWZpbGwoKTtcbi8qXG4gICAgcG9seWZpbGwgdG8gYWxsb3cgdXNlIG9mIHJlcGxhY2UgbWV0aG9kXG4gICAgb24gYSBjbGFzc0xpc3QgaW4gaW50ZXJuZXQgZXhwbG9yZXJcbiovXG5DbGFzc0xpc3RQb2x5ZmlsbCgpO1xuLypcbiAgICBpbnRlcnBvbGF0ZSBiZXR3ZWVuIHR5cGUgcmF0aW8gbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXMsXG4gICAgYW5kIHN0b3JlIHRoZSByZXN1bHQgaW4gYSBDU1MgY3VzdG9tIHByb3BlcnR5XG4qL1xuVHlwZVJhdGlvSW50ZXJwb2xhdGlvbigpO1xuLypcbiAgICBhbGxvdyBlbmNoYW5jZWQgZm9jdXMgZGV0ZWN0aW9uIChkZXBlbmRzIG9uIGExMXkuanMpXG4qL1xuRm9jdXNBY2Nlc3NpYmlsaXR5KCk7XG4iLCIvKlxuICAgIHBvbHlmaWxsIHRvIGFsbG93IHVzZSBvZiByZXBsYWNlIG1ldGhvZCBvbiBhIGNsYXNzTGlzdCBpbiBpbnRlcm5ldCBleHBsb3JlclxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIShcInJlcGxhY2VcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiX1wiKS5jbGFzc0xpc3QpKSB7XG4gICAgICAgIERPTVRva2VuTGlzdC5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uICh0b2tlbiwgcmVwbGFjZW1lbnRUb2tlbikge1xuICAgICAgICAgICAgbGV0IHRva2VucyA9IHRoaXMudG9TdHJpbmcoKS5zcGxpdChcIiBcIik7XG4gICAgICAgICAgICBjb25zdCBpbmRleCAgPSB0b2tlbnMuaW5kZXhPZih0b2tlbiArIFwiXCIpO1xuICAgICAgICAgICAgaWYgKH5pbmRleCkge1xuICAgICAgICAgICAgICAgIHRva2VucyA9IHRva2Vucy5zbGljZShpbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUuYXBwbHkodGhpcywgdG9rZW5zKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChyZXBsYWNlbWVudFRva2VuKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZC5hcHBseSh0aGlzLCB0b2tlbnMuc2xpY2UoMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsIi8qXG4gICAgYWxsb3cgZW5jaGFuY2VkIGZvY3VzIGRldGVjdGlvbiAoZGVwZW5kcyBvbiBhMTF5LmpzKVxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgICAvKiBnbG9iYWwgYWxseSAqL1xuICAgIC8vIGluZm9ybSB0aGUgZGV2ZWxvcGVyIHRoYXQgYTExeS5qcyBoYXMgbG9hZGVkXG4gICAgY29uc29sZS5pbmZvKFwibG9hZGVkIHZlcnNpb25cIiwgYWxseS52ZXJzaW9uLCBcIm9mIGExMXkuanNcIik7XG4gICAgLy8gZGV0ZWN0IGZvY3VzIHNvdXJjZSB1c2luZyBhMTF5LmpzLCB3aGljaCB3aWxsIGJlIHN0b3JlZFxuICAgIC8vIGFzIENTUyBjbGFzc2VzIG9uIHRoZSBgaHRtbGAgZWxlbWVudFxuICAgIGNvbnN0IGZvY3VzU291cmNlID0gYWxseS5zdHlsZS5mb2N1c1NvdXJjZSgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG59XG4iLCIvKlxuICAgIHBvbHlmaWxsIHRvIGVuYWJsZSB1c2Ugb2YgZm9yRWFjaCBvbiBub2RlIGxpc3RzIGluIElFMTFcbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKFwiTm9kZUxpc3RcIiBpbiB3aW5kb3cgJiYgIU5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoKSB7XG4gICAgICAgIE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgICAgICB0aGlzQXJnID0gdGhpc0FyZyB8fCB3aW5kb3c7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXNbaV0sIGksIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImZ1bmN0aW9uIHNjYWxlUmF0aW8gKGN1cnJlbnRWaWV3cG9ydFdpZHRoLCBtaW5pbXVtVmFsdWUsIG1heGltdW1WYWx1ZSkge1xuICAgIC8vIHN0b3JlIHRoZSBtaW5pbXVtIHZpZXdwb3J0IHdpZHRoIGF0IHdoaWNoIGAtLXJhdGlvYFxuICAgIC8vIGN1c3RvbSBwcm9wZXJ0eSB3aWxsIGJlIHNldC4gdGhpcyBtdXN0IG1hdGNoIHZhbHVlc1xuICAgIC8vIHNldCBpbiBgYnJlYWtwb2ludHMuc3R5bGAgJiBgdHlwb2dyYXBoeS5zdHlsYC5cbiAgICBjb25zdCBtaW5SYW5nZSA9IDQ4MDtcbiAgICAvLyBzdG9yZSB0aGUgbWF4aW11bSB2aWV3cG9ydCB3aWR0aCBhdCB3aGljaCBgLS1yYXRpb2BcbiAgICAvLyBjdXN0b20gcHJvcGVydHkgd2lsbCBiZSBzZXQuIHRoaXMgbXVzdCBtYXRjaCB2YWx1ZXNcbiAgICAvLyBzZXQgaW4gYGJyZWFrcG9pbnRzLnN0eWxgICYgYHR5cG9ncmFwaHkuc3R5bGAuXG4gICAgY29uc3QgbWF4UmFuZ2UgPSAxNjgwO1xuICAgIC8vIGNhbGN1bGF0ZSBhbmQgc3RvcmUgdGhlIHJhdGUgYXQgd2ljaCBvdXIgcmF0aW8gY2hhbmdlc1xuICAgIC8vIHdoZW4gdGhlIHZpZXdwb3J0IHdpZHRoIGNoYW5nZXMgYnkgMXB4XG4gICAgY29uc3QgcmF0ZU9mQ2hhbmdlID0gKG1heGltdW1WYWx1ZSAtIG1pbmltdW1WYWx1ZSkgLyAobWF4UmFuZ2UgLSBtaW5SYW5nZSk7XG4gICAgLy8gc3RvcmUgdGhlIGludGVyY2VwdCAodGhlIHZhbHVlIG9mIFkgd2hlbiBhbGwgWD0wKVxuICAgIGNvbnN0IHZhbHVlQXRWaWV3cG9ydFplcm8gPSBtaW5pbXVtVmFsdWUgLSByYXRlT2ZDaGFuZ2UgKiBtaW5SYW5nZTtcbiAgICAvLyBpZiB3ZSBmb2xsb3cgYSBsaW5lYXIgcHJvZ3Jlc3Npb24gZnJvbSByYXRpbyBtIGF0IHZpZXdwb3J0IE0sXG4gICAgLy8gdG8gcmF0aW8gbiBhdCB2aWV3cG9ydCBOLCBjYWxjdWxhdGUgYW5kIHN0b3JlIHRoZSByYXRpbyBhdCB2aWV3cG9ydCBYXG4gICAgY29uc3QgaW50ZXJwb2xhdGVkUmF0aW8gPSBjdXJyZW50Vmlld3BvcnRXaWR0aCAqIHJhdGVPZkNoYW5nZSArIHZhbHVlQXRWaWV3cG9ydFplcm87XG4gICAgLy8gdXNlIGBpbnRlcnBvbGF0ZWRSYXRpb2AgdmFsdWUgaWYgaXQncyB3aXRoaW4gcmFuZ2UuXG4gICAgLy8gaWYgaXQgd291bGQgYmUgc21hbGxlciB0aGFuIHRoZSBzbWFsbGVzdCBhY2NlcHRhYmxlIHJhdGlvLCB1c2UgdGhlIHNtYWxsZXN0LlxuICAgIC8vIGlmIGl0IHdvdWxkIGJlIGxhcmdlciB0aGFuIHRoZSBsYXJnZXN0IGFjY2VwdGFibGUgcmF0aW8sIHVzZSB0aGUgbGFyZ2VzdC5cbiAgICBjb25zdCBib3VuZGVkUmF0aW8gPSBNYXRoLm1heChtaW5pbXVtVmFsdWUsIE1hdGgubWluKGludGVycG9sYXRlZFJhdGlvLCBtYXhpbXVtVmFsdWUpKTtcbiAgICAvLyBzdG9yZSBmaW5hbCByYXRpbyBpbiBDU1MgY3VzdG9tIHByb3BlcnR5IGAtLXJhdGlvYFxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tcmF0aW9cIiwgYm91bmRlZFJhdGlvKTtcbn1cbi8qXG4gICAgaW50ZXJwb2xhdGUgYmV0d2VlbiB0eXBlIHJhdGlvIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzLFxuICAgIGFuZCBzdG9yZSB0aGUgcmVzdWx0IGluIGEgQ1NTIGN1c3RvbSBwcm9wZXJ0eVxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBzdG9yZSB0aGUgbG93ZXN0IHJhdGlvIHRvIHVzZSBmb3Igb3VyIHR5cG9ncmFwaGljIHNjYWxlLlxuICAgIC8vIFRoaXMgbXVzdCBtYXRjaCB0aGUgdmFsdWUgc2V0IGluIGB0eXBvZ3JhcGhpYy12YXJpYWJsZXMuc3R5bGAuXG4gICAgY29uc3QgdHlwZVJhdGlvTG93ID0gMS4xNjtcbiAgICAvLyBzdG9yZSB0aGUgaGlnaGVzdCByYXRpbyB0byB1c2UgZm9yIG91ciB0eXBvZ3JhcGhpYyBzY2FsZS5cbiAgICAvLyBUaGlzIG11c3QgbWF0Y2ggdGhlIHZhbHVlIHNldCBpbiBgdHlwb2dyYXBoaWMtdmFyaWFibGVzLnN0eWxgLlxuICAgIGNvbnN0IHR5cGVSYXRpb0hpZ2ggPSAxLjI4O1xuICAgIC8vIHN0b3JlIHRoZSBjdXJyZW50IHZpZXdwb3J0IHdpZHRoXG4gICAgY29uc3Qgc2NyZWVuV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAvLyBhcHBseSB0aGUgcmF0aW8gc2NhbGluZyBmdW5jdGlvbiwgdG8gYXBwbHlcbiAgICAvLyB0aGUgcmF0aW8gZm9yIHRoZSBjdXJyZW50IHZpZXdwb3J0IHdpZHRoXG4gICAgc2NhbGVSYXRpbyhzY3JlZW5XaWR0aCwgdHlwZVJhdGlvTG93LCB0eXBlUmF0aW9IaWdoKTtcbiAgICAvLyB3YXRjaCBmb3IgY2hhbmdlIGluIHRoZSB2aWV3cG9ydCB3aWR0aFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICAgICAgLy8gc3RvcmUgdGhlIGN1cnJlbnQgdmlld3BvcnQgd2lkdGhcbiAgICAgICAgY29uc3Qgc2NyZWVuV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgLy8gcmVjYWxjdWxhdGUgcmF0aW8gd2hlbiBjaGFuZ2UgaXMgZGV0ZWN0ZWRcbiAgICAgICAgc2NhbGVSYXRpbyhzY3JlZW5XaWR0aCwgdHlwZVJhdGlvTG93LCB0eXBlUmF0aW9IaWdoKTtcbiAgICB9KTtcbn1cbiJdfQ==
