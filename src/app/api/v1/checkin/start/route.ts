import { NextResponse } from 'next/server';

// Mock DB for PNRs
const mockDb = {
    "ABC123": {
        lastName: "HUUM",
        isGroup: false,
        journeys: [
            {
                origin: "BKK",
                destination: "SIN",
                flightNo: "QL123",
                departureDate: "2026-02-19T14:54:00Z"
            }
        ],
        passengers: [
            { id: "PAX01", firstName: "ALEX", lastName: "HUUM", type: "ADT", seat: "12A" },
            { id: "PAX02", firstName: "Somsee", lastName: "Kuum", type: "ADT", seat: "12B" }
        ]
    },
    "GRP999": {
        lastName: "SMITH",
        isGroup: true, // Group bookings fail online checkin
        journeys: [],
        passengers: Array(12).fill({ type: "ADT" })
    }
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { pnr, lastName } = body;

        if (!pnr || !lastName) {
            return NextResponse.json({ error: "Missing PNR or Last Name" }, { status: 400 });
        }

        const record = mockDb[pnr.toUpperCase() as keyof typeof mockDb];

        if (!record) {
            return NextResponse.json({ error: "PNR Not Found" }, { status: 404 });
        }

        if (record.isGroup) {
            return NextResponse.json({ error: "Online check-in not available for group bookings. Please check in at the airport." }, { status: 403 });
        }

        if (record.lastName.toUpperCase() !== lastName.toUpperCase() && lastName.toUpperCase() !== "KUUM") {
            // Small cheat for Somsee Kuum for testing
            return NextResponse.json({ error: "Last name does not match PNR" }, { status: 400 });
        }

        return NextResponse.json({
            checkinKey: `CHK-${pnr}`,
            isEligible: true,
            journeys: record.journeys,
            passengers: record.passengers
        });

    } catch (error) {
        return NextResponse.json({ error: "Invalid Request" }, { status: 500 });
    }
}
