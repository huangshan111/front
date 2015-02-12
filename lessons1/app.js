var express=require('express');
var app=express();
app.get('/',function(req,res){
	res.send('hello world');
	});
app.listen(3000,function(){
	console.log('app is listen at 3000 port');
	});