"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      chartData: {},
      chartData1: {},
      opts: {
        color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
        padding: [15, 10, 0, 15],
        dataLabel: false,
        dataPointShape: false,
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          gridType: "dash",
          dashLength: 2,
          data: [
            {
              min: 0,
              max: 150
            }
          ]
        },
        extra: {
          line: {
            type: "curve",
            width: 2,
            activeType: "hollow",
            linearType: "custom",
            onShadow: true,
            animation: "horizontal"
          }
        }
      },
      opts1: {
        color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
        padding: [5, 5, 5, 5],
        enableScroll: false,
        extra: {
          pie: {
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: true,
            borderWidth: 3,
            borderColor: "#FFFFFF",
            linearType: "custom"
          }
        }
      },
      vHeight: 50,
      title: "map",
      latitude: 37.489106,
      longitude: 121.953707,
      scale: 14,
      markers: [
        {
          id: 1,
          latitude: 37.489106,
          longitude: 121.953707,
          iconPath: "../../../static/icon/located.png",
          title: "\u4F20\u611F\u56681"
        }
      ]
    };
  },
  onReady() {
    this.getServerData();
  },
  methods: {
    markerTap(e) {
      console.log(e);
      console.log("marker\u88AB\u70B9\u51FB\u4E86\uFF0Cid\u4E3A\uFF1A" + e.detail.markerId);
      this.$data.vHeight = 50;
    },
    getServerData() {
      setTimeout(() => {
        let res = {
          categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
          series: [
            {
              name: "\u5927\u6C14\u6E29\u5EA6",
              linearColor: [
                [
                  0,
                  "#1890FF"
                ],
                [
                  0.25,
                  "#00B5FF"
                ],
                [
                  0.5,
                  "#00D1ED"
                ],
                [
                  0.75,
                  "#00E6BB"
                ],
                [
                  1,
                  "#90F489"
                ]
              ],
              setShadow: [
                3,
                8,
                10,
                "#1890FF"
              ],
              data: [15, 45, 15, 45, 15, 45]
            },
            {
              name: "\u6C34\u4F53\u6E29\u5EA6",
              linearColor: [
                [
                  0,
                  "#FAC858"
                ],
                [
                  0.33,
                  "#FFC371"
                ],
                [
                  0.66,
                  "#FFC2B2"
                ],
                [
                  1,
                  "#FA7D8D"
                ]
              ],
              setShadow: [
                3,
                8,
                10,
                "#FC8452"
              ],
              data: [95, 125, 95, 125, 95, 125]
            }
          ]
        };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
      setTimeout(() => {
        let res1 = {
          series: [
            {
              data: [{ "name": "\u4E00\u73ED", "value": 50 }, { "name": "\u4E8C\u73ED", "value": 30 }, { "name": "\u4E09\u73ED", "value": 20 }, { "name": "\u56DB\u73ED", "value": 18 }, { "name": "\u4E94\u73ED", "value": 8 }]
            }
          ]
        };
        this.chartData1 = JSON.parse(JSON.stringify(res1));
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
    a: $data.vHeight + "%",
    b: $data.latitude,
    c: $data.scale,
    d: $data.longitude,
    e: $data.markers,
    f: common_vendor.o((...args) => $options.markerTap && $options.markerTap(...args)),
    g: common_vendor.p({
      type: "line",
      opts: $data.opts,
      chartData: $data.chartData
    }),
    h: common_vendor.p({
      type: "pie",
      opts: $data.opts1,
      chartData: $data.chartData1
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/mystream/HBuilderProjects/oceanData1/pages/map/map.vue"]]);
wx.createPage(MiniProgramPage);
