// pages/addDevice/addDevice.js
const app = getApp();
import {
        getCompanyList,
        addDevice,
        modifyDevice,
        getModel,
        API,
        LoginUrl,
        operationManager
} from "../../utils/api";
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
                title: "",
                LoginUrl: LoginUrl,
                device: {
                        company_name: "", //公司名称
                        company_id: "", //公司id
                        device_name: "", //设备名称
                        device_id: "", //设备编号
                        device_type: "", //设备类型
                        model_name: "", //型号名称
                        mac: "", //网关编号
                        imageUrl: "", //图片路径
                        connstr: "/dev/ttyUSB0-9600-O-8-1-1-10000-0-161",
                        devicescada: "",
                        devicesdk: "",
                        devicetype: "",
                        // devicescada: "PI-PLCV1.0",
                        // devicesdk: "SCADA_024f8b0832b04f1293dc07a4fbc16e74",
                        // devicetype: "015",
                        imageid: "",

                },


                company: {
                        index: "", //选中项下标
                        show: false, //弹窗展示
                        content: "", //选中项
                        companyId: "",
                        pickerList: [], //待选内容
                        list: [], //返回内容

                },
                model: {
                        index: "", //选中项下标
                        show: false, //弹窗展示
                        content: "", //选中项
                        modelId: "",
                        pickerList: [], //待选内容
                        list: [], //返回内容  
                },
                address: {
                        show: false, //弹窗展示
                        content: '',
                },
                isShowConfirm: false,
                

        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad(options) {
                console.log(options);
                this.setData({
                        power: app.globalData.userInfo.role
                })

                getModel({
                        userid: "jilong"
                }).then(res => {
                        console.log(res.data.data);
                        let modelList = [{
                                key: [],
                                values: [],
                                defaultIndex: 0,
                        }];
                        for (let i of res.data.data) {
                                modelList[0].values.push(i.F_SCADANAME);
                        }

                        this.setData({
                                [`model.pickerList`]: modelList,
                                [`model.list`]: res.data.data

                        })
                })
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
                //编辑，需要赋值
                if (options.editor == "true") {

                        console.log(LoginUrl + options.image_path)
                        this.setData({
                                addType: false,
                                [`device.device_id`]: options.device_id,
                                [`device.mac`]: options.mac,
                                [`device.device_name`]: options.device_name,
                                [`device.model_name`]: options.device_type,
                                [`device.imageid`]: options.image_id,
                                [`device.devicetype`]: options.para_type,
                                [`device.image_path`]: options.image_path,



                        })
                }
                //添加
                else if (options.editor == "false") {
                        this.setData({
                                addType: true
                        })
                }
        },
        confirm(e) {
                //添加表单校验
                if (this.data.addType == true) {
                        if (!this.data.device.company_id.trim()) {
                                wx.showToast({
                                        title: '请选择公司名称',
                                        icon: "error",
                                        duration: 1000,
                                })
                                return;
                        }
                        if (!this.data.device.device_name.trim()) {
                                wx.showToast({
                                        title: '请输入设备名称',
                                        icon: "error",
                                        duration: 1000,
                                })
                                return;
                        }

                        if (!this.data.device.device_id.trim()) {
                                wx.showToast({
                                        title: '请输入设备编号',
                                        icon: "error",
                                        duration: 1000,
                                })
                                return;
                        }
                        if (this.data.device.device_id.trim().length < 8) {
                                wx.showToast({
                                        title: '设备编号不小于8位',
                                        icon: "error",
                                        duration: 1000,
                                })
                                return;
                        }
                        if (!this.data.device.mac.trim()) {
                                wx.showToast({
                                        title: '请输入网关编号',
                                        icon: "error",
                                        duration: 1000,
                                })
                                return;
                        }
                        if (!this.data.device.devicesdk.trim()) {
                                wx.showToast({
                                        title: '请选择设备型号',
                                        icon: "error",
                                        duration: 1000,
                                })
                                return;
                        }
                        if (!this.data.device.model_name.trim()) {
                                wx.showToast({
                                        title: '请输入模型名称',
                                        icon: "error",
                                        duration: 1000,
                                })
                                return;
                        }

                        if (!this.data.address.content.trim()) {
                                wx.showToast({
                                        title: '请选择地址',
                                        icon: "error",
                                        duration: 1000,
                                })
                                return;
                        }
                        // if (!this.data.device.imageid.trim()) {
                        //         wx.showToast({
                        //                 title: '请上传设备图片',
                        //                 icon: "error",
                        //                 duration: 1000,
                        //         })
                        //         return;
                        // }
                }
                //编辑表单校验
                else if (this.data.addType == false) {
                        if (!this.data.device.device_name.trim()) {
                                wx.showToast({
                                        title: '请输入设备名称',
                                        icon: "error",
                                        duration: 1000,
                                })
                                return;
                        }

                        if (!this.data.device.model_name.trim()) {
                                wx.showToast({
                                        title: '请输入模型名称',
                                        icon: "error",
                                        duration: 1000,
                                })
                                return;
                        }

                }
                if (this.data.power == '03' || this.data.power == '00') {
                        this.setData({
                                isShowConfirm: true,
                        })
                } else {
                        this.submit();
                }

        },
        /**确认 */
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
        /**提交 */
        submit() {
                // 编辑
                if (this.data.addType == false) {
                        console.log(this.data.device);
                        let obj = {
                                deviceid: this.data.device.device_id,
                                MAC: this.data.device.mac,
                                name: this.data.device.device_name,
                                connstr: this.data.device.connstr,
                                imageid: this.data.device.imageid,
                                devicetype: this.data.device.devicetype,
                                desc: this.data.device.model_name,
                        }
                        modifyDevice(obj).then(res => {
                                console.log(res);
                                wx.showToast({
                                        title: res.data.msg,
                                        icon: "success",
                                        duration: 1000
                                })
                                wx.navigateBack({
                                        delta: 1,
                                })
                        })

                }
                // 添加 
                else if (this.data.addType == true) {
                        console.log("添加");
                        console.log(this.data.device);
                        let obj = {
                                brno: this.data.device.company_id,
                                deviceid: this.data.device.device_id,
                                MAC: this.data.device.mac,
                                name: this.data.device.device_name,
                                connstr: this.data.device.connstr,
                                devicesdk: this.data.device.devicesdk,
                                devicescada: this.data.device.devicescada,
                                devicetype: this.data.device.devicetype,
                                desc: this.data.device.model_name,
                                addr: this.data.address.content,
                                imageid: this.data.device.imageid,
                        }
                        console.log(obj);
                        // return;
                        addDevice(obj).then(res => {
                                console.log(res);
                                if (res.data.success) {
                                        wx.showToast({
                                                title: res.data.msg,
                                                icon: "success",
                                                duration: 1000
                                        })
                                        wx.navigateBack({
                                                delta: 1,
                                        })
                                } else {
                                        wx.showToast({
                                                title: res.data.msg,
                                                icon: "success",
                                                duration: 1000
                                        })
                                }


                        })
                }
        },
        componyFoucs() {
                this.setData({
                        [`company.show`]: true
                });
        },
        modelFoucs() {
                this.setData({
                        [`model.show`]: true
                });
        },
        addressFoucs() {
                this.setData({
                        [`address.show`]: true
                });
        },
        /**公司赋值 */
        setCompony(e) {
                let index = e.detail;
                let value = this.data.company.pickerList[0].values[index];
                let id = this.data.company.list[index].company_id;
                //给compony赋值
                this.setData({
                        [`device.company_name`]: value,
                        [`device.company_id`]: id
                })

        },
        /**设备型号赋值 */
        setModel(e) {
                let index = e.detail;
                console.log(this.data.model.list[index]);
                // let value = this.data.model.pickerList[0].values[index];
                let devicesdk = this.data.model.list[index].F_DEVICESDK;
                let devicescada = this.data.model.list[index].F_SCADAID;
                let devicetype = this.data.model.list[index].F_TOPPARAID;
                let devicesdkName = this.data.model.list[index].F_SCADANAME;
                //给compony赋值
                this.setData({
                        // [`device.model_name`]: value,
                        [`device.devicesdk`]: devicesdk,
                        [`device.devicescada`]: devicescada,
                        [`device.devicetype`]: devicetype,
                        [`device.devicesdkName`]: devicesdkName,


                        // [`device.company_id`]: id
                })
        },
        /**地址赋值 */
        setAddress(e) {
                console.log(e.detail);
                let arr = e.detail;
                let content = "";
                for (let i of arr) {
                        content += i.name + ",";
                }
                this.setData({
                        [`address.content`]: content
                })
        },
        /**设备名称 */
        deviceName(e) {
                this.setData({
                        [`device.device_name`]: e.detail.value
                })
        },
        /**设备编号 */
        deviceId(e) {
                this.setData({
                        [`device.device_id`]: e.detail.value
                })
        },
        /**网关编号 */
        mac(e) {
                this.setData({
                        [`device.mac`]: e.detail.value
                })
        },
        /**模型名称 */
        modelName(e) {
                this.setData({
                        [`device.model_name`]: e.detail.value
                })
        },
        /**选择图片 */
        choseImage() {
                let that = this;
                wx.chooseImage({
                        count: 1,
                        sizeType: ['original', 'compressed'],
                        sourceType: ['album', 'camera'],
                        success(res) {
                                const tempFilePaths = res.tempFilePaths;
                                // tempFilePath可以作为img标签的src属性显示图片
                                that.setData({
                                        [`device.imageUrl`]: tempFilePaths[0]
                                })

                                wx.uploadFile({
                                        url: `${API.uploadImage}`,
                                        filePath: res.tempFilePaths[0],
                                        name: 'file',
                                        header: {
                                                'content-type': 'multipart/form-data'
                                        },
                                        success(res) {
                                                console.log(JSON.parse(JSON.parse(res.data)));
                                                that.setData({
                                                        [`device.imageid`]: JSON.parse(JSON.parse(res.data)).pathlist[0]
                                                })
                                        },
                                        fail(error) {
                                                console.log(error);
                                        }
                                })
                        }
                })
        },
        /**删除图片 */
        deleteImage() {
                this.setData({
                        [`device.imageUrl`]: ""
                })
        },

})