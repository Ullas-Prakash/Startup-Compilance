const mongoose = require("mongoose");

const startupProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    industry: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    features: {
      collectsData: {
        type: Boolean,
        default: false
      },
      payments: {
        type: Boolean,
        default: false
      },
      analytics: {
        type: Boolean,
        default: false
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("StartupProfile", startupProfileSchema);
