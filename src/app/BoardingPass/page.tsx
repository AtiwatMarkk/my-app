"use client";

import WizardHeader from "@/components/WizardHeader";
import { Plane } from "lucide-react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { CheckinState, Passenger } from "@/lib/types";
import StickyBottomBar from "@/components/StickyBottomBar";

export default function BoardingPassPage() {
    const router = useRouter();
    const [selectedPassengers, setSelectedPassengers] = useState<Passenger[]>([]);
    const [pnr, setPnr] = useState<string>("");

    useEffect(() => {
        const data = sessionStorage.getItem("qoomlee_checkin_session");
        if (!data) {
            router.push("/Checkin");
            return;
        }

        const parsed = JSON.parse(data) as CheckinState;

        // PNR is derived from checkinKey e.g. "CHK-ABC123" -> "ABC123"
        setPnr(parsed.checkinKey.replace("CHK-", ""));

        const selectedIds = parsed.selectedPassengerIds || [];
        const filteredPax = (parsed.passengers || []).filter(p => selectedIds.includes(p.id));
        setSelectedPassengers(filteredPax);
    }, [router]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans pb-32 relative">
            <WizardHeader
                title="Check-in"
                subtitle="Boarding Pass"
                step={5}
                totalSteps={5}
            />

            <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 space-y-8">
                {selectedPassengers.map((pass, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden border border-gray-100">
                        {/* Header */}
                        <div className="bg-[#0AA6E8] px-6 py-5 flex items-center justify-between text-white">
                            <div className="flex items-center space-x-2">
                                <Plane className="w-6 h-6" />
                                <h1 className="text-xl font-bold tracking-tight">Qoomlee</h1>
                            </div>
                            <span className="font-semibold text-sm">Boarding Pass</span>
                        </div>

                        {/* Passenger Info & Gate */}
                        <div className="p-6 md:p-8 space-y-8">
                            <div className="flex flex-wrap justify-between items-start gap-4">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Passenger</p>
                                    <h2 className="text-2xl font-bold text-gray-900 leading-tight">{pass.firstName} {pass.lastName}</h2>
                                    <p className="text-sm text-gray-500 font-medium mt-1 uppercase">{pass.type} • PNR: {pnr}</p>
                                </div>
                                <div className="flex space-x-6 text-center">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Terminal</p>
                                        <p className="text-2xl font-bold text-gray-900">1</p>
                                    </div>
                                    <div className="w-px bg-gray-200" />
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Gate</p>
                                        <p className="text-2xl font-bold text-gray-900">40</p>
                                    </div>
                                </div>
                            </div>

                            {/* Flight Route */}
                            <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl p-4 md:p-6 text-center">
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 mb-2 min-h-[32px] flex items-center justify-center">Suvarnabhumi Airport, Bangkok</p>
                                    <h3 className="text-4xl text-[#009AE5] font-bold mb-2">BKK</h3>
                                    <p className="text-xs font-medium text-gray-500">19 Feb 2026</p>
                                </div>

                                <div className="flex-1 px-4 relative flex flex-col items-center">
                                    <div className="w-full absolute top-1/2 -translate-y-1/2 border-t-2 border-dashed border-gray-300 z-0"></div>
                                    <div className="bg-slate-50 px-2 rounded-full relative z-10 flex flex-col items-center">
                                        <Plane className="w-6 h-6 text-[#0AA6E8] rotate-45 mb-1" />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 bg-slate-100 px-2 py-0.5 rounded mt-2">QL123</span>
                                </div>

                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 mb-2 min-h-[32px] flex items-center justify-center">Changi International Airport, Singapore</p>
                                    <h3 className="text-4xl text-[#009AE5] font-bold mb-2">SIN</h3>
                                    <p className="text-xs font-medium text-gray-500">20 Feb 2026</p>
                                </div>
                            </div>

                            {/* 4 Info Blocks */}
                            <div className="grid grid-cols-4 gap-2">
                                <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center">
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Seat</p>
                                    <p className="text-lg font-bold text-gray-900">{pass.seat}</p>
                                </div>
                                <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center">
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Zone</p>
                                    <p className="text-lg font-bold text-gray-900">1</p>
                                </div>
                                <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center">
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Seq</p>
                                    <p className="text-lg font-bold text-gray-900">0{23 + index}</p>
                                </div>
                                <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center">
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Boarding</p>
                                    <p className="text-lg font-bold text-[#0AA6E8]">21:14</p>
                                </div>
                            </div>

                            {/* Times */}
                            <div className="flex justify-between bg-slate-50 border border-slate-100 rounded-lg p-4 px-6 relative">
                                <div className="w-px bg-slate-200 absolute left-1/2 top-4 bottom-4" />
                                <div className="w-1/2 pr-4">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Departure</p>
                                    <p className="text-2xl font-bold text-gray-900 mb-1">
                                        14:54 <span className="text-sm text-gray-400 font-semibold ml-1">UTC</span>
                                    </p>
                                    <p className="text-xs font-medium text-gray-500">Thu • 19 Feb 2026</p>
                                </div>
                                <div className="w-1/2 pl-6">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Arrival</p>
                                    <p className="text-2xl font-bold text-gray-900 mb-1">
                                        17:54 <span className="text-sm text-gray-400 font-semibold ml-1">UTC</span>
                                    </p>
                                    <p className="text-xs font-medium text-gray-500">Fri • 20 Feb 2026</p>
                                </div>
                            </div>

                        </div>

                        {/* Barcode Segment */}
                        <div className="border-t-2 border-dashed border-gray-200 relative px-6 py-8 bg-slate-50">
                            {/* Semi-circles on the edge for boarding pass effect */}
                            <div className="absolute -left-3 -top-3 w-6 h-6 bg-[#F8FAFC] rounded-full border-r border-[#eaecf0] shadow-inner" />
                            <div className="absolute -right-3 -top-3 w-6 h-6 bg-[#F8FAFC] rounded-full border-l border-[#eaecf0] shadow-inner" />

                            <div className="flex flex-col items-center">
                                {/* Simulated Barcode */}
                                <div className="h-16 w-full max-w-sm flex items-center justify-between overflow-hidden opacity-90 mb-3 px-4">
                                    {Array.from({ length: 45 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="bg-black h-full"
                                            style={{
                                                width: `${Math.random() * 4 + 1}px`,
                                                marginRight: `${Math.random() * 2 + 1}px`
                                            }}
                                        />
                                    ))}
                                </div>
                                <p className="text-[11px] text-gray-500 font-medium">Scan at security and boarding gate</p>
                            </div>

                            {/* Apple Wallet Button */}
                            <div className="mt-8">
                                <button className="w-full bg-black text-white rounded-lg py-4 flex items-center justify-center space-x-3 hover:bg-gray-900 transition-colors">
                                    <svg viewBox="0 0 32 23" fill="none" className="w-8 h-6">
                                        <rect x="1" y="1" width="30" height="21" rx="3" fill="#FFEACB" />
                                        <rect x="1" y="1" width="30" height="21" rx="3" fill="white" fillOpacity="0.8" />
                                        <path d="M1 8H31V16H1V8Z" fill="#3B82F6" />
                                        <path d="M1 16H31V21C31 22.1046 30.1046 23 29 23H3C1.89543 23 1 22.1046 1 21V16Z" fill="#10B981" />
                                        <path d="M1 4C1 2.34315 2.34315 1 4 1H28C29.6569 1 31 2.34315 31 4V8H1V4Z" fill="#EF4444" />
                                        <rect x="7" y="10" width="18" height="4" rx="2" fill="white" />
                                    </svg>
                                    <span className="font-bold">Add to Apple Wallet</span>
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            {/* Sticky Bottom Bar */}
            <StickyBottomBar
                onContinue={() => router.push('/')}
                continueText="Done"
                hideBack={true}
            />

        </div>
    );
}
