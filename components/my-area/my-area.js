// components/my-area/my-area.js
import
areaList
from "../../utils/area";
Component({
        /**
         * 组件的属性列表
         */
        properties: {
                show: {
                        type: Boolean,
                        default: false,

                }
        },

        /**
         * 组件的初始数据
         */
        data: {
                areaList: areaList,
        },

        /**
         * 组件的方法列表
         */
        methods: {
                //遮罩层关闭
                onClose() {
                        this.setData({
                                show: false
                        })
                        console.log(this.data.areaList)
                },
                // picker取消
                onCancel() {
                        this.setData({
                                show: false
                        })
                },
                //picker确认
                onConfirm(e) {
                        this.triggerEvent("setItem", e.detail.values);
                        this.setData({
                                show: false
                        })
                }
        }
})