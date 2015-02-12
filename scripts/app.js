/**
 * Created by Administrator on 2014/11/13.
 */
requirejs.config({
    // 默认从js/lib加载所有的module ID
    baseUrl: 'js/lib',
    // 除非，module ID以"app"开头，则
    // 从js/app目录加载。
    // 注意，paths config是相对于baseUrl的，
    // 而且不要包含".js"的后缀，因为一个path
    // 有可能是个目录
    paths: {
        app: '../app',
        jquery: '../jquery-1.11.1',
        my: '../my'
    }
});
// 启动main app
requirejs(['jquery', 'window'],
    function ($, win) {
        var instance = new win.Window();
        instance.alert({
            content: "内容哈哈哈哈",
            text4alertBtn: "登陆",
            handler4alertBtn: function (msg) {
                alert(msg);
            }
        }).on('alert', function (msg) {
            alert(msg);
        }).on('close',function(msg){
            alert(msg);
        });
    });