"use strict";
const common_vendor = require("../../common/vendor.js");
const wInput = () => "../../components/watch-login/watch-input.js";
const wButton = () => "../../components/watch-login/watch-button.js";
const _sfc_main = {
  data() {
    return {
      phoneData: "",
      passData: "",
      isRotate: false,
      isFocus: true
    };
  },
  components: {
    wInput,
    wButton
  },
  methods: {
    startLogin(e) {
      console.log("\u767B\u5F55\u6210\u529F");
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    },
    login_weixin() {
      common_vendor.index.showToast({
        icon: "none",
        position: "bottom",
        title: "..."
      });
    },
    login_weibo() {
      common_vendor.index.showToast({
        icon: "none",
        position: "bottom",
        title: "..."
      });
    },
    login_github() {
      common_vendor.index.showToast({
        icon: "none",
        position: "bottom",
        title: "..."
      });
    }
  }
};
if (!Array) {
  const _component_wInput = common_vendor.resolveComponent("wInput");
  const _component_wButton = common_vendor.resolveComponent("wButton");
  (_component_wInput + _component_wButton)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.logoImage,
    b: common_vendor.o(($event) => $data.phoneData = $event),
    c: common_vendor.p({
      type: "text",
      maxlength: "11",
      placeholder: "\u7528\u6237\u540D/\u7535\u8BDD",
      focus: $data.isFocus,
      modelValue: $data.phoneData
    }),
    d: common_vendor.o(($event) => $data.passData = $event),
    e: common_vendor.p({
      type: "password",
      maxlength: "11",
      placeholder: "\u5BC6\u7801",
      modelValue: $data.passData
    }),
    f: common_vendor.o($options.startLogin),
    g: common_vendor.p({
      text: "\u767B \u5F55",
      rotate: $data.isRotate
    }),
    h: common_vendor.o((...args) => $options.login_weixin && $options.login_weixin(...args)),
    i: common_vendor.o((...args) => $options.login_weibo && $options.login_weibo(...args)),
    j: common_vendor.o((...args) => $options.login_github && $options.login_github(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/mystream/HBuilderProjects/oceanData1/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
