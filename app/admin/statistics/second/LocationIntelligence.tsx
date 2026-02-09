import React from "react";

import { MapPin, Map, AlertCircle } from "lucide-react";
import { LocationMismatch } from "./type";

interface LocationIntelligenceProps {
  mismatches: LocationMismatch[];
}

export const LocationIntelligence: React.FC<LocationIntelligenceProps> = ({
  mismatches,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-2">
          <Map className="w-5 h-5 text-emerald-500" />
          <h2 className="text-lg font-bold text-gray-800">
            Location Inconsistency Detector
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded border border-red-100">
          <AlertCircle className="w-3 h-3" />
          Mismatch adds +30 Risk Score
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mismatches.map((item) => (
            <div
              key={item._id}
              className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-indigo-200 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-indigo-600">
                  {item.customerIp}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.FakeOrderStatus === "FRAUD" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}
                >
                  {item.FakeOrderStatus}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-700">
                    GPS Signal: {item.source}
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono">
                    Lat: {item.lat} / Lng: {item.lng}
                  </div>
                  <div className="mt-2 text-xs text-red-600 font-bold bg-white px-2 py-1 rounded border border-red-500/20 inline-block">
                    Mismatch Detected
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
