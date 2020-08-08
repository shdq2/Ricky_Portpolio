const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const app = express();
const user = require('./routers/userRouter');
const activity = require('./routers/activityRouter');
const project = require('./routers/projectRouter');
const admin_user = require('./routers/admin/userRouter');
const admin_activity = require('./routers/admin/activityRouter');
const admin_project = require('./routers/admin/projectRouter');
const cors = require('cors');
//var cookie = require('cookie-parser');

app.use(cors());
app.use(bodyParser.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({ limit:"50mb",extended:false }));
//app.use(cookie());
app.use(express.static(path.join(__dirname,'../dist')));
app.use(express.json({
    limit:"50mb"
}));

app.use(express.urlencoded({
    limit:"50mb",
    extended:false
}));
 var mysql_dbc = require('./database/db')();
 var connection = mysql_dbc.init();
 mysql_dbc.test_open(connection);


//var md5 = require('md5');

app.use('/user',user);
app.use('/activity',activity);
app.use('/project',project);
app.use('/admin/user',admin_user);
app.use('/admin/activity',admin_activity);
app.use('/admin/project',admin_project);

const port = process.env.PORT || 3000;
app.set('port' , port );

const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));