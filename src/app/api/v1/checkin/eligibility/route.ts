import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const checkinKey = searchParams.get('checkinKey');

    if (!checkinKey) {
        return NextResponse.json({ error: "Missing checkinKey" }, { status: 400 });
    }

    // Assuming CHK-ABC123 is BKK-SIN which is International
    const isInternational = true; // Hardcoded mock for now

    return NextResponse.json({
        isInternational,
        requiresVisa: isInternational,
        allowedSegments: ["ZV123|BKK-SIN"],
        blockedReasonCodes: []
    });
}
