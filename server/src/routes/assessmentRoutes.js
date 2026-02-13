const express = require("express");
const router = express.Router();
const Assessment = require("../models/Assessment");

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      hasPrivacyPolicy,
      hasDPA,
      hasCookieBanner,
      hasSecurityAudit
    } = req.body;

    let score = 100;

    if (!hasPrivacyPolicy) score -= 20;
    if (!hasDPA) score -= 25;
    if (!hasCookieBanner) score -= 15;
    if (!hasSecurityAudit) score -= 30;

    if (score < 0) score = 0;

    let riskLevel = "High";
    if (score >= 75) riskLevel = "Low";
    else if (score >= 40) riskLevel = "Medium";

    const recommendations = [];

    if (!hasPrivacyPolicy)
      recommendations.push("Add a Privacy Policy describing data handling.");

    if (!hasDPA)
      recommendations.push("Prepare a Data Processing Agreement.");

    if (!hasCookieBanner)
      recommendations.push("Implement a Cookie Consent banner.");

    if (!hasSecurityAudit)
      recommendations.push("Conduct a security assessment and enable logging.");

    const assessment = new Assessment({
      userId,
      hasPrivacyPolicy,
      hasDPA,
      hasCookieBanner,
      hasSecurityAudit,
      score,
      riskLevel
    });

    await assessment.save();

    res.json({
      score,
      riskLevel,
      recommendations
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;