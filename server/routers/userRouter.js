var express = require('express');
var router = express.Router();
var mysql_dbc = require('./../database/db')();
var connection = mysql_dbc.get();

var md5 = require('md5');

router.get('/title',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.query;    
    var resultJson = {};    
    
    var stmt = 'select title_id,title_text  from titleTiping where info_id = \''+data.id+'\'';
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
    
    var stmt = 'update titleTiping set title_text="'+data.text+'" where title_id="'+data.id+'"';
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
    var data = req.body;    
    var resultJson = {};    
    
    var stmt = 'insert into titleTiping(title_text,info_id) values("'+data.text+'","'+data.info_id+'")';
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
    
    var stmt = 'delete from titleTiping where title_id="'+data.id+'"';
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
router.get('/chk',function(req,res){    
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.query;    
    var resultJson = {};    
    
    var stmt = 'select count(*) as user_count from user_account where user_id = \''+data.id+'\'';        
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

router.post('/login',function(req,res){    
    if(connection == null){
        connection = mysql_dbc.get();
    }        
    var data = req.body;    
    var resultJson = {};    
    var stmt = 'select user_id from user_account where user_id = \''+data.id+'\' and user_pw='+'md5(\''+data.pw+'\')';        
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

router.post('/info',function(req,res){    
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body;    
    var resultJson = {};    
    var stmt = 'select * from infomation where info_id = \''+data.id+'\'';        
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

router.post('/editinfo',function(req,res){    
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body;    
    var resultJson = {};        
    var stmt = 'update infomation set info_littlement = "'+data.form.info_littlement+'",info_name="'+data.form.info_name+'",info_eng_name="'+data.form.info_eng_name+'",info_nickname="'+data.form.info_nickname+'",info_email="'+data.form.info_email+'",info_phone="'+data.form.info_phone+'",info_git="'+data.form.info_git+'",info_picture="'+data.form.info_picture+'" where info_id = "'+data.id+'"';    
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

router.post('/addinfo',function(req,res){    
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body;    
    var resultJson = {};        
    var stmt = 'insert into infomation(info_id,info_name,info_eng_name,info_nickname,info_email,info_phone,info_git, info_littlement,info_picture) values("'+data.form.info_id+'","'+data.form.info_name+'","'+data.form.info_eng_name+'","'+data.form.info_nickname+'","'+data.form.info_email+'","'+data.form.info_phone+'","'+data.form.info_git+'","'+data.form.info_littlement+'","'+data.form.info_picture+'")';
    
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

router.get('/careerInfo',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.query;    
    
    var resultJson = {};    
    var stmt = 'select * from career where info_id = \''+data.id+'\'';        
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
});


router.post('/editcareer',function(req,res){    
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body;    
    var resultJson = {};    
    
    var stmt = 'update career set career_company = "'+data.form.career_company+'",career_startDate="'+data.form.career_startDate+'",career_endDate='+data.form.career_endDate+',career_role="'+data.form.career_role+'" where info_id = "'+data.id+'" and career_id = "'+data.form.career_id+'"';
    
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

router.post('/insertcareer',function(req,res){    
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body.form;    
    var resultJson = {};    
    
    var stmt = 'insert into career(career_company,career_startDate,career_endDate,career_role,info_id) values("'+data.career_company+'","'+data.career_startDate+'",'+data.career_endDate+',"'+data.career_role+'","'+data.info_id+'")';
    
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
router.post('/removecareer',function(req,res){    
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body;    
    var resultJson = {};    
    
    var stmt = 'delete from career where career_id = "'+data.id+'"';
    
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