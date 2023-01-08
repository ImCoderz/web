const express=require('express')
const app=express()
const bodyParcel=require('body-parser')
const cors=require('cors')
const flash=require('express-flash')
const session=require('express-session')
const passport =require('passport')
const methodOverride = require('method-override')
const db = require('../server/db')

app.set('view engine','ejs')


//middleware

app.use(flash())
app.use(express.static(__dirname+'/public'))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.use(bodyParcel.urlencoded({extended:true}))
app.use(cors());
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
let users=[];
//database

db.query(`select * from web.users`,(err ,result)=>{
    users=[...result]
})

//server
app.listen(3003,()=>{
    console.log('ruuuuun');
})

//home page

app.get('/',(req,res)=>{
    console.log(users);
    res.render("index")
})

app.get('/style.css',(req,res)=>{
    res.sendFile(__dirname + '/style/style.css');
})

app.get('/index.js',(req,res)=>{
    res.sendFile(__dirname+'/js/index.js')
})

app.get('/res/logo.svg',(req,res)=>{
    res.sendFile(__dirname+'/res/logo.svg')
})
app.get('/res/menu.png',(req,res)=>{
    res.sendFile(__dirname+'/res/menu.png')
})
app.get('/res/suu.png',(req,res)=>{
    res.sendFile(__dirname+'/res/suu.png')
})
app.get('/res/su.jpg',(req,res)=>{
    res.sendFile(__dirname+'/res/su.jpg')
})
app.get('/res/new.jpg',(req,res)=>{
    res.sendFile(__dirname+'/res/new.jpg')
})
app.get('/res/table.jpeg',(req,res)=>{
    res.sendFile(__dirname+'/res/table.jpeg')
})
app.get('/res/OIP.jpeg',(req,res)=>{
    res.sendFile(__dirname+'/res/OIP.jpeg')
})

//signin 


app.get('/sign',(req,res)=>{
    db.query(`select * from web.users`,(err ,result)=>{
        users=[...result]
    })
    res.render('sign')
})
app.get("/signin_style.css",(req,res)=>{
    res.sendFile(__dirname + '/style/signin_style.css');
})
app.post('/sign',(req,res)=>{
    const email =req.body.email;
    const code=req.body.password;
    let k=0
    users.map((user)=>{
        if(user.email==email && user.password==code){
            k=1
            res.render('index' ,user)
        };
    })
    if(k==0) res.render('sign')
})

//table
let id_user=0;

app.get('/table',(req,res)=>{
    if(req.query.id){
        id_user =req.query.id
        res.render("table",{id:req.query.id})
    }
    else{
        res.render("sign")
    }
})


app.get("/table_style.css",(req,res)=>{
    res.sendFile(__dirname + '/style/table_style.css');
})
app.get('/send.js',(req,res)=>{
    res.sendFile(__dirname+'/js/send.js')
})

app.post('/table',(req,res)=>{
    let reservations=[]
    db.query(`select * from web.reservation`,async(err ,result)=>{
        console.log(result);
        reservations=[...result]
        const id=reservations.length+1
        const day=req.body.days
        const hour=req.body.hours
        const phone=req.body.phoneNumber
        const hPerson=req.body.hPerson
        console.log(req.query);
        values =[[id,day,hour,phone,hPerson,id_user]]
        let r=0
        reservations.map((reserv)=>{
            if(reserv.day ==day && reserv.hour==hour ) r=1
        })
        if(r==0){
            db.query('insert into web.reservation values ?',[values],(err,result)=>{
                if(err)console.log(err);
                else console.log(result);
            })
            users.map((user)=>{
                if(user.id==id_user){
                    setTimeout(()=>{
                        res.render('index' ,user)
                    },3000)
                }
            })
        }
        else res.render('table',{'msg':"It is Already Reserved Please Chooose Another Time"})
    })
})

//register

app.get('/register',(req,res)=>{
    res.render('register')
})
app.get("/signup_style.css",(req,res)=>{
    res.sendFile(__dirname + '/style/signup_style.css');
})


app.post('/register',async (req,res)=>{
    try {
        const values=[[users.length+1,req.body.email,req.body.password,req.body.name]]
        db.query("insert into web.users values ? ",[values],(err,result)=>{
            
        })
        res.redirect('/sign')
    } catch (error) {
        res.redirect('/register')
    }
})
//burger
app.get('/burger',(req,res)=>{
    const user=users.filter((user)=>user.id==req.query.id)
    console.log(user);
    res.render('burger',user[0])
})
app.get('/burger.css',(req,res)=>{
    res.sendFile(__dirname+'/style/burger.css')
})
app.get('/burger.js',(req,res)=>{
    res.sendFile(__dirname+'/js/burger.js')
})
app.get('/res/giphy.gif',(req,res)=>{
    res.sendFile(__dirname+'/res/giphy.gif')
})

app.get('/:id',(req,res)=>{
    users.map((user)=>{
        if(user.id==req.params.id){
            res.render('index',user)
        }
    })
})

