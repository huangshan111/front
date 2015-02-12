/**
 * Created by Administrator on 2014/10/21.
 */
(function(){
    var menubar=function(elementId){
        this.status='AllClosed';
        this.eId=elementId||'wrap';
        this.el=document.getElementById(this.eId);
        this.el.addEventListener('click',function(e){
            e.stopPropagation();
        });
        this.curOpenContent=null;
        var items= document.querySelectorAll('#' + this.eId + ' > div');
        var self=this;
        for(var i=0;i<items.length;i++){
            items[i].addEventListener('click',function(event){
                if(self.status==='AllClosed'){
                    console.log( event.currentTarget.id+'_content'+'打开了');
                    self.status='hasOpened';
                    self.curOpenContent=event.currentTarget.id
                }else{
                    console.log( self.curOpenContent+'关闭了');
                    console.log( event.currentTarget.id+'_content'+'打开了');
                }
            });
        }
    }

    var Sidebar=function(eId,closebarId){
        this.status='opened';
        this.el=document.getElementById(eId||'sidebar');
        this.menubar=new menubar();
        this.closebar=document.getElementById(closebarId||'closeBar');
        var self=this;
        this.el.addEventListener('click', function (event) {
            if(event.target!==this.el){
               self.SwitchStatus();
            }
        });
    };

    Sidebar.prototype.Close=function(){
        console.log('关闭');
        this.status='closed';
    };
    Sidebar.prototype.Open=function(){

        console.log('打开');
        this.status='opened';
    };

    Sidebar.prototype.SwitchStatus=function(){
        if(this.status==='opened'){
            this.Close();
        }else{
            this.Open();
        }
    };

    var sidebar=new Sidebar();

})();