const { createCanvas } = require('canvas');
const fs = require('fs');

const width = 600;
const height = 600;

// Create canvas
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// 1. Draw Tokyo Night Deep Background
const bgGradient = ctx.createLinearGradient(0, 0, width, height);
bgGradient.addColorStop(0, '#1a1b26'); // Deep navy
bgGradient.addColorStop(1, '#0f0f14'); // Almost black
ctx.fillStyle = bgGradient;
ctx.fillRect(0, 0, width, height);

// Add subtle grid lines for "developer vibe"
ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
ctx.lineWidth = 1;
for (let x = 0; x <= width; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
}
for (let y = 0; y <= height; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
}

// 2. Add an epic glowing banana icon
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
ctx.shadowBlur = 40;
ctx.shadowColor = 'rgba(234, 179, 8, 0.4)'; // Banana yellow glow

ctx.font = 'bold 150px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillStyle = '#eab308'; // Tailwind Yellow 500
ctx.fillText('🍌', width / 2, height / 2 - 40);

// Reset shadow for text
ctx.shadowBlur = 0;
ctx.shadowColor = 'transparent';

// 3. Draw Title Text "Nano Banana"
ctx.font = 'bold 64px Inter, sans-serif';
ctx.fillStyle = '#ffffff';
ctx.fillText('Nano Banana', width / 2, height / 2 + 80);

// 4. Draw Subtitle "SaaS Boilerplate"
ctx.font = '32px Inter, sans-serif';
ctx.fillStyle = '#94a3b8'; // Tailwind Slate 400
ctx.fillText('Next.js SaaS Boilerplate', width / 2, height / 2 + 150);

// Save to file
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./public/gumroad-thumbnail.png', buffer);
console.log('Thumbnail successfully created at public/gumroad-thumbnail.png');
