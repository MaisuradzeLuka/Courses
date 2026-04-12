"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseTitle: string;
};

const EnrollementConfirmation = ({
  open,
  onOpenChange,
  courseTitle,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md border-gray-200 bg-gray-50 p-8"
        showCloseButton
      >
        <DialogHeader className="flex flex-col items-center">
          <Image
            src="/Modal_Icons.svg"
            alt=""
            width={94}
            height={94}
            unoptimized
          />

          <DialogTitle className="heading-2 text-gray-700 my-4">
            Enrollment confirmed
          </DialogTitle>
        </DialogHeader>

        <p className="body-l max-w-[320px] text-center text-gray-700 font-normal mx-auto">
          You've successfully enrolled in{" "}
          <span className="font-semibold text-gray-800">
            &quot;{courseTitle}&quot;
          </span>{" "}
          Course!
        </p>

        <DialogClose
          render={
            <Button
              type="button"
              className="w-full mt-6 py-6 bg-brand-500 hover:bg-brand-600 text-gray-50 rounded-lg text-[16px] font-medium cursor-pointer"
            />
          }
        >
          Got it
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollementConfirmation;
