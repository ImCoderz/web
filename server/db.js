const mysql =require('mysql')

const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"password",
    connectionLimit:10,
    insecureAuth : true
})

module.exports= db;