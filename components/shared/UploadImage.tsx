"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          setPreview(result);
        }
      };
      reader.readAsDataURL(file);

      // Pass the File object directly
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
      <Input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        disabled={disabled || isLoading}
        className="hidden"
      />

      <Button
        type="button"
        onClick={handleClick}
        disabled={disabled || isLoading}
        className="w-full"
      >
        {isLoading ? "Loading..." : "Choose Image"}
      </Button>

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
