"use client";

import { selectStep } from "@/lib/features/current-step/current-step-slice";
import { useAppSelector } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const steps = {
  1: "Your Info",
  2: "Select Plan",
  3: "Add-ons",
  4: "Summary",
};

export default function StepIndicator({ number }: { number: 1 | 2 | 3 | 4 }) {
  const currentStep = useAppSelector(selectStep);
  return (
    <div className="z-30 md:flex md:items-center gap-x-4">
      <div
        className={cn(
          "w-[33px] h-[33px] font-bold text-[0.875rem] flex items-center justify-center rounded-full text-white border-white border ",
          (currentStep === number || (number === 4 && currentStep === 5)) &&
            "text-denim bg-sky-blue border-sky-blue"
        )}
      >
        {number}
      </div>
      <div className="hidden md:block">
        <p className="text-light-blue text-xs uppercase">Step {number}</p>
        <p className="text-white text-sm font-bold tracking-[0.0625rem] uppercase">
          {steps[number]}
        </p>
      </div>
    </div>
  );
}
