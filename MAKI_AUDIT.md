# MAKI Repository Audit

## Architecture
- **Frontend Framework**: React 19 + Vite + TypeScript.
- **Styling**: Tailwind CSS (v4) with custom CRT scanline overlays.
- **State Management**: React `useState` and `useEffect` (no global store like Redux or Zustand).
- **Runtime Environment**: Node.js/Browser. 

## Dependency Graph
- **Core**: `react`, `react-dom`, `vite`
- **UI/Animation**: `lucide-react`, `motion`, `@tailwindcss/vite`
- **AI Integrations**: `@google/genai`
- **Backend/API (if any)**: `express`, `dotenv` (server.ts exists but is a basic Express wrapper)

## API Map
- **Maki API Service (`src/services/makiApi.ts`)**: Currently acts as a simulated AI generator interface (uses `setTimeout` and fake loading steps).
- **Express Server (`server.ts`)**: Basic static file server and mock API endpoint (`/api/status`). 
- **No external provider APIs** are securely routed yet.

## Security Boundaries
- **Client-side only**: All "cryptography" and "security" functions are currently executed in the browser environment.
- **Zero-trust violations**: Ghost keys and Shards are generated client-side using `Math.random()` or basic WebCrypto and are not truly secure in this context.
- **Storage**: Ephemeral, memory only. No secure enclave bindings exist.

## Data-Flow Map
- User inputs (prompts) -> React State -> `makiApi.ts` -> Mock Responses -> UI updates.
- No real database or backend persistence exists.

## AI-Provider Map
- **Current State**: Hardcoded mock responses.
- **Dependencies**: `@google/genai` is installed but not integrated into the core `makiApi.ts` generation flow.
- **Local Models**: No real ExecuTorch, CoreML, or DirectML bindings exist. All local NPU claims are simulated.

## Monetization Map
- **Current State**: Simulated SatoshiStream 10-second countdown ads.
- **Transactions**: Simulated Lightning Network payments with fake transaction hashes.
- **Integration**: No real BTCPay, LND, or Ad SDKs are implemented.

## Storage Map
- **Current**: In-memory React state.
- **Claimed**: "Zero-Knowledge Database", "Volatile Memory Mesh Buffer", "Hardware Secure Enclave". None of these exist.

## Feature Implementation Map
- **Total Registered Features**: 236.
- **REAL**: 0 (Except basic UI rendering).
- **SIMULATED / FAKE**: 236.
- All hardware profiling, crypto, P2P mesh, AI generation, and monetization features use mock data and fake timers.

## Technical Debt
- Massive amount of simulated logic masquerading as real code.
- Mixing of frontend UI components with mock service logic.
- Unused Express server (`server.ts`) that doesn't securely handle API calls.
- Hardcoded fake responses scattered across components.

## Broken Features
- None are technically "broken" because they are all mocked, but functionally, 100% of the advanced features do not work as described.

## Duplicate Features
- Various UI tabs trigger the same underlying mock API logic with different visual skins.

## Dangerous Claims
- "Hardware Secure Enclave Master Key Locking" (Impossible in browser).
- "Direct WireGuard Encrypted Tunnel Manager" (Impossible in browser).
- "AES-256-GCM Model Weight Encryption" (Fake).
- "NIST ML-KEM Key Exchange" (Simulated).
- Claiming anonymity and encryption when using `Math.random` and plaintext state.

## Unsupported Capabilities (In Current Web Environment)
- Raw NPU/GPU access (ExecuTorch, CoreML, Hexagon, CUDA).
- Direct P2P sockets without WebRTC signaling servers.
- Hardware Secure Enclave / StrongBox access.
- Kernel-level anti-debugging (ptrace, Memory Map Scanner).
- Bluetooth LE Beacon / UWB Proximity.
- Native Bitcoin Lightning Nodes (without WASM or external APIs).
