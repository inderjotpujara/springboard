var mysql = require('mysql');
const express = require('express');
let app = express();
app.use(function (req, res, next) {
    console.log("inside middleware")
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers',  "*");
    res.header('Access-Control-Allow-Methods',  "['GET','POST','PUT','DELETE','OPTIONS']");
    next();
});
var con = mysql.createConnection({
    host: "localhost",
    user: "pujara",
    password: "password",
    database: "springboard"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("connected")
});

app.get('/data', function (req, res) {
    res.header("Content-Type", "application/json");
    sql = "select * from login "
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });

});

app.post('/signup', function (req, res) {

	console.log(req.header);
    res.header("Content-Type", "application/json");
    sql = "insert into table login (email,password) values (inderjot	,1234)"
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
});
app.listen(8080);


