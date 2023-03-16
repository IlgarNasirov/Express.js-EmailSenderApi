const express=require('express');
require('dotenv').config();

const app=express();

const senderRoutes=require('./routes/sender');
const errorController=require('./controllers/error');

app.use(express.json());

app.use((request, response, next)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/v1/send', senderRoutes);

app.use(errorController.get500);

app.use(errorController.get404);

app.listen(process.env.PORT||8000);