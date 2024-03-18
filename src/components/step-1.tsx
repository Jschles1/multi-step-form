"use client";

import step1Schema, { Step1State } from "@/lib/features/step-1/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import FormButtons from "./form-buttons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setStep } from "@/lib/features/current-step/current-step-slice";
import { setInfo, selectStep1Info } from "@/lib/features/step-1/step-1-slice";
import { cn } from "@/lib/utils";

export default function Step1() {
  const dispatch = useAppDispatch();
  const step1Info = useAppSelector(selectStep1Info);
  const form = useForm<Step1State>({
    resolver: zodResolver(step1Schema),
    defaultValues: step1Info,
  });

  function onSubmit(values: Step1State) {
    dispatch(setInfo(values));
    dispatch(setStep(2));
  }

  const hasError = Object.keys(form.formState.errors).length;

  return (
    <div className="relative flex-1">
      <div
        className={cn(
          "bg-white rounded-[0.625rem] w-[calc(100%-2rem)] md:w-[calc(100%-12.5rem)] mx-auto py-8 px-[1.5rem] md:px-0 shadow-md md:shadow-none",
          hasError && "md:pt-0"
        )}
      >
        <div>
          <p className="font-bold text-[1.5rem] md:text-[2rem] text-denim">
            Personal Info
          </p>
          <p className="text-gray leading-[1.5625rem] pb-[1.38rem]">
            Please provide your name, email address, and phone number.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Stephen King" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. stephenking@lorem.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="e.g. +1 123 456 7890"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>

      <FormButtons handleNextStep={form.handleSubmit(onSubmit)} />
    </div>
  );
}
