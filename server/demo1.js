var mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
let app = express();
let tables;
let slot;
let day;
let arrayOfAllSlots = [];
let availableSlots = [];
app.use(bodyParser.json());

app.use(function (req, res, next) {
    console.log("inside middleware")
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', "*");
    res.header('Access-Control-Allow-Methods', "['GET','POST','PUT','DELETE','OPTIONS']");
    next();
});
var con = mysql.createConnection({
    host: "localhost",
    user: "pujara",
    password: "",
    database: "springboard"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("connected")
});


app.post('/data', function (req, res) {
    console.log(JSON.stringify(req.body.email));
    res.header("Content-Type", "application/json");
    sql = "select password from login where email =?"
    con.query(sql, req.body.email, function (err, result, fields) {
        if (err) throw err;
        console.log("inside query:" + JSON.stringify(req.body.password))
        if (JSON.stringify(result[0].password) == JSON.stringify(req.body.password)) {
            res.json(JSON.stringify(result[0].password) == JSON.stringify(req.body.password));
        } else {
            res.json(result == req.body.email);
        }
    });
});

app.post('/signup', function (req, res) {
    res.header("Content-Type", "application/json");
    let Password = req.body.password;
    console.log("Password: " + Password);
    sql = 'INSERT INTO login SET ?'
    con.query(sql, req.body, function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});
app.post('/roomstatus', function (req, res) {
    res.header("Content-Type", "application/json");
    console.log("inside roomstatus");
    // let Email= req.body.email;
    // let Password = req.body.password;
    // console.log("Email: "+Email);
    // res.json("server under maintenance")

    let table = req.body.name;
    console.log(table);
    // sql = "INSERT INTO login VALUES ("+Email+","+Password+")"
    sql = "select * from packman where weekday=?";

    con.query(sql, [req.body.weekDay], function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/bookroom', function (req, res) {
    res.header("Content-Type", "application/json");
    console.log(req.body);
    for (let i = JSON.parse(req.body.timeSlot); i < JSON.parse(req.body.timeSlot) + req.body.slotGap; i++) {
        // console.log(value[keys[i]])
        sql = "UPDATE " + req.body.name + " SET " + arrayOfAllSlots[req.body.timeSlot] + " ='booked' WHERE weekday=?";
        con.query(sql, [req.body.weekDay], function (err, result, fields) {
            if (err) throw err;
        });
       
    }
     res.json(result);
});
app.post('/availability', function (req, res) {
    res.header("Content-Type", "application/json");
    gap = req.body.slotGap;
    day = req.body.weekDay;
    // arrayOfAllSlots = [];
    count = 0;
    let promise = [];
    let response = [];
    for (j = 0; j < tables.length; j++) {
        sql = "select * from " + tables[j][0] + " WHERE weekday=?";
        promise[j] = new Promise(function (resolve, reject) {
            con.query(sql, [day], function (err, result) {
                if (err)
                    console.log(err);
                resolve(result[0])
                // console.log(result[0])
                let obj = result[0];
                let keys = Object.keys(obj);
            })
        })
    }

    promise[0].then(function (value) {
        response.push(value)
        let obj = value;
        let flag = 0;
        let keys = Object.keys(obj);
        if ((JSON.parse(req.body.timeSlot) + req.body.slotGap) <= arrayOfAllSlots.length) {
            for (let i = JSON.parse(req.body.timeSlot); i < JSON.parse(req.body.timeSlot) + req.body.slotGap; i++) {
                console.log("inderjot"+value[keys[i]])
                if (value[keys[i]] == 'available') {
                    flag++;
                    console.log(flag)
                }
            }
            if (flag == req.body.slotGap) {

                availableSlots.push(tables[0])
                console.log("inderjot" +availableSlots)
                 res.json(availableSlots);
            }
            else{
                res.json("not available");
            }
        }
    });
    promise[1].then(function (value) {
        response.push(value)
        let obj = value;
        let flag = 0;
        let keys = Object.keys(obj);
        if ((JSON.parse(req.body.timeSlot) + req.body.slotGap) <= arrayOfAllSlots.length) {
            for (let i = JSON.parse(req.body.timeSlot); i < JSON.parse(req.body.timeSlot) + req.body.slotGap; i++) {
                console.log(value[keys[i]])
                if (value[keys[i]] == 'available') {
                    flag++;
                    console.log(flag)
                }
            }
            if (flag == req.body.slotGap) {
                availableSlots.push(tables[1])
                console.log(availableSlots)
               
                availableSlots=[]
            }
        }
    });
});

let promiseSlotsArray = new Promise(function (resolve, reject) {
    sql1 = "select * from spartan where weekday=?";
    con.query(sql1, "tuesday", function (err, result, fields) {
        if (err) throw err;
        let obj = result[0];
        let keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] != "weekday") {
                arrayOfAllSlots.push(keys[i]);
            }
        }
        resolve(arrayOfAllSlots);
    });
});

let promiseTableNames = new Promise(function (resolve, reject) {
    sql1 = "show tables"
    con.query(sql1, function (err, result, fields) {
        if (err) throw err;
        let tablesArray = [];
        let obj = result;
        let keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            if (i != 0) {
                tablesArray.push(Object.values(result[i]));
            }
        }
        tables = tablesArray;
        resolve(tables);
    });
});

Promise.all([promiseTableNames, promiseSlotsArray]).then(function (values) {
    app.listen(8000);
})