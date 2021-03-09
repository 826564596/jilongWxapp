// pages/userManger/userManger.js
const app = getApp();
import {
        getUserList,
        managerRegiter,
        operationManager
} from "../../utils/api";

import {
        objectToUrlNoEncodeURI
} from "../../utils/util";

import {
        hex_md5
} from "../../utils/md5";


Page({

        /**
         * 页面的初始数据
         */
        data: {
                CustomBar: app.globalData.CustomBar,
                url: app.globalData.imgURL,
                bgURL: app.globalData.backgroundURL,
                userList: [],
                pageIndex: 0,
                pageSize: 10,
                isShowConfirm: false,
        },

        /**
         * 生命周期函数--监听页面加载
         */
        // onLoad(options) {
        //         this.getData(this.data.pageIndex, this.data.pageSize);

        // },
        onShow() {
                this.getData(this.data.pageIndex, this.data.pageSize);

        },
        /**监听滚动到最后 */
        lower(e) {
                let pageSize = this.data.pageSize + 10;
                this.getData(this.data.pageIndex, pageSize);
                this.setData({
                        pageSize: pageSize
                })
        },
        /**
         * 获取用户信息
         * @param {Number} pageIndex 页码
         * @param {Number} pageSize 每页个数
         */
        getData(pageIndex, pageSize) {
                let obj = {
                        username: app.globalData.userInfo.username,
                        pageindex: pageIndex,
                        pagesize: pageSize
                }
                getUserList(obj).then(res => {
                        console.log(res);
                        let userList = JSON.parse(res.data).Rows;
                        console.log(userList);
                        this.setData({
                                userList: userList
                        })
                })
        },
        confirms(e) {
                let obj3 = {
                        username: app.globalData.userInfo.username,
                        password: hex_md5(e.detail + 'tBOs')
                }
                operationManager(obj3).then(res => {
                        console.log(res);
                        if (res.data.code == "1000") {
                                this.submit();
                        } else {
                                wx.showToast({
                                        title: res.data.msg,
                                        icon: "error",
                                        duration: 1000
                                })
                        }
                })

        },
        onChange(e) {
                this.setData({
                        isShowConfirm: true,
                        changeItem: e.currentTarget.dataset.item,
                })
        },

        /** 使用状态切换 */
        submit(e) {


                let obj = {
                        id: this.data.changeItem.F_ID,
                        username: this.data.changeItem.F_USERNAME,
                        passwd: this.data.changeItem.F_PASSWD,
                        stat: this.data.changeItem.F_STAT == "1" ? "0" : "1",
                        brno: this.data.changeItem.F_BRNO,
                        brname: this.data.changeItem.F_BRNAME,
                        phone: this.data.changeItem.F_PHONE,
                        role: this.data.changeItem.F_ROLE,
                }
                managerRegiter(obj).then(res => {
                        this.getData(this.data.pageIndex, this.data.pageSize);
                })
        },


        /** 使用状态切换 */
        // onChange(e) {
        //         console.log(e);
        //         let that = this;
        //         let value = e.currentTarget.dataset.item;
        //         wx.showModal({
        //                 title: "提示",
        //                 content: `是否${value.F_STAT == '1' ?'禁用':'启用'}该用户?`,
        //                 cancelColor: '#000',
        //                 confirmColor: "#000",
        //                 success(e) {
        //                         if (e.confirm) {

        //                                 let obj = {
        //                                         id: value.F_ID,
        //                                         username: value.F_USERNAME,
        //                                         passwd: value.F_PASSWD,
        //                                         stat: value.F_STAT == "1" ? "0" : "1",
        //                                         brno: value.F_BRNO,
        //                                         brname: value.F_BRNAME,
        //                                         phone: value.F_PHONE,
        //                                         role: value.F_ROLE,
        //                                 }
        //                                 managerRegiter(obj).then(res => {
        //                                         that.getData(that.data.pageIndex, that.data.pageSize);
        //                                 })
        //                         }
        //                 }
        //         })

        // },
        /**编辑用户 */
        editorUser(e) {
                console.log(e);

                let obj = e.currentTarget.dataset.item;
                obj.add = false;
                wx.navigateTo({
                        url: '/pages/addUser/addUser' + objectToUrlNoEncodeURI(obj),
                })

        },
        /**添加用户 */
        addUser() {
                let obj = {
                        add: true,
                }
                wx.navigateTo({
                        url: '/pages/addUser/addUser' + objectToUrlNoEncodeURI(obj),
                })
        }


})