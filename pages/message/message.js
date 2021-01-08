// pages/message/message.js
const app = getApp();
import {
        postMessageList
} from "../../utils/api"
Page({

        /**
         * 页面的初始数据
         */
        data: {
                CustomBar: app.globalData.CustomBar,
                url: app.globalData.imgURL,
                bgURL: app.globalData.backgroundURL,
                messageList: [],
                pageIndex: 0,
                limitNumer: 10,
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad(options) {
                this.getData(this.data.pageIndex, this.data.limitNumer);
        },


        /**
         * 获取数据 
         * @param {Number} pageIndex 页码
         * @param {Number} limitNumer 每页个数 
         */
        getData(pageIndex, limitNumer) {
                postMessageList({
                        username: app.globalData.userInfo.username,
                        page: {
                                offset: pageIndex,
                                limit: limitNumer
                        }
                }).then(res => {
                        console.log(res);
                        this.setData({
                                messageList: res.data.msg_list,
                        })
                })
        },
        lower(e) {
                let limitNumer = this.data.limitNumer + 10;

                this.getData(this.data.pageIndex, limitNumer);
                this.setData({
                        limitNumer: limitNumer
                })
        },

})