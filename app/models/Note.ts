import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  user: ObjectId;
}

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Note = mongoose.models.Notes || mongoose.model<INote>("Notes", noteSchema);

export default Note;
