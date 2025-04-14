import { Schema, models, model } from "mongoose";

const TagSchema = new Schema({
  name: { type: String, unique: true },
  count: { type: Number, default: 1 },
});
export default models.Tag || model("Tag", TagSchema);
