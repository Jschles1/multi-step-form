import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { setStep } from "@/lib/features/current-step/current-step-slice";

interface FormButtonsProps {
  handlePreviousStep?: () => void;
  handleNextStep?: () => void;
}

export default function FormButtons({
  handlePreviousStep,
  handleNextStep,
}: FormButtonsProps) {
  const dispatch = useAppDispatch();

  function handleConfirm() {
    dispatch(setStep(5));
  }

  return (
    <div className="bg-white w-full absolute bottom-0 md:left-[6.25rem] flex items-center justify-between p-4 mt-6 md:mt-[2.75rem] md:w-[calc(100%-12.5rem)] md:mx-auto md:px-0">
      <Button
        variant="ghost"
        className={cn(
          "text-gray hover:text-denim",
          !handlePreviousStep && "invisible"
        )}
        onClick={handlePreviousStep}
      >
        Go Back
      </Button>
      {handleNextStep ? (
        <Button
          variant="default"
          type="submit"
          className="text-white bg-denim justify-self-end"
          onClick={handleNextStep}
        >
          Next Step
        </Button>
      ) : (
        <Button
          variant="default"
          type="submit"
          className="text-white bg-purple hover:bg-[#928CFF] focus:bg-[#928CFF] justify-self-end"
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      )}
    </div>
  );
}
