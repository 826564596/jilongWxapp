// pages/userInfo.js
//我的
const app = getApp();
import {
  getMessageUnreadCount
} from "../../utils/api";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    unReadMessage: 0, //未读的消息

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow(options) {
    this.getTabBar().init(4);
    console.log(app.globalData)
    this.setData({
      power: app.globalData.userInfo.role,
      userName: app.globalData.userInfo.username,
    })


    getMessageUnreadCount(app.globalData.userInfo.username).then(res => {
      this.setData({
        unReadMessage: res.data.msg_unread_count
      })
    })
  },

  /**跳转到设备管理 */
  deviceManger() {
    wx.navigateTo({
      url: `/pages/deviceManger/deviceManger`,
    })
  },
  /**跳转到用户管理 */
  userManger() {
    wx.navigateTo({
      url: `/pages/userManger/userManger`,
    })
  },
  operationPasswordManger() {
    wx.navigateTo({
      url: `/pages/operationPasswordManger/operationPasswordManger`,
    })
  },
  /**跳转到用户信息 */
  userInformation() {
    wx.navigateTo({
      url: `/pages/userInformation/userInformation`,
    })
  },
  /**跳转到消息通知 */
  message() {
    wx.navigateTo({
      url: `/pages/message/message`,
    })
  }
})