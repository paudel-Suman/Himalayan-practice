"use client";
import { apiClient } from "@/lib/apiClient";
import React, { useState, ChangeEvent } from "react";
import Cookies from "js-cookie";
import { MESSAGES } from "@/constants/messages";
import { API_ROUTES } from "@/constants/apiRoute";
import { S3UploadResponse } from "@/types/s3upload";
import Image from "next/image";
type S3UploadFormProps = {
  multiple?: boolean;
  isrequired?: boolean;
  id: string;
  onUploadComplete?: (urls: string[]) => void;
};

const S3UploadForm: React.FC<S3UploadFormProps> = ({
  multiple = false,
  isrequired = false,
  id,
  onUploadComplete,
}) => {
  const [urls, setUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = multiple ? Array.from(files) : [files[0]];
    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("folder", "uploads/flag");
    formData.append("multiple", multiple.toString());
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      setIsUploading(true);
      const token = Cookies.get("token");
      if (!token) {
        throw new Error(MESSAGES.TOKEN.TOKEN_NOT_FOUND);
      }
      const res = await apiClient<S3UploadResponse>(API_ROUTES.S3.S3_UPLOAD, {
        method: "POST",
        body: formData,
        token,
      });

      let newUrls: string[] = [];

      if (multiple && Array.isArray(res.data)) {
        newUrls = res.data;
        setUrls(res.data);
      } else if (!multiple && res.data) {
        newUrls = res.data;
        setUrls(res.data);
      } else {
        setUrls([]);
      }

      if (onUploadComplete) {
        onUploadComplete(newUrls);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="w-full">
        <label
          htmlFor={id}
          className="cursor-pointer inline-block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Choose File(s)
        </label>
        <input
          id={id}
          type="file"
          multiple={multiple}
          onChange={handleUpload}
          className="hidden"
          required={isrequired}
        />
      </div>
      {urls.length > 0 && (
        <div>
          <p>Uploaded File{urls.length > 1 ? "s" : ""}:</p>
          {urls.map((url, index) => (
            <Image
              key={index}
              src={url}
              alt={`Uploaded ${index}`}
              width={150}
              height={150}
            />
          ))}
        </div>
      )}

      {isUploading && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <svg
            className="animate-spin h-5 w-5 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default S3UploadForm;
