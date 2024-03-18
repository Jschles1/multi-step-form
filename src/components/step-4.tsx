"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import FormButtons from "./form-buttons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setStep } from "@/lib/features/current-step/current-step-slice";
import { setInfo, selectStep3Info } from "@/lib/features/step-3/step-3-slice";
import step3Schema, { Step3State } from "@/lib/features/step-3/schema";
import { Checkbox } from "./ui/checkbox";
import { capitalize, cn, convertCamelCase, getPriceNumber } from "@/lib/utils";
import { selectStep2Info } from "@/lib/features/step-2/step-2-slice";
import { Separator } from "./ui/separator";

export default function Step4() {
  const dispatch = useAppDispatch();
  const { billingType, plan } = useAppSelector(selectStep2Info);
  const step3Info = useAppSelector(selectStep3Info);

  function changePlan() {
    dispatch(setStep(2));
  }

  function handlePreviousStep() {
    dispatch(setStep(3));
  }

  const planPrices = {
    arcade: {
      monthly: "$9/mo",
      yearly: "$90/yr",
    },
    advanced: {
      monthly: "$12/mo",
      yearly: "$120/yr",
    },
    pro: {
      monthly: "$15/mo",
      yearly: "$150/yr",
    },
  };

  const addOnPrices = {
    onlineStore: {
      monthly: "$1/mo",
      yearly: "$10/yr",
    },
    largerStorage: {
      monthly: "$2/mo",
      yearly: "$20/yr",
    },
    customizableProfile: {
      monthly: "$2/mo",
      yearly: "$20/yr",
    },
  };

  let total = getPriceNumber(planPrices[plan][billingType]);

  const addOns = Object.keys(step3Info)
    .map((addOn: string) => {
      const key = addOn as keyof typeof step3Info;
      if (step3Info[key]) {
        total += getPriceNumber(addOnPrices[key][billingType]);
        return [convertCamelCase(key), addOnPrices[key][billingType]];
      } else {
        return null;
      }
    })
    .filter((addOn) => addOn);

  const totalString = `Total (per ${
    billingType === "monthly" ? "month" : "year"
  })`;
  const totalAmountString = `+$${total}/${
    billingType === "monthly" ? "mo" : "yr"
  }`;

  return (
    <div className="relative flex-1">
      <div className="bg-white rounded-[0.625rem] w-[calc(100%-2rem)] md:w-[calc(100%-12.5rem)] mx-auto py-8 px-[1.5rem] md:px-0 shadow-md md:shadow-none">
        <div>
          <p className="font-bold text-[1.5rem] text-denim md:text-[2rem]">
            Finishing up
          </p>
          <p className="text-gray leading-[1.5625rem] pb-[1.38rem] md:pb-[2.19rem]">
            Double-check everything looks OK before confirming.
          </p>
        </div>
        <div className="p-4 bg-lighter-gray rounded-lg md:px-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-denim md:text-base">
                {capitalize(plan)} ({capitalize(billingType)})
              </p>
              <a
                role="button"
                onClick={changePlan}
                className="text-gray text-sm underline leading-5 hover:text-purple focus:text-purple"
              >
                Change
              </a>
            </div>
            <p className="font-bold">{planPrices[plan][billingType]}</p>
          </div>
          {!!addOns.length && (
            <Separator className="my-3 bg-gray opacity-20 md:mt-6 md:mb-4" />
          )}
          <div className="flex flex-col gap-y-3 md:gap-y-4">
            {addOns.map(
              (addOn) =>
                addOn && (
                  <div
                    key={addOn[0]}
                    className="flex items-center gap-y-3 justify-between"
                  >
                    <p className="text-gray text-sm leading-5">{addOn[0]}</p>
                    <p className="text-denim text-sm leading-5">+{addOn[1]}</p>
                  </div>
                )
            )}
          </div>
        </div>
        <div className="flex items-center justify-between pt-6 px-4">
          <p className="text-gray text-sm leading-5">{totalString}</p>
          <p className="text-purple font-bold leading-5 md:text-xl">
            {totalAmountString}
          </p>
        </div>
      </div>

      <FormButtons handlePreviousStep={handlePreviousStep} />
    </div>
  );
}
