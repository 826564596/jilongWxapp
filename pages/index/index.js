//index.js
const app = getApp();
import {
  getStateCount,
  getRealTimeFaultMessage,
  getRealTimeAlarmRecord
} from "../../utils/api"
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    state: {

    },
    alermList: [],
    information: [],
  },
  onLoad() {
    this.getTabBar().init(2);
    this.getData();
    setInterval(
      this.getData, 10000)
  },
  // 获取
  getData() {
    getStateCount(app.globalData.userInfo.username).then(res => {
      console.log(res);
      this.setData({
        state: res.data[0]
      })
    });
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
  }

});