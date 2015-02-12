var index=require('../app/controller/index');
var movie=require('../app/controller/movie');
var user=require('../app/controller/user');
var comment=require('../app/controller/comment');
var category=require('../app/controller/category');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

module.exports=function(app) {
    app.use(function (req, res, next) {
        var _user = req.session.user;
        app.locals.user = _user;
        next();
    });

    //首页
    app.get('/',index.index);

    //电影
    app.get('/movie/list',movie.list);
    app.get('/movie/detail/:id', movie.detail);
    app.get('/movie/delete', movie.del);
    app.get('/movie/new',movie.new);
    app.get('/movie/update/:id',movie.update);
    app.post('/movie/save',multipartMiddleware,movie.savePoster,movie.save);

    //电影分类相关
    app.get('/category/list',category.list)
    app.get('/category/new',category.new);
    app.get('/category/update/:id',category.update);
    app.get('/category/detail/:id',category.detail);
    app.post('/category/save',category.save);

    //user
    app.get('/register',user.showregister);
    app.post('/register', user.register);

    app.get('/login',user.showlogin);
    app.post('/login', user.login);

    app.get('/logout', user.logout);

    //给userlist 加权限 >50 才能看

    app.get('/user/list',user.requireLogin,user.requireSuperAdmin, user.userlist);

    //发表评论
    app.post('/user/comment',comment.save);



}
