const express = require ('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user_model')
const jwt = require('jsonwebtoken')


mongoose.connect('mongodb://localhost:27017/user-login-reg')

app.use(cors())
app.use(express.json())

app.post('/api/register', async(req,res)=>{
    console.log(req.body)
    try{
        await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        })
        res.json({status: 'ok'}) 
    } catch (err){
        res.json({status: 'error', error:'Duplicate email'})
    }
})

app.post('/api/login',async(req,res)=>{
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
        })
       if(user){
            const token = jwt.sign(
                {
                    name: user.name,
                    email: user.email,
                },
                'megamegamegacopingcopingmechanism'
            )

        


           return res.json({status: 'ok', user:token})
       } else{
           return res.json({status:'error',user:false})
       }
})

app.listen(1337,()=>{
    console.log('server started at 1337')
})