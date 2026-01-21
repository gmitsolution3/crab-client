"use client";

import { useForm } from "react-hook-form";
import { Save, Facebook } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

type FormValues = {
  fbPixelId: string;
  fbCapiToken: string;
  isEnabled: boolean;
};

export default function FacebookPixelForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/facebook-setting/credentials`,
        data,
      );

      if (!result.data.success) {
        toast.error(result.data.message);
      }

      reset();
      toast.success("Facebook settings saved successfully");
    } catch (err) {
      toast.message("Failed to save settings");
    }
  };

  return (
    <div className="max-w-7xl mx-auto grid">
      <div className="max-w-xl rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <Facebook className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Facebook Pixel Settings</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Pixel ID */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Facebook Pixel ID
            </label>
            <input
              type="text"
              placeholder="123456789012345"
              {...register("fbPixelId", { required: "Pixel ID is required" })}
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.fbPixelId && (
              <p className="mt-1 text-xs text-red-500">
                {errors.fbPixelId.message}
              </p>
            )}
          </div>

          {/* CAPI Token */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Facebook CAPI Access Token <br />
              <span className="text-xs text-gray-500">
                (Don't share it with other)
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter your CAPI token don't share it with other"
              {...register("fbCapiToken", {
                required: "CAPI token is required",
              })}
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.fbCapiToken && (
              <p className="mt-1 text-xs text-red-500">
                {errors.fbCapiToken.message}
              </p>
            )}
          </div>

          {/* Enable toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("isEnabled")}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm">Enable Facebook Tracking</span>
          </div>

          {/* Submit */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            Add Credential
          </button>
        </form>
      </div>
    </div>
  );
}
