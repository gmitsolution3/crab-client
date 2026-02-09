import React from "react";

import { ShieldAlert, Globe } from "lucide-react";
import { IPStat } from "./type";

interface IpStatsTableProps {
  ipStats: IPStat[];
}

export const IpStatsTable: React.FC<IpStatsTableProps> = ({ ipStats }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden h-full">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
        <Globe className="w-5 h-5 text-indigo-500" />
        <h2 className="text-lg font-bold text-gray-800">Suspicious IP Intel</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
              <th className="px-6 py-3">IP Address</th>
              <th className="px-6 py-3">Freq</th>
              <th className="px-6 py-3">Risk %</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ipStats.map((stat, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-mono text-indigo-600">
                  {stat._id}
                </td>
                <td className="px-6 py-4 text-sm font-bold">
                  {stat.orders}{" "}
                  <span className="text-[10px] text-gray-400 font-normal">
                    orders
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${stat.avgRisk > 70 ? "bg-red-500" : "bg-amber-500"}`}
                        style={{ width: `${stat.avgRisk}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold">
                      {stat.avgRisk.toFixed(0)}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-[10px] bg-red-50 text-red-600 px-2 py-1 rounded-full font-bold hover:bg-red-600 hover:text-white transition-colors uppercase">
                    Block IP
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
