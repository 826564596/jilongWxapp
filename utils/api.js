import {
    objectToUrl
} from "./util";

// 测试

// const ApiUrl = "http://120.37.178.58:9698/api/v1";
// const LoginUrl = "http://120.37.178.58:9002";

//  const ApiUrl = "http://27.150.173.9:9698/api/v1";
//  const LoginUrl = "http://27.150.173.9:9002"; 

const ApiUrl = "https://jlma.ltd:9698/api/v1";
const LoginUrl = "https://jlma.ltd:9002";
 
//  const ApiUrl = "https://47.242.168.184:9698/api/v1";
//  const LoginUrl = "https://47.242.168.184:9002";




//刷新间隔
const refreshInterval5s = 5000;
const refreshInterval30s = 30000;
const refreshInterval60s = 60000;


/** 
 * request请求
 * @param {String} url 请求路径
 * @param {Object} data 请求数据
 * @param {String} method 请求类型
 */

const request = (url, data = {}, method = "GET") => {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            method: method,
            data: data,
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                if (res.statusCode == 200) {
                    resolve(res);
                } else {
                    reject(res);
                }
            },
            fail(err) {
                reject(err);
            },
            complete() {}
        })
    })
}
/**
 * object 对象转成url路径
 * @param {Object} obj 
 */

/**API 路径 */
const API = {
    //登录
    login: LoginUrl + "/DDC/User/Login", //用户登录接口
    operationManager: ApiUrl + "/operation_manager/login", //确认操作密码
    changeOperationPassword: ApiUrl + "/operation_manager/change_password", //修改操作密码
    resetOperationPassword: ApiUrl + "/operation_manager/reset_password", //重置操作密码
    //获取设备参数
    getScadaParaList: LoginUrl + "/DDC/Para/ScadaParaList", //获取设备参数列表
    getScadaParaData: LoginUrl + "/DDC/DevicePara/parastat", // 获取设备参数数据
    getScadaParaDataRTP: LoginUrl + "/DDC/DevicePara/RTParaQry", //获取设备参数实时数据
    //添加设备  
    addDevice: LoginUrl + "/DDC/Terminal/DeviceRegiterWithID", //添加设备
    getModel: LoginUrl + "/DDC/DeviceSdk/OwenerScaraList", //获取数据模型
    uploadImage: LoginUrl + "/DDC/Image/SaveImage", //上传图片
    getUserList: LoginUrl + "/DDC/User/UserList", //获取用户列表
    managerRegiter: LoginUrl + "/DDC/User/ManagerRegiter", //管理用户
    branchRegiter: LoginUrl + "/DDC/User/BranchRegiter", //添加机构，是添加用户的前提,
    branchList: LoginUrl + "/DDC/User/BranchList", //获取机构列表
    modifyDevice: LoginUrl + "/DDC/Terminal/DeviceRegiter", //修改设备信息
    //设备管理
    getDeviceType: ApiUrl + "/device_manager/device_type_of_jilong", //获取设备类型号
    deleteDeviceWithID: LoginUrl + "/DDC/Terminal/DeviceClearWithID", //设备删除
    getCompanyList: ApiUrl + "/device_manager/company_list", //获取公司列表
    getCompanyDeviceList: ApiUrl + "/device_manager/device_list", //获取公司下的设备列表
    getCompanyDeviceInfo: ApiUrl + "/device_manager/company_device_info", //获取设备信息详情（包含设备型号，类型）
    getRealTimeState: ApiUrl + "/device_manager/realtime_state", //获取设备实时状态（运行、待机、报警、故障）
    getStateCount: ApiUrl + "/device_manager/state_count", //获取设备状态计数（已接入设备数、在线设备数、运行设备数、待机设备数、故障设备数）
    getCompanyProductionReport: ApiUrl + "/device_manager/production_report", //获取公司生产信息总览
    //产能消耗
    postPeriodOutput: ApiUrl + "/output_statistics/period_output", //获取时间段内产量信息（状态统计、运行时长、产量计数、报警次数、故障次数）
    postRealTimeEnergy: ApiUrl + "/energy_statistics/realtime_energy", //获取实时能耗数值（功率、电流、用水量、用气量）
    getTodayAndClassEnergy: ApiUrl + "/energy_statistics/today_and_class_energy", //获取当天和当班产量及能耗信息
    postPeriodEnergy: ApiUrl + "/energy_statistics/period_energy", //获取时间段内能耗信息（用电量、用水量、用气量及单位能耗）
    //设备运维 
    getIOState: ApiUrl + "/device_ops/io_state", //获取I/O状态信息
    getIOName: ApiUrl + "/io_name_manager/get_io_names_by_device_id", //获取设备IO名称
    getRealTimeFaultMessage: ApiUrl + "/device_ops/realtime_fault_message", //获取设备实时故障信息
    postHistoryFaultMessage: ApiUrl + "/device_ops/history_fault_message", //获取设备历史故障信息
    getRealTimeAlarmRecord: ApiUrl + "/device_ops/realtime_alarm_record", //获取设备实时报警记录
    postHistoryAlarm: ApiUrl + "/device_ops/history_alarm", //获取设备历史报警记录

    //消息管理
    postMessageList: ApiUrl + "/msg_manager/message_list", //获取用户消息列表
    getMessageUnreadCount: ApiUrl + "/msg_manager/message_unread_count", //获取用户消息未读数
    postSetMessageRead: ApiUrl + "/msg_manager/set_message_read", //用户消息设置为已读
    postDeleteMessage: ApiUrl + "/msg_manager/delete_message", //删除用户消息
    //用户管理
    addUser: ApiUrl + "/user_manager/add_user", //添加用户信息



}
/**登陆 */
const login = (data) => {
    return request(API.login + objectToUrl(data), {}, "POST");
}
/**确认操作密码 */
const operationManager = (data) => {
    return request(API.operationManager, data, "POST");
}
/**修改操作密码 */
const changeOperationPassword = (data) => {
    return request(API.changeOperationPassword, data, "POST");
}
/**重置操作密码 */
const resetOperationPassword = data => {
    return request(API.resetOperationPassword, data, "POST");
}
/**获取设备参数 */
const getScadaParaList = (data) => {
    return request(API.getScadaParaList + objectToUrl(data), {}, "POST");
}
/**获取设备参数数据 */
const getScadaParaData = (data) => {
    return request(API.getScadaParaData + objectToUrl(data), {}, "POST");
}
/**获取设备参数实时数据 */
const getScadaParaDataRTP = (data) => {
    return request(API.getScadaParaDataRTP + objectToUrl(data), {}, "POST");
}
/**添加设备 */
const addDevice = (data) => {
    return request(API.addDevice + objectToUrl(data), {}, "POST");
}
/**修改设备信息 */
const modifyDevice = (data) => {
    return request(API.modifyDevice + objectToUrl(data), {}, "POST");

}
/**获取数据模型 */
const getModel = (data) => {
    return request(API.getModel + objectToUrl(data), {}, "POST");
}
const uploadImage = (data) => {
    return request(API.uploadImage + objectToUrl(data), {}, "POST");
}
/**获取用户列表 */
const getUserList = (data) => {
    return request(API.getUserList + objectToUrl(data), {}, "POST");
}
/**管理用户 */
const managerRegiter = (data) => {
    return request(API.managerRegiter + objectToUrl(data), {}, "POST");
}
/**添加机构 */
const branchRegiter = (data) => {
    return request(API.branchRegiter + objectToUrl(data), {}, "POST");
}
/**获取机构列表 */
const branchList = (data) => {
    return request(API.branchList + objectToUrl(data), {}, "POST");
}
/**获取设备类型号 */
const getDeviceType = () => {
    return request(API.getDeviceType, {}, "GET");
}
/**设备删除 */
const deleteDeviceWithID = (data) => {
    return request(API.deleteDeviceWithID + objectToUrl(data), {}, "POST");

}
/**获取公司列表 */
const getCompanyList = (data) => {
    return request(API.getCompanyList + `/${data}`, {}, "GET");
}
/**获取公司下的设备列表 */
const getCompanyDeviceList = (data) => {
    return request(API.getCompanyDeviceList + `/${data}`, {}, "GET");
}
/**获取设备信息详情（包含设备型号，类型） */
const getCompanyDeviceInfo = (data) => {
    return request(API.getCompanyDeviceInfo + `/${data}`, {}, "GET");
}
/**获取设备实时状态（运行、待机、报警、故障） */
const getRealTimeState = (data) => {
    return request(API.getRealTimeState + `/${data}`, {}, "GET");
}
/**获取设备状态计数（已接入设备数、在线设备数、运行设备数、待机设备数、故障设备数） */
const getStateCount = (data) => {
    return request(API.getStateCount + `/${data}`, {}, "GET");
}
/**获取公司生产信息总览 */
const getCompanyProductionReport = (data) => {
    return request(API.getCompanyProductionReport + `/${data}`, {}, "GET");
}
/**获取时间段内产量信息（状态统计、运行时长、产量计数、报警次数、故障次数） */
const postPeriodOutput = (data) => {
    return request(API.postPeriodOutput, data, "POST");
}
/**获取实时能耗数值（功率、电流、用水量、用气量） */
const postRealTimeEnergy = (data) => {
    return request(API.postRealTimeEnergy + `/${data}`, {}, "GET");
}
/**获取当天和当班产量及能耗信息 */
const getTodayAndClassEnergy = (data) => {
    return request(API.getTodayAndClassEnergy + `/${data}`, {}, "GET");
}
/**获取时间段内能耗信息（用电量、用水量、用气量及单位能耗） */
const postPeriodEnergy = (data) => {
    return request(API.postPeriodEnergy, data, "POST");
}
/**获取I/O状态信息 */
const getIOState = (data) => {
    return request(API.getIOState + `/${data}`, {}, "GET");
}
/**获取I/O名称 */
const getIOName = (data) => {
    return request(API.getIOName + objectToUrl(data), {}, "GET");

}
/**获取设备实时故障信息 */
const getRealTimeFaultMessage = (data) => {
    return request(API.getRealTimeFaultMessage + `/${data}`, {}, "GET");
}
/**获取设备历史故障信息 */
const postHistoryFaultMessage = (data) => {
    return request(API.postHistoryFaultMessage, data, "POST");
}
/**获取设备实时报警记录 */
const getRealTimeAlarmRecord = (data) => {
    return request(API.getRealTimeAlarmRecord + `/${data}`, {}, "GET");
}
/**获取设备历史报警记录 */
const postHistoryAlarm = (data) => {
    return request(API.postHistoryAlarm, data, "POST");
}
/**获取用户消息列表 */
const postMessageList = (data) => {
    return request(API.postMessageList, data, "POST");
}
/**获取用户消息未读数 */
const getMessageUnreadCount = (data) => {
    return request(API.getMessageUnreadCount + `/${data}`, {}, "GET");
}
/**用户消息设置为已读 */
const postSetMessageRead = (data) => {
    return request(API.postSetMessageRead, data, "POST");
}
/**删除用户消息 */
const postDeleteMessage = (data) => {
    return request(API.postDeleteMessage, data, "POST");
}
/**添加用户 */
const addUser = (data) => {
    return request(API.addUser, data, "POST");
}
module.exports = {
    refreshInterval5s: refreshInterval5s,
    refreshInterval30s: refreshInterval30s,
    refreshInterval60s: refreshInterval60s,

    ApiUrl: ApiUrl,
    LoginUrl: LoginUrl,

    API: API,
    login: login,
    operationManager: operationManager,
    changeOperationPassword: changeOperationPassword,
    resetOperationPassword: resetOperationPassword,
    getScadaParaList: getScadaParaList,
    getScadaParaData: getScadaParaData,
    getScadaParaDataRTP: getScadaParaDataRTP,
    addDevice: addDevice,
    modifyDevice: modifyDevice,
    getModel: getModel,
    getUserList: getUserList,
    managerRegiter: managerRegiter,
    branchRegiter: branchRegiter,
    branchList: branchList,
    getDeviceType: getDeviceType,
    deleteDeviceWithID: deleteDeviceWithID,
    getCompanyList: getCompanyList,
    getCompanyDeviceList: getCompanyDeviceList,
    getCompanyDeviceInfo: getCompanyDeviceInfo,
    getRealTimeState: getRealTimeState,
    getStateCount: getStateCount,
    getCompanyProductionReport: getCompanyProductionReport,
    postPeriodOutput: postPeriodOutput,
    postRealTimeEnergy: postRealTimeEnergy,
    getTodayAndClassEnergy: getTodayAndClassEnergy,
    postPeriodEnergy: postPeriodEnergy,
    getIOState: getIOState,
    getIOName: getIOName,
    getRealTimeFaultMessage: getRealTimeFaultMessage,
    postHistoryFaultMessage: postHistoryFaultMessage,
    getRealTimeAlarmRecord: getRealTimeAlarmRecord,
    postHistoryAlarm: postHistoryAlarm,
    postMessageList: postMessageList,
    getMessageUnreadCount: getMessageUnreadCount,
    postSetMessageRead: postSetMessageRead,
    postDeleteMessage: postDeleteMessage,
    addUser: addUser
}