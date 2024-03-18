"use client";

import Image from "next/image";
import step2Schema, { Step2State } from "@/lib/features/step-2/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import FormButtons from "./form-buttons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setStep } from "@/lib/features/current-step/current-step-slice";
import { selectStep2Info, setInfo } from "@/lib/features/step-2/step-2-slice";
import { Switch } from "./ui/switch";
import { cn } from "@/lib/utils";
import IconArcard from "/public/images/icon-arcade.svg";
import IconAdvanced from "/public/images/icon-advanced.svg";
import IconPro from "/public/images/icon-pro.svg";

function PlanOption({
  name,
  currentPlan,
  image,
  billingType,
  monthlyPrice,
  yearlyPrice,
  onClick,
}: {
  name: string;
  currentPlan: string;
  image: string;
  billingType: "monthly" | "yearly";
  monthlyPrice: string;
  yearlyPrice: string;
  onClick: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      className={cn(
        "px-4 pt-[1.06rem] md:pt-[1.25rem] pb-[1.25rem] md:pb-4 rounded-lg border border-light-gray hover:border-purple flex items-center gap-x-[0.88rem] md:block md:w-[8.625rem]",
        currentPlan === name.toLowerCase() && "border-purple bg-lighter-gray"
      )}
    >
      <Image src={image} alt={name} />
      <div className="md:pt-[2.44rem]">
        <p className="text-denim">{name}</p>
        <p className="text-gray text-sm leading-5">
          {billingType === "monthly" ? monthlyPrice : yearlyPrice}
        </p>
        {billingType === "yearly" && (
          <p className="text-denim text-[0.75rem] leading-5">2 months free</p>
        )}
      </div>
    </div>
  );
}

export default function Step2() {
  const dispatch = useAppDispatch();
  const step2Info = useAppSelector(selectStep2Info);
  const form = useForm<Step2State>({
    resolver: zodResolver(step2Schema),
    defaultValues: step2Info,
  });
  const billingType = form.watch("billingType");
  const currentPlan = form.watch("plan");

  function handleCheckedChange() {
    form.setValue(
      "billingType",
      billingType === "monthly" ? "yearly" : "monthly"
    );
  }

  function setPlan(plan: "arcade" | "advanced" | "pro") {
    form.setValue("plan", plan);
  }

  function handlePreviousStep() {
    dispatch(setStep(1));
  }

  function onSubmit(values: Step2State) {
    dispatch(setInfo(values));
    dispatch(setStep(3));
  }

  return (
    <div className="relative flex-1">
      <div className="bg-white rounded-[0.625rem] w-[calc(100%-2rem)] md:w-[calc(100%-12.5rem)] mx-auto py-8 px-[1.5rem] md:pb-[3.06rem] md:px-0 shadow-md md:shadow-none">
        <div>
          <p className="font-bold text-[1.5rem] md:text-[2rem] text-denim">
            Select Your Plan
          </p>
          <p className="text-gray leading-[1.5625rem] pb-[1.38rem] md:pb-[2.19rem]">
            You have the option of monthly or yearly billing.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-y-4 md:flex-row md:gap-y-0 md:gap-x-[1.12rem] md:justify-between">
                <PlanOption
                  currentPlan={currentPlan}
                  billingType={billingType}
                  name="Arcade"
                  monthlyPrice="$9/mo"
                  yearlyPrice="$90/year"
                  image={IconArcard}
                  onClick={() => setPlan("arcade")}
                />
                <PlanOption
                  currentPlan={currentPlan}
                  billingType={billingType}
                  name="Advanced"
                  monthlyPrice="$12/mo"
                  yearlyPrice="$120/year"
                  image={IconAdvanced}
                  onClick={() => setPlan("advanced")}
                />
                <PlanOption
                  currentPlan={currentPlan}
                  billingType={billingType}
                  name="Pro"
                  monthlyPrice="$15/mo"
                  yearlyPrice="$150/year"
                  image={IconPro}
                  onClick={() => setPlan("pro")}
                />
              </div>

              <FormField
                control={form.control}
                name="billingType"
                render={({ field }) => (
                  <FormItem className="bg-lighter-gray py-[0.875rem] px-[3.5rem] rounded-lg">
                    <FormControl>
                      <div className="flex items-center justify-between md:justify-center md:gap-x-6">
                        <p
                          className={cn(
                            "text-sm text-gray",
                            billingType === "monthly" && "text-denim"
                          )}
                        >
                          Monthly
                        </p>
                        <Switch
                          checked={field.value === "yearly"}
                          onCheckedChange={handleCheckedChange}
                        />
                        <p
                          className={cn(
                            "text-sm text-gray",
                            billingType === "yearly" && "text-denim"
                          )}
                        >
                          Yearly
                        </p>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>

      <FormButtons
        handlePreviousStep={handlePreviousStep}
        handleNextStep={form.handleSubmit(onSubmit)}
      />
    </div>
  );
}
