import { Check } from "lucide-react";

interface Step {
  id: number;
  label: string;
  description: string;
}

interface BookingStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export default function BookingStepper({ steps, currentStep, onStepClick }: BookingStepperProps) {
  return (
    <div className="w-full">
      {/* Desktop: Horizontal stepper */}
      <div className="hidden sm:flex items-center justify-between w-full relative">
        {/* Connector line */}
        <div className="absolute top-4 left-0 right-0 h-px" style={{ backgroundColor: "rgba(74,108,143,0.2)", zIndex: 0 }}>
          <div
            className="h-full transition-all duration-500"
            style={{
              backgroundColor: "#4a6c8f",
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {steps.map((step) => {
          const isDone = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center gap-2 relative z-10 cursor-pointer"
              onClick={() => isDone && onStepClick?.(step.id)}
              style={{ minWidth: "80px" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 font-manrope text-sm font-700"
                style={{
                  backgroundColor: isDone ? "#4a6c8f" : isActive ? "#d9a441" : "#1e2a38",
                  border: `2px solid ${isDone ? "#4a6c8f" : isActive ? "#d9a441" : "rgba(74,108,143,0.3)"}`,
                  color: isDone ? "#fff" : isActive ? "#10151c" : "#64748b",
                  boxShadow: isActive ? "0 0 16px rgba(217,164,65,0.35)" : "none",
                }}
              >
                {isDone ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <div className="text-center">
                <div
                  className="font-sora text-xs font-600"
                  style={{ color: isActive ? "#d9a441" : isDone ? "#4a6c8f" : "#64748b" }}
                >
                  {step.label}
                </div>
                <div className="font-manrope text-[10px] hidden md:block" style={{ color: "#64748b" }}>
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: Compact current step indicator */}
      <div className="sm:hidden flex items-center gap-3 py-2">
        <div className="flex gap-1.5">
          {steps.map((step) => (
            <div
              key={step.id}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: step.id === currentStep ? "24px" : "8px",
                backgroundColor: step.id < currentStep ? "#4a6c8f" : step.id === currentStep ? "#d9a441" : "rgba(74,108,143,0.2)",
              }}
            />
          ))}
        </div>
        <span className="font-manrope text-sm" style={{ color: "#94a3b8" }}>
          Step {currentStep} of {steps.length}: <span style={{ color: "#e2e8f0" }}>{steps[currentStep - 1]?.label}</span>
        </span>
      </div>
    </div>
  );
}