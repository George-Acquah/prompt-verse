import { models, model, Schema, InferSchemaType, HydratedDocument, Types } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  private: {
    type: Boolean,
    required: [true, "Status is required."],
  },

  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);
export type PromptBase = InferSchemaType<typeof PromptSchema>;
type PromptFixed = Omit<PromptBase, "likedBy"> & {
  likedBy: Types.Array<Types.ObjectId>;
};
export type PromptType = HydratedDocument<PromptFixed>;

export default Prompt;


