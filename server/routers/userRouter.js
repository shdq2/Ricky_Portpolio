var express = require('express');
var router = express.Router();
var mysql_dbc = require('./../database/db')();
var connection = mysql_dbc.get();

var md5 = require('md5');

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
module.exports = router;