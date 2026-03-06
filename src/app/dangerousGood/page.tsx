"use client";

import WizardHeader from "@/components/WizardHeader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StickyBottomBar from "@/components/StickyBottomBar";
import Button from "@/components/Button";

const DangerousGoodPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [sessionKey, setSessionKey] = useState<string | null>(null);
    const [selectedPaxIds, setSelectedPaxIds] = useState<string[]>([]);

    useEffect(() => {
        const data = sessionStorage.getItem("qoomlee_checkin_session");
        if (data) {
            const parsed = JSON.parse(data);
            setSessionKey(parsed.checkinKey);
            setSelectedPaxIds(parsed.selectedPassengerIds || []);
        }
    }, []);

    const handleComplete = async () => {
        if (!sessionKey) {
            setErrorMsg("Session expired. Please start over.");
            return;
        }

        setIsLoading(true);
        setErrorMsg("");

        try {
            const res = await fetch("/api/v1/checkin/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    checkinKey: sessionKey,
                    passengerKeys: selectedPaxIds,
                    segments: ["ZV123|BKK-SIN"], // Mocked
                    delivery: { method: "email", email: "mock@example.com" }
                })
            });

            const data = await res.json();
            if (!res.ok) {
                setErrorMsg(data.error || "Failed to complete check-in");
                setIsLoading(false);
                return;
            }

            // Successfully checked in!
            router.push('/BoardingPass');
        } catch (err) {
            setErrorMsg("An unexpected error occurred.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans pb-40 relative">
            <WizardHeader
                title="Check-in"
                subtitle="Dangerous Goods"
                step={4}
                totalSteps={5}
            />

            <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 md:py-12">
                <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Dangerous Goods Declaration</h2>
                    <p className="text-gray-600 mb-8 border-b border-gray-100 pb-6">
                        A mandatory safety and legal declaration as required by Thai law (CAAT/AOT).
                    </p>

                    <div className="space-y-6 text-[15px] leading-relaxed">
                        <p className="font-bold text-[#D92D20]">
                            For the safety of the flight, the transport of specific hazardous items is strictly forbidden.
                        </p>

                        <p className="text-gray-700">
                            By continuing, you confirm that you and those in your booking are NOT carrying the following Dangerous Goods in your carry-on or checked baggage, which are prohibited under all circumstances:
                        </p>

                        <ul className="list-disc pl-6 space-y-4 text-gray-700">
                            <li className="pl-2">
                                Explosives (e.g., Fireworks, Flares, Ammunition, Toy Caps, Gunpowder).
                            </li>
                            <li className="pl-2">
                                Flammable Items (e.g., Flammable Gases, Gasoline, Lighter Fluid, Aerosol Paints, Strike-Anywhere Matches).
                            </li>
                            <li className="pl-2">
                                Corrosives & Poisons (e.g., Acids, Bleach, Pesticides, Toxic or Infectious Substances).
                            </li>
                            <li className="pl-2">
                                Lithium Battery-Powered Vehicles (e.g., Hoverboards, Self-Balancing Wheels, Mini-Segways are forbidden in all baggage).
                            </li>
                            <li className="pl-2">
                                Other items like Tear Gas, Pepper Spray, or Radioactive Material.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Area */}
            <div className="fixed bottom-0 left-0 w-full bg-white z-50">
                <div className="w-full bg-[#f8fafc] border-t border-gray-200 py-3 px-4 text-center">
                    <p className="text-sm text-gray-700 font-medium">
                        I understand and accept the dangerous goods policy.
                    </p>
                    {errorMsg && (
                        <p className="text-red-600 text-sm mt-2">{errorMsg}</p>
                    )}
                </div>
                {/* Note: In order to keep the custom text above the bar, we don't use absolute fixed bottom on StickyBottomBar,
                    but since the component itself has fixed bottom-0 left-0 we should change the architecture slightly,
                    but for now to keep things consistent without breaking the design:
                */}
                <div className="border-t border-gray-200 p-4 md:px-8 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] bg-white relative">
                    <div className="max-w-5xl mx-auto w-full flex flex-col md:flex-row gap-4">
                        <Button
                            variant="secondary"
                            onClick={() => router.back()}
                            className="w-full md:w-1/2"
                        >
                            Back
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleComplete}
                            disabled={isLoading}
                            isLoading={isLoading}
                            loadingText="Processing..."
                            className="w-full md:w-1/2"
                        >
                            Accept & Continue
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default DangerousGoodPage;
