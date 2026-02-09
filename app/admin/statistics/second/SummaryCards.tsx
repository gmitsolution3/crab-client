import React from "react";
import { Summary } from "./type";
import { SUMMARY_ICONS } from "./constants";


interface SummaryCardsProps {
  summary: Summary;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  const cards = [
    {
      label: "Total Orders",
      value: summary.totalOrders,
      icon: SUMMARY_ICONS.total,
      color: "blue",
    },
    {
      label: "Fraud Orders",
      value: summary.fraudOrders,
      icon: SUMMARY_ICONS.fraud,
      color: "red",
    },
    {
      label: "Legit Orders",
      value: summary.legitOrders,
      icon: SUMMARY_ICONS.legit,
      color: "emerald",
    },
    {
      label: "Unverified Emails",
      value: summary.unverifiedEmails,
      icon: SUMMARY_ICONS.unverified,
      color: "amber",
    },
    {
      label: "Avg Risk Score",
      value: `${summary.avgRisk.toFixed(1)}%`,
      icon: SUMMARY_ICONS.risk,
      color: "purple",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm font-medium">
              {card.label}
            </span>
            <div className={`p-2 rounded-lg bg-${card.color}-50`}>
              {card.icon}
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">{card.value}</div>
        </div>
      ))}
    </div>
  );
};
