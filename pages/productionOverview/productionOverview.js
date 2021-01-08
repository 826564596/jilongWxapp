// pages/productionOverview/productionOverview.js
const app = getApp();
import {
    getCompanyList,
    getCompanyDeviceList,
    getCompanyProductionReport,
} from "../../utils/api";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        CustomBar: app.globalData.CustomBar,
        active: 0,

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
        list: [], //渲染参数
        allList:[],//存放所有数据
    },
    setActive(value) {
        this.setData({
            active: value.detail.active
        })
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onLoad: function () {
        this.getTabBar().init(3);
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


    componyFoucs() {
        console.log
        this.setData({
            [`company.show`]: true
        });
    },

    deviceFoucs() {
        this.setData({
            [`device.show`]: true
        });
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
        this.search();
    },

    //设备字段赋值
    setDevice(e) {
        let index = e.detail;
        let value = this.data.device.pickerList[0].values[index];
        let id = this.data.device.list[index].device_id;
        this.setData({
            [`device.content`]: value,
            [`device.deviceId`]: id
        })
        let arr = this.data.allList.filter(item=>{
            return item.device_id == id;
        })
        this.setData({
            list : arr
        })
    },
    /**搜索生产报告 */
    search() {
        getCompanyProductionReport(this.data.company.componyId).then(res => {
            console.log(res.data);
            this.setData({
                allList:res.data,
                list: res.data
            })
        })
    }
})