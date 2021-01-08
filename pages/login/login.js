// pages/login/login.js 登录页面
import {
        login
} from "../../utils/api";
import {
        hex_md5
} from "../../utils/md5";
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp();
Page({

        /**
         * 页面的初始数据
         */
        data: {
                userName: "jilong",
                password: "123456",
        },



        /**登陆 */
        login() {
                login({
                        username: this.data.userName,
                        passwd: hex_md5(this.data.password),
                }).then(res => {
                        //登录成功
                        if (res.data.success) {
                                app.globalData.userInfo = res.data;
                                wx.setStorageSync('userInfo', res.data);
                                Toast.success('登陆成功');
                                wx.switchTab({
                                        url: '../index/index',
                                })
                        }
                        //登录失败
                        else {
                                Toast.fail('用户名或密码有误');

                        }
                })
        },
        /**输入账号 */
        setUserName(e) {
                this.setData({
                        userName: e.detail.value
                })
        },
        /**输入密码 */
        setPassword(e) {
                this.setData({
                        password: e.detail.value
                })
        },

})