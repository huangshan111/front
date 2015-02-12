/**
 * Created by Administrator on 2014/12/19.
 */

var mongoose = require('mongoose');
var categorySchema = require('../schemas/category');
var Category = mongoose.model('Category',categorySchema);
module.exports=Category;