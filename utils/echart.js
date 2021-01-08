import * as echarts from '../ec-canvas/echarts';



//当天
let optionToday = {
        tooltip: {

        },
        grid: {
                top: '15%',
                right: '10%',
                left: '10%',
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
                                        backgroundColor: 'auto',
                                        color: "#fff",
                                        padding: [2, 5],
                                        borderRadius: 2
                                },
                                delta: {
                                        backgroundColor: 'auto',
                                        width: '100%',
                                        // height: this.remToPx(0.25),
                                        padding: [0, 2],
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
                data: [1, 1, 1, 1]
        }],
}
//当班
let optionClass = {
        tooltip: {

        },
        grid: {
                top: '15%',
                right: '10%',
                left: '10%',
                bottom: "12%"
        },
        color: ["rgba(255,168,62,1)", "rgba(240,63,88,1)", "rgba(33,144,254,1)", "rgba(4,202,162,1)"],
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
                                        backgroundColor: 'auto',
                                        color: "#fff",
                                        padding: [2, 5],
                                        borderRadius: 2
                                },
                                delta: {
                                        backgroundColor: 'auto',
                                        width: '100%',
                                        // height: this.remToPx(0.25),
                                        padding: [0, 2],
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
                data: [1, 1, 1, 1]
        }],
}


let chartData = {
        "today": { //
                option: optionToday,
                chart: null
        },
        'class': {
                option: optionClass,
                chart: null
        }
}

//初始化echart实例
let chart = null;
const getChart = (type) => {
        if (!type) {
                console.error("要获取图表名必传！");
                return null;
        }
        return chartData[type].chart;
}


/**
 * 初始化: 如下使用方法
 * this.data.chartR.init((canvas, width, height, dpr) => {
      charts.initChart(canvas, width, height, dpr, 'radar') // 注意最后一个参数自己定义的，后面使用用这个做区分
    });
*/ 
const initChart = (canvas, width, height, dpr, type) => {
        if (!type) {
                console.error("图表名必传（为了一个页面使用多个图表区分的id）");
                return false;
        }
        chartData[type].chart = echarts.init(canvas, null, {
                width: width,
                height: height,
                devicePixelRatio: dpr // new
        });
        canvas.setChart(chartData[type].chart);
        chartSetOption(type);
        return chartData[type].chart;

}

/**
 * 绘制表格数据
 */
const chartSetOption = (type, data = null) => {
        if (!type || !chartData[type]) {
                console.error("图表id必传或者未找到图表:" + type);
                return false;
        }
        if (data) { // 如果传了data则要替换
                setOption(type, data);
        }
        chartData[type].chart.setOption(chartData[type].option);
}
/**
 * 设置图表数据
 */
const setOption = (type, data) => {
        if (!type || !chartData[type]) {
                console.error('图表id必传或者未找到图表:' + type);
                return false;
        }
        if (!data) {
                console.error('没有要更新的数据');
                return false;
        }
        if (type == "radar") { // 雷达图
                chartData[type].option.series[0].data = data;
        }
}

/**
 * 删掉图表对象(节约空间)
 */
const closeChart = (type) => {
        if (!type || !chartData[type]) {
                console.error("图表id必传或者未找到图表:" + type);
                return false;
        }
        chartData[type].chart = null;
}

module.exports = {
        getChart, // 得到图表对象
        initChart, // 初始化图表
        setOption, //  设置图表内容
        chartSetOption, //  动态改变图表内容
        closeChart, // 删除图表对象
}