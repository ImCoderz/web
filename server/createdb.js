// const express=require('express')
// const fs =require('fs')
// const app=express()
const db = require('./db');
// const bodyParcel=require('body-parser')
// const cors=require('cors')

db.query(`create database web`,(err,result)=>{
    if(err) console.log(err);
    console.log(result);
})
db.query(`create table web.users(id integer primary key not null,email text not null,password text not null,name text)`,(err,result)=>{
    if(err) console.log(err);
    console.log(result);
})
db.query(`create table web.reservation (id integer primary key not null auto_increment, day text,hour text,phonenumber text,howManyPersons text,id_users integer,constraint users_idusers_fk foreign key(id_users) references users(id));`,(err,result)=>{
    if(err) console.log(err);
    console.log(result);
})