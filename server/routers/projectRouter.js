var express = require('express');
var router = express.Router();
var mysql_dbc = require('./../database/db')();
var connection = mysql_dbc.get();

var md5 = require('md5');

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
module.exports = router;