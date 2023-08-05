import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.warn("MongoDB is already connected...");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            dbName: "share_prompt",
        });
        
        isConnected = true;
        console.log("MongoDB connected!!!");
    } catch (error) {
        console.error("error :" + error)
    }
}