"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IoWarningOutline } from "react-icons/io5";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
  onProceed: () => void | Promise<void>;
  isPending?: boolean;
  schedule: string;
};

const ConflictModal = ({
  open,
  onOpenChange,
  message,
  onProceed,
  isPending,
  schedule,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md border-gray-200 bg-gray-50 p-8"
        showCloseButton
      >
        <DialogHeader className="flex flex-col items-center">
          <IoWarningOutline className="size-18 text-warning" />

          <DialogTitle className="heading-2 text-gray-700 my-6">
            Enrollment conflict
          </DialogTitle>
        </DialogHeader>

        <p className="body-l max-w-[300px] text-center text-gray-700 font-normal! mx-auto">
          You are already enrolled in{" "}
          <span className="heading-4">"{message}"</span> with the same schedule:{" "}
          <span className="font-semibold">{schedule}</span>
        </p>

        <div className="max-w-[360px] w-full mx-auto grid grid-cols-2 gap-2">
          <Button
            disabled={isPending}
            onClick={onProceed}
            variant="outline"
            className="border-2 border-brand-300 text-brand-500! text-medium h-14 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue Anyway
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            className=" bg-brand-500 text-gray-50 hover:bg-brand-600 h-14 cursor-pointer font-medium"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConflictModal;
