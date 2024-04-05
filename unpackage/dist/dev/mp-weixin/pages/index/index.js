"use strict";
const common_vendor = require("../../common/vendor.js");
const CircleData = [
  {
    series: [
      {
        color: "#fff",
        data: 0.224,
        precent: "22.4%",
        index: 0,
        legendShape: "circle",
        name: "\u6E29\u5EA6",
        pointShape: "circle",
        show: true,
        type: "arcbar",
        value: "12786",
        backgroundColor: "#00AEF9"
      }
    ]
  },
  {
    series: [
      {
        color: "#fff",
        data: 0.3717,
        precent: "37.17%",
        index: 0,
        legendShape: "circle",
        name: "HR",
        pointShape: "circle",
        show: true,
        type: "arcbar",
        value: "1096",
        backgroundColor: "#F55676"
      }
    ]
  },
  {
    series: [
      {
        color: "#fff",
        data: 17e-4,
        precent: "0.17%",
        index: 0,
        legendShape: "circle",
        name: "PRS",
        pointShape: "circle",
        show: true,
        type: "arcbar",
        value: "147604",
        backgroundColor: "#FAB215"
      }
    ]
  },
  {
    series: [
      {
        color: "#fff",
        data: 0.6321,
        precent: "63.21%",
        index: 0,
        legendShape: "circle",
        name: "FS",
        pointShape: "circle",
        show: true,
        type: "arcbar",
        value: "173",
        backgroundColor: "#2EC693"
      }
    ]
  }
];
const series$1 = [
  {
    name: "FX",
    data: 500,
    color: "#2fc25b"
  },
  {
    name: "\u6700\u8FD1\u4F7F\u7528\u5C0F\u7A0B\u5E8F\u5217\u8868",
    data: 623,
    color: "#facc14"
  },
  {
    name: "\u624B\u673A\u7CFB\u7EDF",
    data: 123,
    color: "#f04864"
  },
  {
    name: "\u4EFB\u52A1\u680F\u6211\u7684\u5C0F\u7A0B\u5E8F",
    data: 96,
    color: "#8543e0"
  },
  {
    name: "\u5176\u4ED6",
    data: 423,
    color: "#51c2d5"
  }
];
const ProductRateData = {
  series: series$1
};
const categories = [
  "\u5468\u4E00",
  "\u5468\u4E8C",
  "\u5468\u4E09",
  "\u5468\u56DB",
  "\u5468\u4E94",
  "\u5468\u516D",
  "\u5468\u65E5"
];
const series = [
  {
    name: "\u8001\u4F1A\u5458",
    data: [
      1850,
      1660,
      1760,
      2360,
      1560,
      1970,
      2570
    ],
    type: "line",
    style: "curve",
    addPoint: true,
    color: "#DF297D",
    unit: ""
  },
  {
    name: "\u65B0\u4F1A\u5458",
    data: [
      450,
      260,
      360,
      560,
      460,
      170,
      570
    ],
    type: "line",
    style: "curve",
    addPoint: true,
    color: "#ff9900",
    unit: ""
  }
];
const yAxis = [
  {
    calibration: true,
    position: "left",
    min: 0,
    max: 3e3,
    title: "",
    titleFontSize: 12,
    unit: "\u4E07",
    tofix: 0
  }
];
const targetAdd = "9%";
const TrendData = {
  categories,
  series,
  yAxis,
  targetAdd
};
const ServiceComment = [
  {
    kind: 4,
    background: [
      "#0081ff",
      "#1cbbb4"
    ],
    content: [
      {
        text: "\u5DF2\u8BC4\u4EF7\u6570",
        value: "",
        colortext: "#fff",
        colorvalue: "",
        size: "24rpx"
      },
      {
        text: "",
        value: "161",
        colortext: "",
        colorvalue: "#fff",
        size: "44rpx"
      },
      {
        text: "\u589E\u957F",
        value: "",
        colortext: "#fff",
        colorvalue: "",
        size: "20rpx"
      },
      {
        text: "up",
        value: "325",
        colortext: "#fff",
        colorvalue: "#fff",
        size: "20rpx"
      }
    ]
  },
  {
    kind: 4,
    background: [
      "#0081ff",
      "#1cbbb4"
    ],
    content: [
      {
        text: "\u5E73\u5747\u5206",
        value: "",
        colortext: "#fff",
        colorvalue: "",
        size: "24rpx"
      },
      {
        text: "",
        value: "82",
        colortext: "",
        colorvalue: "#fff",
        size: "44rpx"
      },
      {
        text: "\u589E\u957F",
        value: "",
        colortext: "#fff",
        colorvalue: "",
        size: "20rpx"
      },
      {
        text: "up",
        value: "0.7",
        colortext: "#fff",
        colorvalue: "#fff",
        size: "20rpx"
      }
    ]
  },
  {
    kind: 4,
    background: [
      "#0081ff",
      "#1cbbb4"
    ],
    content: [
      {
        text: "\u597D\u8BC4\u7387",
        value: "",
        colortext: "#fff",
        colorvalue: "",
        size: "24rpx"
      },
      {
        text: "",
        value: "161",
        colortext: "",
        colorvalue: "#fff",
        size: "44rpx"
      },
      {
        text: "\u589E\u957F",
        value: "",
        colortext: "#fff",
        colorvalue: "",
        size: "20rpx"
      },
      {
        text: "down",
        value: "1.2%",
        colortext: "#fff",
        colorvalue: "#fff",
        size: "20rpx"
      }
    ]
  }
];
const RankData = [
  {
    name: "\u534E\u4E1C",
    num: 5e4,
    width: "",
    background: "#FFBE68"
  },
  {
    name: "\u534E\u5357",
    num: 3e4,
    width: "",
    background: "#0FEBE1"
  },
  {
    name: "\u534E\u5317",
    num: 45500,
    width: "",
    background: "#BF8DFC"
  },
  {
    name: "\u897F\u5317",
    num: 60120,
    width: "",
    background: "#FF859C"
  },
  {
    name: "\u897F\u5357",
    num: 26020,
    width: "",
    background: "#51ADCF"
  }
];
const ProgressBar = () => "../../components/progress-bar/progress-bar.js";
const _sfc_main = {
  name: "user-server",
  props: {
    scrollHeight: {
      type: String,
      default: "600px"
    }
  },
  components: {
    ProgressBar
  },
  data() {
    return {
      CircleData,
      TrendData,
      ProductRateData,
      ServiceComment,
      RankData,
      isRank: true,
      delayload: true
    };
  },
  onLoad() {
  },
  computed: {},
  methods: {
    async getData() {
      common_vendor.index.showLoading();
      await setTimeout(() => {
        this.delayload = true;
        common_vendor.index.hideLoading();
      }, 1e3);
    }
  },
  mounted() {
  }
};
if (!Array) {
  const _easycom_qiun_data_charts2 = common_vendor.resolveComponent("qiun-data-charts");
  const _component_text_block = common_vendor.resolveComponent("text-block");
  (_easycom_qiun_data_charts2 + _component_text_block)();
}
const _easycom_qiun_data_charts = () => "../../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.js";
if (!Math) {
  _easycom_qiun_data_charts();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e(common_vendor.e({
    a: common_vendor.f($data.CircleData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.series[0].name),
        b: common_vendor.t(item.series[0].value),
        c: "1cf27b2a-0-" + i0,
        d: common_vendor.p({
          type: "arcbar",
          chartData: item,
          canvasId: "four_a_" + index,
          canvas2d: _ctx.isCanvas2d,
          resshow: $data.delayload,
          opts: {
            title: {
              name: item.series[0].precent,
              color: item.series[0].color,
              fontSize: 15
            },
            subtitle: {
              name: "",
              color: "#666666",
              fontSize: 12
            },
            extra: {
              arcbar: {
                backgroundColor: item.series[0].backgroundColor
              }
            }
          }
        }),
        e: common_vendor.n("star" + index),
        f: common_vendor.n("star" + index),
        g: common_vendor.n("star" + index),
        h: common_vendor.n("star" + index),
        i: index,
        j: common_vendor.n("block_" + index)
      };
    }),
    b: $data.delayload
  }, $data.delayload ? {
    c: common_vendor.p({
      type: "ring",
      canvasId: "four_b",
      canvas2d: _ctx.isCanvas2d,
      resshow: $data.delayload,
      opts: {
        legend: {
          position: "bottom"
        },
        title: {
          name: ""
        },
        subtitle: {
          name: ""
        }
      },
      chartData: $data.ProductRateData
    })
  } : {}, {
    d: common_vendor.p({
      content: $data.ServiceComment
    }),
    e: $data.delayload
  }, $data.delayload ? {
    f: common_vendor.p({
      type: "mix",
      canvasId: "four_c",
      canvas2d: _ctx.isCanvas2d,
      resshow: $data.delayload,
      opts: {
        yAxis: {
          data: [{
            position: "left",
            title: "",
            min: 0,
            unit: "\u4E07"
          }]
        }
      },
      chartData: $data.TrendData
    })
  } : {}), {
    g: $props.scrollHeight
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/mystream/HBuilderProjects/oceanData1/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
