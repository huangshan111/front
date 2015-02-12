/**
 * Created by Administrator on 2014/12/23.
 */
$(".del").click(function(){
    var id=  $(this).data("id");
    var self=$(this);
    $.get('/admin/delete',{id:id},function(data){
        if(data.success==1){
            self.parent().parent().remove();
        }
    })
});