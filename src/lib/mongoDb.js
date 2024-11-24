import mongoose from "mongoose";



const MONGO_URI = process.env.MONGODB_URI 

if(!MONGO_URI){
    throw new Error('Mongo uri is not define in the .env.local file')
}

let cached = global.mongoose

if(!cached){
    cached = global.mongoose = {conn: null, promise: null};
}

const connectDB = async () => {
    if(cached.conn){
        console.log('Used cached database connection')
        return cached.conn;
    }

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
            console.log('Database is connected successfully')
            return mongoose
        }).catch((error) => {
            console.log('Error connecting to database: ', error)
        })
    }

    cached.conn = await cached.promise
    return cached.conn;
}

export default connectDB