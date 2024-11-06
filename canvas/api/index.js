const express = require("express");
const cors = require('cors');  
const { default: mongoose } = require("mongoose");
const app = express();
const User = require('./User');
const bcrypt = require("bcryptjs");
const bcsalt = bcrypt.genSaltSync(10);


app.use(express.json());

app.use(cors( /*
    
    {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        "Access-Control-Allow-Methods": 'OPTIONS,POST,GET'
      },
     
  } */ ));   


//password= WxESBX6VhxiCZyzD



app.get("/test", (req, res) =>{
    res.json("test ok");
});

/*
app.post('/register',  (req,res) => {
    const {name,email,password} = req.body;    
    res.json(name);

})
*/


mongoose.connect("mongodb+srv://Present:WxESBX6VhxiCZyzD@cluster0.3xd6x6w.mongodb.net/?retryWrites=true&w=majority");
app.post('/register', async (req,res) => {
    const {name,email,password} = req.body;
    try {
    const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcsalt),
    });

    res.json(userDoc);
} catch (e) {
    res.status(422).json(e); //unprosesable entitiy Http status
}

})

app.post('/login', async (req,res) => {
    const {email,password} = req.body;   
    const userDoc = await User.findOne({email});
    if (userDoc){
        const passok = bcrypt.compareSync(password,userDoc.password)
        if (passok){
            res.json("pass ok")
        } else {res.status(422).json("pass not ok")}
    }
    else{
        res.status(422).json("not found")
        //res.json("not found");
    } 

})


app.listen(4000);