const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "posts_db"
})

connection.connect((err) =>{
    if (err) throw err
    console.log("Connesso al DB");
})

module.exports = connection