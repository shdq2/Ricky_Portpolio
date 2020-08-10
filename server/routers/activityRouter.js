var express = require('express');
var router = express.Router();
var mysql_dbc = require('./../database/db')();
var connection = mysql_dbc.get();

var md5 = require('md5');

router.get('/getTitle',function(req,res){    
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.query;    
    var resultJson = {};    
    var stmt = 'select * from activityTitle where info_id = \''+data.id+'\'';        
    connection.query(stmt, function (err, result) {
        if(err) {     
            resultJson.id = data.id;       
            resultJson.err = err;            
            // res.json(err);
        }else{
            resultJson.id = data.id;       
            resultJson.result = result;            
            //   res.json(result);
        }   
        
        res.json(resultJson);
    })
})

router.post('/addtitle',function(req,res){    
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body.form;    
    var resultJson = {};    
    
    var stmt = 'insert into activityTitle(info_id,actitle_title) values("'+data.info_id+'","'+data.actitle_title+'")';        
    connection.query(stmt, function (err, result) {
        if(err) {     
            resultJson.id = data.id;       
            resultJson.err = err;            
            // res.json(err);
        }else{
            resultJson.id = data.id;       
            resultJson.result = result;            
            //   res.json(result);
        }   
        
        res.json(resultJson);
    })
})


router.post('/removetitle',function(req,res){    
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body;    
    var resultJson = {};        
    var stmt = 'delete from activityTitle where actitle_id = "'+data.id+'"';        
    connection.query(stmt, function (err, result) {
        if(err) {     
            resultJson.id = data.id;       
            resultJson.err = err;            
            // res.json(err);
        }else{
            resultJson.id = data.id;       
            resultJson.result = result;            
            //   res.json(result);
        }   
        
        res.json(resultJson);
    })
})

router.get('/getActivity',function(req,res){    
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.query;    
    var resultJson = {};    
    var stmt = 'select * from activity where info_id = \''+data.id+'\' and actitle_id=' +data.title ;        
    connection.query(stmt, function (err, result) {
        if(err) {     
            resultJson.id = data.id;       
            resultJson.err = err;            
            // res.json(err);
        }else{
            resultJson.id = data.id;       
            resultJson.result = result;            
            //   res.json(result);
        }   
        
        res.json(resultJson);
    })
})


router.post('/updatetitle',function(req,res){    
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body;    
    var resultJson = {};    
    var stmt = 'update activityTitle set actitle_title ="'+data.title+'" where actitle_id ="'+data.id+'"' ;        
    connection.query(stmt, function (err, result) {
        if(err) {     
            resultJson.id = data.id;       
            resultJson.err = err;            
            // res.json(err);
        }else{
            resultJson.id = data.id;       
            resultJson.result = result;            
            //   res.json(result);
        }   
        
        res.json(resultJson);
    })
})

router.post('/updateactivity',function(req,res){    
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body;    
    var resultJson = {};    
    var stmt = 'update activity set activity_title="'+data.form.activity_title+'",activity_detail="'+data.form.activity_detail+'",activity_date="'+data.form.activity_date+'",activity_publisher="'+data.form.activity_publisher+'",activity_content="'+data.form.activity_content+'" where activity_id ="'+data.form.activity_id+'";';        
    connection.query(stmt, function (err, result) {
        if(err) {     
            resultJson.id = data.id;       
            resultJson.err = err;            
            // res.json(err);
        }else{
            resultJson.id = data.id;       
            resultJson.result = result;            
            //   res.json(result);
        }   
        
        res.json(resultJson);
    })
})

router.post('/deleteactivity',function(req,res){    
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body;    
    var resultJson = {};    
    var stmt = 'delete from activity where activity_id ='+data.id;        
    connection.query(stmt, function (err, result) {
        if(err) {     
            resultJson.id = data.id;       
            resultJson.err = err;            
            // res.json(err);
        }else{
            resultJson.id = data.id;       
            resultJson.result = result;            
            //   res.json(result);
        }   
        
        res.json(resultJson);
    })
})

router.post('/addactivity',function(req,res){    
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body;    
    var resultJson = {};    
    var stmt = 'insert into activity(activity_title,activity_detail,activity_date,activity_publisher,activity_content,actitle_id,info_id) values("'+data.form.activity_title+'","'+data.form.activity_detail+'","'+data.form.activity_date+'","'+data.form.activity_publisher+'","'+data.form.activity_content+'","'+data.form.actitle_id+'","'+data.form.info_id+'")'  ;        
    connection.query(stmt, function (err, result) {
        if(err) {     
            resultJson.id = data.id;       
            resultJson.err = err;            
            // res.json(err);
        }else{
            resultJson.id = data.id;       
            resultJson.result = result;            
            //   res.json(result);
        }   
        
        res.json(resultJson);
    })
})


module.exports = router;