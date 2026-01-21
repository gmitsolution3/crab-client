"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import { Camera, Mail, Phone, User, Edit2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface UserData {
  email: string;
  id: string;
  name: string;
  phone: string;
  role: string;
}

interface ProfileSectionProps {
  user: UserData;
}

export function ProfileSection({ user }: ProfileSectionProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl animate-slide-in">
        <Link
          href="/"
          className="px-4 py-2 border border-primary max-w-30 my-6 rounded-lg font-bold flex justify-center hover:bg-primary hover:text-white hover:cursor-pointer"
        >
          Go Home
        </Link>

        {/* Profile Card */}
        <Card className="overflow-hidden shadow-2xl border-0 bg-white">
          {/* Header Background */}
          <div className="h-32 md:h-40 bg-linear-to-r from-primary via-primary to-[#a05305] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
          </div>

          {/* Profile Content */}
          <div className="px-4 md:px-8 pb-8">
            {/* Profile Image Section */}
            <div className="relative -mt-16 mb-6 animate-scale-in">
              <div className="relative w-32 h-32 mx-auto">
                <div className="w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center relative group">
                  {profileImage ? (
                    <Image
                      src={profileImage || "/placeholder.svg"}
                      alt={editedUser.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <User className="w-16 h-16 text-gray-400" />
                  )}

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  >
                    <Camera className="w-8 h-8 text-white" />
                  </button>
                </div>

                {/* Upload Button Badge */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary hover:bg-primary text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <Camera className="w-5 h-5" />
                </button>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  aria-label="Upload profile photo"
                />
              </div>
            </div>

            {/* User Info Section */}
            <div className="text-center mb-8 animate-fade-in">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={editedUser.name}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, name: e.target.value })
                    }
                    className="text-center text-2xl font-bold border-primary/30"
                    placeholder="Full Name"
                  />
                </div>
              ) : (
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {editedUser.name}
                </h1>
              )}
              <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium capitalize">
                {editedUser.role}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Email */}
              <div
                className="group animate-slide-in"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="p-4 rounded-lg bg-gray-50 hover:bg-primary/5 transition-colors duration-300 border border-transparent hover:border-primary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      Email
                    </span>
                  </div>
                  {isEditing ? (
                    <Input
                      value={editedUser.email}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, email: e.target.value })
                      }
                      type="email"
                      className="border-primary/30"
                      placeholder="Email address"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium text-sm break-all">
                      {editedUser.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div
                className="group animate-slide-in"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="p-4 rounded-lg bg-gray-50 hover:bg-primary/5 transition-colors duration-300 border border-transparent hover:border-primary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      Phone
                    </span>
                  </div>
                  {isEditing ? (
                    <Input
                      value={editedUser.phone}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, phone: e.target.value })
                      }
                      type="tel"
                      className="border-primary/30"
                      placeholder="Phone number"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium text-sm">
                      {editedUser.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* User ID */}
              <div
                className="group animate-slide-in md:col-span-2"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="p-4 rounded-lg bg-gray-50 hover:bg-primary/5 transition-colors duration-300 border border-transparent hover:border-primary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      User ID
                    </span>
                  </div>
                  <p className="text-gray-900 font-mono text-xs break-all">
                    {editedUser.id}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center animate-fade-in">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-primary hover:bg-primary text-white px-8 gap-2 transition-all duration-300"
                  >
                    <Check className="w-4 h-4" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/5 px-8 gap-2 bg-transparent"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-primary hover:bg-blue-700 text-white px-8 gap-2 transition-all duration-300"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Info Footer */}
        <div className="mt-6 text-center text-gray-600 text-sm animate-fade-in">
          <p>✨ Your profile information is securely stored and protected</p>
        </div>
      </div>
    </div>
  );
}
