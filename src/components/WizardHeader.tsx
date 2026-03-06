import { X } from "lucide-react";
import Link from "next/link";

interface WizardHeaderProps {
    title: string;
    subtitle: string;
    step: number;
    totalSteps: number;
}

const WizardHeader = ({ title, subtitle, step, totalSteps }: WizardHeaderProps) => {
    const progressPercentage = (step / totalSteps) * 100;

    return (
        <div className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <div className="flex flex-col pt-4">
                <div className="flex items-center justify-between px-4 md:px-8 max-w-5xl mx-auto w-full mb-4">
                    <div className="flex items-start space-x-4">
                        <Link href="/Checkin" className="mt-0.5 text-gray-500 hover:text-gray-900 transition-colors">
                            <X className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="font-bold text-gray-900 leading-tight">{title}</h1>
                            <p className="text-sm text-gray-500">{subtitle}</p>
                        </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-500">
                        Step {step} of {totalSteps}
                    </div>
                </div>
                <div className="w-full bg-blue-50/50 h-1">
                    <div
                        className="bg-[#0AA6E8] h-full rounded-r-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

export default WizardHeader;
