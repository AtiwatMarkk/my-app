# Qoomlee Airline - Booking & Check-in Flow

This is a Next.js project that simulates an airline's booking and online check-in flow, complete with mock APIs and UI components.

## 🚀 Getting Started

First, install the dependencies if you haven't already:
```bash
bun install
```

Then, run the frontend development server:
```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application. 
Navigate to the **Check-in** tab in the navigation bar to access the testable flow.

## 🧪 Running UI Tests

This project uses **Vitest** and **React Testing Library** to test the UI components. 

To run the test suite:
```bash
bun test
```
*(Tests are located in `src/app/Checkin/page.test.tsx` and ensure that button states and form logic function correctly).*

---

## 🔐 Mock Login Credentials (For Testing)

The Check-in flow uses a mocked API backend. To test the check-in functionality, use the following details on the `/Checkin` page:

### ✅ 1. Successful Login (Standard Booking)
Use this credential to successfully retrieve a booking and proceed through the check-in flow (Select Passengers, add Info, agree to Dangerous Goods, and view Boarding Pass).

- **Last Name:** `HUUM` (or `KUUM`)
- **Booking Reference (PNR):** `ABC123`

### ❌ 2. Failed Login (Group Booking Restriction)
Use this credential to trigger a simulated error showing that group bookings are not allowed to check-in online.

- **Last Name:** `SMITH`
- **Booking Reference (PNR):** `GRP999`

### ⚠️ 3. Invalid Login (Not Found)
Use any other random combination (e.g., Last Name: `Doe`, PNR: `XXX999`) to see the "PNR Not Found" or validation error messages.
