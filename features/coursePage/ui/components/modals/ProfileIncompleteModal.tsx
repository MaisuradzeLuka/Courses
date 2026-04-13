"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserRound } from "lucide-react";
import Image from "next/image";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompleteProfile: () => void;
};

const ProfileIncompleteModal = ({
  open,
  onOpenChange,
  onCompleteProfile,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md border-gray-200 bg-gray-50 p-12"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-col items-center">
          <div className="">
            <Image src="/user-large.png" alt="user" width={90} height={90} />
          </div>

          <DialogTitle className="heading-2 text-center text-gray-700 mt-6">
            Complete your profile to continue
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="body-l mx-auto max-w-[360px] text-center text-gray-600 mb-10">
          You need to complete your profile before enrolling in this course.
        </DialogDescription>

        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-12 border-2 border-brand-300 text-brand-500 cursor-pointer"
            onClick={() => {
              onOpenChange(false);
              onCompleteProfile();
            }}
          >
            Complete Profile
          </Button>
          <Button
            type="button"
            className="h-12 bg-brand-500 text-gray-50 hover:bg-brand-600 cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileIncompleteModal;
