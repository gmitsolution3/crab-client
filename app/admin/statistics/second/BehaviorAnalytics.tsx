import React from "react";
import { MousePointer2, Clock, ScrollText, Bot } from "lucide-react";
import { Behavior } from "./type";

interface BehaviorAnalyticsProps {
  behaviors: Behavior[];
}

export const BehaviorAnalytics: React.FC<BehaviorAnalyticsProps> = ({
  behaviors,
}) => {
  const calculateBotScore = (b: Behavior) => {
    let score = 0;
    // Red flags based on user requirements
    if (b.totalTime < 10000) score += 40; // less than 10s
    if (b.avgScroll < 20) score += 30; // shallow scroll
    if (b.totalClicks === 0) score += 20; // no clicks
    if (b.totalMouse < 10) score += 10; // low mouse movement
    return score;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden h-full">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
        <Bot className="w-5 h-5 text-purple-500" />
        <h2 className="text-lg font-bold text-gray-800">
          Behavior Fingerprints
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
              <th className="px-6 py-3">IP / ID</th>
              <th className="px-6 py-3">Metrics</th>
              <th className="px-6 py-3">Bot Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {behaviors.map((b, idx) => {
              const botScore = calculateBotScore(b);
              return (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono">{b._id}</td>
                  <td className="px-6 py-4">
                    <div className="grid grid-cols-2 gap-y-1 gap-x-3 text-[10px] text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />{" "}
                        {(b.totalTime / 1000).toFixed(1)}s
                      </div>
                      <div className="flex items-center gap-1">
                        <ScrollText className="w-3 h-3" />{" "}
                        {b.avgScroll.toFixed(0)}%
                      </div>
                      <div className="flex items-center gap-1">
                        <MousePointer2 className="w-3 h-3" /> {b.totalClicks}{" "}
                        clicks
                      </div>
                      <div className="flex items-center gap-1 font-bold text-gray-700">
                        {" "}
                        {b.totalMouse} mvmts
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`text-sm font-black ${botScore > 60 ? "text-red-600" : "text-emerald-600"}`}
                    >
                      {botScore > 60 ? "PROBABLE BOT" : "HUMAN"}
                      <div className="text-[10px] font-normal text-gray-400">
                        Score: {botScore}/100
                      </div>
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
