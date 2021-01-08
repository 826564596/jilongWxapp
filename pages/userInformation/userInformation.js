// pages/userManger/userManger.js
const app = getApp();
import {
        getUserList
} from "../../utils/api";
Page({

        /**
         * 页面的初始数据
         */
        data: {
                CustomBar: app.globalData.CustomBar,
                url: app.globalData.imgURL,
                bgURL: app.globalData.backgroundURL,
                userInfo:[],
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad(options) {
                const accountInfo = wx.getAccountInfoSync();
                console.log(accountInfo)
                getUserList({
                        brno: app.globalData.userInfo.brno,
                        pageindex: 0,
                        pagesize: 15,
                }).then(res => {
                        this.setData({
                                userInfo:JSON.parse(res.data).Rows[0],
                        })

                })
        },
        /**退出登录 */
        signOut(){
                wx.navigateTo({
                  url: '/pages/login/login',
                })
        }

})