<template>
  <view style="background-color: #333333; height: 100%;" id="content" class="content">
    <map id="map"  :style="{height:vHeight + '%'}" style="width: 100%;" :latitude="latitude" :scale="scale" :longitude="longitude" :markers="markers" @markertap="markerTap"></map>
	<scroll-view scroll-y="true" style="border-radius: 10px;background-color: aliceblue;" class="charts-box">
		<uni-table>
			<uni-tr>
				<uni-th align="center">传感器序列</uni-th>
				<uni-th align="center">所在坐标</uni-th>
				<uni-th align="center">状态</uni-th>
			</uni-tr>
			<uni-tr>
				<uni-td>fdsfsgds1234</uni-td>
				<uni-td>12.545;23.1561</uni-td>
				<uni-td>运行中</uni-td>
			</uni-tr>
		</uni-table>
		<view class="friend_operate">
			<view class="title">
				<text style="color:cornflowerblue;font-size: large;">大气水体温度对比</text>
			</view>
			<view class="charts-box">
				<qiun-data-charts
				  type="line"
				  :opts="opts"
				  :chartData="chartData"
				/>
			</view>
		</view>
		<view class="friend_operate">
			<view class="title">
				<text style="color:cornflowerblue;font-size: large;">水体参数</text>
			</view>
			<view class="charts-box">
				<qiun-data-charts
				  type="pie"
				  :opts="opts1"
				  :chartData="chartData1"
				/>
			</view>
		</view>
	  </scroll-view>
  </view>
</template>

<script>
export default {
	data() {
		return {
			modeClass: 'fade',
			chartData: {},
			chartData1: {},
			      //您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
			      opts: {
			        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
			        padding: [15,10,0,15],
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
				          color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
				          padding: [5,5,5,5],
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
			vHeight:100,
			title: 'map',
			latitude: 37.489106,
			longitude: 121.953707,
			scale: 14,
			markers: [{
			            id: 1,
			            latitude: 37.489106,
			            longitude: 121.953707,
			            iconPath: '../../../static/icon/located.png',
			            title: '传感器1'
			           }, 
					],
		}
	},
	 onReady() {
	    this.getServerData();
	  },
	methods: {
		markerTap(e) {
			console.log(e)
		                console.log('marker被点击了，id为：' + e.detail.markerId)
						if(this.$data.vHeight==100){
						for(var i =0;i<=100;i++){
								setTimeout(()=>{								
									this.$data.vHeight = this.$data.vHeight-0.5
								},50)
							}
						}
		            },
		getServerData() {
		      //模拟从服务器获取数据时的延时
		      setTimeout(() => {
		        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
		        let res = {
		            categories: ["2018","2019","2020","2021","2022","2023"],
		            series: [
		              {
		                name: "大气温度",
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
		                data: [15,45,15,45,15,45]
		              },
		              {
		                name: "水体温度",
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
		                data: [95,125,95,125,95,125]
		              }
		            ]
		          };
		        this.chartData = JSON.parse(JSON.stringify(res));
		      }, 500);
			  
			  setTimeout(() => {
			          //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
			          let res1 = {
			              series: [
			                {
			                  data: [{"name":"一班","value":50},{"name":"二班","value":30},{"name":"三班","value":20},{"name":"四班","value":18},{"name":"五班","value":8}]
			                }
			              ]
			            };
			          this.chartData1 = JSON.parse(JSON.stringify(res1));
			        }, 500);
			  
		    },
	}
}
</script>

<style>
page{
	background-color: #333333;
}
.friend_operate{
			padding: 30rpx 20rpx;
			.title{
				text-align:left;
				margin-bottom: 30rpx;
				font-size: 40rpx;
			}
		}
.head{
	text-align:left;
	margin-bottom: 30rpx;
	font-size: 40rpx;
}
.content {
  height: 100%;
  width: 100%;
}
</style>