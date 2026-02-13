const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  hasPrivacyPolicy: Boolean,
  hasDPA: Boolean,
  hasCookieBanner: Boolean,
  hasSecurityAudit: Boolean,
  score: Number,
  riskLevel: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Assessment", assessmentSchema);