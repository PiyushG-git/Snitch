import mongoose from "mongoose";

const blacklistedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    // Store when the original JWT expires so MongoDB auto-deletes the doc via TTL index
    expiresAt: {
        type: Date,
        required: true,
    }
})

// TTL index — MongoDB will automatically remove the document once expiresAt is passed
blacklistedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const BlacklistedToken = mongoose.model("BlacklistedToken", blacklistedTokenSchema)

export default BlacklistedToken;
