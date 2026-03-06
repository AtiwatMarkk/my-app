"use client";

import Navbar from "@/components/Navbar";
import {
    CheckCircle2,
    MapPin,
    Clock,
    ArrowRight,
    Briefcase
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const CheckinPage = () => {
    const [lastName, setLastName] = useState("");
    const [pnr, setPnr] = useState("");
    const router = useRouter();

    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isFormValid = lastName.trim().length > 0 && pnr.trim().length > 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        if (isFormValid) {
            setIsLoading(true);
            try {
                const res = await fetch("/api/v1/checkin/start", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        pnr: pnr.trim(),
                        lastName: lastName.trim()
                    })
                });

                const data = await res.json();

                if (!res.ok) {
                    setErrorMsg(data.error || "Failed to retrieve booking");
                    setIsLoading(false);
                    return;
                }

                // Save to session storage to pass to next pages
                sessionStorage.setItem("qoomlee_checkin_session", JSON.stringify(data));

                router.push("/SelectPax");
            } catch (err) {
                setErrorMsg("An unexpected error occurred. Please try again.");
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#F4F7F9] font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-[#0AA6E8] text-white py-12 md:py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Online Check-in</h1>
                <p className="text-xl md:text-2xl mb-2 font-medium">Fly Smart. Fly Qoomlee.</p>
                <p className="text-sm md:text-base text-blue-100">Check in online and save time at the airport</p>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col lg:flex-row gap-6">

                {/* Left Column (Forms) */}
                <div className="flex-1 space-y-6">

                    {/* Form Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Retrieve Your Booking</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Your last name"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0AA6E8] focus:border-[#0AA6E8] outline-none transition-all placeholder:text-gray-400 text-gray-900"
                                />
                            </div>

                            <div>
                                <label htmlFor="pnr" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Booking reference (PNR)
                                </label>
                                <input
                                    id="pnr"
                                    type="text"
                                    value={pnr}
                                    onChange={(e) => setPnr(e.target.value)}
                                    placeholder="ABC123 OR 1234567890123"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0AA6E8] focus:border-[#0AA6E8] outline-none transition-all placeholder:text-gray-400 uppercase text-gray-900"
                                />
                            </div>

                            {errorMsg && (
                                <div className="p-3 bg-red-50 text-red-700 text-sm font-semibold rounded-lg border border-red-100 mb-4 text-center">
                                    {errorMsg}
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={!isFormValid}
                                isLoading={isLoading}
                                loadingText="Searching..."
                                className="w-full text-lg"
                            >
                                Retrieve Booking
                            </Button>
                        </form>

                        <div className="mt-8 bg-blue-50/50 rounded-lg p-4 border border-blue-100">
                            <p className="text-sm text-gray-600">
                                <span className="font-bold text-[#0AA6E8]">Tip:</span> Online check-in opens 24 hours before departure and closes 2 hours before departure.
                            </p>
                        </div>
                    </div>

                    {/* Secondary Cards in Left Column (Status & Baggage) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0AA6E8]">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Flight Status</h3>
                            </div>
                            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                Track your flight in real-time. Get updates on departure, arrival, gate changes, and delays.
                            </p>
                            <Link href="#" className="inline-flex items-center text-sm font-bold text-[#0AA6E8] hover:text-[#088bc2] transition-colors group">
                                Check Status <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0AA6E8]">
                                    <Briefcase className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Baggage Rules</h3>
                            </div>
                            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                Economy: 1 carry-on (7kg) + checked (23kg).<br />
                                Business: 2 carry-ons + 2 checked bags (32kg each).
                            </p>
                            <Link href="#" className="inline-flex items-center text-sm font-bold text-[#0AA6E8] hover:text-[#088bc2] transition-colors group">
                                Learn More <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-[350px]">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="w-10 h-10 rounded-full bg-[#0AA6E8] flex items-center justify-center text-white">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Travel Tips</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-[#0AA6E8] mr-3 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Arrive Early</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">Arrive 2-3 hours before international flights, 1-2 hours for domestic.</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-[#0AA6E8] mr-3 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Valid Documents</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">Ensure your passport is valid for 6 months beyond your travel dates.</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-[#0AA6E8] mr-3 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Mobile Boarding</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">Download your boarding pass to your phone for quick access.</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-[#0AA6E8] mr-3 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Pack Smart</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">Keep liquids in containers ≤100ml and place in a clear bag.</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-[#0AA6E8] mr-3 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Stay Informed</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">Check visa requirements and travel advisories for your destination.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <p className="text-xs text-gray-500 mb-2">Need help? Contact our 24/7 support team</p>
                            <p className="text-[#0AA6E8] font-bold text-lg">+1-800-QOOMLEE</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default CheckinPage;
