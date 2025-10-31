import mongoose, { Schema, models } from "mongoose";

const experienceSchema = new Schema({
    name: String,
    location: String,
    description: String,
    price: Number,
    imageUrl: String,
    dates: [String],
    slots: [
        {
            date: String,
            time: String,
            available: Number,
        },
    ],
});

export default models.Experience || mongoose.model("Experience", experienceSchema);
