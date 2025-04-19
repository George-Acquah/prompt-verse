import mongoose from "mongoose";

let isConnected = false;

declare global {
  // Add this only for development mode global caching
  // eslint-disable-next-line no-var
  var _mongooseConnected: boolean | undefined;
}

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  // Use global cache in dev to avoid re-connecting on hot reloads
  if (process.env.NODE_ENV === "development") {
    if (global._mongooseConnected) {
      console.warn("MongoDB is already connected (dev mode)...");
      return;
    }
  } else if (isConnected) {
    // In prod, just use local flag
    console.warn("MongoDB is already connected...");
    return;
  }

  try {
    console.log("Connecting to:", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI as string);

    isConnected = true;
    if (process.env.NODE_ENV === "development") {
      global._mongooseConnected = true;
    }

    console.log("✅ MongoDB connected!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};
