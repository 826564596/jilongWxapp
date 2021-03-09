// components/my-alert/my-alert.js
Component({
        /**
         * 组件的属性列表
         */
        properties: {
                isShowConfirm: {
                        type: Boolean,
                        default: false,
                },
        },

        /**
         * 组件的初始数据
         */
        data: {
                operationPsd:""
        },

        /**
         * 组件的方法列表
         */
        methods: {
                //输入值
                setValue(e) {
                        this.setData({
                                operationPsd: e.detail.value
                        })
                },
                //取消
                cancel() { 
                        console.log("sss");
                        this.setData({
                                isShowConfirm: false,
                        })
                },
                //确认
                confirmAcceptance() {
                console.log(this.data.operationPsd);
                        this.triggerEvent("confirm",this.data.operationPsd);

                        this.setData({
                                isShowConfirm: false,
                        })
                },

        }
})