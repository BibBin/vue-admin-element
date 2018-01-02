<template>
  <div class="echarts-demo">
    <el-row>
      <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10"><div id="chartA"  style="width: 100%;height: 350px;"></div></el-col>
      <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14"><div id="chartC"  style="width: 100%;height: 350px;"></div></el-col>
    </el-row>
    <div id="chartB" style="width: 100%;height: 350px;"></div>
    <div id="chartD" style="width: 100%;height: 350px;"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    components: {

    },
    computed: {

    },
    data() {
      return {
        chartAOption: {
          show: true,
          title: {
            text: '| 口碑概况',
            textStyle: {
              fontSize: 12,
              fontWeight: 'normal',
              color: '#495060'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}：{c} ({d}%)"
          },
          legend: [{
            orient: 'vertical',
            top: 50,
            right: 30,
            textStyle: {
              fontSize: 12,
              fontWeight: 'normal',
              color: '#495060'
            },
            data: [
              {name:'好评',value:330},
              {name:'差评',value:80},
              {name:'中评',value:120}
            ]
          }],
          series: [
            {
              id: 'sex',
              name: '口碑概况',
              type: 'pie',
              radius: ['40%', '60%'],
              center: ['40%', '50%'],//position
              selectedMode: 'single',
              selectedOffset: 30,
              clockwise: true,
              //avoidLabelOverlap: true,
              label: {
                normal: {
                  formatter: "{d}%",
                  textStyle: {
                    fontSize: 12,
                    color: '#235894'
                  }
                }
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: '#235894'
                  }
                }
              },
              data: [
                {name:'好评',value:330},
                {name:'差评',value:80},
                {name:'中评',value:120}
              ]
            }
          ],
          color: ['#ff8db4', '#9dc5ff','#b1bcce']
        },
        chartBOption: {
            show: true,
            title: {
              text: '|  口碑趋势',
              textStyle: {
                fontSize: 12,
                fontWeight: 'normal',
                color: '#495060'
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              },
              formatter: function (params) {
                var str = params[0].axisValue + '<br/>'
                for (var i = 0; i < params.length-1; i++) {
                  str += params[i].marker + params[i].seriesName + "：" + params[i].data.toFixed(2) + "%" + '<br/>'
                }
                str += params[params.length-1].marker + params[params.length-1].seriesName + "：" + params[params.length-1].data.toFixed(2)
                return str
              }
            },
            legend: [{

              data: ['好评率','差评率','口碑指数']
            }],
            xAxis: [
              {
                type: 'category',
                data: ['2017-05','2017-06','2017-07','2017-08','2017-09','2017-10','2017-11','2017-12',],
                axisPointer: {
                  type: 'shadow'
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '比率',
                max:100,
                axisLabel: {
                  formatter: '{value} %'
                }
              },
              {
                type: 'value',
                name: '口碑指数',
                max:100,
                axisLabel: {
                  formatter: '{value}'
                }
              },
            ],
            series: [
              {
                itemStyle: {
                  normal: {color: '#9dc5ff'}
                },
                smooth: true,
                name: '好评率',
                type: 'line',
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#d0e3ff'
                    }, {
                      offset: 1,
                      color: '#fdfeff'
                    }])
                  }
                },
                data: [50,65,50,65,50,65,50,65,]
              },
              {
                smooth: true,
                name: '差评率',
                type: 'line',
                itemStyle: {
                  normal: {color: '#33cc99'}
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#d0ffda'
                    }, {
                      offset: 1,
                      color: '#fdfeff'
                    }])
                  }
                },
                data: [10,15,20,5,20,35,10,35,]
              },
              {
                smooth: true,
                name: '口碑指数',
                type: 'line',
                itemStyle: {
                  normal: {color: '#ff8db4'}
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#ff8db4'
                    }, {
                      offset: 1,
                      color: '#f2cbd8'
                    }])
                  }
                },
                yAxisIndex: 1,
                data: [30,65,10,65,30,65,50,65,]
              }
            ]
        },
        chartCOption: {
          title: {
            text: '| 评论关注点',
            textStyle: {
              fontSize: 12,
              fontWeight: 'normal',
              color: '#495060'
            }
          },
          tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
          },
          series : [
            {
              name:'矩形树图',
              type:'treemap',
              roam:false,
              nodeClick:false,
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    formatter: "{b}"
                  },
                  borderWidth: 1
                },
                emphasis: {
                  label: {
                    show: true
                  }
                }
              },

              levels: [
                {
                  itemStyle: {
                    normal: {
                      borderWidth: 1,
                      borderColor: '#fff',
                      gapWidth: 1
                    }
                  },
                  visualDimension:2,
                  color:['#3b8cff','#59a5f5'],
                  colorAlpha:[1,1]
                }
              ],
              breadcrumb:{
                show:false,
              },
              data:[
                {name:'经济实惠',value:500},
                {name:'非常好看',value:400},
                {name:'穿着舒服',value:200},
                {name:'料子不错',value:400},
                {name:'感觉一般',value:300},
                {name:'非常好看',value:340},
                {name:'线头比较多',value:230},
                {name:'颜色单调',value:150},
                {name:'非常好看',value:120},
                {name:'非常好看',value:10},
                ]
            }
          ]
        },
        chartDOption: {
          title: {
            text: '| 消费人数',
            textStyle: {
              fontSize: 12,
              fontWeight: 'normal',
              color: '#495060'
            }
          },
          tooltip: {
            trigger: 'axis',
              axisPointer: {
              type: 'cross',
                crossStyle: {
                color: '#999'
              }
            },
            formatter: function (params) {
              return params[0].axisValue + '<br/>' +
                params[0].marker + params[0].seriesName + ":" + params[0].data.toFixed(2) + '人' + '<br/>'
            }
          },
          xAxis: [
            {
              type: 'category',
              data: ['东莞店','深圳店','广州店','珠海店','惠州店','河源店','珠海店','惠州店','河源店'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
            yAxis: [
            {
              type: 'value',
              name: '店日均客流(人)',
              axisLabel: {
                formatter: '{value} '
              }
            }
          ],
            series: [
            {
              smooth: true,
              name: '店日均客流',
              type: 'bar',
              barWidth: 15,//固定柱子宽度
              itemStyle: {
                normal: {color: '#70abff'}
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#d0e3ff'
                  }, {
                    offset: 1,
                    color: '#fdfeff'
                  }])
                }
              },
              data: [110,210,320,430,550,210,140,430,210]
            }
          ]
        },
      }
    },
    methods: {

    },
    mounted() {
      this.chartA = echarts.init(document.getElementById('chartA'));
      this.chartA.setOption(this.chartAOption);
      this.chartB = echarts.init(document.getElementById('chartB'));
      this.chartB.setOption(this.chartBOption);
      this.chartC = echarts.init(document.getElementById('chartC'));
      this.chartC.setOption(this.chartCOption);
      this.chartD = echarts.init(document.getElementById('chartD'));
      this.chartD.setOption(this.chartDOption);
    },
    created() {

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .echarts-demo{
    margin-top:20px;
  }
</style>
