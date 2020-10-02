'use strict'

const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
var mysql = require('mysql');
const app = express();

const ip = process.env.IP || "172.17.0.2";
const port =  process.env.PORT || 3000;
const name =  process.env.NAME || "UnNamed";
const pass =  process.env.PASS || "000000";
const user =  process.env.USER || "root";


app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(cors());
app.options('*', cors());


//Ctrl Shift U 0060  

app.get('/', (req, res) => {

    res.send({ message: "Bienvenido a la api!" })
});

app.post('/estudiantes', (req, res) => {

    var connection = mysql.createConnection({
        host: ip,
        port: 3306,
        user: user,
        password: pass,
        database: 'practica'
    });
    
    connection.connect(function(error){
        if(error){
            console.log('Error');
        }else{
            console.log('Connected to the database!');
        }
    });    

    let query = `INSERT INTO estudiante (carnet, nombre) VALUES (${req.body.carnet}, '${req.body.nombre}');`;
    connection.query(query, function (err, result) {
        if (err) {
            res.status(500).send({ process: 'Error al insertar en la base de datos', error: err });
        } else
            res.status(200).send({ process: 'success' });
    });

    connection.end();


});


app.get('/estudiantes', (req, res) => {

    var connection = mysql.createConnection({
        host: ip,
        port: 3306,
        user: user,
        password: pass,
        database: 'practica'
    });
    
    connection.connect(function(error){
        if(error){
            console.log('Error');
        }else{
            console.log('Connected to the database!');
        }
    });   

    connection.query(`select * from estudiante;`, function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send({ data: 'fail', error: err });
        } else
            res.status(200).send({ data: result });
    });

    connection.end();

});



app.listen(port, () => {

    console.log(`Api REST corriendo en http://localhost:${port}`);
});