define(['jquery'],function($){
    function Widget(){
        this.boundingbox=null;
        this.handlers={};
    }

    Widget.prototype={
        on: function (type, handler) {
            if (typeof this.handlers[type] == "undefined") {
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
            return this;
        },
        fire: function (type, data) {
            if (this.handlers[type] instanceof Array) {
                var handlers = this.handlers[type];
                for (var i = 0, len = handlers.length; i < len; i++) {
                    handlers[i](data);
                }
            }
            return this;
        },
        renderUI:function(){},//添加dom节点
        bindUI:function(){},//添加事件
        syncUI:function(){},//初始化组件属性
        init:function(container){//初始化
            this.renderUI();
            this.handlers={};
            this.bindUI();
            this.syncUI();
            $(container||document.body).append(this.boundingbox);
        },
        destructor:function(){},//子组件需要实现的自己的销毁方法
        destroy:function(){//通用销毁组件
            this.destructor();
            this.boundingbox.off();
            this.boundingbox.remove();
        }
    }

    return {
        Widget:Widget
    }
})