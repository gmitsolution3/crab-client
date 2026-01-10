import React from "react";
import FacebookPixelForm from "../../components/facebookPixelForm";
import { getFacebookPixelCredential } from "@/lib/facebook";

const FacebookCredential = async() => {


  return (
    <div className="min-w-full mx-auto">
      <FacebookPixelForm />
    </div>
  );
};

export default FacebookCredential;
