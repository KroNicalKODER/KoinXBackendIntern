import express from 'express';
import cron from 'node-cron';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/coin_router.js';
import axios from 'axios';

const app = express();
dotenv.config()

mongoose.set('strictQuery',true)
const connect = ()=>{
    mongoose.connect(process.env.MONGO_DB).then(()=>{
        console.log("Connected to Database")
    }).catch((err)=>{
        throw err
    })
}

app.get('/', (req, res) => {
    res.send('Hello this is the koinx backed assignment developed by Mradul Varshney (Kronikal Kodar)');
});

app.use('/coins',router)

cron.schedule('0 */2 * * *', () => {
    axios.get('https://koinxbackendintern.onrender.com/coins/save_coin_data')
    console.log('saved to database after 2 hours');
});

app.listen(3000, () => {
    connect()
    console.log('Server listening on port 3000');
});