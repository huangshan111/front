/**
 * Created by Administrator on 2014/12/17.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var UserSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        unique:true
    },
    role:{
        type:Number,
        default:10
    },
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});


UserSchema.pre('save',function(next){
    var user=this;
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now();

    }else{
        this.meta.updateAt=Date.now();
    }

    bcrypt.genSalt(10, function(err, salt) {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);
            user.password=hash;
            next();
        });
    });

});

UserSchema.statics ={
    fetch:function(cb){
        return this.find({}).sort("meta.updateAt").exec(cb);
    },
    findById:function(id,cb){
        return this.findOne({_id:id}).exec(cb);
    }
};

UserSchema.methods ={
    comparePassword:function(hash,cb){
        bcrypt.compare(hash,this.password , function(err, isMatch) {
            if(err)
               return cb(err);

            cb(null,isMatch)
        });
    }
};

module.exports=UserSchema;
