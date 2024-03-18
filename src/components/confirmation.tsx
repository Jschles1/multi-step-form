"use client";

import Image from "next/image";
import ThankYouIcon from "/public/images/icon-thank-you.svg";

export default function Confirmation() {
  return (
    <div className="relative flex-1">
      <div className="bg-white rounded-[0.625rem] w-[calc(100%-2rem)] md:w-[calc(100%-12.5rem)] mx-auto py-8 px-[1.5rem] md:p-0 shadow-md md:shadow-none md:h-full md:flex md:items-center md:justify-center">
        <div className="flex flex-col items-center text-center">
          <Image
            src={ThankYouIcon}
            alt=""
            className="w-[3.5rem] h-[3.5rem] md:w-[5rem] md:h-[5rem] mb-6 mt-[2.94rem] md:mt-0 md:mb-8"
          />
          <p className="font-bold text-[1.5rem] md:text-[2rem] text-denim mb-[0.56rem] md:mb-[0.87rem]">
            Thank You!
          </p>
          <p className="text-gray leading-[1.5625rem] pb-[2.94rem]">
            Thanks for confirming your subscription! We hope you have fun using
            our platform. If you ever need support, please feel free to email us
            at support@loremgaming.com.
          </p>
        </div>
      </div>
    </div>
  );
}
