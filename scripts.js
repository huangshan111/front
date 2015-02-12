/**
 * 跨浏览器事件工具方法
 */
var extendUtil={
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent('on'+type,handler);
        }else{
            element['on'+type]=handler;
        }
    },
    removeHandler:function(element,type,handler){
        if(element.addEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.detachEvent('on'+type,handler);
        }else{
            element['on'+type]=null;
        }
    },
    GetType:function(event){
        return event.type;
    },
    GetEvent:function(event){
        return event||window.event;
    },
    GetTarget:function(event){
        return event.target || event.srcElement;
    },
    stopPragation:function(event){
        if(event.stopPragation){
            event.stopPragation();
        }else{
            event.cancelBubble=true;
        }
    },
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue=false;//ie 7+支持
           // return false ie 10 9 支持
        }
    }
}