"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    text: String,
    rotate: {
      type: [Boolean, String],
      default: false
    },
    bgColor: {
      type: String,
      default: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.6))"
    },
    fontColor: {
      type: String,
      default: "#FFFFFF"
    }
  },
  computed: {
    _rotate() {
      return String(this.rotate) !== "false";
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options._rotate
  }, $options._rotate ? {} : {}, {
    b: !$options._rotate
  }, !$options._rotate ? {
    c: common_vendor.t($props.text)
  } : {}, {
    d: common_vendor.n($options._rotate ? "rotate_loop" : ""),
    e: common_vendor.n(!$options._rotate ? "dlbutton" : "dlbutton_loading"),
    f: $props.bgColor,
    g: $props.fontColor,
    h: common_vendor.o(($event) => _ctx.$emit("click", $event)),
    i: common_vendor.o(($event) => _ctx.$emit("contact", $event)),
    j: common_vendor.o(($event) => _ctx.$emit("error", $event)),
    k: common_vendor.o(($event) => _ctx.$emit("getphonenumber", $event)),
    l: common_vendor.o(($event) => _ctx.$emit("getuserinfo", $event)),
    m: common_vendor.o(($event) => _ctx.$emit("launchapp", $event)),
    n: common_vendor.o(($event) => _ctx.$emit("longtap", $event)),
    o: common_vendor.o(($event) => _ctx.$emit("opensetting", $event)),
    p: common_vendor.o(($event) => _ctx.$emit("touchcancel", $event)),
    q: common_vendor.o(($event) => _ctx.$emit("touchend", $event)),
    r: common_vendor.o(($event) => _ctx.$emit("touchmove", $event)),
    s: common_vendor.o(($event) => _ctx.$emit("touchstart", $event))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/mystream/HBuilderProjects/oceanData1/components/watch-login/watch-button.vue"]]);
wx.createComponent(Component);
