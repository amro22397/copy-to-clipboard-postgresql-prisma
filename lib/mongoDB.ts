import mongoose from "mongoose";


export async function connectToMongoDB() {

    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log('Connected to mongoDB')
    } catch (error) {
        console.log(error);
    }
}