// pages/deviceMonitor/deviceMonitor.js
//设备监控

const app = getApp();
import * as echarts from '../../ec-canvas/echarts';
import {
    getCompanyDeviceInfo,
    getTodayAndClassEnergy,
    postPeriodOutput,
    postPeriodEnergy,
} from "../../utils/api";

import {
    secondToHMS,
    secondToHMS2,
    getDay
} from "../../utils/util";

var chart1 = null;
var chart2 = null;
var chart3 = null;
var chart4 = null;
var chart5 = null;
var chart6 = null;
var chart7 = null;
var chart8 = null;
// var chart9 = null;




// 当日
let optionToday = {
    tooltip: {},
    grid: {
        top: '15%',
        right: '5%',
        left: '15%',
        bottom: "12%"
    },
    color: ["rgba(28,224,239,1)", "rgba(240,63,88,1)", "rgba(33,144,254,1)", "rgba(4,202,162,1)"],
    //calculable: true,
    xAxis: [{
        type: 'category',
        //boundaryGap: false,
        data: ["当日产量", "用电量", "用水量", "天然气/蒸汽用量"],
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(95,123,175,1)'
            }
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(95,123,175,1)'
            }
        },
        axisLabel: {
            interval: 0,
            rotate: 0,
            textStyle: {
                color: "#fff",
                // fontSize: this.remToPx(0.6)
            }
        },
    }],
    yAxis: [{
        type: 'value',
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(95,123,175,1)'
            }
        },
        axisLabel: {
            formatter: '{value}'
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(95,123,175,1)'
            }
        },
        axisLabel: {
            textStyle: {
                color: "#fff",
                // fontSize: this.remToPx(0.6)
            }
        },
    }],
    series: [{
        name: "",
        type: 'bar',
        barWidth: "45%",
        label: {
            show: true,
            position: "top",
            formatter: "{square|{c}}\n{delta|  }",
            rich: {
                square: {
                    // backgroundColor: 'auto',
                    color: "#fff",
                    padding: [0, 5],
                    borderRadius: 2
                },
                delta: {
                    backgroundColor: 'auto',
                    width: '100%',
                    height: 0,
                    padding: [0, 1],
                    // borderRadius: this.remToPx(1)
                }
            }
        },
        itemStyle: {
            normal: {
                color: function (e) {
                    return optionToday.color[e.dataIndex]
                },
                areaStyle: {
                    type: 'default',
                    color: function (e) {
                        console.log(e)
                    }
                }
            }
        },
        data: [0, 0, 0, 0]
    }],
}
//当班
let optionClass = {
    tooltip: {

    },
    grid: {
        top: '15%',
        right: '5%',
        left: '15%',
        bottom: "12%"
    },
    color: ["rgba(255,168,62,1)", "rgba(240,63,88,1)", "rgba(33,144,254,1)", "rgba(4,202,162,1)"],
    //calculable: true,
    xAxis: [{
        type: 'category',
        //boundaryGap: false,
        data: ["当班产量", "用电量", "用水量", "天然气/蒸汽用量"],
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(95,123,175,1)'
            }
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(95,123,175,1)'
            }
        },
        axisLabel: {
            interval: 0,
            rotate: 0,
            textStyle: {
                color: "#fff",
                // fontSize: this.remToPx(0.6)
            }
        },
    }],
    yAxis: [{
        type: 'value',
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(95,123,175,1)'
            }
        },
        axisLabel: {
            formatter: '{value}'
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(95,123,175,1)'
            }
        },
        axisLabel: {
            textStyle: {
                color: "#fff",
                // fontSize: this.remToPx(0.6)
            }
        },
    }],
    series: [{
        name: "",
        type: 'bar',
        barWidth: "45%",
        label: {
            show: true,
            position: "top",
            formatter: "{square|{c}}\n{delta|  }",
            rich: {
                square: {
                    // backgroundColor: 'auto',
                    color: "#fff",
                    padding: [2, 5],
                    borderRadius: 2
                },
                delta: {
                    backgroundColor: 'auto',
                    width: '100%',
                    height: 0,
                    padding: [0, 1],
                    // borderRadius: this.remToPx(1)
                }
            }
        },
        itemStyle: {
            normal: {
                color: function (e) {
                    return optionClass.color[e.dataIndex]
                },
                areaStyle: {
                    type: 'default',
                    color: function (e) {
                        console.log(e)
                    }
                }
            }
        },
        data: [0, 0, 0, 0]
    }],
}
//状态统计 
let optionStatus = {
    tooltip: {
        trigger: 'item',
        formatter: function (param) {
            //console.log(param)
            let value = that.TimeConversionS(param.value)
            return param.name + '：' + value + '(' + param.percent + '%)'
        }
    },
    legend: {
        orient: 'horizontal',
        //align:'center',
        // bottom: this.remToPx(0.5),
        // itemWidth: this.remToPx(2),
        // itemHeight: this.remToPx(1),
        //itemGap:this.remToPx(2),
        data: ['运行', '故障', '待机'],
        textStyle: {
            color: "#fff",
            // fontSize: this.remToPx(0.9),
            // lineHeight: this.remToPx(1.1)
        }
    },
    color: ["rgba(44,165,241,1)", "rgba(255,38,2,1)", "rgba(253,146,61,1)"],
    series: [{
            name: '',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '54%'],
            label: {
                formatter: '{round|}{per|{d}%}',
                //backgroundColor: '#eee',
                //borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                    a: {
                        color: '#999',
                        // lineHeight: this.remToPx(1.1),
                        align: 'center'
                    },
                    round: {
                        // width: this.remToPx(0.7),
                        // height: this.remToPx(0.7),
                        // lineHeight: this.remToPx(1),
                        backgroundColor: "#fff",
                        // borderRadius: this.remToPx(0.7)
                    },
                    // abg: {
                    //     backgroundColor: '#333',
                    //     width: '100%',
                    //     align: 'right',
                    //     height: 22,
                    //     borderRadius: [4, 4, 0, 0]
                    // },
                    hr: {
                        borderColor: '#aaa',
                        width: '100%',
                        borderWidth: 0.5,
                        height: 0
                    },
                    b: {
                        // fontSize: this.remToPx(0.8),
                        // lineHeight: this.remToPx(1.65)
                    },
                    per: {
                        //color: '#eee',
                        //backgroundColor: '#334455',
                        // fontSize: this.remToPx(1),
                        // lineHeight: this.remToPx(1),
                        padding: [2, 4],
                        // borderRadius: this.remToPx(0.1)
                    }
                }
            },
            //labelLine: {show: false},
            data: [{
                    value: 1,
                    name: '运行'
                },
                {
                    value: 2,
                    name: '待机'
                },
                {
                    value: 3,
                    name: '故障'
                }
            ]
        },
        {
            name: '',
            type: 'pie',
            radius: ['64%', '65%'],
            labelLine: {
                show: false
            },
            data: [{
                value: 1,
                name: ''
            }]
        }
    ]
}
//运行时长
let optionDuration = {
    tooltip: {
        trigger: 'axis',
        // formatter: function (param) {
        //     console.log(param)
        //     let value = that.TimeConversionS(param[0].value)
        //     let value2 = that.TimeConversionS(param[1].value)
        //     return param[0].name + '<br/><div style="float:left;margin:5px 5px 0 0;border-radius:10px;width:10px;height:10px;background-color:' + param[0].color + ';"></div>' + param[0].seriesName + '：' +
        //         value + '<br/><div style="float:left;margin:5px 5px 0 0;border-radius:10px;width:10px;height:10px;background-color:' + param[1].color + ';"></div>' + param[1].seriesName + '：' + value2
        // }
    },
    grid: {
        top: '20%',
        right: '6%',
        left: '20%'
    },
    legend: {
        data: ['开机时长', '运行时长'],
        textStyle: {
            color: "#fff",

        }

    },
    color: ["rgba(247,62,63,1)", "rgba(7,135,239,1)"],
    //calculable: true,
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: [1, 1, 1, 1, 1, 1, 1],
        splitLine: {
            show: false,
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },
        axisLabel: {
            interval: 0,
            rotate: 30,
            textStyle: {
                color: "#fff",
                fontSize: 12,
                // fontSize: this.remToPx(0.6)
            }
        }
    }],
    yAxis: [{
        type: 'value',
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },
        axisLabel: {
            formatter: function (value) {
                return secondToHMS2(value)
            },
            textStyle: {
                color: "#fff",
                fontSize: 12
                // fontSize: this.remToPx(0.6)
            }

        },
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },
    }],
    series: [{
        name: '开机时长',
        type: 'line',
        smooth: true,
        //symbol: "none",
        areaStyle: {
            type: 'default',
            normal: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(247,62,63,1)' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(247,62,63,0.1)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            },
        },
        data: [1, 1, 1, 1, 1, 1, 1]
    }, {
        name: '运行时长',
        type: 'line',
        smooth: true,
        //symbol: "none",
        areaStyle: {
            type: 'default',
            normal: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(7,135,239,1)' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(7,135,239,0.1)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            },
        },
        data: [1, 1, 1, 1, 1, 1, 1]

    }],
}
//产量计数
let optionMechineLine = {
    tooltip: {
        trigger: 'axis',
    },
    grid: {
        top: '10%',
        right: '6%',
        left: '20%'
    },
    color: ["rgba(244,94,36,1)"],
    calculable: true,
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: [1, 1, 1, 1, 1, 1, 1],
        splitLine: {
            show: false,
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },
        axisLabel: {
            interval: 0,
            rotate: 30,
            // fontSize: this.remToPx(0.6)
        }
    }],
    yAxis: [{
        type: 'value',
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },
        axisLabel: {
            formatter: '{value}m',
            // fontSize: this.remToPx(0.6)
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },
    }],
    series: [{
        name: '产量计数',
        type: 'line',
        smooth: true,
        // symbolSize: this.remToPx(0.3),
        itemStyle: {
            normal: {
                lineStyle: {
                    // width: this.remToPx(0.25) // 0.1的线条是非常细的了
                }
            }
        },
        data: [1, 1, 1, 1, 1, 1, 1]
    }],
}
//故障次数
let optionAlert = {
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        top: '10%',
        right: '6%',
        left: '20%'
    },
    color: ["rgba(24,246,254,1)"],
    calculable: true,
    xAxis: [{
        type: 'category',
        //boundaryGap: false,
        data: [1, 1, 1, 1, 1, 1, 1],
        splitLine: {
            show: false,
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },
        axisLabel: {
            interval: 0,
            rotate: 30,
            // fontSize: this.remToPx(0.6)
        }
    }],
    yAxis: [{
        type: 'value',
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },
        axisLabel: {
            formatter: '{value}次',
            // fontSize: this.remToPx(0.6)
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },
    }],
    series: [{
        type: 'bar',
        name: "故障次数",
        smooth: false,
        barWidth: 15,
        label: {
            show: true,
            position: "top",
            // fontSize: this.remToPx(0.9),
            color: "rgba(24,246,254,1)"
        },
        itemStyle: {
            type: 'default',
            normal: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(24,246,254,1)' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(7,156,243,1)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            }
        },
        data: [1, 1, 1, 1, 1, 1, 1]
    }],
}
//能耗统计
let optionEnergy = {
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        top: '10%',
        right: '15%',
        left: '15%',
        bottom: "30%"
    },
    color: [ /* "rgba(255,168,62,1)", */ "rgba(28,224,239,1)", "rgba(240,63,88,1)", "rgba(33,144,254,1)", "rgba(4,202,162,1)", "rgba(240,63,88,1)", "rgba(33,144,254,1)", "rgba(4,202,162,1)"],
    calculable: true,
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: [1, 1, 1, 1, 1, 1, 1],
        splitLine: {
            show: false,
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },

        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },
        axisLabel: {
            interval: 0,
            rotate: 30,
            textStyle: {
                fontSize: 8
            }
            // fontSize: this.remToPx(0.6)
        }
    }],
    yAxis: [{
        type: 'value',
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },
        axisLabel: {
            formatter: '{value}',
            // fontSize: this.remToPx(0.6)
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },
    }],
    series: [{
        name: '产量',
        type: 'line',
        smooth: true,
        symbol: "none",
        // symbolSize: this.remToPx(0.1),
        itemStyle: {
            normal: {
                lineStyle: {
                    // width: this.remToPx(0.25) // 0.1的线条是非常细的了
                }
            }
        },
        data: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
    }, {
        name: '用电量',
        type: 'line',
        smooth: true,
        symbol: "none",
        // symbolSize: this.remToPx(0.1),
        itemStyle: {
            normal: {
                lineStyle: {
                    // width: this.remToPx(0.25) // 0.1的线条是非常细的了
                }
            }
        },
        data: [0.21, 0.21, 0.21, 0.21, 0.21, 0.21, 0.21],
    }, {
        name: '用水量',
        type: 'line',
        smooth: true,
        symbol: "none",
        // symbolSize: this.remToPx(0.1),
        itemStyle: {
            normal: {
                lineStyle: {
                    // width: this.remToPx(0.25) // 0.1的线条是非常细的了
                }
            }
        },
        data: [0.31, 0.31, 0.31, 0.31, 0.31, 0.31, 0.31],
    }, {
        name: '天然气/蒸汽用量',
        type: 'line',
        smooth: true,
        symbol: "none",
        // symbolSize: this.remToPx(0.1),
        itemStyle: {
            normal: {
                lineStyle: {
                    // width: this.remToPx(0.25) // 0.1的线条是非常细的了
                }
            }
        },
        data: [0.41, 0.41, 0.41, 0.41, 0.41, 0.41, 0.41],
    }],
}
//单位能耗统计
let optionUnitEnergy = {
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        top: '10%',
        right: '15%',
        left: '15%',
        bottom: "30%"
    },
    color: ["rgba(240,63,88,1)", "rgba(33,144,254,1)", "rgba(4,202,162,1)"],
    calculable: true,
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: [1, 1, 1, 1, 1, 1, 1],
        splitLine: {
            show: false,
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },

        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },
        axisLabel: {
            interval: 0,
            rotate: 30,
            textStyle: {
                fontSize: 8
            }
            // fontSize: this.remToPx(0.6)
        }
    }],
    yAxis: [{
        type: 'value',
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },
        axisLabel: {
            formatter: '{value}',
            // fontSize: this.remToPx(0.6)
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },
    }],
    series: [{
        name: '单位用电量（每万米）',
        type: 'line',
        smooth: true,
        symbol: "none",
        // symbolSize: this.remToPx(0.1),
        itemStyle: {
            normal: {
                lineStyle: {
                    // width: this.remToPx(0.15), // 0.1的线条是非常细的了
                    type: 'dashed'
                }
            }
        },
        data: [0.51, 0.51, 0.51, 0.51, 0.51, 0.51, 0.51],
    }, {
        name: '单位用水量（每万米）',
        type: 'line',
        smooth: true,
        symbol: "none",
        // symbolSize: this.remToPx(0.1),
        itemStyle: {
            normal: {
                lineStyle: {
                    // width: this.remToPx(0.15), // 0.1的线条是非常细的了
                    type: 'dashed'
                }
            }
        },
        data: [0.61, 0.61, 0.61, 0.61, 0.61, 0.61, 0.61],
    }, {
        name: '单位天然气/蒸汽用量（每万米）',
        type: 'line',
        smooth: true,
        symbol: "none",
        // symbolSize: this.remToPx(0.1),
        itemStyle: {
            normal: {
                lineStyle: {
                    // width: this.remToPx(0.15), // 0.1的线条是非常细的了
                    type: 'dashed'
                }
            }
        },
        data: [0.761, 0.761, 0.761, 0.761, 0.761, 0.761, 0.761],
    }],
}



let chartList = {
    "today": { //当日配置
        option: optionToday,
    },
    'class': { //当班配置
        option: optionClass,
    },
    'status': { //状态统计
        option: optionStatus
    },
    'duration': { //运行时长
        option: optionDuration
    },
    'mechineLine': { //产量统计
        option: optionMechineLine
    },
    'alert': {
        option: optionAlert
    },
    'energy': {
        option: optionEnergy
    },
    'unitEnergy': {
        option: optionUnitEnergy
    }

}



//当日
function initChart(canvas, width, height, dpr) {
    chart1 = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
    });
    canvas.setChart(chart1);

    chart1.setOption(chartList.today.option);
    return chart1;
}
//当班
function initChart2(canvas, width, height, dpr) {
    chart2 = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
    });
    canvas.setChart(chart2);

    chart2.setOption(chartList.class.option);
    return chart2;
}
//状态统计
function initChart3(canvas, width, height, dpr) {
    chart3 = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
    });
    canvas.setChart(chart3);

    chart3.setOption(chartList.status.option);
    return chart3;
}
//运行时长
function initChart4(canvas, width, height, dpr) {
    chart4 = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
    });
    canvas.setChart(chart4);

    chart4.setOption(chartList.duration.option);
    return chart4;
}
//产量统计
function initChart5(canvas, width, height, dpr) {
    chart5 = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
    });
    canvas.setChart(chart5);
    chart5.setOption(chartList.mechineLine.option);
    return chart5;
}
//故障次数
function initChart6(canvas, width, height, dpr) {
    chart6 = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
    });
    canvas.setChart(chart6);

    chart6.setOption(chartList.alert.option);
    return chart6;
}
//能耗统计
function initChart7(canvas, width, height, dpr) {
    chart7 = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
    });
    canvas.setChart(chart7);

    chart7.setOption(chartList.energy.option);
    return chart7;
}
//单位能耗统计
function initChart8(canvas, width, height, dpr) {
    chart8 = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
    });
    canvas.setChart(chart8);

    chart8.setOption(chartList.unitEnergy.option);
    return chart8;
}



Page({

    /**
     * 页面的初始数据
     */
    data: {
        CustomBar: app.globalData.CustomBar,
        url: app.globalData.imgURL,
        bgURL: app.globalData.backgroundURL,
        active: 0, //头部切换
        active2: false, //当日当班切换
        itemList: ['设备信息', '产量统计', '能耗统计'],
        deviceInfo: {},
        image_path: "",



        // 当日单位能耗
        today_unit_electricity: 0,
        today_unit_gas: 0,
        today_unit_water: 0,
        // 当班单位能耗
        class_unit_electricity: 0,
        class_unit_gas: 0,
        class_unit_water: 0,

        // 开机时长（待机 + 运行 + 故障）
        open_time: "0",
        // 故障次数
        fault_count: 0,

        // 当日
        ecToday: {
            // disableTouch: true,
            onInit: initChart,
            // lazyLoad: true
        },
        // 当班
        ecClass: {
            onInit: initChart2,
            // disableTouch: true,
            // lazyLoad: true
        },
        //状态统计
        ecStatus: {
            onInit: initChart3,
            // disableTouch: true,

        },
        //运行时长
        ecDuration: {
            onInit: initChart4,
            // disableTouch: true,
        },
        //产量计数
        ecMechineLine: {
            onInit: initChart5,
            // disableTouch: true,
        },
        // 故障次数
        ecAlert: {
            onInit: initChart6,
            // disableTouch: true,
        },
        //能耗统计
        ecEnergy: {
            onInit: initChart7,
            // disableTouch: true,
        },
        //单位能耗统计
        ecUnitEnergy: {
            onInit: initChart8,
            // disableTouch: true,
        }
    },
    setActive(value) {
        this.setData({
            active: value.detail.active
        })
    },
    changeItem() {
        this.setData({
            active2: !this.data.active2
        })
    },
    /** 
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        console.log(options);
        this.setData({
            deviceId: options.device_id
        })
        getCompanyDeviceInfo(options.device_id).then(res => {
            console.log(res);
            if (res.data.length == 0) {
                this.setData({
                    deviceInfo: options,
                    image_path: options.image_path
                })
            } else {
                this.setData({
                    deviceInfo: res.data[0],
                    image_path: options.image_path
                })
            }

        });
        this.getTodayAndClass(options.device_id);
        this.getOutput(options.device_id);
        this.getEnergy(options.device_id);

    },
    onShow() {
        console.log("隐藏了");
    },
    /**获取当日当班信息 */
    getTodayAndClass(deviceId) {
        getTodayAndClassEnergy(deviceId).then(res => {
            console.log(res);
            let data = res.data;
            if (data) {
                console.log('有数据');
                chartList.today.option.series[0].data = [data.today_output, data.today_electricity, data.today_water, data.today_gas];
                chartList.class.option.series[0].data = [data.class_output, data.class_electricity, data.class_water, data.class_gas];
                console.log(chartList.today.option);
                console.log(chartList.class.option);

                if (chart1) chart1.setOption(chartList.today.option);
                if (chart2) chart2.setOption(chartList.class.option);



                this.setData({
                    // ecToday: {
                    //     // disableTouch: true,
                    //     onInit: initChart,
                    // },
                    // ecClass: {
                    //     onInit: initChart2,
                    // },
                    // 当日单位能耗
                    today_unit_electricity: data.today_unit_electricity,
                    today_unit_gas: data.today_unit_gas,
                    today_unit_water: data.today_unit_water,
                    // 当班单位能耗
                    class_unit_electricity: data.class_unit_electricity,
                    class_unit_gas: data.class_unit_gas,
                    class_unit_water: data.class_unit_water,

                })


            } else {
                console.log('无数据');
                chartList.today.option.series[0].data = [0, 0, 0, 0];
                chartList.class.option.series[0].data = [0, 0, 0, 0];

               if(chart1) chart1.setOption(chartList.today.option);
               if(chart2) chart2.setOption(chartList.class.option);

                this.setData({
                    // ecToday: {
                    //     // disableTouch: true,
                    //     onInit: initChart,
                    // },
                    // ecClass: {
                    //     onInit: initChart2,
                    // },
                    // 当日单位能耗
                    today_unit_electricity: 0,
                    today_unit_gas: 0,
                    today_unit_water: 0,
                    // 当班单位能耗
                    class_unit_electricity: 0,
                    class_unit_gas: 0,
                    class_unit_water: 0,


                })
                // setTimeout(function () {
                //     this.setData({
                //         ecToday: {
                //             // disableTouch: true,
                //             onInit: initChart,
                //         },
                //     })
                // }, 500)


            }



        })
    },
    /**获取时间短内设备信息 */
    getOutput(deviceId) {
        let arrDate = getDay(-6);
        postPeriodOutput({
            "start_date": arrDate[0],
            "end_date": arrDate[1],
            "device_id": deviceId,
        }).then(res => {
            console.log(res);
            let open_time = 0; //开机时长
            let fault_count = 0; //故障次数
            let run_time = 0; //运行时间
            let fault_time = 0; //故障时间
            let standby_time = 0; //待机时间
            let run_time_array = []; //运行时长数组
            let open_time_array = []; //开机时长数组
            let output_array = []; //产量计数数组
            let fault_count_array = []; //故障次数数组
            let date = []; //日期数组
            for (let i of res.data) {
                date.push(i.d);
                open_time += i.run_time + i.fault_time + i.standby_time;
                run_time += i.run_time;
                fault_time += i.fault_time;
                standby_time += i.standby_time;
                fault_count += i.fault_count;

                run_time_array.push(i.run_time);
                open_time_array.push(i.run_time + i.fault_time + i.standby_time);

                output_array.push(i.output);

                fault_count_array.push(i.fault_count);
            }
            //状态统计赋值
            chartList.status.option.series[0].data = [{
                    value: run_time,
                    name: '运行'
                },
                {
                    value: standby_time,
                    name: '待机'
                },
                {
                    value: fault_time,
                    name: '故障'
                }
            ]
            //运行时长赋值
            chartList.duration.option.xAxis[0].data = date;
            chartList.duration.option.series[0].data = open_time_array;
            chartList.duration.option.series[1].data = run_time_array;

            //产量计数赋值
            chartList.mechineLine.option.xAxis[0].data = date;
            chartList.mechineLine.option.series[0].data = output_array;

            //故障次数
            chartList.alert.option.xAxis[0].data = date;
            chartList.alert.option.series[0].data = fault_count_array;


            if (chart3) chart3.setOption(chartList.status.option);
            if (chart4) chart4.setOption(chartList.duration.option);
            if (chart5) chart5.setOption(chartList.mechineLine.option);
            if (chart6) chart6.setOption(chartList.alert.option);


            this.setData({
                open_time: secondToHMS(open_time),
                fault_count: fault_count,
                // //状态统计
                // ecStatus: {
                //     // disableTouch: true,
                //     onInit: initChart3,
                // },
                // //运行时长
                // ecDuration: {
                //     // disableTouch: true,
                //     onInit: initChart4,
                // },
                // //产量计数
                // ecMechineLine: {
                //     // disableTouch: true,
                //     onInit: initChart5,
                // },
                // //故障次数
                // ecAlert: {
                //     // disableTouch: true,
                //     onInit: initChart6,
                // }
            })
        })
    },
    /**获取时间段内能耗信息 */
    getEnergy(deviceId) {
        let arrDate = getDay(-6);

        postPeriodEnergy({
            "start_date": arrDate[0],
            "end_date": arrDate[1],
            "device_id": deviceId,
        }).then(res => {
            console.log(res);
            let date = []; //日期数组
            let electricity_array = []; //用电量数组
            let gas_array = []; //天然气数组
            let water_array = []; //用水量数组
            let output_array = []; //产量数组
            let unit_electricity_array = []; //单位用电量数组
            let unit_gas_array = []; //单位天然气数组
            let unit_water_array = []; //单位用水量数组
            for (let i of res.data) {
                date.push(i.d);
                electricity_array.push(i.electricity);
                gas_array.push(i.gas);
                water_array.push(i.water);
                output_array.push(i.output);
                unit_electricity_array.push(i.unit_electricity);
                unit_gas_array.push(i.unit_gas);
                unit_water_array.push(i.unit_water);
            }
            //能耗统计
            chartList.energy.option.xAxis[0].data = date;
            chartList.energy.option.series[0].data = output_array;
            chartList.energy.option.series[1].data = electricity_array;
            chartList.energy.option.series[2].data = water_array;
            chartList.energy.option.series[3].data = gas_array;
            //单位能耗统计
            chartList.unitEnergy.option.xAxis[0].data = date;
            chartList.unitEnergy.option.series[0].data = unit_electricity_array;
            chartList.unitEnergy.option.series[1].data = unit_water_array;
            chartList.unitEnergy.option.series[2].data = unit_gas_array;

            if (chart7) chart7.setOption(chartList.energy.option);
            if (chart8) chart8.setOption(chartList.unitEnergy.option);

            this.setData({
                // ecEnergy: {
                //     onInit: initChart7,
                //     // disableTouch: true,
                // },
                // ecUnitEnergy: {
                //     onInit: initChart8,
                //     // disableTouch: true,
                // }
            })
        })
    }
})