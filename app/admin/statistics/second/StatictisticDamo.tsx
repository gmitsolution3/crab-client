"use client"

import React, { useState, useEffect } from "react";

// Added Clock to the imports from lucide-react
import {
  Shield,
  LayoutDashboard,
  Settings,
  Menu,
  Bell,
  User,
  Clock,
} from "lucide-react";
import { ApiResponse, FraudData } from "./type";
import { SummaryCards } from "./SummaryCards";
import { RiskOrdersTable } from "./RiskOrdersTable";
import { IpStatsTable } from "./IpStatsTable";
import { BehaviorAnalytics } from "./BehaviorAnalytics";
import { LocationIntelligence } from "./LocationIntelligence";

// Mock data based on the user's provided schema
const MOCK_DATA: ApiResponse = {
  success: true,
  message: "Statistics data make",
  data: {
    summary: {
      _id: null,
      totalOrders: 12,
      fraudOrders: 7,
      legitOrders: 5,
      unverifiedEmails: 7,
      avgRisk: 68.33,
    },
    riskOrders: [
      {
        _id: "698881a36e8624da1eec0b2a",
        createdAt: "2026-02-08T12:29:23.124Z",
        customerIp: "192.168.1.45",
        riskScore: 100,
        FakeOrderStatus: "FRAUD" as any,
        isEmailVerified: false,
        screen: {
          width: 1745,
          height: 866,
          ratio: 1.1,
          orientation: "landscape-primary",
        },
        paths: [
          {
            route: "/checkout",
            timeSpent: 5000,
            scrollDepth: 10,
            mouseMoves: 5,
            clicks: 0,
            touch: 0,
            lastVisit: "2026-02-09",
          },
        ],
      },
      {
        _id: "698884a1de76cf26a9a530c3",
        createdAt: "2026-02-08T12:42:09.382Z",
        customerIp: "45.22.112.9",
        riskScore: 15,
        FakeOrderStatus: "LEGIT" as any,
        isEmailVerified: true,
        screen: {
          width: 412,
          height: 915,
          ratio: 2.2,
          orientation: "portrait-primary",
        },
        paths: [
          {
            route: "/checkout",
            timeSpent: 45000,
            scrollDepth: 85,
            mouseMoves: 140,
            clicks: 8,
            touch: 140,
            lastVisit: "2026-02-09",
          },
        ],
      },
      {
        _id: "69887a6333b53210e9091404",
        createdAt: "2026-02-08T11:58:27.067Z",
        customerIp: "103.55.22.1",
        riskScore: 85,
        FakeOrderStatus: "FRAUD" as any,
        isEmailVerified: false,
        screen: {
          width: 1920,
          height: 1080,
          ratio: 1,
          orientation: "landscape-primary",
        },
        paths: [
          {
            route: "/admin",
            timeSpent: 9000,
            scrollDepth: 5,
            mouseMoves: 8,
            clicks: 0,
            touch: 0,
            lastVisit: "2026-02-09",
          },
        ],
      },
    ],
    ipStats: [
      { _id: "192.168.1.45", orders: 4, avgRisk: 95, fraudCount: 4 },
      { _id: "103.55.22.1", orders: 2, avgRisk: 75, fraudCount: 1 },
    ],
    behavior: [
      {
        _id: "192.168.1.45",
        totalTime: 5000,
        avgScroll: 10,
        totalClicks: 0,
        totalMouse: 5,
      },
      {
        _id: "45.22.112.9",
        totalTime: 120000,
        avgScroll: 90,
        totalClicks: 15,
        totalMouse: 540,
      },
    ],
    locationMismatch: [
      {
        _id: "69887a6333b53210e9091404",
        customerIp: "103.55.22.1",
        riskScore: 85,
        FakeOrderStatus: "FRAUD" as any,
        source: "GPS",
        lat: 23.81,
        lng: 90.36,
      },
    ],
  },
};

const StatisticDemo = ({ FSdata }: { FSdata: FraudData }) => {
  const [data, setData] = useState<FraudData | null>(null);

  useEffect(() => {
    setData(FSdata);
  }, []);

  if (!data)
    return (
      <div className="flex h-screen items-center justify-center font-bold text-indigo-600 animate-pulse">
        Initializing GuardVision...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex">
    

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-400 mx-auto overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Fraud Statistics
            </h1>
            <p className="text-gray-500 font-medium">
              Real-time risk intelligence and intervention monitoring
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2">
              <Clock className="w-4 h-4" /> Past 24 Hours
            </button>
            <button className="px-4 py-2 bg-indigo-600 rounded-xl text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
              Export Intelligence
            </button>
          </div>
        </header>

        {/* 1. Summary Cards */}
        <section className="mb-8">
          <SummaryCards summary={data.summary} />
        </section>

        {/* 2. Main Risk Orders Table */}
        <section className="mb-8">
          <RiskOrdersTable orders={data.riskOrders} />
        </section>

        {/* 3 & 4. Grid Section for IP and Behavior */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <section>
            <IpStatsTable ipStats={data.ipStats} />
          </section>
          <section>
            <BehaviorAnalytics behaviors={data.behavior} />
          </section>
        </div>

        {/* 5. Location Mismatch Detector */}
        <section className="mb-8">
          <LocationIntelligence mismatches={data.locationMismatch} />
        </section>

        <footer className="mt-12 text-center text-gray-400 text-xs border-t border-gray-200 pt-8 pb-4 font-medium uppercase tracking-widest">
          &copy; 2026 GuardVision Security System &bull; Intelligent Fraud
          Intervention Engine
        </footer>
      </main>
    </div>
  );
};

export default StatisticDemo;
