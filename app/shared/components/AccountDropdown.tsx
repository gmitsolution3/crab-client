"use client";

import Link from "next/link";
import { useState } from "react";

export default function AccountDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <h5
        onClick={() => setOpen(!open)}
        className="cursor-pointer hover:underline border px-3 py-2 text-sm rounded-lg font-bold bg-[#136481] text-white"
      >
        My Account
      </h5>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md">
          <ul className="py-2 text-sm text-gray-700">
            <Link href="/auth/sign-in">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Log in
              </li>
            </Link>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Register
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Order Tracking
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Return Policy
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
