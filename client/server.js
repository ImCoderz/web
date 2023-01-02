const express=require('express')
const fs =require('fs')
const app=express()
const mysql=require('mysql')
const bodyParcel=require('body-parser')
const cors=require('cors')
let id=0;

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


app.listen(3002,()=>{
    console.log('ruuuuun');
})

// app.get('/',(req,res)=>{
//     db.query(`select * from hollywood.film`,(err, result)=>{
//         if(err) return err;
//         res.send(result)
//     })
// })





app.get(['/style.css','/style.css/:id'],(req,res)=>{
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
app.get('/res/table.jpeg',(req,res)=>{
    res.sendFile(__dirname+'/res/table.jpeg')
})
app.get('/res/OIP.jpeg',(req,res)=>{
    res.sendFile(__dirname+'/res/OIP.jpeg')
})



app.get('/table',(req,res)=>{
    // res.sendFile(__dirname+'/html/table.html');
    db.query(`select * from web.users`,(err,result)=>{
        const rf=result.filter((r)=>r.id==id)
        console.log(rf);
        res.render("table")
    })
})
app.get('/table_style.css',(req,res)=>{
    res.sendFile(__dirname+'/style/table_style.css')
})




app.get('/plats',(req,res)=>{
    
    res.sendFile(__dirname+'/html/plats.html');
})
app.get('/plats_style.css',(req,res)=>{
    res.sendFile(__dirname+'/style/plats_style.css')
})


app.get('/contact',(req,res)=>{
    res.sendFile(__dirname+'/html/contact.html');
})
app.get('/contact_style.css',(req,res)=>{
    res.sendFile(__dirname+'/style/contact_style.css')
})

app.get("/sign",(req,res)=>{
    res.sendFile(__dirname+'/html/sign.html')
    res.render('sign')
})


app.post('/sign',(req,res)=>{
    const email =req.body.email;
    const code=req.body.password;
    const name=req.body.name
    console.log(`${email}__${code}`);
    db.query(`select * from web.users `,(err,result)=>{
        let id=0;
        console.log(result);
        if(err) return err;
        else{
           result.map((r)=>{
                if(r.email==email && r.code==code){
                    id=r.id
                    res.redirect(`/${id}?name=${name}`)
                };
           })
           if(id==0) res.render('sign',{name:name,email:email});
        }
    })
})

app.get(['/','/:id'], (req, res) => {
    // console.log(req.user);
    // res.sendFile(__dirname + '/html/index.html');
    id=req.params.id;
    res.render('index',{name:req.query.name})
});


app.param("id",(req,res,next,id)=>{
    req.userId=id;
    next()
})



app.get('/hello',(req,res)=>{
    db.query(`select * from music.music`,(err, result)=>{
        if(err) return err;
        res.send(result)
    })
})

app.post('/',(req,res)=>{
    console.log(req.body);
    res.redirect("/")
    res.send("hello world")
})

app.post('/table',(req,res)=>{
    console.log(req.body);

})
