"use strict";
const common_vendor = require("../../common/vendor.js");
let countDown;
const _sfc_main = {
  data() {
    return {
      showPassword: false,
      second: 0,
      isRunCode: false
    };
  },
  props: {
    type: String,
    value: String,
    placeholder: String,
    maxlength: {
      type: [Number, String],
      default: 20
    },
    isShowPass: {
      type: [Boolean, String],
      default: false
    },
    isShowCode: {
      type: [Boolean, String],
      default: false
    },
    codeText: {
      type: String,
      default: "\u83B7\u53D6\u9A8C\u8BC1\u7801"
    },
    setTime: {
      type: [Number, String],
      default: 60
    },
    focus: {
      type: [Boolean, String],
      default: false
    }
  },
  model: {
    prop: "value",
    event: "input"
  },
  mounted() {
  },
  methods: {
    showPass() {
      this.showPassword = !this.showPassword;
    },
    setCode() {
      if (this.isRunCode) {
        return false;
      }
      this.$emit("setCode");
    },
    runCode(val) {
      if (String(val) == "0") {
        this.second = 0;
        clearInterval(countDown);
        this.isRunCode = false;
        return false;
      }
      if (this.isRunCode) {
        return false;
      }
      this.isRunCode = true;
      this.second = this._setTime;
      let _this = this;
      countDown = setInterval(function() {
        _this.second--;
        if (_this.second == 0) {
          _this.isRunCode = false;
          clearInterval(countDown);
        }
      }, 1e3);
    }
  },
  computed: {
    _type() {
      const type = this.type;
      return type == "password" ? "text" : type;
    },
    _isShowPass() {
      return String(this.isShowPass) !== "false";
    },
    _isShowCode() {
      return String(this.isShowCode) !== "false";
    },
    _setTime() {
      const setTime = Number(this.setTime);
      return setTime > 0 ? setTime : 60;
    },
    _focus() {
      return String(this.focus) !== "false";
    },
    getVerCodeSecond() {
      if (this.second <= 0) {
        return this.codeText;
      } else {
        if (this.second < 10) {
          return "0" + this.second;
        } else {
          return this.second;
        }
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.value,
    b: $options._type,
    c: $options._focus,
    d: $props.maxlength,
    e: $props.placeholder,
    f: $props.type === "password" && !$data.showPassword,
    g: common_vendor.o(($event) => _ctx.$emit("input", $event.detail.value)),
    h: common_vendor.o(($event) => _ctx.$emit("blur", $event)),
    i: common_vendor.o(($event) => _ctx.$emit("focus", $event)),
    j: common_vendor.o(($event) => _ctx.$emit("longpress", $event)),
    k: common_vendor.o(($event) => _ctx.$emit("confirm", $event)),
    l: common_vendor.o(($event) => _ctx.$emit("click", $event)),
    m: common_vendor.o(($event) => _ctx.$emit("longtap", $event)),
    n: common_vendor.o(($event) => _ctx.$emit("touchcancel", $event)),
    o: common_vendor.o(($event) => _ctx.$emit("touchend", $event)),
    p: common_vendor.o(($event) => _ctx.$emit("touchmove", $event)),
    q: common_vendor.o(($event) => _ctx.$emit("touchstart", $event)),
    r: $options._isShowPass && $props.type === "password" && !$options._isShowCode
  }, $options._isShowPass && $props.type === "password" && !$options._isShowCode ? {
    s: common_vendor.n($data.showPassword ? "cuIcon-attention" : "cuIcon-attentionforbid"),
    t: common_vendor.o((...args) => $options.showPass && $options.showPass(...args))
  } : {}, {
    v: $options._isShowCode && !$options._isShowPass
  }, $options._isShowCode && !$options._isShowPass ? {
    w: common_vendor.t($options.getVerCodeSecond),
    x: common_vendor.n({
      "vercode-run": $data.second > 0
    }),
    y: common_vendor.o((...args) => $options.setCode && $options.setCode(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/mystream/HBuilderProjects/oceanData1/components/watch-login/watch-input.vue"]]);
wx.createComponent(Component);
