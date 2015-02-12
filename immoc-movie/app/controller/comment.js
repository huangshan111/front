var Comment=require('../models/comment');

exports.save=function(req,res){
    var _comment = req.body.comment;
    var movieId=_comment.movie;

    if(_comment.cid){
        Comment.findById(_comment.cid,function(err,comment){
             var reply={
                 from:_comment.from,
                 to:_comment.to,
                 content:_comment.content
             }
            comment.reply.push(reply);
            comment.save(function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
                    res.redirect('/detail/'+movieId);
                }
            });
        });
    }else{
        var comment = new Comment(_comment);
        comment.save(function(err,comment){
            if(err){
                console.log(err);
            }
            else{
                res.redirect('/detail/'+movieId);
            }
        });
    }
}