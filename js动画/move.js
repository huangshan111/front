function startMove(obj,json,fn){


    clearInterval(obj.timer);

    //处理一下透明度的
   // obj.alpha = Math.round(parseFloat(getStyle(obj,"opacity")) * 100);

    obj.timer = setInterval(function () {
        var flag=true;
        for(var attr in json) {
            var now = 0;
            if (attr == 'opacity') {
                now = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                now = parseInt(getStyle(obj, attr));
            }

            if(now!=json[attr]) {
                flag = false;
            }
            //算下速度
            var speed = (json[attr] - now) / 20;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (attr == 'opacity') {
                var next=now+speed;
                obj.style.filter = "alpha(opacity=" + next + ")";
                obj.style.opacity = next / 100;
            }
            else {
                obj.style[attr] = now + speed + 'px';
            }
        }
        if(flag){
            clearInterval(obj.timer);
            fn&&fn();
        }


    }, 30);
}


function getStyle(obj, attr)
{
    if(obj.currentStyle)
    {
        return obj.currentStyle[attr];
    }
    else
    {
        return getComputedStyle(obj,false)[attr];
    }
}