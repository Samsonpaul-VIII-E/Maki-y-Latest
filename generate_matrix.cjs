const fs = require('fs');

const content = fs.readFileSync('src/services/featuresList.ts', 'utf8');

const regex = /\{ id: (\d+), module: (\d+), moduleName: '([^']+)', name: '([^']+)', mechanism: '([^']+)', benefit: '([^']+)', status: '([^']+)' \}/g;

let match;
let md = `# MAKI Feature Matrix\n\n| ID | Feature | Current Status | Real Implementation | Dependencies | Security Risk | Test | Priority |\n|---|---|---|---|---|---|---|---|\n`;

while ((match = regex.exec(content)) !== null) {
  const id = match[1];
  const name = match[4];
  const moduleName = match[3];
  
  // All are currently simulated, so we mark them as such.
  let currentStatus = '🔴 BLOCKED'; // default for impossible stuff
  let realImpl = 'No';
  let deps = 'None';
  let risk = 'High (Fake Claim)';
  let test = 'None';
  let priority = 'Low';
  
  // Evaluate based on web environment
  if (name.includes('Hardware Profiler') || name.includes('NPU') || name.includes('Tensor') || name.includes('GPU VRAM') || name.includes('Thermal')) {
     currentStatus = '🔴 BLOCKED';
  } else if (name.includes('UI') || name.includes('Render') || name.includes('Terminal') || name.includes('Calculator') || name.includes('Dashboard')) {
     currentStatus = '⚪ PLANNED';
     priority = 'High';
  } else if (name.includes('Generation') || name.includes('AI') || name.includes('LLM') || name.includes('Diffusion')) {
     currentStatus = '🟣 EXTERNAL-SERVICE'; 
     priority = 'High';
     deps = '@google/genai';
  } else if (name.includes('Bitcoin') || name.includes('Lightning') || name.includes('Ad') || name.includes('Monetization')) {
     currentStatus = '⚪ PLANNED';
     priority = 'Medium';
  } else if (name.includes('WebRTC') || name.includes('IndexedDB') || name.includes('WebAudio')) {
     currentStatus = '🔵 PLATFORM-DEPENDENT';
     priority = 'Medium';
  } else if (name.includes('Enclave') || name.includes('Kernel') || name.includes('ptrace') || name.includes('/proc')) {
     currentStatus = '🔴 BLOCKED';
  } else if (name.includes('Key Generator') || name.includes('AES') || name.includes('Argon2')) {
     currentStatus = '⚪ PLANNED';
     priority = 'High';
  } else {
     currentStatus = '🔴 BLOCKED'; // fallback
  }

  md += `| ${id} | ${name} (${moduleName}) | ${currentStatus} | ${realImpl} | ${deps} | ${risk} | ${test} | ${priority} |\n`;
}

fs.writeFileSync('MAKI_FEATURE_MATRIX.md', md);
