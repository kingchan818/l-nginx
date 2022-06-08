import express from 'express';
const appid = process.env.APPID
const app = express();

app.get("/", (req,res) => 
res.send(`appid: ${appid} home page: says hello!`))


app.listen(80, ()=>console.log(`${appid} is listening on 9999`))