
var User=require('../models/user');
var _ = require('underscore');


exports.showregister=function(req,res){
    res.render("pages/register",{
        title:"注册页面"
    });
}

exports.register=function (req, res) {
    var _user = req.body.user;
    var user = new User(_user);
    user.save(function (err, user) {
        console.log(user);
    });
    res.redirect('/');
}

exports.userlist= function (req, res) {
    User.fetch(function (err, users) {
        if (err) {
            console.log(err);
            return;
        }
        res.render('pages/userlist', {
            title: "用户列表页",
            users: users
        });
    });
}

exports.logout=function(req,res){
    delete req.session.user;
    res.redirect('/');
}

exports.showlogin=function(req,res){
    res.render('pages/login',{
        title:"登陆页面"
    });
}

exports.login= function (req, res) {
    var _user = req.body.user;
    User.findOne({name: _user.name}, function (err, user) {
        if (user) {
            user.comparePassword(_user.password, function (err, isMatch) {
                if (err) {
                    console.log(err);
                    return  res.redirect('/')
                } else {
                    if (isMatch) {
                        req.session.user = user;
                        return res.redirect('/')
                    } else {
                        return  res.redirect('/')
                    }
                }
            });
        }
    });
}

exports.requireLogin=function(req,res,next){
    var _user=req.session.user;
    if(!_user){
        res.redirect('/login');
    }
    next();
}

exports.requireSuperAdmin=function(req,res,next){
    var _user=req.session.user;
    if(_user.role<50){
        res.redirect('/register');
    }
    next();
}