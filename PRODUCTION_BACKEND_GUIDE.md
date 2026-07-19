# Production Backend & Payment Integration Guide

This app is currently **100% client-side**: there is no backend, no database, no payment
gateway, and no environment configuration (no `.env`, no `import.meta.env` usage, no API
base URL constant anywhere). Every "service" file (`*Service.ts`) is a stub that resolves a
mock value from an in-memory array or `localStorage`. This document lists exactly what needs
to be built to take this to production, including payment integration.

Six TODO comments in the codebase mark every place a real backend call needs to replace a
stub:

```
src/modules/auth/authService.ts:9
src/modules/transcripts/transcriptsService.ts:4
src/modules/checkout/checkoutService.ts:4
src/modules/checkout/Checkout.tsx:52
src/modules/transcripts/components/request-topic-dialog/form.tsx:26
src/components/support-drawer/form.tsx:22
```

---

## 1. Required API endpoints

A partial, unused sketch already exists at `src/constants/apiEndpoints.ts`. The table below
is the complete contract needed; `*` marks endpoints not currently referenced anywhere in the
sketch.

### Auth

| Method | Path | Auth | Body → Response | Replaces |
|---|---|---|---|---|
| POST | `/api/auth/register` | – | `{fullName, workEmail, companyName, password}` → `{token, user}` | `authService.ts:register` (currently never validates anything, always succeeds) |
| POST | `/api/auth/login` | – | `{workEmail, password}` → `{token, user}` | `authService.ts:signIn` (currently accepts **any** email/password) |
| POST | `/api/auth/logout` *| Bearer | – → `204` | `authUtils.ts:logout` (currently just wipes localStorage client-side) |
| GET | `/api/auth/me` *| Bearer | – → `{id, name, email}` | `useCurrentUser.ts` (currently reads stale values straight from localStorage, never re-validated against the server) |
| POST | `/api/auth/refresh` *| Refresh cookie | – → `{token}` | Not implemented at all today — current token never expires client-side |

**Current auth is not real auth.** `signIn`/`register` in `authService.ts` never check a
password; they fabricate a user object from whatever email you typed and mint an unsigned,
unverifiable "JWT" (`alg: 'none'`, empty signature) via `createMockToken`. Anyone can "log in"
as any email. This must be fully replaced, not extended.

There's also a partially-built SSO handoff in `authUtils.ts` (`consumeAuthTokenFromUrl`) that
reads a `?auth_token=` query param (documented as coming from the main Infollion site) and
trusts it client-side with zero server verification. If this SSO flow is real, the backend
must verify that token against Infollion's identity provider before issuing its own session —
right now it's a pure trust-the-URL vulnerability.

### Transcripts catalog

| Method | Path | Auth | Query/Body → Response | Replaces |
|---|---|---|---|---|
| GET | `/api/transcripts` | – | `?q=&domains[]=&price=&publishedDate=&sort=&page=&pageSize=` → `{items: Transcript[], total, page, pageSize}` | `transcriptsService.ts:fetchTranscripts` (currently returns the full 2000-record mock array; ALL filtering/search/sort/pagination happens client-side in `TranscriptsList.tsx`) |
| GET | `/api/transcripts/:id` | – | → `Transcript` | `transcriptsService.ts:fetchTranscriptById` (currently a linear `.find` over the mock array) |
| GET | `/api/domains` *| – | → `{label, value, count}[]` | `mockData.ts:DOMAIN_FILTER_OPTIONS` (currently precomputed client-side from the mock array — needs a real aggregation query, e.g. `GROUP BY domain`) |
| GET | `/api/transcripts/:id/download` *| Bearer + purchase check | `?format=txt\|pdf\|docx` → file stream | `usePurchaseActions.ts:handleDownload` (currently synthesizes a "transcript" client-side from the *preview* teaser text — see §4, this is a content-security gap, not just a missing API) |

Move every one of these client-side operations server-side (see `filterMatchers.ts` for the
exact bucket definitions to replicate: `price` buckets are `free`/`under-100`/`100-250`/
`over-250`; `publishedDate` buckets are day-count thresholds ≤7/≤30/≤90/≤365 from now):

- Full-text search (`q`) — currently a case-insensitive substring match on `title + tags`.
- Domain filter — currently `array.includes`.
- Price bucket filter, published-date bucket filter — see `filterMatchers.ts` for exact thresholds.
- Sort — currently hardcoded newest-first, no other option exposed in the UI yet.
- Pagination — currently `Array.slice`, `pageSize` options are `[5, 10, 20, 50]`.

### Cart

The cart is currently pure client-side Redux (`cartSlice.ts`), **lost on every page refresh** —
there is no persistence layer at all, not even localStorage. Decide up front whether cart
should stay client-only (simplest — just add `redux-persist` for localStorage durability) or
become server-side (needed if you want cart to survive across devices for a logged-in user):

| Method | Path | Auth | Body → Response |
|---|---|---|---|
| GET | `/api/cart` *| Bearer | → `{items: CartItem[]}` |
| POST | `/api/cart/items` *| Bearer | `{transcriptId}` → `{items}` |
| DELETE | `/api/cart/items/:transcriptId` *| Bearer | → `{items}` |

If you keep cart client-only, at minimum add `redux-persist` so it survives a refresh —
current behavior (cart vanishes on reload) is a real bug independent of backend work.

### Checkout, payment & orders

| Method | Path | Auth | Body → Response | Replaces |
|---|---|---|---|---|
| POST | `/api/checkout` | Bearer | `{items: [{transcriptId}], paymentMethodId}` → `{order}` | `checkoutService.ts:submitCheckout` (currently mints a random client-side id, no payment, no persistence) — see §2 for the full payment flow this endpoint must implement |
| GET | `/api/orders` *| Bearer | → `Order[]` | `useOrders.ts` (currently in-memory Redux, wiped on refresh; `ProfilePage`'s purchase history is entirely session-scoped right now) |
| GET | `/api/orders/:id` *| Bearer | → `Order` | Not implemented — `OrderConfirmationDialog` only ever sees the just-created order object in memory |

The current checkout form (`payment-form/fields.tsx`) collects raw
`cardholderName`/`cardNumber`/`expiry`/`cvc` fields with regex validation, then **discards them
entirely** — `Checkout.tsx:handleSubmit` takes the payment values as `_payment` (underscore-
prefixed, explicitly unused) and never includes them in the `submitCheckout` payload. This
happens to be "safe" only by accident (nothing sends raw card data anywhere); it must be
replaced with real tokenization, not extended. See §2.

### Contact/lead forms

| Method | Path | Auth | Body → Response | Replaces |
|---|---|---|---|---|
| POST | `/api/topics/request` *| Optional | `{domain, topic, email, suggestedExpertName, suggestedExpertLinkedin}` → `202` | `request-topic-dialog/form.tsx` (currently `console.log`s and closes the dialog) |
| POST | `/api/support` *| Optional | `{name, email, message}` → `202` | `support-drawer/form.tsx` (currently `console.log`s and closes the drawer) |

Both are simple lead-capture forms — wire to email (e.g. SendGrid/SES) or a CRM webhook,
whichever the business already uses for inbound leads.

---

## 2. Payment integration (recommended: Stripe)

**Do not send raw card numbers/CVC to your own backend, ever** — this requires PCI-DSS
compliance you almost certainly don't want to take on. Use a provider that tokenizes card
data directly in the browser (Stripe Elements/Payment Element, or Razorpay/PayPal
equivalents — Stripe is assumed below since prices are shown in USD).

### Flow

1. **Frontend**: replace `payment-form/fields.tsx`'s raw `cardNumber`/`expiry`/`cvc` text
   fields with Stripe's `<PaymentElement />` (from `@stripe/react-stripe-js` +
   `@stripe/stripe-js`, neither currently installed). Stripe.js collects card details and
   never lets them touch your server or even your React state.
2. **Backend**: when the user reaches checkout, create a `PaymentIntent` server-side —
   `POST /api/checkout/intent` → `{clientSecret}` — for the cart total, in the smallest
   currency unit (cents).
3. **Frontend**: call `stripe.confirmPayment({ clientSecret, ... })` with the Payment
   Element. Stripe handles 3D Secure/SCA challenges automatically if required.
4. **Backend webhook** (`POST /api/webhooks/stripe`, verified via Stripe's signing secret,
   **not** the client-facing checkout call): listen for `payment_intent.succeeded`. This is
   the only trustworthy signal that money actually moved — **never mark an order as paid
   just because the client says checkout succeeded**, since that response can be spoofed or
   dropped mid-flight.
5. Only after the webhook confirms payment: persist the `Order` as paid, and unlock the
   `/api/transcripts/:id/download` endpoint for those specific transcript ids for that user.
6. Return order confirmation to the frontend (poll `GET /api/orders/:id` or use a webhook-fed
   websocket/SSE if you want instant confirmation instead of polling).

### Why the current form must be replaced, not adapted

The existing `CARD_NUMBER_PATTERN`/`EXPIRY_PATTERN`/`CVC_PATTERN` regexes in
`checkout/constants.ts` validate a hand-typed 16-digit-with-spaces card format — this whole
approach (raw PAN fields in your own form) is what Stripe Elements is designed to eliminate.
Delete these fields/patterns entirely rather than trying to wire them to a gateway; keep only
`cardholderName` as a plain text field alongside the embedded Payment Element if you want a
name-on-card field for the receipt.

### Currency/display note

`Transcript.price` is a plain `number` displayed as `USD $X` in the UI (`PurchaseCard.tsx`
etc.) with no currency field on the type. If you'll ever support multiple currencies, add a
`currency` field now before building the payment layer around a bare number.

---

## 3. Protecting paid content (this is not just an API problem)

`usePurchaseActions.ts` currently builds every "download" (txt/pdf/doc) from
`transcript.preview` — the same short teaser string shown to browsing, non-paying visitors.
There is no "full transcript body" field anywhere in the `Transcript` type or mock data. This
means, structurally:

- The full paid content needs a **new field** (e.g. `fullText` or a separate content blob/
  file reference) that is **never included** in the `GET /api/transcripts` or
  `GET /api/transcripts/:id` response payloads — those must keep serving only `preview`.
- The full content is only ever served via the gated
  `GET /api/transcripts/:id/download` endpoint, which the backend must check against a real
  purchase record (`Order.items`) for the requesting authenticated user before streaming
  anything back.
- If someone is not logged in, or logged in but hasn't purchased that specific transcript,
  that endpoint must 403 — don't rely on the frontend hiding the download button as the only
  gate (it currently is, since `PurchaseCard`/detail page just conditionally render UI; a
  motivated user can already call `usePurchaseActions` today with zero purchase check, since
  there's no backend to enforce it).

---

## 4. Auth/session hardening for production

Current state (`authUtils.ts`, `storageUtils.ts`):

- Token is stored in **plain localStorage** under both `token` and `authToken` (duplicate
  key, same value) — readable by any injected script (XSS-exposed). Consider an httpOnly,
  `Secure`, `SameSite=Lax/Strict` cookie instead, with the backend issuing it on login and
  the frontend never touching the token string directly.
- `isLoggedIn()` is purely "does this localStorage key exist" — no expiry check, no
  server-side validation. A revoked/expired token still "logs you in" client-side forever.
- `logout()` calls `clearStorage()`, which wipes **all** localStorage keys, not just auth
  ones — fine today since nothing else is stored there, but worth scoping down once you add
  other localStorage-backed features (there currently are none besides auth+cart-unrelated
  keys).
- The existing `RequestServer` helper (`src/utils/services.ts` — written, but currently
  unused/dead code) sends the token as a raw `Authorization: <token>` header, **not**
  `Authorization: Bearer <token>`. Decide the real convention before backend work starts and
  update this helper (or replace it) to match whatever your API expects. It also has no
  refresh-token flow — a `401` just force-logs-out immediately, so plan for that UX (or add
  a refresh call before giving up).

---

## 5. Environment & deployment configuration

None of this exists today — the app has zero environment variables and a bare
`vite.config.ts` (just the React + Tailwind plugins, no proxy, no `define`, no env handling).
Minimum additions needed:

1. **`.env` / `.env.production`** with `VITE_API_BASE_URL` (Vite only exposes vars prefixed
   `VITE_` to client code via `import.meta.env`). Every service file (`authService.ts`,
   `transcriptsService.ts`, `checkoutService.ts`, plus the two new lead-form endpoints) needs
   to call this base URL instead of returning mock data.
2. **CORS**: the backend must allow the frontend's deployed origin(s) — dev
   (`http://localhost:5199` or whichever port) and production domain.
3. **Stripe keys**: `VITE_STRIPE_PUBLISHABLE_KEY` on the frontend (safe to expose — it's
   public by design); `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` on the backend only,
   never in frontend env files (anything prefixed `VITE_` ships in the client bundle).
4. **Build/hosting**: `npm run build` already produces a static `dist/` (confirmed working
   earlier) — deployable as-is to any static host (Netlify/Vercel/S3+CloudFront/etc.) once
   `VITE_API_BASE_URL` points at wherever the backend is deployed. The backend itself
   (Node/Express, or whatever stack you choose) is a separate deployment target entirely —
   nothing in this repo currently implements it.
5. **Auth cookie domain**: if you move to httpOnly cookies (recommended, §4), the cookie
   domain must be configured to work across your frontend and API domains (same top-level
   domain, or a proxy/rewrite so they appear same-origin).

---

## 6. Migration checklist (mock → real, in build order)

1. Stand up the backend + database; implement real `register`/`login` with password
   hashing (e.g. bcrypt/argon2) and signed JWTs or session cookies.
2. Add `VITE_API_BASE_URL` env handling; replace `RequestServer`'s header convention
   decision (§4) and point it at the real API.
3. Migrate `transcriptsService.ts` to call `GET /api/transcripts` /
   `GET /api/transcripts/:id` with real query params; move search/filter/sort/pagination
   logic (`TranscriptsList.tsx`, `filterMatchers.ts`) server-side.
4. Add the `fullText`/protected-content field and the gated download endpoint (§3) *before*
   wiring payments — otherwise paid content is exposed the moment checkout works.
5. Integrate Stripe (§2): install `@stripe/stripe-js` + `@stripe/react-stripe-js`, replace
   the raw card fields in `payment-form/fields.tsx`, add the `PaymentIntent`-creation
   endpoint and the webhook handler.
6. Wire `checkoutService.ts` to real `POST /api/checkout`, `useOrders.ts` to real
   `GET /api/orders` (drop the in-memory-only Redux orders, or keep Redux as a cache hydrated
   from the API).
7. Wire the two lead-capture forms (`request-topic-dialog`, `support-drawer`) to their
   endpoints.
8. Decide cart persistence strategy (`redux-persist` vs. server-side `/api/cart`) and
   implement it — currently cart is lost on every refresh regardless of anything else here.
9. Harden auth storage (httpOnly cookies) and add token refresh handling once the above is
   stable.
