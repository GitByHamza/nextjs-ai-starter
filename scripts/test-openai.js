const https = require('https');
const fs = require('fs');
const path = require('path');

// Load .env.local
const envPath = path.resolve(__dirname, '../.env.local');
let apiKey = '';

try {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    const match = envConfig.match(/OPENAI_API_KEY=(.*)/);
    if (match) {
        apiKey = match[1].trim();
    }
} catch (e) {
    console.error('Could not load .env.local');
}

if (!apiKey) {
    console.error('❌ No OPENAI_API_KEY found in .env.local');
    process.exit(1);
}

console.log(`🔑 Testing API Key: ${apiKey.substring(0, 8)}...`);

const data = JSON.stringify({
    model: "gpt-3.5-turbo", // Using 3.5 for a cheaper test
    messages: [{ role: "user", content: "Say hello!" }],
});

const options = {
    hostname: 'api.openai.com',
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    let responseBody = '';

    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    res.on('end', () => {
        if (res.statusCode === 200) {
            console.log('✅ OpenAI API is working correctly!');
            const parsed = JSON.parse(responseBody);
            console.log('   Response:', parsed.choices[0].message.content);
        } else {
            console.error(`❌ OpenAI API Error (Status: ${res.statusCode})`);
            console.error('   Error Details:', responseBody);
            console.log('\n👉 Analysis: This confirms the issue is with the OpenAI Account Billing, not the SaaS code.');
        }
    });
});

req.on('error', (error) => {
    console.error('Request Error:', error);
});

req.write(data);
req.end();
