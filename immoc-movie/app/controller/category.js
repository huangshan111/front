/**
 * Created by Administrator on 2014/12/19.
 */
var Category=require('../models/category');
var _=require('underscore');
exports.list=function(req,res){

    Category
        .find({})
        .exec(function(err,categories){
            res.render('pages/category/list',{
                title:"电影分类列表",
                categories:categories
            });
        });

}

exports.new=function(req,res){
    res.render('pages/category/admin',{
        title:"新建电影分类",
        category:{}
    });
}

exports.detail=function(req,res){
    var id=req.params.id;
    if(id){
        Category.findById(id,function(err,category){
            if(err){
                console.log(err);
            }
            res.render('pages/category/detail',{
                title:"电影分类详情",
                category:category
            });
        });
    }
}

exports.update=function(req,res){
    var id=req.params.id;
    if(id){
        Category.findById(id,function(err,category){
            if(err){
               console.log(err);
            }
            res.render('pages/category/admin',{
                title:"编辑电影分类",
                category:category
            });
        });
    }
}


exports.save=function(req,res){
    var categoryObj=req.body.category;
    if(categoryObj._id){
        //编辑
        Category.findById(categoryObj._id, function (err, category) {
            if (err) {
                console.log(err)
            }

            category = _.extend(category, categoryObj)
            category.save(function (err, movie) {
                if (err) {
                    console.log(err)
                }

                res.redirect('/category/list');
            })
        })
    }else{
        //新增
        console.log('ok');
        var category=new Category(categoryObj);

        category.save(function(err, category){
            if (err) {
                console.log(err)
            }

            res.redirect('/category/list');
        })
    }
}

