const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

// Load .env.local
const envPath = path.resolve(__dirname, '../.env.local');
let apiKey = '';
try {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    const match = envConfig.match(/GOOGLE_GENERATIVE_AI_API_KEY=(.*)/);
    if (match) {
        apiKey = match[1].trim();
    }
} catch (e) {
    console.error('Could not load .env.local');
}

if (!apiKey) {
    console.error('❌ No GOOGLE_GENERATIVE_AI_API_KEY found in .env.local');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // There isn't a direct listModels method in the high-level SDK easily accessible for simple listing 
        // without using the model manager, but let's try a standard fetch to the API to be sure.

        console.log("Fetching models via generic API call...");
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.error) {
            console.error("API Error:", data.error);
            return;
        }

        if (data.models) {
            console.log("\n✅ Available Models:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name.replace('models/', '')} (${m.displayName})`);
                }
            });
        } else {
            console.log("No models found or unexpected response structure:", data);
        }

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
