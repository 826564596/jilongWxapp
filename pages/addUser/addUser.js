// pages/addUser/addUser.js
const app = getApp();
import {
        branchRegiter,
        branchList,
        managerRegiter,
} from "../../utils/api";
import * as regexp from '../../utils/RegExp';
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
                userName: "",
                password: "",
                telephone: "",
                confirmPassword: "",

                addType: "",
                userInfo: {
                        userName: "",
                        password: "",
                        confirmPassword: "",
                        telephone: "",
                },
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad(options) {
                console.log(options);
                if (options.add == 'false') {
                        let obj = {
                                userName: options.F_USERNAME,
                                password: "",
                                confirmPassword: "",
                                telephone: "",
                                id: options.F_ID,
                        }
                        this.setData({
                                addType: false,
                                userInfo: obj
                        })
                } else if (options.add == "true") {
                        let obj = {
                                userName: "",
                                password: "",
                                confirmPassword: "",
                                telephone: "",
                        }
                        this.setData({
                                addType: true,
                                userInfo: obj

                        })
                }
        },
        iptUserName(e) {
                this.setData({
                        [`userInfo.userName`]: e.detail.value
                })
        },
        iptPassword(e) {
                this.setData({
                        [`userInfo.password`]: e.detail.value
                })

        },
        iptConfirmPassword(e) {
                this.setData({
                        [`userInfo.confirmPassword`]: e.detail.value
                })

        },
        iptTelephone(e) {
                this.setData({
                        [`userInfo.telephone`]: e.detail.value
                })
        },
        /**确认 */
        confirm() {
                if (this.data.addType && !this.data.userInfo.userName.trim()) {
                        wx.showToast({
                                title: '用户名称为空',
                                icon: "error",
                                duration: 1000,
                        })
                        return;
                }
                if (!this.data.userInfo.password.trim()) {
                        wx.showToast({
                                title: '密码为空',
                                icon: "error",
                                duration: 1000,
                        })
                        return;
                }
                if (!this.data.userInfo.telephone.trim()) {
                        wx.showToast({
                                title: '手机号码为空',
                                icon: "error",
                                duration: 1000,
                        })
                        return;
                }
                if (!regexp.testPhone.test(this.data.userInfo.telephone)) {
                        wx.showToast({
                                title: '手机号格式错误',
                                icon: "error",
                                duration: 1000,
                        })
                        return;
                }
                if (this.data.userInfo.password != this.data.userInfo.confirmPassword) {
                        wx.showToast({
                                title: '密码输入不一致',
                                icon: "error",
                                duration: 1000,
                        })
                        return;
                }
                let obj = {
                        creater: app.globalData.userInfo.username,
                        brname: this.data.userInfo.userName,
                        upbrno: "10234",
                }
                branchRegiter(obj).then(res => {
                        return res.data;
                }).then(res => {
                        if (res.success == true) {
                                let obj2 = {
                                        username: "jilong",
                                        brno: "10234",
                                }
                                branchList(obj2).then(res => {
                                        let data = JSON.parse(res.data);
                                        for (let i of data[0].children) {
                                                if (i.BRNAME == this.data.userInfo.userName) {

                                                        let obj3 = {
                                                                username: i.BRNAME,
                                                                passwd: hex_md5(this.data.userInfo.password),
                                                                stat: "1",
                                                                brno: i.BRNO,
                                                                oper: app.globalData.userInfo.username,
                                                                brname: i.BRNAME,
                                                                phone: this.data.userInfo.telephone,
                                                                role: "04",
                                                        }
                                                        if (this.data.addType == false) {
                                                                obj3.id = this.data.userInfo.id;
                                                        }
                                                        managerRegiter(obj3).then(res => {
                                                                if (res.data.success) {
                                                                        wx.showToast({
                                                                                title: '操作成功',
                                                                                icon: "success",
                                                                                duration: 1000
                                                                        })
                                                                        setTimeout(() => {
                                                                                wx.navigateBack({
                                                                                        delta: 1,
                                                                                })
                                                                        }, 1000)

                                                                } else {
                                                                        wx.showToast({
                                                                                title: res.data.msg,
                                                                                icon: "error",
                                                                                duration: 1000
                                                                        })
                                                                }
                                                        })
                                                        return;
                                                }

                                        }
                                })
                        } else {
                                wx.showToast({
                                        title: '操作失败',
                                        icon: "error",
                                        duration: 1000
                                })
                        }
                })


        }



})