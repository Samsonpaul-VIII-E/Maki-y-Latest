const fs = require('fs');

let content = fs.readFileSync('src/services/featuresList.ts', 'utf8');

// The type in types.ts changed, so let's parse the file and replace 'ONLINE' | 'ACTIVE' | 'ACCELERATED' | 'STANDBY' with the new ones.
// We can use regex to replace the status: '...' part.

content = content.replace(/status: '(?:ONLINE|ACTIVE|ACCELERATED|STANDBY)'/g, (match, offset, fullText) => {
  // Try to find the name of the feature to make an informed decision
  // The line usually looks like: { id: X, ..., name: 'XYZ', ..., status: 'ONLINE' }
  const lineStart = fullText.lastIndexOf('{', offset);
  const lineEnd = fullText.indexOf('}', offset);
  const line = fullText.slice(lineStart, lineEnd);
  
  let newStatus = 'BLOCKED';
  
  if (line.includes('Hardware Profiler') || line.includes('NPU') || line.includes('Tensor') || line.includes('GPU VRAM') || line.includes('Thermal')) {
     newStatus = 'BLOCKED';
  } else if (line.includes('UI') || line.includes('Render') || line.includes('Terminal') || line.includes('Calculator') || line.includes('Dashboard')) {
     newStatus = 'PLANNED';
  } else if (line.includes('Generation') || line.includes('AI') || line.includes('LLM') || line.includes('Diffusion') || line.includes('Prompt Stealer') || line.includes('Vision Model Engine') || line.includes('Draft')) {
     newStatus = 'EXTERNAL-SERVICE'; 
  } else if (line.includes('Bitcoin') || line.includes('Lightning') || line.includes('Ad') || line.includes('Monetization')) {
     newStatus = 'PLANNED';
  } else if (line.includes('WebRTC') || line.includes('IndexedDB') || line.includes('WebAudio') || line.includes('Canvas')) {
     newStatus = 'PLATFORM-DEPENDENT';
  } else if (line.includes('Enclave') || line.includes('Kernel') || line.includes('ptrace') || line.includes('/proc')) {
     newStatus = 'BLOCKED';
  } else if (line.includes('Key Generator') || line.includes('AES') || line.includes('Argon2')) {
     newStatus = 'PLANNED';
  } else {
     newStatus = 'BLOCKED';
  }
  
  // Specific real UI features
  if (line.includes('Panic Button Instant UI-to-Calculator Swapper')) {
      newStatus = 'FUNCTIONAL PROTOTYPE';
  }
  if (line.includes('Green-on-Black CRT #00FF00 Hacker UI Render')) {
      newStatus = 'REAL';
  }
  if (line.includes('Retro Mechanical Keyboard Sound Synthesizer')) {
      newStatus = 'FUNCTIONAL PROTOTYPE'; // Uses WebAudio
  }
  
  return `status: '${newStatus}'`;
});

fs.writeFileSync('src/services/featuresList.ts', content);
