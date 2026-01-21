"use client";

import React, { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { UploadeImage } from "@/app/components/uploadeImage";

type BannerKey = "main" | "second" | "third";

const BANNER_LIMIT: Record<BannerKey, number> = {
  main: 5,
  second: 3,
  third: 3,
};

const BANNER_TITLE: Record<BannerKey, string> = {
  main: "Main Banner Images",
  second: "Second Banner Images",
  third: "Third Banner Images",
};

export const Banner = () => {
  const [banners, setBanners] = useState<Record<BannerKey, File[]>>({
    main: [],
    second: [],
    third: [],
  });

  const [previews, setPreviews] = useState<Record<BannerKey, string[]>>({
    main: [],
    second: [],
    third: [],
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBannerChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: BannerKey,
  ) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = BANNER_LIMIT[type] - banners[type].length;
    if (remaining <= 0) return;

    const selectedFiles = files.slice(0, remaining);

    setIsUploading(true);
    setUploaded(false);

    try {
      // 🔥 multiple upload
      const uploadPromises = selectedFiles.map((file) => UploadeImage(file));

      const uploadedUrls = await Promise.all(uploadPromises); // string[]

      setBanners((prev) => ({
        ...prev,
        [type]: [...prev[type], ...uploadedUrls],
      }));

      const previewUrls = selectedFiles.map((file) =>
        URL.createObjectURL(file),
      );
      setPreviews((prev) => ({
        ...prev,
        [type]: [...prev[type], ...previewUrls],
      }));

      setUploaded(true);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  // ❌ Remove image
  const removeBannerImage = (type: BannerKey, index: number) => {
    setBanners((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));

    setPreviews((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  // 🚀 HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (banners.main.length === 0) {
      alert("Main banner is required");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        mainBanner: banners.main,
        secondBanner: banners.second,
        thirdBanner: banners.third,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/banner`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const result = await res.json();

      if (!result.success) {
        alert("Failed to upload banner ❌");
        return;
      }

      alert("Banner uploaded successfully ✅");

      setBanners({ main: [], second: [], third: [] });
      setPreviews({ main: [], second: [], third: [] });
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderBanner = (type: BannerKey) => (
    <div key={type}>
      <label className="block text-sm font-medium text-gray-900 mb-3">
        {BANNER_TITLE[type]} ({banners[type].length}/{BANNER_LIMIT[type]})
      </label>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition">
        <label className="cursor-pointer">
          <div>
            {isUploading && !uploaded ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="animate-spin text-gray-400" size={32} />
                <span className="text-sm text-gray-600">Uploading...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="text-gray-400" size={32} />
                <span className="text-sm text-gray-600">
                  Click to upload or drag & drop
                </span>
              </div>
            )}
          </div>

          <input
            type="file"
            multiple
            accept="image/*"
            disabled={banners[type].length >= BANNER_LIMIT[type]}
            onChange={(e) => handleBannerChange(e, type)}
            className="hidden"
          />
        </label>
      </div>

      {previews[type].length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {previews[type].map((img, index) => (
            <div key={index} className="relative group">
              <img
                src={img}
                alt={`${type} banner ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeBannerImage(type, index)}
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 space-y-8"
    >
      {renderBanner("main")}
      {renderBanner("second")}
      {renderBanner("third")}

      <div className="flex justify-start">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-[#ad5d0c] disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="animate-spin" size={18} />}
          Save Banner
        </button>
      </div>
    </form>
  );
};
