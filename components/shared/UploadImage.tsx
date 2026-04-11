"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { FiUpload } from "react-icons/fi";
import Image from "next/image";
import { formatFileSizeMB } from "@/lib/utils";

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

interface UploadImageProps {
  avatarUrl?: string | null;
  onUpload: (file: File) => void;
  onError?: (error: Error) => void;
  accept?: string;
  disabled?: boolean;
}

const UploadImage = ({
  onUpload,
  onError,
  accept = "image/*",
  disabled = false,
}: UploadImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<{
    size: number;
    name: string;
    image: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    const input = event.target;

    if (!file) return;

    if (!isImageFile(file)) {
      input.value = "";
      setPreview(null);
      onError?.(
        new Error("Please choose an image file (JPG, PNG, WebP, or similar)."),
      );
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      input.value = "";
      setPreview(null);
      onError?.(new Error("Image must be 2 MB or smaller."));
      return;
    }

    setIsLoading(true);

    try {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;

        if (typeof result === "string") {
          setPreview({ image: result, name: file.name, size: file.size });
        }
      };
      reader.readAsDataURL(file);

      onUpload(file);
    } catch (error) {
      console.error("Error reading file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor="avatar" className="body-xs text-gray-700">
        Upload Avatar
      </Label>

      <Label className="w-full h-35 border border-gray-200 hover:border-brand-200 hover:bg-brand-100 rounded-lg py-8 cursor-pointer transition">
        <Input
          id="avatar"
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          disabled={disabled || isLoading}
          className="hidden"
        />

        {preview?.image ? (
          <div className="w-full flex items-center gap-2.5 px-10">
            <Image
              src={preview.image}
              alt="preview"
              width={54}
              height={54}
              className="w-13.5 h-13.5 rounded-full object-cover"
            />

            <div className="flex flex-col gap-0.5">
              <p className="font-normal text-xs text-gray-600">
                {preview.name}
              </p>

              <p className="text-[10px] text-gray-300">
                Size - <span>{formatFileSizeMB(preview.size)}</span>
              </p>

              <button
                type="button"
                className="w-min text-brand-500 font-medium text-[10px] underline underline-offset-3 "
              >
                Change
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <FiUpload className="text-4xl text-gray-300" />
            <p className="body-xs text-gray-500">
              Drag and drop or{" "}
              <span className="text-brand-600">Upload file</span>
            </p>
            <p className="text-gray-300 text-xs">JPG, PNG or WebP</p>
          </div>
        )}
      </Label>
    </div>
  );
};

export default UploadImage;
