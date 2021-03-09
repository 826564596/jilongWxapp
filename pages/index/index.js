//index.js
const app = getApp();
import {
  getStateCount,
  getRealTimeFaultMessage,
  getRealTimeAlarmRecord,
  refreshInterval5s,
  refreshInterval30s
} from "../../utils/api"
Page({
  data: {

    animate: false,
    animateAlert: false,
    CustomBar: app.globalData.CustomBar,
    state: {

    },
    alermList: [],
    information: []
  },

  showMarquee() {

    this.setData({
      animate: true,
      animateAlert: true,
    });


    if (this.data.information.length > 1) {
      setTimeout(() => {
        //把第一个元素移到数组末尾，删除第一个元素
        this.data.information.push(this.data.information[0]);
        this.data.information.shift();
        this.setData({
          animate: false,
          information: this.data.information
        });
      }, 500);
    } else {
      this.setData({
        animate: false,
      });
    }

    if (this.data.alermList.length > 4) {
      setTimeout(() => {
        //把第一个元素移到数组末尾，删除第一个元素
        this.data.alermList.push(this.data.alermList[0]);
        this.data.alermList.shift();
        this.setData({
          animateAlert: false,
          alermList: this.data.alermList
        });
      }, 500);
    } else {
      this.setData({
        animateAlert: false,
      });
    }

  },
  onLoad(){
    this.getTabBar().init(2);

  },
  onShow() {
    this.getData2();

    //每五秒滚动一次
    this.data.setInterval1 = setInterval(this.showMarquee, refreshInterval5s);
    //每30s获取一次数据
    this.data.setInterval2 = setInterval(this.getData2, refreshInterval30s);

  },

  //获取设备数量状态
  getData2() {
    getRealTimeFaultMessage(app.globalData.userInfo.username).then(res => {
      console.log(res)
      this.setData({
        alermList: res.data
      })
    })
    getRealTimeAlarmRecord(app.globalData.userInfo.username).then(res => {
      console.log(res);
      this.setData({
        information: res.data
      })
    })
    getStateCount(app.globalData.userInfo.username).then(res => {
      console.log(res);
      this.setData({
        state: res.data[0]
      })
    });
  },
  onHide() {
    //离开页面时清除数据
    clearInterval(this.data.setInterval1);
    clearInterval(this.data.setInterval2);

  }

});