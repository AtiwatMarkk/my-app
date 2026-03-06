import React from "react";
import Button from "./Button"; interface StickyBottomBarProps {
    onBack?: () => void;
    onContinue?: () => void;
    backText?: string;
    continueText?: string;
    isContinueDisabled?: boolean;
    isContinueLoading?: boolean;
    hideBack?: boolean;
}

const StickyBottomBar = ({
    onBack,
    onContinue,
    backText = "Back",
    continueText = "Continue",
    isContinueDisabled = false,
    isContinueLoading = false,
    hideBack = false,
}: StickyBottomBarProps) => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 md:px-8 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="max-w-5xl mx-auto w-full flex flex-col md:flex-row gap-4">
                {!hideBack && (
                    <Button
                        variant="secondary"
                        onClick={onBack}
                        className="w-full md:w-1/2"
                    >
                        {backText}
                    </Button>
                )}
                <Button
                    variant="primary"
                    onClick={onContinue}
                    disabled={isContinueDisabled}
                    isLoading={isContinueLoading}
                    loadingText="Processing..."
                    className={`w-full ${hideBack ? "" : "md:w-1/2"}`}
                >
                    {continueText}
                </Button>
            </div>
        </div>
    );
}

export default StickyBottomBar;
