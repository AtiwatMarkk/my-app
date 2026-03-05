# Check-in Flow

🧭 Business Rules — PNR & Online Check-in
1. PNR Creation Rules

BR-01: A single PNR (Passenger Name Record) can contain a maximum of 9 passengers (including adults, children, and infants with seats).

BR-02: For 10 or more passengers, the booking must be processed as a Group Booking under a Group PNR.

BR-03: Each PNR must contain at least one adult passenger if children or infants are included.

BR-04: Each PNR must include unique passenger details (name, DOB, contact info, etc.) for ticket issuance and check-in.

2. Online Check-in Rules

BR-05: All passengers within a single PNR (up to 9 pax) are eligible for online check-in.

BR-06: The online check-in system must allow check-in for the entire PNR or selected passengers within that PNR.

BR-07: For group bookings (10+ pax / group PNR), online check-in is not available through the standard web or mobile process.

BR-08: Group PNRs must be checked in via airport counters or special group check-in desks.

BR-09: Online check-in may be restricted for PNRs containing:

Special service requests (e.g., wheelchair, unaccompanied minor, pets, deportee, etc.)

Unconfirmed ticketing status

Code-share flights operated by partner airlines with no online check-in agreement.

3. System Handling Rules

BR-10: The system should display an appropriate message when a user attempts online check-in for an ineligible PNR (e.g., “Online check-in is not available for group bookings”).

BR-11: For PNRs with mixed eligibility (some passengers restricted), the system should allow partial check-in for eligible passengers.

BR-12: Each passenger checked in online must have a valid e-ticket number and seat assignment (if applicable).


User Story
As a passenger,
I want to check in online for my booking (up to 9 passengers),
So that I can obtain boarding passes before arriving at the airport.

Acceptance Criteria:

Given a PNR with ≤ 9 passengers and confirmed tickets,
When the user accesses online check-in,
Then the system allows check-in for all or selected passengers.

Given a PNR with ≥ 10 passengers (Group Booking),
When the user attempts online check-in,
Then the system displays a message: “Online check-in not available for group bookings. Please check in at the airport.”


- remember the Select passenger when click back. (if this not in Acceptance criteria it just no need to handle)
- not allow INFANT checkin online in PNR.
- not allow CHD travel alone on some journey
- phone number should allow only number not charecters

```mermaid
flowchart LR

%% Start
A[Start Online Check-in] --> B[Identify Passenger]

%% Identification options
B --> C{Identification Method}
C --> C1[Booking Ref + Last Name]
C --> C2[Loyalty Account Login]
C1 --> D[Search PNR]
C2 --> D

%% PNR Check
D --> E{PNR Found?}
E -- No --> Z1[Error: PNR Not Found] --> A
E -- Yes --> F[Check Flight Info]

%% Determine Domestic vs International
F --> G{Is Flight Domestic or International?}
G -- Domestic --> H1[Check Eligibility - Domestic]
G -- International --> H2[Check Eligibility - International]

%% Domestic Eligibility
H1 --> I1{Eligible for Check-in?}
I1 -- No --> Z2[Error: Not Eligible for Online Check-in] --> A
I1 -- Yes --> J1[Optional: Select Seats or Bags] --> K1[Issue Boarding Pass]
K1 --> L1[Mark as Checked-in]
L1 --> M1[Send Boarding Pass via Email or PDF]
M1 --> N1[Show Confirmation Screen]
N1 --> END1([End])

%% International Eligibility
H2 --> I2{Eligible for Check-in?}
I2 -- No --> Z3[Error: Not Eligible for Online Check-in] --> A
I2 -- Yes --> J2[Collect Passport Details]
J2 --> K2[Validate APIS Requirements]
K2 --> L2[Validate Visa Requirements]

%% Visa Check
L2 --> M2{Visa Validation Passed?}
M2 -- No --> Z4[Error: Visa or Entry Denied] --> A
M2 -- Yes --> N2[Optional: Select Seats or Bags] --> O2[Issue Boarding Pass]
O2 --> P2[Mark as Checked-in]
P2 --> Q2[Send Boarding Pass via Email or PDF]
Q2 --> R2[Show Confirmation Screen]
R2 --> END2([End])
```



Great! Let’s now **group the online check-in flow** into **UI pages/screens**, based on the previously validated Mermaid diagram.

This will help you:

* Design and develop page-by-page UI
* Align each screen with Qoomlee logic and aviation regulations
* Reuse pages for both **domestic and international** flows

---

## ✅ Check-in Flow Grouped by UI Page

We’ll use the Mermaid nodes you confirmed as valid and group them logically.

---

### 🧭 UI PAGE 1: Passenger Identification

* **Page Name:** `CheckInStartPage`
* **Purpose:** Let the passenger log in using their Booking Reference or Loyalty account
* **Mermaid Nodes:**

  * `A[Start Online Check-in]`
  * `B[Identify Passenger]`
  * `C{Identification Method}`
  * `C1[Booking Ref + Last Name]`
  * `C2[Loyalty Account Login]`
  * `D[Search PNR]`
  * `E{PNR Found?}`
  * `Z1[Error: PNR Not Found]`

---

### 🧭 UI PAGE 2: Flight & Eligibility Check

* **Page Name:** `FlightEligibilityPage`
* **Purpose:** Display flight info, determine check-in eligibility, and route based on domestic/international
* **Mermaid Nodes:**

  * `F[Check Flight Info]`
  * `G{Is Flight Domestic or International?}`
  * `H1[Check Eligibility - Domestic]`
  * `H2[Check Eligibility - International]`
  * `I1{Eligible for Check-in?}`
  * `I2{Eligible for Check-in?}`
  * `Z2[Error: Not Eligible for Online Check-in]`
  * `Z3[Error: Not Eligible for Online Check-in]`

---

### 🧭 UI PAGE 3a: International Document Collection

* **Page Name:** `InternationalDocsPage`
* **Shown Only If:** Flight is international
* **Purpose:** Collect passport info, validate APIS/visa
* **Mermaid Nodes:**

  * `J2[Collect Passport Details]`
  * `K2[Validate APIS Requirements]`
  * `L2[Validate Visa Requirements]`
  * `M2{Visa Validation Passed?}`
  * `Z4[Error: Visa or Entry Denied]`

> 📝 This screen is **skipped for domestic** passengers

---

### 🧭 UI PAGE 3b: Optional Services (Shared)

* **Page Name:** `AncillariesPage`
* **Purpose:** Let passenger select optional services (bags, seats)
* **Mermaid Nodes:**

  * `J1[Optional: Select Seats or Bags]`
  * `N2[Optional: Select Seats or Bags]`

> 📝 Shown in both domestic and international flows

---

### 🧭 UI PAGE 4: Boarding Pass Issuance

* **Page Name:** `BoardingPassPage`
* **Purpose:** Final step — issue boarding pass, send via email, and confirm check-in
* **Mermaid Nodes:**

  * `K1[Issue Boarding Pass]` (Domestic)
  * `O2[Issue Boarding Pass]` (International)
  * `L1[Mark as Checked-in]`
  * `P2[Mark as Checked-in]`
  * `M1[Send Boarding Pass via Email or PDF]`
  * `Q2[Send Boarding Pass via Email or PDF]`
  * `N1[Show Confirmation Screen]`
  * `R2[Show Confirmation Screen]`
  * `END1([End])`, `END2([End])`

---

## ✅ Summary Table

| Page Name               | Purpose                                     | Applies To         | Nodes                               |
| ----------------------- | ------------------------------------------- | ------------------ | ----------------------------------- |
| `CheckInStartPage`      | Identify passenger via PNR or loyalty       | All passengers     | A–E, Z1                             |
| `FlightEligibilityPage` | Determine flight info, check-in eligibility | All passengers     | F–I1/I2, Z2, Z3                     |
| `InternationalDocsPage` | Collect passport, validate APIS/visa        | International only | J2–M2, Z4                           |
| `AncillariesPage`       | Optional add-ons (bags, seats)              | Optional for all   | J1, N2                              |
| `BoardingPassPage`      | Issue boarding pass and confirmation        | All passengers     | K1, O2, L1, P2, M1, Q2, N1, R2, END |

---

Qoomlee’s system uses:

* **Check-in via PNR + Last Name + rules engine**

## 🧳 2. NAVITAIRE CHECK-IN FLOW (REALISTIC)

---

### 📄 **CheckInStartPage**

**🟢 API:** `POST /api/v1/checkin/start`

```json
{
  "recordLocator": "ABC123",
  "lastName": "Doe"
}
```

Response:

```json
{
  "checkinKey": "CHK123",
  "isEligible": true,
  "journeys": [...],
  "passengers": [...]
}
```

---

### 📄 **FlightEligibilityPage**

**🟢 API:** `GET /api/v1/checkin/eligibility?checkinKey=CHK123`

Returns:

```json
{
  "isInternational": true,
  "requiresVisa": true,
  "allowedSegments": [...],
  "blockedReasonCodes": []
}
```

---

### 📄 **InternationalDocsPage**

**🟢 API:** `POST /api/v1/checkin/travel-documents`

```json
{
  "checkinKey": "CHK123",
  "passengerKey": "PAX001",
  "passport": {
    "number": "X1234567",
    "expiryDate": "2030-01-01",
    "issuingCountryCode": "TH",
    "nationality": "TH"
  },
  "visa": {
    "countryCode": "SG",
    "type": "Tourist",
    "expiryDate": "2026-01-01"
  }
}
```

---

### 📄 **AncillariesPage**

Add SSRs like seat selection or baggage (same as booking):

**🟢 API:** `POST /api/v1/checkin/services`

---

### 📄 **BoardingPassPage**

**🟢 API:** `POST /api/v1/checkin/complete`

```json
{
  "checkinKey": "CHK123",
  "passengerKeys": ["PAX001"],
  "segments": ["ZV123|BKK-SIN"],
  "delivery": {
    "method": "email",
    "email": "john@example.com"
  }
}
```

Response:

```json
{
  "status": "CheckedIn",
  "boardingPassUrl": "https://checkin.airline.com/boardingpass/ABC123.pdf"
}
```

---

## ✅ Summary: Qoomlee-Compatible APIs

| Flow     | UI Page            | API Endpoint                 | Type   |
| -------- | ------------------ | ---------------------------- | ------ |
| Booking  | Search             | `/availability/search`       | `POST` |
| Booking  | Select Flights     | `/booking/journey-selection` | `POST` |
| Booking  | Add Passenger Info | `/booking/passengers`        | `POST` |
| Booking  | Add Ancillaries    | `/booking/services`          | `POST` |
| Booking  | Payment            | `/booking/payment`           | `POST` |
| Booking  | Confirm            | `/booking/confirmation`      | `GET`  |
| Check-in | Start              | `/checkin/start`             | `POST` |
| Check-in | Eligibility        | `/checkin/eligibility`       | `GET`  |
| Check-in | Add Travel Docs    | `/checkin/travel-documents`  | `POST` |
| Check-in | Add Ancillaries    | `/checkin/services`          | `POST` |
| Check-in | Finalize & Send BP | `/checkin/complete`          | `POST` |

---
