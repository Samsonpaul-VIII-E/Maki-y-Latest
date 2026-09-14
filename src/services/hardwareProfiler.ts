import { ExecutionTier, HardwareProfile } from '../types';

export function profileHostHardware(): HardwareProfile {
  let memoryGb = 8;
  let isWebEnvironment = true;
  if (typeof navigator !== 'undefined' && 'deviceMemory' in navigator) {
    memoryGb = (navigator as unknown as { deviceMemory: number }).deviceMemory || 8;
  }

  const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 8 : 8;

  // Web Browser Environment Limitation Detection
  // Browser JavaScript cannot access raw NPU drivers, Qualcomm SNPE, CUDA, or Secure Enclave.
  // Fallback: Web execution with external API dependency for complex tasks.
  let socName = 'Web Browser Sandbox';
  let npuTops = 0.0;
  let tier = ExecutionTier.TIER_0; // Web Fallback
  let recommendedModel = 'Cloud-Accelerated (Gemini API)';
  let quant: 'INT4' | 'INT8' | 'FP16' | 'UNQUANTIZED' | 'N/A' = 'N/A';

  return {
    socName,
    npuTops,
    unifiedRamGb: memoryGb,
    storageAvailableGb: 0, // Cannot detect safely in browser
    batteryLevel: 100, // Mocked fallback
    isCharging: true,
    coreTempC: 0.0, // Cannot read thermal sensors from browser
    assignedTier: tier as ExecutionTier,
    recommendedModel,
    ramUsageMb: 0,
    vramUsageMb: 0,
    quantizationMode: quant as any,
  };
}

export const TIER_CONFIGS: Record<ExecutionTier | string, {
  name: string;
  badge: string;
  weightSize: string;
  targetHardware: string;
  defaultQuant: 'INT4' | 'INT8' | 'FP16' | 'UNQUANTIZED' | 'N/A';
  description: string;
}> = {
  [ExecutionTier.TIER_0 || 'TIER_0']: {
    name: 'Tier 0 — Web Fallback',
    badge: 'EXTERNAL-SERVICE',
    weightSize: '0 MB',
    targetHardware: 'Web Browser Environment',
    defaultQuant: 'N/A',
    description: 'Hardware NPU/GPU cannot be accessed directly from a web browser without native bindings. Utilizing Secure Cloud Backend (Gemini).',
  },
  [ExecutionTier.TIER_1]: {
    name: 'Tier 1 — Micro INT4',
    badge: 'BLOCKED IN BROWSER',
    weightSize: '720 MB',
    targetHardware: 'Budget 4GB Devices',
    defaultQuant: 'INT4',
    description: 'BLOCKED: Requires native Android/iOS wrapper to access NPU.',
  },
  [ExecutionTier.TIER_2]: {
    name: 'Tier 2 — Mobile INT4',
    badge: 'BLOCKED IN BROWSER',
    weightSize: '1.4 GB',
    targetHardware: '6GB–8GB Mid-Tier Phones',
    defaultQuant: 'INT4',
    description: 'BLOCKED: Native ExecuTorch / Hexagon pipeline unavailable in standard web context.',
  },
  [ExecutionTier.TIER_3]: {
    name: 'Tier 3 — Flagship Hybrid',
    badge: 'BLOCKED IN BROWSER',
    weightSize: '5.8 GB',
    targetHardware: '12GB+ Flagship Phones',
    defaultQuant: 'INT4',
    description: 'BLOCKED: Requires direct ANE/DirectML binding.',
  },
  [ExecutionTier.TIER_4]: {
    name: 'Tier 4 — Laptop Studio',
    badge: 'BLOCKED IN BROWSER',
    weightSize: '8.4 GB',
    targetHardware: 'Entry Laptops (16GB RAM)',
    defaultQuant: 'FP16',
    description: 'BLOCKED: Requires FlashAttention-2 native support.',
  },
  [ExecutionTier.TIER_5]: {
    name: 'Tier 5 — Desktop Pro',
    badge: 'BLOCKED IN BROWSER',
    weightSize: '11.2 GB',
    targetHardware: 'Desktop Studios (32GB RAM)',
    defaultQuant: 'INT8',
    description: 'BLOCKED: Requires massive local VRAM access.',
  },
  [ExecutionTier.TIER_6]: {
    name: 'Tier 6 — Workstation Beast',
    badge: 'BLOCKED IN BROWSER',
    weightSize: '22.8 GB',
    targetHardware: '64GB+ Workstation / Multi-GPU',
    defaultQuant: 'UNQUANTIZED',
    description: 'BLOCKED: Requires zero-disk RAM decryption native privileges.',
  },
};
