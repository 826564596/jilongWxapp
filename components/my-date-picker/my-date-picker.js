// components/my-date-picker/my-date-picker.js
Component({
        /**
         * 组件的属性列表
         */

        lifetimes: {
                // ready(){
                //         console.log(this.data.minDate);
                // }
        },
        properties: {
                //展示参数
                show: {
                        type: Boolean,
                        default: false,
                },
                //标题
                title: {
                        type: String,
                        default: ""
                },
                //时间类型
                type: {
                        type: String,
                        default: "date",
                },
                //当前选中值(默认当前时间)
                value: {
                        type: Number,
                        default: new Date().getTime(),
                },
                //可选时间范围的最大值(默认加一年)
                maxDate: {
                        type: Number,
                        // default: new Date().getTime() 
                },
                //可选时间范围的最小值(默认减一年)
                minDate: {
                        type: Number,
                        // default: new Date().getTime() - 31536000000,
                }

        },

        /**
         * 组件的初始数据
         */
        data: {
                // maxDate:new Date().getTime() + 31536000000,
                // minDate:new Date().getTime() - 31536000000
        },

        /**
         * 组件的方法列表
         */
        methods: {
                //确认
                confirm() {
                        this.setData({
                                show: false
                        })
                },
                // 取消
                cancel() {
                        this.setData({
                                show: false
                        })
                },
                onClose() {
                        this.setData({
                                show: false
                        })
                }
        }
})