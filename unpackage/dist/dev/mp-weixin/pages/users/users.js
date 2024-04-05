"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      tittle: "users"
    };
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => _ctx.changeGray && _ctx.changeGray(...args)),
    b: common_vendor.o((...args) => _ctx.changeGray && _ctx.changeGray(...args)),
    c: common_vendor.o((...args) => _ctx.changeGray && _ctx.changeGray(...args)),
    d: common_vendor.o((...args) => _ctx.changeGray && _ctx.changeGray(...args)),
    e: common_vendor.o((...args) => _ctx.changeGray && _ctx.changeGray(...args)),
    f: common_vendor.o((...args) => _ctx.logout && _ctx.logout(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/mystream/HBuilderProjects/oceanData1/pages/users/users.vue"]]);
wx.createPage(MiniProgramPage);
