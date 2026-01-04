import mongoose from "mongoose";

// 1. create Schema
const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } // createdAt, updatedAt
);

// 2. model based on schema
const Note = mongoose.model("Note", noteSchema);

export default Note;
