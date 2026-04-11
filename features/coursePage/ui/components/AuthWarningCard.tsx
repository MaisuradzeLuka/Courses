"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, MoveRight } from "lucide-react";

type Props = {
  title: string;
  description: string;
  btnLabel: string;
  onAction?: () => void;
};

const AuthWarningCard = ({ title, description, btnLabel, onAction }: Props) => {
  return (
    <div className="flex items-center justify-between gap-6 rounded-xl border border-gray-200 bg-gray-50 px-6 py-5">
      <div className="flex flex-col min-w-0 items-start gap-4 max-w-[280px]">
        <div className="flex items-center gap-1.5">
          <AlertTriangle
            className="size-5 shrink-0 text-warning"
            aria-hidden
            strokeWidth={2}
          />
          <h3 className="body-s text-gray-800">{title}</h3>
        </div>

        <p className="text-xs text-gray-400">{description}</p>
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={onAction}
        className="shrink-0 gap-1.5 px-3 py-5 border border-brand-600 text-brand-600 bg-brand-50 cursor-pointer"
      >
        {btnLabel}
        <MoveRight className="size-4" aria-hidden />
      </Button>
    </div>
  );
};

export default AuthWarningCard;
