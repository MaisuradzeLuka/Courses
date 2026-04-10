"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { FiUpload } from "react-icons/fi";

interface UploadImageProps {
  avatarUrl?: string | null;
  onUpload: (file: File) => void;
  accept?: string;
  disabled?: boolean;
}

const UploadImage = ({
  avatarUrl,
  onUpload,
  accept = "image/*",
  disabled = false,
}: UploadImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(avatarUrl || null);
  const [fileName, setFileName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setIsLoading(true);
    setFileName(file.name);

    try {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          setPreview(result);
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

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor="avatar" className="body-xs text-gray-700">
        Upload Avatar
      </Label>

      <Label className="w-full h-35 flex flex-col items-center justify-center gap-2 border border-gray-200 hover:border-brand-200 hover:bg-brand-100 rounded-lg py-8 cursor-pointer transition">
        <Input
          id="avatar"
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          disabled={disabled || isLoading}
          className="hidden"
        />

        <FiUpload className="text-4xl text-gray-300" />
        <p className="body-xs text-gray-500">
          Drag and drop or <span className="text-brand-600">Upload file</span>
        </p>
        <p className="text-gray-300 text-xs">JPG, PNG or WebP</p>
      </Label>

      {fileName && (
        <p className="text-sm text-gray-600">Selected: {fileName}</p>
      )}

      {preview && (
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
