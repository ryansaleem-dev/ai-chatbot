import readlineSync from "readline-sync";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// 🔑 PUT YOUR API KEY HERE
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function chat() {
  console.log("🤖 Gemini AI Chatbot Started (type 'exit' to quit)\n");

  while (true) {
    const userInput = readlineSync.question("You: ");

    if (userInput.toLowerCase() === "exit") {
      console.log("Goodbye!");
      break;
    }

    try {
      const result = await model.generateContent(userInput);
      const response = await result.response;
      const text = response.text();

      console.log("AI:", text, "\n");
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
}

chat();