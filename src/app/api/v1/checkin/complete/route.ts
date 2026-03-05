import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { checkinKey, passengerKeys, segments, delivery } = body;

        // Validate request
        if (!checkinKey || !passengerKeys || passengerKeys.length === 0) {
            return NextResponse.json({ error: "Invalid complete checkin request" }, { status: 400 });
        }

        return NextResponse.json({
            status: "CheckedIn",
            boardingPassUrl: `https://qoomlee.com/boardingpass/${checkinKey}.pdf`
        });

    } catch (error) {
        return NextResponse.json({ error: "Server error finalizing checkin" }, { status: 500 });
    }
}
