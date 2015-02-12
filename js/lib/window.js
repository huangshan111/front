define(['jquery','widget'], function ($,widget) {
    function Window() {
        this.options = {
            width: '500px',
            height: '300px',
            className: 'ui-dialog',
            isDragle: true,
            hasCloseBtn: true,
            hasMask: true,
            title: "系统消息",
            content: "",
            text4alertBtn: "确定",
            handler4alertBtn: null,
            handler4closeBtn: null
        }
    }

    Window.prototype = $.extend({},new widget.Widget(),{
        renderUI:function(){//添加dom节点
                this.boundingbox = $(
                        '<div class="ui-dialog" id="dialog">' +
                        '<div class="ui-dialog-title" id="title">' + this.options.title + '<a class="ui-dialog-closebutton" href="javascript:;"></a></div>' +
                        ' <div class="ui-dialog-content">' + this.options.content + '<div><a class="ui-dialog-submit" href="#">' + this.options.text4alertBtn + '</a></div></div>' +
                        '</div>'
                );
                this.mask = null;
                if (this.options.hasMask) {
                    this.mask = $('<div class="ui-mask" id="mask"></div>');
                    this.mask.appendTo($("body"));
                }
        },
        bindUI:function(){//添加事件
            var self=this;
            this.boundingbox.delegate(".ui-dialog-submit","click",function(){

                self.options.handler4alertBtn&&self.options.handler4alertBtn("参数注册的打开");
                self.fire("alert","外面注册的打开");
                self.destroy();
            });
            this.boundingbox.delegate(".ui-dialog-closebutton","click",function(){

                self.options.handler4alertBtn&&self.options.handler4alertBtn("参数注册的关闭");
                self.fire("close","外面注册的关闭");
                self.destroy();
            });
        },
        syncUI:function(){//初始化组件属性
            this.boundingbox.css({
                width: this.options.width + 'px',
                height: this.options.height + 'px',
                left: this.options.left + 'px',
                top: this.options.top + 'px'
            });
        },
        destructor:function(){//子组件需要实现的方法
            this.mask&&this.mask.remove();
        },
        alert:function(opt){
            $.extend(this.options,opt);
            this.init();
            return this;
        }
    });

    return {
        Window: Window
    }
})