import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getPriceNumber(price: string) {
  return parseInt(price.split("/")[0].replace("$", ""), 10);
}

export function convertCamelCase(s: string): string {
  let result = s.replace(/([A-Z])/g, " $1").toLowerCase();
  result = result.charAt(0).toUpperCase() + result.slice(1);
  return result;
}
