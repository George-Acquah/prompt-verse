import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.warn("MongoDB is already connected...");
        return;
    }

    try {
        console.log(process.env.MONGODB_URI)
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: "share_prompt",
        });
        
        isConnected = true;
        console.log("MongoDB connected!!!");
    } catch (error) {
        console.error("error :" + error)
    }
}