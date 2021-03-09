// pages/operationPasswordManger/operationPasswordManger.js
const app = getApp();
import {
        changeOperationPassword
} from "../../utils/api";

import {
        objectToUrl
} from "../../utils/util";

import {
        hex_md5
} from "../../utils/md5";
import * as regExp from "../../utils/RegExp";
Page({

        /**
         * 页面的初始数据
         */
        data: {
                CustomBar: app.globalData.CustomBar,
                url: app.globalData.imgURL,
                bgURL: app.globalData.backgroundURL,
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad(options) {
                // this.getData(this.data.pageIndex, this.data.pageSize);

        },
        /**旧密码 */
        inputOldPassword(e) {
                this.setData({
                        oldPassword: e.detail.value
                })
        },
        /**新密码 */
        inputNewPassword(e) {
                this.setData({
                        newPassword: e.detail.value
                })
        },
        /**确认密码 */
        inputConfirmPassword(e) {
                this.setData({
                        confirmPassword: e.detail.value
                })
        },
        /**确认 */
        confirm() {

                if (regExp.specialCharacters.test(this.data.newPassword)) {
                        wx.showToast({
                                title: '新密码格式有误',
                                icon: "error",
                                duration: 1000,
                        })
                        return;
                }
                if (this.data.newPassword != this.data.confirmPassword) {
                        wx.showToast({
                                title: '密码输入不一致',
                                icon: "error",
                                duration: 1000,
                        })
                        return;
                }
                let obj = {
                        username: app.globalData.userInfo.username,
                        old_password: hex_md5(this.data.oldPassword + 'tBOs'),
                        new_password: hex_md5(this.data.newPassword + 'tBOs'),
                        confirm_password: hex_md5(this.data.confirmPassword + 'tBOs')
                }
                changeOperationPassword(obj).then(res => {
                        console.log(res);
                        if (res.data.code == 1000) {
                                wx.showToast({
                                        title: res.data.msg,
                                        icon: "success",
                                        duration: 1000,
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
                                        duration: 1000,
                                })
                        }
                })
        }




})