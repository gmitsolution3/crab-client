import React from "react";

import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Monitor,
  Smartphone,
} from "lucide-react";
import { FakeOrderStatus, RiskOrder } from "./type";
import { formatTime, getRiskColor, getRiskLevel } from "./constants";

interface RiskOrdersTableProps {
  orders: RiskOrder[];
}

export const RiskOrdersTable: React.FC<RiskOrdersTableProps> = ({ orders }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-500" />
          Recent Risk Intelligence
        </h2>
        <span className="text-xs text-gray-500 font-mono">Live Monitoring</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-4">Order ID / Created</th>
              <th className="px-6 py-4">IP Address</th>
              <th className="px-6 py-4">Risk Level</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Behavior Summary</th>
              <th className="px-6 py-4 text-right">Device</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => {
              const riskColor = getRiskColor(order.riskScore);
              const totalTime = order.paths.reduce(
                (acc: number, p: typeof order.paths[0]) => acc + p.timeSpent,
                0,
              );
              const totalClicks = order.paths.reduce(
                (acc: number, p: typeof order.paths[0]) => acc + p.clicks,
                0,
              );

              return (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-800 font-mono truncate w-32">
                      {order._id}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-700">
                      {order.customerIp}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${riskColor}`}
                    >
                      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current"></span>
                      {order.riskScore}% {getRiskLevel(order.riskScore)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {order.FakeOrderStatus === FakeOrderStatus.FRAUD ? (
                      <span className="text-red-600 bg-red-100 px-2 py-1 rounded text-xs font-black tracking-tighter">
                        FRAUD
                      </span>
                    ) : (
                      <span className="text-emerald-600 bg-emerald-100 px-2 py-1 rounded text-xs font-black tracking-tighter uppercase">
                        Legit
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {order.isEmailVerified ? (
                      <div className="flex items-center text-emerald-600 text-xs font-medium">
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Verified
                      </div>
                    ) : (
                      <div className="flex items-center text-amber-600 text-xs font-medium">
                        <XCircle className="w-4 h-4 mr-1" /> Unverified
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="text-xs text-gray-500">
                        <span className="font-semibold text-gray-700">
                          {formatTime(totalTime)}
                        </span>{" "}
                        spent
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[10px] bg-gray-100 px-1 rounded">
                          {totalClicks} clicks
                        </span>
                        <span className="text-[10px] bg-gray-100 px-1 rounded">
                          {order.paths.length} routes
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 text-gray-400 group-hover:text-gray-600">
                      {order.screen.width > 800 ? (
                        <Monitor className="w-4 h-4" />
                      ) : (
                        <Smartphone className="w-4 h-4" />
                      )}
                      <span className="text-xs">
                        {order.screen.width}x{order.screen.height}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
