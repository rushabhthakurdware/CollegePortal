const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const collegeData = require("../collegeInfo");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/chat", async (req, res) => {
  try {
    const { message, studentInfo } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `
      You are the "YCCE Student Support AI". 
      Context about YCCE: ${JSON.stringify(collegeData)}
      
      Current Student Details:
      - Category: ${studentInfo.caste}
      - Admission: ${studentInfo.admissionType}

      Instructions:
      1. Use the "fees" section to give exact numbers based on the student's category (${studentInfo.caste}).
      2. If asked about library or attendance, quote the specific YCCE rules.
      3. Be polite, professional, and helpful.
      4. If the question is not about college, politely redirect them to academic topics.
      
      User: ${message}
      AI Assistant:`;

    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text();
    
    res.json({ text: responseText });
  } catch (error) {
    console.error("AI Route Error:", error);
    res.status(500).json({ text: "The AI server is busy. Please try again in a moment." });
  }
});

module.exports = router;