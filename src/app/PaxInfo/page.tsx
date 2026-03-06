"use client";

import WizardHeader from "@/components/WizardHeader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import StickyBottomBar from "@/components/StickyBottomBar";
import { CheckinState, Passenger } from "@/lib/types";

const PaxInfoPage = () => {
    const router = useRouter();
    const [session, setSession] = useState<CheckinState | null>(null);
    const [selectedPassengers, setSelectedPassengers] = useState<Passenger[]>([]);
    const [isInternational, setIsInternational] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const data = sessionStorage.getItem("qoomlee_checkin_session");
        if (!data) {
            router.push("/Checkin");
            return;
        }

        const parsed = JSON.parse(data) as CheckinState;
        setSession(parsed);

        const selectedIds = parsed.selectedPassengerIds || [];
        const filteredPax = (parsed.passengers || []).filter(p => selectedIds.includes(p.id));
        setSelectedPassengers(filteredPax);

        // Fetch eligibility rules
        const checkEligibility = async () => {
            try {
                const res = await fetch(`/api/v1/checkin/eligibility?checkinKey=${parsed.checkinKey}`);
                const eligData = await res.json();
                if (res.ok) {
                    setIsInternational(eligData.isInternational);
                }
            } catch (err) {
                console.error("Failed to check eligibility");
            } finally {
                setIsLoading(false);
            }
        };

        checkEligibility();
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <Loader2 className="w-10 h-10 animate-spin text-[#0AA6E8] mb-4" />
                    <p className="font-semibold text-[#003B5C]">Loading passenger details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans pb-32 relative">
            <WizardHeader
                title="Check-in"
                subtitle="Passenger Details"
                step={3}
                totalSteps={5}
            />

            <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 md:py-12">
                <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Passenger Details</h2>
                    <p className="text-gray-600 mb-8">
                        Enter required information for each passenger
                    </p>

                    <form className="space-y-6">
                        {selectedPassengers.map((pax, index) => (
                            <div key={pax.id} className="border border-gray-200 rounded-xl p-5 md:p-6 bg-white">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase">
                                    {index + 1}. {pax.firstName} {pax.lastName}
                                </h3>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Nationality
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={index === 0 ? "TH" : "US"}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0AA6E8] focus:border-[#0AA6E8] outline-none transition-all text-gray-900"
                                            required
                                        />
                                    </div>



                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <div className="flex gap-3">
                                            <div className="relative w-32 flex-shrink-0">
                                                <select className="w-full appearance-none px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0AA6E8] focus:border-[#0AA6E8] outline-none transition-all bg-white text-gray-900" title="region">
                                                    <option value="+66">🇹🇭 +66</option>
                                                    <option value="+1">🇺🇸 +1</option>
                                                    <option value="+44">🇬🇧 +44</option>
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                            </div>
                                            <input
                                                type="tel"
                                                defaultValue={index === 0 ? "811234567" : "5551234567"}
                                                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0AA6E8] focus:border-[#0AA6E8] outline-none transition-all text-gray-900"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </form>
                </div>
            </div>

            {/* Sticky Bottom Bar */}
            <StickyBottomBar
                onBack={() => router.back()}
                onContinue={() => router.push('/dangerousGood')}
            />

        </div>
    );
}

export default PaxInfoPage;
