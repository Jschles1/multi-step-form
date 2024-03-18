"use client";

import Image from "next/image";
import BackgroundMobileImage from "/public/images/bg-sidebar-mobile.svg";
import BackgroundDesktopImage from "/public/images/bg-sidebar-desktop.svg";
import StepIndicator from "@/components/step-indicator";
import { useAppSelector } from "@/lib/hooks";
import { selectStep } from "@/lib/features/current-step/current-step-slice";
import Step1 from "@/components/step-1";
import Step2 from "@/components/step-2";
import Step3 from "@/components/step-3";
import Step4 from "@/components/step-4";
import Confirmation from "@/components/confirmation";

export default function Home() {
  const currentStep = useAppSelector(selectStep);

  const currentStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      default:
        return <Confirmation />;
    }
  };

  return (
    <main className="flex min-h-screen flex-col justify-between md:p-4 mx-auto relative bg-BG w-full md:justify-center">
      <div className="md:bg-white md:rounded-[0.9375rem] md:p-4 md:mx-auto md:h-[37.5rem] md:w-[58.75rem] md:shadow-md">
        <Image
          src={BackgroundMobileImage}
          alt=""
          className="absolute top-0 w-full md:hidden"
        />
        <div className="z-20 flex flex-col h-full min-h-screen md:min-h-0 md:flex-row">
          <div className="flex md:flex-col items-center justify-center md:justify-start md:items-start gap-x-4 py-[2.13rem] mx-auto relative md:px-8 md:py-10 md:gap-y-8 md:h-full">
            <Image
              src={BackgroundDesktopImage}
              alt=""
              className="hidden md:block inset-0 absolute rounded-[0.625rem]"
            />
            <StepIndicator number={1} />
            <StepIndicator number={2} />
            <StepIndicator number={3} />
            <StepIndicator number={4} />
          </div>

          {currentStepComponent()}
        </div>
      </div>
    </main>
  );
}
