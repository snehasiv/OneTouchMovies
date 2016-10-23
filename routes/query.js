"use strict";

var express 	= require('express');
var router 		= express.Router();
var query_controller = require('../controllers/query');


router.get('/list',function(req,res){
	var data = {};
	if (typeof req.query.page !== 'undefined') {
        data.page = parseInt(req.query.page);
    }else{
		return res.status(404);
    }
	if (typeof req.query.size !== 'undefined') {
        data.size = parseInt(req.query.size);
    }else{
		return res.status(404);
    }
    if (typeof req.query.content !== 'undefined') {
    	data.content = req.query.content;
    }else{
		return res.status(404);
    }
	query_controller.listResult(data).then(function(data){
		var response = {
			message: "200 OK"
		}
		response.data = data;
		res.status(200);
		return res.send(response);
	}).catch(function(err){
		var response={};
		if(err.code==='INPUT')
		{
			res.status(400);
			response.message ='400 BAD REQUEST.';
		}else if(err.code==='DB'){
			res.status(500);
			response.message ='500 INTERNAL SERVER ERROR. ' + err.msg;
		}
		return res.send(response);
	});
});

router.get('/listIMDB', function(req,res){
	var data = {};
	if (typeof req.query.content !== 'undefined') {
        data = req.query.content;
    }else{
		return res.status(404);
    }
    query_controller.listImdb(data).then(function(data2){
    	var response = {
			message: "200 OK"
		}
		response.data = data2;
		res.status(200);
		return res.send(response);
    }).catch(function(err){
		var response={};
		if(err.code==='INPUT')
		{
			res.status(400);
			response.message ='No movie found, please check name.';
		}else if(err.code==='DB'){
			res.status(500);
			response.message ='500 INTERNAL SERVER ERROR. ' + err.msg;
		}
		return res.send(response);
	});
});

router.get('/listTK', function(req,res){
	var data = {};
	if (typeof req.query.content !== 'undefined') {
        data = req.query.content;
    }else{
		return res.status(404);
    }
    query_controller.listTK(data).then(function(data2){
    	var response = {
			message: "200 OK"
		}
		response.data = data2;
		res.status(200);
		return res.send(response);
    }).catch(function(err){
		var response={};
		if(err.code==='INPUT')
		{
			res.status(400);
			response.message ='No movie found, please check name.';
		}else if(err.code==='DB'){
			res.status(500);
			response.message ='500 INTERNAL SERVER ERROR. ' + err.msg;
		}
		return res.send(response);
	});
});

module.exports = router;