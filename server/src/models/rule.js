const mongoose = require("mongoose");

const ruleSchema = new mongoose.Schema(
  {
    appliesTo: {
      industry: String,
      country: String,
      features: {
        collectsData: Boolean,
        payments: Boolean
      }
    },
    lawName: {
      type: String,
      required: true
    },
    riskScore: {
      type: Number,
      min: 1,
      max: 10
    },
    severity: {
      type: String,
      enum: ["Low", "Medium", "High"]
    },
    complianceAction: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rule", ruleSchema);
