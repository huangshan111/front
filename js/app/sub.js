
define(function () {
    function Messager(){}

    Messager.prototype.alert=function(content){

        alert(content);
    }

    return {
        Messager: Messager
    }
});