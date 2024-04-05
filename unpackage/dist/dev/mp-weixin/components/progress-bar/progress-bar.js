"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "ranking-list",
  props: {
    content: {
      type: Array,
      default() {
        return [];
      }
    },
    isPC: {
      type: Boolean,
      default: false
    },
    isRank: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      progressWidth: 24,
      progressPadding: 10,
      maxNumber: 0,
      culCount: 0,
      copyContent: []
    };
  },
  watch: {
    content(newV) {
      this.init();
    }
  },
  methods: {
    init() {
      this.copyContent = this.deepClone(this.content);
      if (this.copyContent && this.copyContent.length > 0) {
        if (this.isRank) {
          this.copyContent = this.copyContent.sort((a, b) => b.num - a.num);
          this.maxNumber = this.copyContent[0].num;
        } else {
          this.maxNumber = Math.max.apply(Math, this.copyContent.map((item) => {
            return item.num;
          }));
        }
        this.copyContent.map((item, index) => {
          item.width = this.computeWidth(this.maxNumber, item.num);
        });
      }
    },
    computeWidth(max, current) {
      let num = current / max * 100;
      return num.toFixed(2);
    },
    deepClone(obj) {
      var cloneObj = new obj.constructor();
      if (obj === null)
        return obj;
      if (obj instanceof Date)
        return new Date(obj);
      if (obj instanceof RegExp)
        return new RegExp(obj);
      if (typeof obj !== "object")
        return obj;
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          cloneObj[i] = this.deepClone(obj[i]);
        }
      }
      return cloneObj;
    }
  },
  mounted() {
    if (this.isPC) {
      this.progressWidth = 40;
      this.progressPadding = 30;
    }
    this.init();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.copyContent.length > 0
  }, $data.copyContent.length > 0 ? {
    b: common_vendor.f($data.copyContent, (content, index, i0) => {
      return {
        a: common_vendor.t(content.name),
        b: content.background,
        c: content.width + "%",
        d: common_vendor.t(content.num),
        e: index
      };
    }),
    c: $data.progressWidth + "rpx",
    d: $data.progressPadding + "rpx"
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d1902091"], ["__file", "D:/mystream/HBuilderProjects/oceanData1/components/progress-bar/progress-bar.vue"]]);
wx.createComponent(Component);
