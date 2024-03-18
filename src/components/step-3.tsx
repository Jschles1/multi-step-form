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
import { cn } from "@/lib/utils";
import { selectStep2Info } from "@/lib/features/step-2/step-2-slice";

function AddOn({
  label,
  description,
  price,
  value,
  onChange,
}: {
  label: string;
  description: string;
  price: string;
  value: boolean | undefined;
  onChange: () => void;
}) {
  return (
    <FormItem
      className={cn(
        "space-y-0 flex flex-row items-center rounded-lg border border-light-gray hover:border-purple p-4",
        value && "border-purple bg-lighter-gray"
      )}
    >
      <FormControl>
        <Checkbox
          className="border mr-4 md:mr-6 md:ml-2 border-light-gray data-[state=checked]:border-purple data-[state=checked]:text-white data-[state=checked]:bg-purple"
          checked={value}
          onCheckedChange={onChange}
        />
      </FormControl>
      <div className="flex-1">
        <FormLabel className="text-denim text-sm md:text-base">
          {label}
        </FormLabel>
        <FormDescription className="text-gray text-xs md:text-sm leading-[1.25rem]">
          {description}
        </FormDescription>
      </div>
      <p className="text-purple text-xs leading-[1.25rem] md:text-sm">
        {price}
      </p>
    </FormItem>
  );
}

export default function Step3() {
  const dispatch = useAppDispatch();
  const { billingType } = useAppSelector(selectStep2Info);
  const step3Info = useAppSelector(selectStep3Info);
  const form = useForm<Step3State>({
    resolver: zodResolver(step3Schema),
    defaultValues: step3Info,
  });

  function handlePreviousStep() {
    dispatch(setStep(2));
  }

  function onSubmit(values: Step3State) {
    dispatch(setInfo(values));
    dispatch(setStep(4));
  }

  const prices = {
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

  return (
    <div className="relative flex-1">
      <div className="bg-white rounded-[0.625rem] w-[calc(100%-2rem)] md:w-[calc(100%-12.5rem)] mx-auto py-8 px-[1.5rem] md:px-0 shadow-md md:shadow-none">
        <div>
          <p className="font-bold text-[1.5rem] md:text-[2rem] text-denim">
            Pick add-ons
          </p>
          <p className="text-gray leading-[1.5625rem] pb-[1.38rem] md:pb-[2.19rem]">
            Add-ons help enhance your gaming experience.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-[0.75rem] md:space-y-4"
            >
              <FormField
                control={form.control}
                name="onlineStore"
                render={({ field }) => (
                  <AddOn
                    label="Online store"
                    description="Access to multiplayer games"
                    price={prices.onlineStore[billingType]}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="largerStorage"
                render={({ field }) => (
                  <AddOn
                    label="Larger storage"
                    description="1TB storage of cloud save"
                    price={prices.largerStorage[billingType]}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="customizableProfile"
                render={({ field }) => (
                  <AddOn
                    label="Customizable profile"
                    description="Customize theme on your profile"
                    price={prices.customizableProfile[billingType]}
                    value={field.value}
                    onChange={field.onChange}
                  />
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
