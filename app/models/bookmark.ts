import { Document, InferSchemaType, Schema, model, models } from "mongoose";

const BookmarkSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prompt: {
      type: Schema.Types.ObjectId,
      ref: "Prompt",
      required: true,
    },
  },
  { timestamps: true }
);

BookmarkSchema.index({ user: 1, prompt: 1 }, { unique: true });

const Bookmark = models.Bookmark || model("Bookmark", BookmarkSchema);

export type BookmarkBase = InferSchemaType<typeof BookmarkSchema>;
export interface BookmarkType extends Document, BookmarkBase {};
export default Bookmark;
