$('.comment').click(function(){
     var target=$(this);
     var cid=target.data("cid");
     var tid=target.data("tid");
    if($("#commentId").length>0){
        $("#commentId").val(cid);
    }else {
        $("<input>").attr({
            type: "hidden",
            name: "comment[cid]",
            id: "commentId",
            value: cid
        }).appendTo('#commentForm');
    }
    if($("#toId").length>0){
        $("#toId").val(tid);
    }else {
        $("<input>").attr({
            type: "hidden",
            name: "comment[to]",
            value: tid,
            id: "toId"
        }).appendTo('#commentForm');
    }
})