"use client";

import WizardHeader from "@/components/WizardHeader";
import { Check, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckinState, Passenger } from "@/lib/types";
import StickyBottomBar from "@/components/StickyBottomBar";
import Button from "@/components/Button";

const SelectPaxPage = () => {
    const router = useRouter();
    const [session, setSession] = useState<CheckinState | null>(null);
    const [selectedPax, setSelectedPax] = useState<string[]>([]);
    const [passengers, setPassengers] = useState<Passenger[]>([]);

    useEffect(() => {
        const data = sessionStorage.getItem("qoomlee_checkin_session");
        if (!data) {
            router.push("/Checkin");
            return;
        }

        const parsed = JSON.parse(data) as CheckinState;
        setSession(parsed);
        setPassengers(parsed.passengers || []);

        // Remove default select all
        // If they already selected pax previously in the session, restore it.
        // Otherwise, leave it empty.
        if (parsed.selectedPassengerIds && parsed.selectedPassengerIds.length > 0) {
            setSelectedPax(parsed.selectedPassengerIds);
        } else {
            setSelectedPax([]);
        }
    }, [router]);

    const togglePax = (id: string) => {
        if (selectedPax.includes(id)) {
            setSelectedPax(selectedPax.filter(p => p !== id));
        } else {
            setSelectedPax([...selectedPax, id]);
        }
    };

    const selectAll = () => {
        setSelectedPax(passengers.map(p => p.id));
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans pb-32 relative">
            <WizardHeader
                title="Check-in"
                subtitle="Select Passengers"
                step={2}
                totalSteps={5}
            />

            <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 md:py-12">
                <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Passengers</h2>
                    <p className="text-gray-600 mb-6">Choose passengers for check-in</p>

                    <div className="space-y-4">
                        {passengers.map((pax) => {
                            const isSelected = selectedPax.includes(pax.id);
                            return (
                                <div
                                    key={pax.id}
                                    onClick={() => togglePax(pax.id)}
                                    className={`relative border rounded-xl p-5 cursor-pointer transition-all duration-200 overflow-hidden ${isSelected
                                        ? "border-[#0AA6E8] bg-blue-50/30"
                                        : "border-gray-200 hover:border-gray-300 bg-white"
                                        }`}
                                >
                                    {isSelected && (
                                        <div className="absolute top-0 right-0 bg-[#0AA6E8] w-12 h-12 flex items-start justify-end p-2"
                                            style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                                        >
                                            <Check className="text-white w-4 h-4 ml-2 mb-2" />
                                        </div>
                                    )}
                                    <h3 className="text-lg font-bold text-[#003B5C] mb-3 uppercase">{pax.firstName} {pax.lastName}</h3>
                                    <div className="flex items-center space-x-3 text-sm">
                                        <span className="bg-gray-100 text-gray-600 font-semibold px-2 py-1 rounded text-xs">
                                            {pax.type}
                                        </span>
                                        <span className="text-gray-500 font-medium tracking-wide">
                                            Seat {pax.seat}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Floating Select All Button - matched to screenshot where it appears above the bottom bar */}
            {selectedPax.length < passengers.length && passengers.length > 0 && (
                <div className="fixed bottom-24 right-4 md:right-auto md:left-1/2 md:translate-x-[260px] z-40">
                    <Button
                        variant="outline"
                        onClick={selectAll}
                        className="px-5 py-2.5 text-sm space-x-2"
                    >
                        <Check className="w-4 h-4 text-gray-500" />
                        <span>Select All</span>
                    </Button>
                </div>
            )}

            {/* Sticky Bottom Bar */}
            <StickyBottomBar
                onBack={() => router.back()}
                onContinue={() => {
                    if (selectedPax.length > 0 && session) {
                        const updatedSession = { ...session, selectedPassengerIds: selectedPax };
                        sessionStorage.setItem("qoomlee_checkin_session", JSON.stringify(updatedSession));
                        router.push('/PaxInfo');
                    }
                }}
                isContinueDisabled={selectedPax.length === 0}
            />

        </div>
    );
}

export default SelectPaxPage;
