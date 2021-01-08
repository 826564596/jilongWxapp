// pages/deviceDevOps/deviceDevOps.js
//设备运维
const app = getApp();
import {
  getCompanyList,
  getCompanyDeviceList,
  postHistoryFaultMessage,
  getIOState
} from "../../utils/api";

import {
  timestampToTime,
  getDate,
  tento2,
} from "../../utils/util"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    active: 0,
    itemList: ['设备故障', 'I/O状态'],
    faultList: [],
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

    date: {
      show: false, //弹窗展示
      content: getDate(), //选中项

    },


    currentDate: new Date().getTime(),
    minDate: new Date().getTime() - 31536000000,
    // maxnDate: new Date().getTime() - 31536000000,
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else if (type === 'day') {
        return `${value}日`;
      }
      // return value;
    },

    //输入
    paras: [],
    //输出
    output: {},

  },
  setActive(value) {
    this.setData({
      active: value.detail.active
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getTabBar().init(1);
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
    this.setData({
      [`company.show`]: true
    });
  },

  deviceFoucs() {
    this.setData({
      [`device.show`]: true
    });
  },

  dateFoucs() {
    this.setData({
      [`date.show`]: true
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
      console.log(res);
      this.setData({
        [`device.pickerList`]: dedviceList,
        [`device.list`]: res.data,
        ['device.content']: "",
        ['device.index']: "",
        ['device.deviceId']: "",





      })
    })

  },

  //设备字段赋值
  setDevice(e) {
    let index = e.detail;
    if (this.data.device.list.length > 0) {
      let value = this.data.device.pickerList[0].values[index];
      let id = this.data.device.list[index].device_id ;
      this.setData({
        [`device.content`]: value,
        [`device.deviceId`]: id
      })
      this.searchFault();
      this.searchIO();
    }

    else{
      this.setData({
        [`device.content`]: "",
        [`device.deviceId`]: ""
      })
      this.searchFault();
      this.searchIO();
    }


  },
  confirm(e) {
    let dateStr = timestampToTime(e.detail).split(" ")[0];
    this.setData({
      [`date.show`]: false,
      [`date.content`]: dateStr
    })
    this.searchFault();
  },
  cancel() {
    this.setData({
      [`date.show`]: false,

    })
  },
  onClose() {
    this.setData({
      [`date.show`]: false,

    })
  },
  /**搜素设备故障 */
  searchFault() {
    postHistoryFaultMessage({
      "company_id": this.data.company.componyId,
      "device_id": this.data.device.deviceId,
      "query_date": this.data.date.content,
      "page": {
        "offset": 0,
        "limit": 10
      }
    }).then(res => {
      this.setData({
        faultList: res.data.fault_message,
      })
    })

  },
  /**搜素设备I/O */
  searchIO() {
    getIOState(this.data.device.deviceId).then(res => {
      let data = [];
      for (let i of res.data.paras) {
        i.values = tento2(i.value);

      }
      for (let i of res.data.output) {
        i.values = tento2(i.value);
      }
      console.log(res);
      this.setData({
        paras: res.data.paras,
        output: res.data.output
      })

    })
  }
})