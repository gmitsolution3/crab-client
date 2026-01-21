"use client";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { ProfileSection } from "./components/ProfilePage";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    return router.push("/auth/sign-in");
  }

  if (loading) {
    <div className="h-14 w-14 rounded-full border-4 border-transparent bg-linear-to-r from-primary to-[#ac5a09] animate-spin mask-[radial-gradient(farthest-side,transparent_40%,#000_45%)]"></div>;
  }

  return (
    <div>
      <ProfileSection user={user!} />
    </div>
  );
};

export default Profile;
