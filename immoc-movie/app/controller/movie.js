var Movie=require('../models/Movie');
var Comment=require('../models/comment');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');

exports.list=function(req,res){
    //分页加搜索
    var query=req.query.q||'';
    var pn=req.query.p;
    pn=parseInt(pn,10) || 1;
    var size=5;

    Movie.find({doctor: new RegExp(query, 'i')})
        .skip((pn-1)*size)
        .limit(size)
        .exec(function(err,movies){
            if(err){
                console.log(err);
            }else{
                Movie.count({doctor: new RegExp(query, 'i')},function(error, count) {
                    if (error) {
                        console.log(err);
                    } else {
                        var pagecount = Math.ceil(count / size);
                        console.log(pagecount);
                        res.render('pages/movie/list',{
                            title:'电影列表页',
                            movies:movies,
                            currentPage:pn,
                            size:size,
                            query:query,
                            pagecount:pagecount
                        })
                    }
                });
            }
        });
}

exports.detail= function (req, res) {
    var id=req.params.id;
    if(id) {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                Comment
                    .find({movie:id})
                    .populate('from','name')
                    .populate('reply.from reply.to','name')
                    .exec(function(err,comments){
                        if(err){
                            console.log(err);
                        }
                        else {
                            console.log(comments);
                            res.render('pages/movie/detail', {
                                title: movie.title,
                                movie: movie,
                                comments: comments
                            });
                        }
                    });
            }
        });
    }
}

exports.new= function (req, res) {
    res.render('pages/movie/admin', {
        title: "添加电影",
        movie:{}
    });
}

exports.update= function (req, res) {
    var id= req.params.id;
    if(id){
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.render('pages/movie/admin', {
                    title: "编辑电影",
                    movie:movie||{}
                });
            }
        });
    }
}

exports.savePoster = function(req, res, next) {
    var posterData = req.files.uploadPoster
    var filePath = posterData.path
    var originalFilename = posterData.originalFilename

    if (originalFilename) {
        fs.readFile(filePath, function(err, data) {
            var timestamp = Date.now()
            var type = posterData.type.split('/')[1]
            var poster = timestamp + '.' + type
            var newPath = path.join(__dirname, '../../', '/public/upload/' + poster)

            fs.writeFile(newPath, data, function(err) {
                if(err){
                    console.log( err);
                }
                req.poster = poster
                next()
            })
        })
    }
    else {
        next()
    }
}



exports.save=function (req, res) {
    var movieObj=req.body.movie;
    if(movieObj._id){
        //编辑
        Movie.findById(movieObj._id, function (err, movie) {
            if (err) {
                console.log(err)
            }

            movie = _.extend(movie, movieObj);

            if(req.poster){
                console.log(req.poster);
                movie.picture=req.poster;
            }

            movie.save(function (err, movie) {
                if (err) {
                    console.log(err)
                }

                res.redirect('/movie/list');
            })
        })
    }else{
        //新增
        var movie=new Movie(movieObj);

        if(req.poster){
            movie.picture=req.poster;
        }

        movie.save(function(err, movie){
            if (err) {
                console.log(err)
            }

            res.redirect('/movie/list');
        })
    }
}


exports.del= function (req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: 1});
            }
        })
    }
}
