var express = require('express');
var router = express.Router();
var mysql_dbc = require('./../database/db')();
var connection = mysql_dbc.get();

var md5 = require('md5');

router.post('/login',function(req,res){
    
    if(connection == null){
        connection = mysql_dbc.get();
    }    
    var data = req.body;    
    var resultJson = {};
    var stmt = 'select admin_id from admin where admin_id = \''+data.userId+'\' and admin_pw = \''+md5(data.userPw)+'\'';        
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