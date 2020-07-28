var express = require('express');
var router = express.Router();
var mysql_dbc = require('./../database/db')();
var connection = mysql_dbc.get();
router.get('/getList',function(req,res){
    
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    
    var data = req.body;    
    var resultJson = {};
    var stmt = 'select * from notice';        
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

router.get('/getItem',function(req,res){
     
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    
    var data = req.query;    
    var resultJson = {};
    console.log(data);
    var stmt = 'select * from notice where notice_id ='+data.id;        
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
router.post('/write',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    
    var data = req.body;    
    var resultJson = {};
    
    var stmt = 'insert into notice (notice_title,notice_content,notice_date) values(\''+data.title+'\',\''+data.content+'\',now())';        
    console.log(stmt);
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

router.post('/delete',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    
    var data = req.body;    
    var resultJson = {};
    
    var stmt = 'delete from mygallerystudyDB.notice where notice_id = '+data.id;
    
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