// pages/deviceList/deviceList.js
const app = getApp();
import {
        getCompanyList,
        getCompanyDeviceList,

} from "../../utils/api";

import {objectToUrl,objectToUrlNoEncodeURI} from "../../utils/util";

Page({
        data: {
                CustomBar: app.globalData.CustomBar,
                url:app.globalData.imgURL,
                bgURL:app.globalData.backgroundURL,
                option1: [],
                option2: [],
                value1: 0, //下拉框index
                value2: 0,
                deviceList: [],
        },
        // onLoad(){
               

        // },
        onShow() {
                this.getTabBar().init(0);
                
                getCompanyList(app.globalData.userInfo.username).then(res => {
                        res.data = res.data.map((item, index) => {
                                let a = {};
                                a.text = item.company_name;
                                a.value = index;
                                a.company_id = item.company_id;
                                return a;
                        });
                        this.setData({
                                option1: res.data,
                                value1:0,
                        })
                        return res.data[0];
                }).then(res => {
                        getCompanyDeviceList(res.company_id).then(res => {
                                res.data = res.data.map((item, index) => {
                                        item.text = item.device_name;
                                        item.value = index;
                                        return item;
                                })
                                this.setData({
                                        deviceList: res.data
                                })
                        })

                })
        },
        /**下拉框选项变化 */
        changeItem(e) {
                getCompanyDeviceList(this.data.option1[e.detail].company_id).then(res => {
                        this.setData({
                                deviceList:res.data
                        })
                })
        },
        detail(e){
                let value = e.currentTarget.dataset.item;
                // let 
                // let obj = {
                //         deviceId:value.device_id,
                //         imagePath:value.image_path
                // }
                wx.navigateTo({
                  url: `/pages/deviceMonitor/deviceMonitor` + objectToUrlNoEncodeURI(value),
                })
        }
});