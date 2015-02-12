var express=require('express');
var bodyParser = require('body-parser');
var path=require('path')
var port=process.env.port||3000;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var app=express();
var cookieparser=require('cookie-parser');
var session  = require('express-session');
var morgan = require('morgan');
var mongoStore=require('connect-mongo')(session);
app.use(cookieparser());

app.use(bodyParser.urlencoded({ extended: true }))
app.set('views','./app/views');
app.set('view engine','jade');
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: "kvkens",
    secret: "imooc",
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({
        url:  'mongodb://localhost/test',
        auto_reconnect: true,//issue 推荐解决方法
        collection: "sessions"
    })
}));


if('development'===app.get('env')){
    app.set('showStackError',true);
    app.use(morgan(':method :url :status'));
    app.locals.pretty=true;
    mongoose.set('debug',true);
}

app.listen(port,function(){
    console.log("sever is listen at "+port);
});

require('./config/routes')(app);






