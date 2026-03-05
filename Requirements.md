Of course. Here is a comprehensive summary of the epics, user stories, and their relationships for the Qoom Airlines integrated Booking and Check-in System.

This summary is structured as a product backlog, reflecting the current project status as of **Wednesday, September 17, 2025, 10:52 AM (Bangkok Time)**.

### **Qoom Airlines: Digital Experience Platform - Executive Summary**

**Project Vision:** To create a seamless, secure, and user-centric digital journey for Qoom Airlines passengers, from initial flight search to receiving their boarding pass. The platform is divided into two primary passenger-facing experiences: **The Booking Journey** and **The Check-in Journey**, supported by a robust and secure backend architecture.



---

### **Core Area 1: The Passenger Booking Journey**

This area covers all user interactions from searching for a flight to receiving a confirmed booking.

* #### **Epic 1: Flight Search & Selection**
    * **Goal:** Allow customers to find and choose flights that meet their travel needs.
    * **User Stories:**
        * **Story 1.1: Flight Search:** As a potential traveler, I want to search for one-way and round-trip flights based on origin, destination, and dates, so I can see my travel options.
        * **Story 1.2: View & Filter Results:** As a traveler, I want to see a clear list of available flights with prices, times, and durations, and be able to filter them, so I can make an informed decision.
        * **Story 1.3: Select Fare:** As a traveler, I want to select a specific flight and fare class (e.g., Economy, Business) to proceed with my booking.

* #### **Epic 2: Passenger & Payment Processing**
    * **Goal:** Securely capture passenger information and payment to finalize a booking.
    * **User Stories:**
        * **Story 2.1: Provide Passenger Details:** As a booker, I want to enter the required personal details (name, DOB, contact info) for all passengers in my party.
        * **Story 2.2: Secure Payment:** As a booker, I want to securely pay for my tickets using a credit card or other supported payment methods.

* #### **Epic 3: Booking Confirmation & Management**
    * **Goal:** Provide the passenger with a confirmed itinerary and the means to access it later.
    * **User Stories:**
        * **Story 3.1: Receive Confirmation:** As a passenger, I want to receive an immediate email confirmation with my full itinerary and booking details.
        * **Story 3.2 (System):** As the system, I must generate a unique 6-character alphanumeric Passenger Name Record (PNR) for every new booking to serve as the single source of truth.
        * **Story 3.3: View My Booking:** As a passenger, I want to retrieve my booking details on the website or app at a later time using my PNR and surname.

---

### **Core Area 2: The Passenger Check-in Journey**

This area covers all user interactions from the moment check-in opens until the boarding pass is issued.

* #### **Epic 4: Pre-Flight Check-in Initiation**
    * **Goal:** Proactively notify passengers and enable them to start the check-in process.
    * **User Stories:**
        * **Story 4.1: Open Check-in Notification:** As a passenger, I want to receive a push notification or email the moment check-in opens for my flight.
            * *Context:* It's 10:52 AM. The system is currently sending notifications for all Qoom flights departing from Bangkok (BKK) tomorrow, September 18, between 10:00 AM and 11:00 AM.

* #### **Epic 5: Compliant International & Domestic Check-in**
    * **Goal:** Ensure a fast check-in for domestic flights and a fully compliant document verification process for international flights.
    * **User Stories:**
        * **Story 5.1: International Document Verification:** As an international traveler (e.g., flying BKK to London), I want to submit my passport and any required visa information online to complete mandatory government and airline checks (Timatic & APIS).
        * **Story 5.2: Domestic Streamlined Check-in:** As a domestic traveler (e.g., flying BKK to Chiang Mai), I want a simplified check-in flow that does not require passport details, allowing me to proceed directly to seat selection.

* #### **Epic 6: Boarding Pass Issuance & Post-Check-in Services**
    * **Goal:** Deliver the final boarding pass and provide value-added services.
    * **User Stories:**
        * **Story 6.1: Seat Selection:** As a passenger, I want to view an interactive seat map and confirm or change my assigned seat.
        * **Story 6.2: Receive Boarding Pass:** As a passenger, I must accept the dangerous goods policy to receive my digital boarding pass, with options to save it to my mobile wallet or download a PDF.
        * **Story 6.3: Get AI Trip Insights:** As a passenger, I want to get helpful, AI-powered tips about my destination (weather, local food, attractions) right after I've checked in.

---

### **Core Area 3: System Foundations & Security**

This area covers the critical backend services and security measures that support both the Booking and Check-in journeys.

* #### **Epic 7: Secure System Architecture**
    * **Goal:** Protect passenger data and ensure high availability of the platform.
    * **User Stories:**
        * **Story 7.1: DDoS Attack Mitigation:** As the airline, we want to pre-validate check-in requests using a secure HMAC token (PNR + surname + secret key) at the API Gateway to protect our core database from being overwhelmed by malicious traffic.
        * **Story 7.2: Protect Passenger Data:** As the system, I must encrypt and securely store all Personally Identifiable Information (PII) in compliance with data protection regulations like GDPR.

* #### **Epic 8: Core Airline Microservices**
    * **Goal:** Build the foundational, reusable services that power the entire platform.
    * **User Stories:**
        * **Story 8.1 (System):** As a backend developer, I need a **Flight & Booking Service** to be the source of truth for all flight schedules, seat inventory, pricing, and passenger records (PNRs).
        * **Story 8.2 (System):** As a backend developer, I need a centralized **Notification Service** that can handle sending transactional emails (confirmations) and push notifications (check-in alerts) on behalf of other services.
