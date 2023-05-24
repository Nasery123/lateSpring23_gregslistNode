import { text } from "express";
import mongoose from "mongoose";
const Schema = mongoose.Schema

export const HouseSchema = new Schema(
    {

        yearMake: { type: Number, required: true },
        bedrooms: { type: Number, required: true },
        bathrooms: { type: Number, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        creatorId: { type: Schema.Types.ObjectId, required: true }

    },
    { timestamps: true }
)
