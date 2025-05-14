import mongoose from 'mongoose';
import { config } from './mongoDB.config';

async function connect() {
    try {
        await mongoose.connect(config.mongo.url,  { retryWrites: true, w: 'majority'});  
        console.log(`Established a connection to the MongoDB Atlas`)
    } catch (err) {
        console.log(`Error connecting to MongDB`, err );
    }
}
connect();