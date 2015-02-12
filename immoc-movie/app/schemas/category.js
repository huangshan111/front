/**
 * Created by Administrator on 2014/12/19.
 */
var mongoose=require('mongoose');
var Schema =mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var categorySchema = mongoose.Schema({
    name:{
        type:String
    },
    movies:[
        {type:ObjectId,ref:"Movie"}
    ],
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

categorySchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now();
    }else{
        this.meta.updateAt=Date.now();
    }
    next();
});

categorySchema.statics ={
    fetch:function(cb){
        return this.find({}).sort("meta.updateAt").exec(cb);
    },
    findById:function(id,cb){
        return this.findOne({_id:id}).exec(cb);
    }
};

module.exports=categorySchema;
