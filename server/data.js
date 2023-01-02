const express=require('express')
const fs =require('fs')
const app=express()
const mysql=require('mysql')
const bodyParcel=require('body-parser')
const cors=require('cors')
const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"password",
    connectionLimit:10,
    insecureAuth : true
})


app.set('view engine','ejs')


app.use(bodyParcel.urlencoded({extended:true}))
app.use(cors());
app.use(express.json())


app.listen(3006,()=>{
    console.log('ruuuuun');
})
app.get('/',)