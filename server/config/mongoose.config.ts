import mongoose from 'mongoose';
const DBNAME = "gamefinder";

async function connect() {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/${DBNAME}`);  
        console.log(`Established a connection to the MongoDB. Database = ${DBNAME}`)
    } catch (err) {
        console.log(`Error connecting to MongDB`, err );
    }
}
connect();