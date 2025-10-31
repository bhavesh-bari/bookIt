import mongoose, { Schema, models } from "mongoose";

const bookingSchema = new Schema({
    experienceId: { type: Schema.Types.ObjectId, ref: "Experience" },
    name: String,
    email: String,
    date: String,
    time: String,
    qty: Number,
    total: Number,
    promo: String,
    createdAt: { type: Date, default: Date.now },
});

export default models.Booking || mongoose.model("Booking", bookingSchema);
