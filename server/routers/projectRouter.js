var express = require('express');
var router = express.Router();
var mysql_dbc = require('./../database/db')();
var connection = mysql_dbc.get();
var multer = require('multer');
var md5 = require('md5');
const { Stream } = require('stream');

var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"."+file.originalname);
    }
})

var upload = multer({storage:store}).single('file');
router.get('/list',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.query;    
    
    var resultJson = {};    
    var stmt = 'SELECT project_explanation,project_account,project_startDate,project_endDate,project_name,career_company,project_id,ca.career_id FROM portpolioDB.project as pro join career as ca on ca.career_id = pro.career_id where ca.career_id = \''+data.project_id+'\'';        
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
router.post('/editproject',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body.form;    
    
    var resultJson = {};    
    var stmt = 'update project set project_name="'+data.project_name+'",project_startDate="'+data.project_startDate+'",project_endDate="'+data.project_endDate+'",project_account="'+data.project_account+'",project_explanation="'+data.project_explanation+'" where project_id="'+data.project_id+'"';        
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
router.post('/deleteproject',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body;    
    
    var resultJson = {};    
    var stmt = 'delete from project where project_id="'+data.id+'"';    
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

router.post('/addproject',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body.form;    
    
    var resultJson = {};    
    var stmt = 'insert into project(project_name,project_startDate,project_endDate,project_explanation,project_account,info_id,career_id) values("'+data.project_name+'","'+data.project_startDate+'","'+data.project_endDate+'","'+data.project_explanation+'","'+data.project_account+'","'+data.info_id+'","'+data.career_id+'")';    
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

router.post('/insertimg',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body.form;    
    
    var resultJson = {};            

    var stmt = 'insert into project_picture(propic_img,propic_content,career_id,info_id,project_id) values("'+data.imgSrc+'","'+data.context+'","'+data.career_id+'","'+data.info_id+'","'+data.project_id+'")';    
    console.log(data.project_id);
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

router.get('/getimglist',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.query;       
    var resultJson = {};        
    var stmt = 'select * from project_picture where career_id="'+data.career_id+'" and project_id="'+data.project_id+'"';        
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

router.post('/editpicture',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body.form;    
    
    var resultJson = {};            

    var stmt = 'update project_picture set propic_img="'+data.imgSrc+'",propic_content = "'+data.context+'" where propic_id ="'+data.picture_id+'"';    
    
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

router.post('/deletepicture',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body;    
    
    var resultJson = {};            

    var stmt = 'delete from project_picture where propic_id ="'+data.id+'"';    
    
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
module.exports = router;