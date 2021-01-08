// pages/deviceManger/deviceManger.js
const app = getApp();
import {
        getCompanyList,
        getCompanyDeviceList,
        deleteDeviceWithID,
} from "../../utils/api";
import {
        objectToUrlNoEncodeURI
} from "../../utils/util";
Page({

        /**
         * 页面的初始数据
         */
        data: {
                CustomBar: app.globalData.CustomBar,
                url: app.globalData.imgURL,
                bgURL: app.globalData.backgroundURL,

                //公司搜索条件相关参数
                company: {
                        index: "", //选中项下标
                        show: false, //弹窗展示
                        content: "", //选中项
                        companyId: "",
                        pickerList: [], //待选内容
                        list: [], //返回内容

                },
                //设备搜索条件相关参数
                device: {
                        index: "", //选中项下标
                        show: false, //弹窗展示
                        content: "", //选中项
                        deviceId: "",
                        pickerList: [], //待选内容
                        list: [], //返回内容
                },
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad(options) {
                getCompanyList(app.globalData.userInfo.username).then(res => {
                        console.log(res);
                        let componyList = [{
                                key: [],
                                values: [],
                                defaultIndex: 0,
                        }];
                        for (let i of res.data) {
                                componyList[0].values.push(i.company_name);
                        }

                        this.setData({
                                [`company.pickerList`]: componyList,
                                [`company.list`]: res.data

                        })
                })
        },
        //compony字段赋值
        setCompony(e) {
                let index = e.detail;
                let value = this.data.company.pickerList[0].values[index];
                let id = this.data.company.list[index].company_id;
                //给compony赋值
                this.setData({
                        [`company.content`]: value,
                        [`company.componyId`]: id
                })
                getCompanyDeviceList(id).then(res => {
                        let dedviceList = [{
                                key: [],
                                values: [],
                                defaultIndex: 0,
                        }];
                        for (let i of res.data) {
                                dedviceList[0].values.push(i.device_name);
                        }

                        this.setData({
                                [`device.pickerList`]: dedviceList,
                                [`device.list`]: res.data

                        })
                })
        },

        componyFoucs() {
                this.setData({
                        [`company.show`]: true
                });
        },
        //编辑设备
        editorDevice(item) {
                console.log(item.target.dataset);
                let obj = item.target.dataset.item;
                obj.editor = true;

                wx.navigateTo({
                        url: '/pages/addDevice/addDevice' + objectToUrlNoEncodeURI(obj),
                })
        },
        //添加设备
        addDevice() {
                let obj = {
                        editor: false
                }
                wx.navigateTo({
                        url: '/pages/addDevice/addDevice' + objectToUrlNoEncodeURI(obj),
                })

        },
        //删除设备
        deleteDevice(e) {
                let item = e.target.dataset.item;
                console.log(item);
                wx.showModal({
                        title: "提示",
                        content: '是否删除该设备?',
                        cancelColor: '#000',
                        confirmColor: "#000",
                        success(e) {
                                if (e.confirm) {
                                        let obj = {
                                                deviceid: item.device_id,
                                                MAC: item.mac,
                                        }
                                        deleteDeviceWithID(obj).then(res => {
                                                console.log(res);
                                                if (res.data.success) {
                                                        wx.showToast({
                                                                title: '操作成功',
                                                                icon: "success",
                                                                duration: 1000
                                                        })
                                                }else{
                                                        wx.showToast({
                                                                title: '操作失败',
                                                                icon: "error",
                                                                duration: 1000
                                                        })    
                                                }
                                        })
                                }
                        }

                })
        }

})