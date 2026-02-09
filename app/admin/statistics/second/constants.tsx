import React from "react";
import {
  AlertTriangle,
  ShieldCheck,
  Globe,
  MousePointer2,
  Activity,
  Users,
  MailWarning,
} from "lucide-react";

export const RISK_THRESHOLDS = {
  HIGH: 80,
  MEDIUM: 50,
};

export const getRiskColor = (score: number) => {
  if (score >= RISK_THRESHOLDS.HIGH)
    return "text-red-600 bg-red-50 border-red-200";
  if (score >= RISK_THRESHOLDS.MEDIUM)
    return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-emerald-600 bg-emerald-50 border-emerald-200";
};

export const getRiskLevel = (score: number) => {
  if (score >= RISK_THRESHOLDS.HIGH) return "High";
  if (score >= RISK_THRESHOLDS.MEDIUM) return "Medium";
  return "Low";
};

export const formatTime = (ms: number) => {
  if (ms < 1000) return `${ms}ms`;
  const seconds = (ms / 1000).toFixed(1);
  return `${seconds}s`;
};

export const SUMMARY_ICONS = {
  total: <Activity className="w-5 h-5 text-blue-600" />,
  fraud: <AlertTriangle className="w-5 h-5 text-red-600" />,
  legit: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
  unverified: <MailWarning className="w-5 h-5 text-amber-600" />,
  risk: <Activity className="w-5 h-5 text-purple-600" />,
};
