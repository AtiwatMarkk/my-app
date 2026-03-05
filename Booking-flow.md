# Booking flow

So, if you’re booking with a typical airline:

Booking up to 8 passengers under one PNR is generally safe for “individual” booking rules in many systems.

As soon as you hit 9 or more, you may enter group booking territory (with special rules).

```mermaid flowchart LR

%% START
A[Start Booking] --> B[Search Flights]

%% SEARCH
B --> C{Trip Type}
C --> C1[One-way] --> D[Enter Origin, Destination, Date]
C --> C2[Round-trip] --> D

D --> E[Search Available Flights]
E --> F{Flights Found?}
F -- No --> Z1[Error: No Flights Available] --> B
F -- Yes --> G[Display Available Flights]

%% FARE SELECTION
G --> H[Select Outbound Flight]
C2 --> I[Select Return Flight]
H --> J[Select Fare Family]

%% PASSENGER INFO
J --> K[Enter Passenger Details]

%% DOMESTIC vs INTERNATIONAL
K --> L{Domestic or International?}
L -- Domestic --> M1[Skip Passport Info]
L -- International --> M2[Collect Passport Details]

M1 --> N[Add Optional Services]
M2 --> N

%% OPTIONALS
N --> O[Select Bags / Seats / Meals Optional]
O --> P[Review Itinerary & Price]

%% PAYMENT
P --> Q[Enter Payment Info]
Q --> R[Process Payment]
R --> S{Payment Successful?}
S -- No --> Z2[Error: Payment Failed] --> Q
S -- Yes --> T[Booking Confirmed]

%% CONFIRMATION
T --> U[Generate PNR]
U --> V[Send Confirmation Email/SMS]
V --> W[Show Booking Confirmation Screen]
W --> END([End])
```


Perfect — now let’s group the **airline booking flow** into **UI pages/screens**, reflecting a typical **user journey** through a web or mobile app. This will help you map each **Mermaid node** to a **dedicated page** or **modular component** for design and development.

---

## ✅ UI Page Grouping for Complete Booking Flow

We’ll use **sections** to group nodes by logical UI steps, and give each one a **Page Name**, **Description**, and corresponding **Mermaid nodes**.

---

### 🧭 UI PAGE 1: Flight Search

* **Page Name:** `SearchPage`
* **Purpose:** Allow user to define trip type, origin, destination, dates, passengers
* **Mermaid Nodes:**

  * `A[Start Booking]`
  * `B[Search Flights]`
  * `C{Trip Type}`
  * `C1[One-way]`, `C2[Round-trip]`
  * `D[Enter Origin, Destination, Date]`

---

### 🧭 UI PAGE 2: Flight Results

* **Page Name:** `FlightSelectionPage`
* **Purpose:** Show available flights, allow selection of outbound (and return if round-trip), and fare family
* **Mermaid Nodes:**

  * `E[Search Available Flights]`
  * `F{Flights Found?}`
  * `Z1[Error: No Flights Available]` (can be a modal or inline error)
  * `G[Display Available Flights]`
  * `H[Select Outbound Flight]`
  * `I[Select Return Flight]` (only for round-trip)
  * `J[Select Fare Family]`

---

### 🧭 UI PAGE 3: Passenger Details

* **Page Name:** `PassengerDetailsPage`
* **Purpose:** Collect names, contact info, and travel documents
* **Mermaid Nodes:**

  * `K[Enter Passenger Details]`
  * `L{Domestic or International?}`
  * `M1[Skip Passport Info]`
  * `M2[Collect Passport Details]`

> 📝 For international flights, the page shows passport/visa input. For domestic, it's hidden or skipped.

---

### 🧭 UI PAGE 4: Optional Services

* **Page Name:** `AncillarySelectionPage`
* **Purpose:** Add optional bags, seats, meals, or bundles
* **Mermaid Nodes:**

  * `N[Add Optional Services]`
  * `O[Select Bags / Seats / Meals (Optional)]`

> 📝 Optional step — skip button should be available.

---

### 🧭 UI PAGE 5: Review Booking

* **Page Name:** `ReviewPage`
* **Purpose:** Summarize itinerary, passenger data, total price before payment
* **Mermaid Nodes:**

  * `P[Review Itinerary & Price]`

---

### 🧭 UI PAGE 6: Payment

* **Page Name:** `PaymentPage`
* **Purpose:** Collect and process payment info securely
* **Mermaid Nodes:**

  * `Q[Enter Payment Info]`
  * `R[Process Payment]`
  * `S{Payment Successful?}`
  * `Z2[Error: Payment Failed]` (can be modal or alert)

---

### 🧭 UI PAGE 7: Booking Confirmation

* **Page Name:** `ConfirmationPage`
* **Purpose:** Confirm booking success, show PNR, next steps, boarding instructions
* **Mermaid Nodes:**

  * `T[Booking Confirmed]`
  * `U[Generate PNR]`
  * `V[Send Confirmation Email/SMS]`
  * `W[Show Booking Confirmation Screen]`
  * `END([End])`

---

## 🧩 Summary Table

| Page Name                | Purpose                     | Mermaid Nodes        |
| ------------------------ | --------------------------- | -------------------- |
| `SearchPage`             | Enter trip details          | A, B, C, C1, C2, D   |
| `FlightSelectionPage`    | View and select flights     | E, F, Z1, G, H, I, J |
| `PassengerDetailsPage`   | Add passenger info          | K, L, M1, M2         |
| `AncillarySelectionPage` | Select extras               | N, O                 |
| `ReviewPage`             | Review before payment       | P                    |
| `PaymentPage`            | Enter and confirm payment   | Q, R, S, Z2          |
| `ConfirmationPage`       | Show booking result and PNR | T, U, V, W, END      |


---

the system uses:

* **Flight search & availability APIs**
* **Session-based booking flow** (BookingKey, JourneyKey, etc.)
* **Structured passenger/segment references**
* **Add SSRs, Seats, Baggage**
* **Finalize booking with payment**

---

## ✈️ 1. BOOKING FLOW (REALISTIC)

---

### 📄 **SearchPage**

**🟢 API:** `POST /api/v1/availability/search`

```json
{
  "journeys": [
    {
      "origin": "BKK",
      "destination": "SIN",
      "departureDate": "2025-10-10"
    }
  ],
  "returnDate": "2025-10-15",
  "paxCounts": {
    "ADT": 1,
    "CHD": 0,
    "INF": 0
  },
  "currencyCode": "THB",
  "channel": "Web"
}
```

**Response includes:**

```json
{
  "journeys": [
    {
      "journeyKey": "ZV123|20251010|BKK-SIN",
      "segments": [...],
      "fares": [...]
    }
  ]
}
```

---

### 📄 **FlightSelectionPage**

**🟢 API:** `POST /api/v1/booking/journey-selection`

```json
{
  "bookingKey": "temp-session-key",
  "selectedJourneys": [
    {
      "journeyKey": "ZV123|20251010|BKK-SIN",
      "fareKey": "VALUE_123"
    },
    {
      "journeyKey": "ZV124|20251015|SIN-BKK",
      "fareKey": "VALUE_124"
    }
  ]
}
```

---

### 📄 **PassengerDetailsPage**

**🟢 API:** `POST /api/v1/booking/passengers`

```json
{
  "bookingKey": "temp-session-key",
  "passengers": [
    {
      "passengerTypeCode": "ADT",
      "firstName": "John",
      "lastName": "Doe",
      "gender": "M",
      "dob": "1990-01-01",
      "travelDocuments": [
        {
          "typeCode": "P",
          "number": "X1234567",
          "expiryDate": "2030-01-01",
          "issuingCountryCode": "TH"
        }
      ],
      "contact": {
        "email": "john@example.com",
        "phone": "+66123456789"
      }
    }
  ]
}
```

---

### 📄 **AncillarySelectionPage**

**🟢 API:** `POST /api/v1/booking/services`

Add Baggage / Seats / Meals:

```json
{
  "bookingKey": "temp-session-key",
  "services": [
    {
      "serviceCode": "BG20",
      "segmentKey": "ZV123|BKK-SIN",
      "passengerKey": "PAX001"
    },
    {
      "serviceCode": "SEAT_12A",
      "segmentKey": "ZV123|BKK-SIN",
      "passengerKey": "PAX001"
    }
  ]
}
```

> Use `GET /api/v1/catalog/services` to retrieve available ancillaries by segment.

---

### 📄 **ReviewPage**

**🟢 API:** `GET /api/v1/booking/summary?bookingKey=...`

Returns full fare breakdown, passenger list, taxes, SSRs, etc.

---

### 📄 **PaymentPage**

**🟢 API:** `POST /api/v1/booking/payment`

```json
{
  "bookingKey": "temp-session-key",
  "paymentMethod": {
    "type": "CreditCard",
    "cardNumber": "4111111111111111",
    "expiryMonth": "12",
    "expiryYear": "2030",
    "cvv": "123",
    "cardHolderName": "John Doe"
  },
  "billingAddress": {
    "country": "TH"
  }
}
```

---

### 📄 **ConfirmationPage**

**🟢 API:** `GET /api/v1/booking/confirmation?bookingKey=...`

Returns:

```json
{
  "pnr": "ABC123",
  "bookingStatus": "Confirmed",
  "passengers": [...],
  "itinerary": [...],
  "boardingPassEligibility": true
}
```

