const express = require("express");
const mysql = require("mysql2");


const app = express()
app.use(express.json())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Resya202",
    database:"test"
})

app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=> {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books",(req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES(?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover
    ];

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("books has benn sucessfully created!")   
    })
})

app.listen(5000, ()=>{
    console.log("connected to backend!")

})