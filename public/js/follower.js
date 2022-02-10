
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cursor = /*#__PURE__*/function () {
  function Cursor(el) {
    var _this = this;

    _classCallCheck(this, Cursor);

    this.DOM = {
      el: el
    };
    this.DOM.el.style.opacity = 0;
    this.bounds = this.DOM.el.getBoundingClientRect();
    this.renderedStyles = {
      tx: {
        previous: 0,
        current: 0,
        amt: 0.2
      },
      ty: {
        previous: 0,
        current: 0,
        amt: 0.2
      },
      scale: {
        previous: 1,
        current: 1,
        amt: 0.2
      },
      opacity: {
        previous: 1,
        current: 1,
        amt: 0.2
      }
    };

    this.onMouseMoveEv = function () {
      _this.renderedStyles.tx.previous = _this.renderedStyles.tx.current = mouse.x - _this.bounds.width / 2;
      _this.renderedStyles.ty.previous = _this.renderedStyles.ty.previous = mouse.y - _this.bounds.height / 2;

      _gsap.gsap.to(_this.DOM.el, {
        duration: 0.9,
        ease: 'Power3.easeOut',
        opacity: 1
      });

      requestAnimationFrame(function () {
        return _this.render();
      });
      window.removeEventListener('mousemove', _this.onMouseMoveEv);
    };

    window.addEventListener('mousemove', this.onMouseMoveEv);
  }

  _createClass(Cursor, [{
    key: "enter",
    value: function enter() {
      this.renderedStyles['scale'].current = 4;
      this.renderedStyles['opacity'].current = 0.2;
    }
  }, {
    key: "leave",
    value: function leave() {
      this.renderedStyles['scale'].current = 1;
      this.renderedStyles['opacity'].current = 1;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      this.renderedStyles['tx'].current = mouse.x - this.bounds.width / 2;
      this.renderedStyles['ty'].current = mouse.y - this.bounds.height / 2;

      for (var key in this.renderedStyles) {
        this.renderedStyles[key].previous = (0, _utils.lerp)(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
      }

      this.DOM.el.style.transform = "translateX(".concat(this.renderedStyles['tx'].previous, "px) translateY(").concat(this.renderedStyles['ty'].previous, "px) scale(").concat(this.renderedStyles['scale'].previous, ")");
      this.DOM.el.style.opacity = this.renderedStyles['opacity'].previous;
      requestAnimationFrame(function () {
        return _this2.render();
      });
    }
  }]);

  return Cursor;
}();

exports.default = Cursor;