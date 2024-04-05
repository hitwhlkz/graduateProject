"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      chartData: {},
      opts: {
        color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
        padding: [5, 5, 5, 5],
        dataLabel: false,
        dataPointShape: false,
        enableScroll: false,
        legend: {
          show: true,
          position: "right",
          lineHeight: 25
        },
        extra: {
          radar: {
            gridType: "circle",
            gridColor: "#CCCCCC",
            gridCount: 3,
            opacity: 0.2,
            max: 200,
            labelShow: true,
            axisLabel: true,
            gridEval: 2,
            border: true
          }
        }
      }
    };
  },
  onReady() {
    this.getServerData();
  },
  methods: {
    getServerData() {
      setTimeout(() => {
        let res = {
          categories: ["\u7EF4\u5EA61", "\u7EF4\u5EA62", "\u7EF4\u5EA63", "\u7EF4\u5EA64", "\u7EF4\u5EA65", "\u7EF4\u5EA66"],
          series: [
            {
              name: "\u6210\u4EA4\u91CF1",
              data: [90, 110, 165, 195, 187, 172]
            },
            {
              name: "\u6210\u4EA4\u91CF2",
              data: [190, 210, 105, 35, 27, 102]
            }
          ]
        };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    }
  }
};
if (!Array) {
  const _easycom_qiun_data_charts2 = common_vendor.resolveComponent("qiun-data-charts");
  _easycom_qiun_data_charts2();
}
const _easycom_qiun_data_charts = () => "../../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.js";
if (!Math) {
  _easycom_qiun_data_charts();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "radar",
      opts: $data.opts,
      chartData: $data.chartData
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/mystream/HBuilderProjects/oceanData1/pages/data/data.vue"]]);
wx.createPage(MiniProgramPage);
