// components/tab.js
Component({
        /**
         * 组件的属性列表
         */
        properties: {
                itemList: {
                        type: Array,
                        default: [],
                },
                active: {
                        type: Number,
                        default: 0,
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
                change(value) {
                        this.triggerEvent("active", {
                                active: value.target.dataset.index
                        });
                }
        }
})