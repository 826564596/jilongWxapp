// pages/deviceDevOps/deviceDevOps.js
//设备运维
const app = getApp();
import {
  getCompanyList,
  getCompanyDeviceList,
  postHistoryFaultMessage,
  getIOState,
  getIOName,
  getScadaParaList,
  getScadaParaData,
  getScadaParaDataRTP
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
    itemList: ['设备故障', 'I/O状态', ],
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

    pageIndex: 0,
    pageSize: 10,

    parameterPageIndex: 0, //设备参数页码
    parameterpageSize: 16, //设备参数每页个数,

    catalogArray: [], //目录 
    parameterArray: [], //分页后的参数列表
    allParameterArray: [], //总的参数列表
    loadingHidden: true, //加载显示参数
    loadingHidden2: true, //加载显示参数
  },
  setActive(value) {
    this.setData({
      active: value.detail.active
    })
  },
  onLoad() {
    this.getTabBar().init(1);

    if (app.globalData.userInfo.role == '03' || app.globalData.userInfo.role == '00') {
      this.setData({
        itemList: ['设备故障', 'I/O状态', '设备参数'],
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow(options) {
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
      let id = this.data.device.list[index].device_id;
      let state = this.data.device.list[index].state;
      console.log(id);
      let scadaId = this.data.device.list[index].scada_id;
      this.setData({
        [`device.content`]: value,
        [`device.deviceId`]: id,
        [`device.scadaId`]: scadaId,
        [`device.state`]: state
      })
      //设备故障
      if (this.data.active == 0) {
        this.searchFault(this.data.pageIndex, this.data.pageSize);

      }
      //设备参数 
      else if (this.data.active == 1) {

        this.searchIO();

      }
      //设备参数
      else if (this.data.active == 2) {
        this.serarchScadaParaList(this.data.device.list[index].scada_id);
      }
    } else {
      this.setData({
        [`device.content`]: "",
        [`device.deviceId`]: ""
      })

    }


  },

  serarchScadaParaList(scadaId, paraId) {
    let obj = {
      scadaid: scadaId,
      showall: true,
    }
    //第一级无需upid,判断非第一级的情况
    if (paraId) {
      obj.upid = paraId;
      getScadaParaList(obj).then(res => {
        let resultArray = JSON.parse(res.data);
        console.log(resultArray);
        this.pagingOfParameter(resultArray);
        this.setData({
          allParameterArray: resultArray
        })

      })
    }
    //第一级
    else {
      getScadaParaList(obj).then(res => {
        getScadaParaList({
          scadaid: scadaId,
          showall: true,
          upid: JSON.parse(res.data)[0].F_PARAID,
        }).then(res1 => {
          this.setData({
            catalogArray: JSON.parse(res.data),
            parameterArray: JSON.parse(res1.data),
          })
        })


      })
    }

  },
  /**下一级 */
  nextLevel(e) {
    //如果不是目录
    if (e.target.dataset.item.F_LEAF && e.target.dataset.item.F_LEAF == "1") {
      return;
    }
    //先判断当前的层级是否已经在catalogArray里
    let index = this.data.catalogArray.findIndex((item, index) => {
      return item.F_PARAID == e.target.dataset.item.F_PARAID
    })
    //如果不存在，则插入
    if (index == -1) {
      this.data.catalogArray.push(e.target.dataset.item);
    } else {
      this.data.catalogArray.splice(index + 1, this.data.catalogArray.length - index);
    }
    console.log(this.data.catalogArray);
    this.serarchScadaParaList(this.data.device.scadaId, e.target.dataset.item.F_PARAID);
    this.setData({
      parameterArray: [],
      parameterPageIndex: 0,
      catalogArray: this.data.catalogArray
    })
  },
  /**设备参数分页 */
  pagingOfParameter(parameterArray) {
    let array = parameterArray.slice(this.data.parameterPageIndex * this.data.parameterpageSize, (this.data.parameterPageIndex + 1) * this.data.parameterpageSize);
    console.log(array);
    let paraIdArray = [];

    if (array.length > 0) {
      //提取F_PARAID
      for (let i of array) {
        //如果是参数 
        if (i.F_LEAF == "1") {
          paraIdArray.push(i.F_PARAID);
        }
      }
      getScadaParaData({
        deviceid: this.data.device.deviceId,
        paralist: paraIdArray.join(","),
      }).then(res => {
        console.log(JSON.parse(res.data));
        let resultObj = JSON.parse(res.data);
        for (let i of array) {
          // debugger
          if (resultObj.hasOwnProperty(i.F_PARAID)) {
            i.value = resultObj[i.F_PARAID];
          }
        }
        this.setData({
          parameterArray: this.data.parameterArray.concat(array),
        })
      })


    }

  },
  // 监听设备参数滚动到最后
  lowerOfParameter() {
    this.setData({
      parameterPageIndex: this.data.parameterPageIndex + 1
    })
    this.pagingOfParameter(this.data.allParameterArray);
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
  searchFault(index, size) {
    postHistoryFaultMessage({
      "company_id": this.data.company.componyId,
      "device_id": this.data.device.deviceId,
      "query_date": this.data.date.content,
      "page": {
        "offset": index,
        "limit": size
      }
    }).then(res => {
      this.setData({
        faultList: res.data.fault_message,
      })
    })

  },
  /**搜素设备I/O */
  searchIO() {
    this.setData({
      loadingHidden2: false,
    })
    getIOName({
      device_id: this.data.device.deviceId
    }).then(res => {
      return res.data;
    }).then(getIOName => {
      getIOState(this.data.device.deviceId).then(res => {
        let data = [];

        for (let i = 0, len = res.data.input.length; i < len; i++) {

          res.data.input[i].values = tento2(res.data.input[i].value);
          res.data.input[i].name = getIOName.input[i];
        }

        for (let i = 0, len = res.data.output.length; i < len; i++) {
          res.data.output[i].values = tento2(res.data.output[i].value);
          res.data.output[i].name = getIOName.output[i];

        }

        console.log(res);
        this.setData({
          loadingHidden2: true,
          paras: res.data.input,
          output: res.data.output
        })

      })
    }).catch(error =>{
      console.log(error);
    })



  },
  /**监听滚动到最后 */
  lower(e) {
    let pageSize = this.data.pageSize + 10;
    this.searchFault(this.data.pageIndex, pageSize);
    this.setData({
      pageSize: pageSize
    })
  },
  /**刷新 */
  refresh(e) {
    let paraId = e.target.dataset.paraid;
    this.setData({
      loadingHidden: false
    })
    getScadaParaDataRTP({
      deviceid: this.data.device.deviceId,
      paralist: paraId,
    }).then(res => {
      //如果设备在线
      if (res.data) {
        let data = JSON.parse(res.data);
        console.log(data);
        for (let i of this.data.parameterArray) {
          if (data[0].id == i.F_PARAID) {
            i.value = data[0].value;
          }
        }
        this.setData({
          loadingHidden: true,
          parameterArray: this.data.parameterArray,
        })
      }


    })
  }


})