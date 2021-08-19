const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "test_db",
    port:"3306"
})

connection.connect((err) => {
    if(err){
        throw err
    } else {
        console.log("Connected to mysql")
    }
})

module.exports = connection