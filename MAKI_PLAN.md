# MAKI Implementation Plan

## Phase A: Audit & Analysis (Complete)
- `MAKI_AUDIT.md` created, identifying 100% of 236 features as simulated/fake in the current web environment.
- `MAKI_FEATURE_MATRIX.md` created, categorizing features by current status (🔴 BLOCKED, ⚪ PLANNED, 🟣 EXTERNAL-SERVICE, 🔵 PLATFORM-DEPENDENT).
- **Platform Reality**: Because this is a Web/Node application, hardware-level features (NPU, Secure Enclave, DirectML) are marked as BLOCKED. The AI generation must use `EXTERNAL-SERVICE` (Gemini API via backend).

## Phase B: Architecture Cleanup
1. Separate frontend UI from backend API logic.
2. Remove hardcoded simulated responses from `makiApi.ts` and `hardwareProfiler.ts`.
3. Set up a proper Express API route (`/api/generate`) in `server.ts` to handle AI requests securely.
4. Strip out fake "Zero-Knowledge" implementations (like `Math.random` keys) and replace with legitimate WebCrypto derivations or remove them entirely.

## Phase C: Security Foundation
1. Move `dotenv` initialization to `server.ts` to securely load `GEMINI_API_KEY`.
2. Ensure frontend NEVER sees the API key.
3. Add input sanitization and rate-limiting to the backend API.
4. Add basic auth or session management if required for usage limits.

## Phase D & E: AI Provider Architecture & Core Functionality
1. Implement `GeminiProvider` class in the backend using `@google/genai`.
2. Connect the `MakiPublicTerminal` and `Module1Generation` to real backend endpoints.
3. Replace fake `setTimeout` generation loops with actual asynchronous API calls.
4. Stream responses back to the frontend UI.
5. Gracefully handle API failures, timeouts, and missing keys.

## Phase F & G: Creative Tools & Privacy
1. Implement legitimate file upload validation for multimodal inputs.
2. Ensure image/audio features degrade gracefully if unsupported.
3. Implement real local encryption for downloaded assets (if any) using WebCrypto AES-GCM.

## Phase H - L: Advanced Features (Mesh, Crypto, Monetization)
1. **Mesh/P2P**: Explore real WebRTC DataChannel implementations for basic text/file sharing. Block impossible hardware cluster features.
2. **Bitcoin**: Implement a basic BTCPay Server / Lightning invoice generator via external API (if available), or mark as planned.
3. **Ads/Monetization**: Remove fake SatoshiStream ad countdowns. Implement a placeholder for a real ad network SDK (e.g., Google AdSense).

## Phase M - P: Finalization
1. Update UI to accurately reflect what is functional (removing "ONLINE" tags for blocked features).
2. Add end-to-end tests for the `/api/generate` endpoint.
3. Ensure no secrets are leaked in build output.
4. Compile the final `MAKI_FINAL_REPORT.md`.
