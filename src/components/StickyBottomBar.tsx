import React from "react";

interface StickyBottomBarProps {
    onBack?: () => void;
    onContinue?: () => void;
    backText?: string;
    continueText?: string;
    isContinueDisabled?: boolean;
    isContinueLoading?: boolean;
    hideBack?: boolean;
}

export default function StickyBottomBar({
    onBack,
    onContinue,
    backText = "Back",
    continueText = "Continue",
    isContinueDisabled = false,
    isContinueLoading = false,
    hideBack = false,
}: StickyBottomBarProps) {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 md:px-8 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="max-w-5xl mx-auto w-full flex flex-col md:flex-row gap-4">
                {!hideBack && (
                    <button
                        onClick={onBack}
                        className="w-full md:w-1/2 py-4 px-6 rounded-lg font-bold text-gray-900 bg-white border-2 border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                        {backText}
                    </button>
                )}
                <button
                    onClick={onContinue}
                    disabled={isContinueDisabled || isContinueLoading}
                    className={`w-full ${hideBack ? "" : "md:w-1/2"} py-4 px-6 rounded-lg font-bold text-white transition-all transform ${isContinueDisabled || isContinueLoading
                            ? "bg-[#8BCDEA] cursor-not-allowed"
                            : "bg-[#0AA6E8] hover:bg-[#088bc2] shadow-md active:scale-[0.99]"
                        }`}
                >
                    {isContinueLoading ? "Processing..." : continueText}
                </button>
            </div>
        </div>
    );
}
