// components/my-picker/my-picker.js
Component({
        /**
         * 组件的属性列表
         */
        properties: {
                //显示函数
                show: {
                        type: Boolean,
                        default: false,
                },
                //传入数据
                columns: {
                        type: Array,
                        default: []
                },
                //标题
                title: {
                        type: String,
                        default: ""
                }
        },

        /**
         * 组件的初始数据
         */
        data: {

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
                },
                // picker取消
                onCancel() {
                        this.setData({
                                show: false
                        })
                },
                //picker确认
                onConfirm(e) {
                        this.triggerEvent("setItem", e.detail.index[0]);
                        this.setData({
                                show: false
                        })
                }
        }
})