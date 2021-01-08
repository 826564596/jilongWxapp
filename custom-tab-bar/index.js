// Component({
//   data: {
//     selected: 0,
//     color: "#7A7E83",
//     selectedColor: "#3cc51f",
//     list: [{
//         pagePath: "/pages/deviceDistribution/deviceDistribution",
//         iconPath: "/images/deviceDistribution_active.png",
//         activeIconPath:"/images/deviceDistribution_active.png",
//         text: "设备分布"
//       },
//       {
//         pagePath: "/pages/deviceMonitor/deviceMonitor",
//         iconPath: "/images/deviceMonitor_active.png",
//         activeIconPath:"/images/deviceMonitor_active.png",
//         text: "设备监控"
//       },
//       {
//         pagePath: "/pages/index/index",
//         iconPath: "/images/index_active.png",
//         activeIconPath:"/images/index_active.png",
//         text: "首页"
//       }, {
//         pagePath: "/pages/deviceDevOps/deviceDevOps",
//         iconPath: "/images/deviceDevOps_active.png",
//         activeIconPath:"/images/deviceDevOps_active.png",
//         text: "设备运维"
//       }, {
//         pagePath: "/pages/userManagement/userManagement",
//         iconPath: "/images/userManagement_active.png",
//         activeIconPath:"/images/userManagement_active.png",
//         text: "用户管理"
//       }
//     ]
//   },
//   attached() {
//   },
//   methods: {
//     switchTab(e) {
//       const data = e.currentTarget.dataset
//       const url = data.path
//       wx.switchTab({url})
//       this.setData({
//         selected: data.index
//       })
//     },
//     init(){

//     }
//   },

// })
Component({
  data: {
    active: null,
    list: [
      {
        pagePath: "/pages/deviceList/deviceList",
        iconPath: "/images/tabbar/deviceMonitor_active.png",
        activeIconPath: "/images/tabbar/deviceMonitor_active.png",
        text: "设备列表" 
      },
      {
        pagePath: "/pages/deviceDevOps/deviceDevOps",
        iconPath: "/images/tabbar/deviceDevOps_active.png",
        activeIconPath: "/images/tabbar/deviceDevOps_active.png",
        text: "设备运维"
      },
      {
        pagePath: "/pages/index/index",
        iconPath: "/images/tabbar/index_active.png",
        activeIconPath: "/images/tabbar/index_active.png",
        text: "设备分布"
      },
      {
        pagePath: "/pages/productionOverview/productionOverview",
        iconPath: "/images/tabbar/deviceDevOps_active.png",
        activeIconPath: "/images/tabbar/deviceDevOps_active.png",
        text: "生产总览"
      },
      {
        pagePath: "/pages/userInfo/userInfo",
        iconPath: "/images/tabbar/userManagement_active.png",
        activeIconPath: "/images/tabbar/userManagement_active.png",
        text: "我的"
      } 
    ]
  },
  attached() {},
  methods: {
    onChange(e) {
      if (this.data.active == e.detail) {
        return;
      }
      wx.switchTab({
        url: this.data.list[e.detail].pagePath
      });

    },
    init(value) {
      this.setData({
        active: value
      })
    }
  }


})