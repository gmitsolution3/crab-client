"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { Plus, Upload } from "lucide-react";
import { SOCIAL_OPTIONS } from "./socialOptions";
import { UploadeImage } from "@/app/components/uploadeImage";
import { toast } from "sonner";
import { resumePluginState } from "next/dist/build/build-context";

type SocialLink = {
  platform: string;
  url: string;
};

type FormValues = {
  logo: FileList;
  name: string;
  phone: string;
  email: string;
  address: string;
  socials: SocialLink[];
};

const BrandForm = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      socials: [{ platform: "facebook", url: "" }],
    },
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const { fields, append } = useFieldArray({
    control,
    name: "socials",
  });

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await UploadeImage(file);

      setLogoPreview(url);
      reset();
    } catch (err) {
    } finally {
      setUploading(false);
    }
  };

  // 🔹 Submit Handler
  const onSubmit = async (data: FormValues) => {
    if (!logoPreview) return alert("Please upload a logo");

    console.log(data)
    const payload = {
      logo: logoPreview,
      name: data.name,
      phone: data.phone,
      socials: data.socials,
      email: data.email,
      address: data.address
    };
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/social`,
        payload,
      );

      console.log(result)

      toast.success("Brand information updated successfully");
      reset({
        name: "",
        phone: "",
        socials: [{ platform: "facebook", url: "" }],
      });
      setLogoPreview(null);
    } catch (error) {
      toast.error(`error: ${(error as Error).message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl space-y-5 rounded-xl border p-6 shadow-sm"
    >
      {/* Logo Upload */}
      <div>
        <label className="mb-1 block text-sm font-medium">Logo</label>
        <div>
          {uploading ? (
            <div className="flex items-center justify-center w-16 h-16 border rounded bg-gray-100">
              <div className="w-6 h-6 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
            </div>
          ) : (
            <label className="flex cursor-pointer items-center gap-2 rounded border px-3 py-2 text-sm">
              <Upload size={16} />
              Upload Logo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
            </label>
          )}
        </div>
        {logoPreview && (
          <img
            src={logoPreview}
            alt="Logo preview"
            className="mt-2 h-16 w-16 rounded object-cover border"
          />
        )}
        {errors.logo && (
          <p className="text-xs text-red-500">Logo is required</p>
        )}
      </div>

      {/* Name */}
      <div>
        <label className="mb-1 block text-sm font-medium">Name</label>
        <input
          className="w-full rounded border px-3 py-2 text-sm"
          placeholder="Brand name"
          {...register("name", { required: true })}
        />
      </div>

      {/* Phone */}
      <div>
        <label className="mb-1 block text-sm font-medium">Phone</label>
        <input
          className="w-full rounded border px-3 py-2 text-sm"
          placeholder="Phone number"
          {...register("phone", { required: true })}
        />
      </div>
      {/* email */}
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          className="w-full rounded border px-3 py-2 text-sm"
          placeholder="info@gmail.com"
          {...register("email", { required: true })}
        />
      </div>
      {/* address */}
      <div>
        <label className="mb-1 block text-sm font-medium">Address</label>
        <input
          className="w-full rounded border px-3 py-2 text-sm"
          placeholder="add your address"
          {...register("address", { required: true })}
        />
      </div>

      {/* Social Links */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">Social Links</label>

        {fields.map((field, index) => {
          const Icon =
            SOCIAL_OPTIONS.find((s) => s.value === field.platform)?.icon ||
            null;

          return (
            <div key={field.id} className="flex gap-2">
              {/* Platform Select */}
              <select
                className="w-44 rounded border px-2 py-2 text-sm"
                {...register(`socials.${index}.platform` as const)}
              >
                {SOCIAL_OPTIONS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              {/* URL Input */}
              <div className="relative flex-1">
                {Icon && (
                  <Icon className="absolute left-2 top-2.5 text-gray-400" />
                )}
                <input
                  className="w-full rounded border py-2 pl-8 pr-2 text-sm"
                  placeholder="Social link"
                  {...register(`socials.${index}.url` as const)}
                />
              </div>
            </div>
          );
        })}

        {/* Add More */}
        <button
          type="button"
          onClick={() => append({ platform: "facebook", url: "" })}
          className="flex items-center gap-1 text-sm text-primary"
        >
          <Plus size={16} />
          Add more social link
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded bg-primary py-2 text-sm text-white"
      >
        Submit
      </button>
    </form>
  );
};

export default BrandForm;
