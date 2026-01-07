"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  PieChart,
  LineChart,
  Line,
  Bar,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Calendar } from "lucide-react";

const BRAND_COLOR = "#0970B4";
const CHART_COLORS = [
  "#0970B4",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

// Dummy data
const dashboardMetrics = {
  totalProducts: 1240,
  totalOrders: 360,
  todayOrders: 24,
  successOrders: 245,
  cartItems: 156,
  pendingOrders: 87,
  cancelledOrders: 28,
  totalDeliveries: 245,
  sevenDayOrders: 287,
  oneMonthOrders: 1120,
  sixMonthOrders: 5420,
  oneYearOrders: 12340,
};

// Monthly trend data
const monthlyTrendData = [
  { month: "Jan", value: 820 },
  { month: "Feb", value: 920 },
  { month: "Mar", value: 850 },
  { month: "Apr", value: 1020 },
  { month: "May", value: 1150 },
  { month: "Jun", value: 980 },
  { month: "Jul", value: 1340 },
  { month: "Aug", value: 1220 },
  { month: "Sep", value: 1100 },
  { month: "Oct", value: 1450 },
  { month: "Nov", value: 1320 },
  { month: "Dec", value: 1840 },
];

// Order status
const orderStatusData = [
  { name: "Success", value: 245, color: "#0970B4" },
  { name: "Pending", value: 87, color: "#F59E0B" },
  { name: "Cancelled", value: 28, color: "#EF4444" },
];

// Delivery status
const deliveryStatusData = [
  { name: "Delivered", value: 198, color: "#10B981" },
  { name: "In Transit", value: 67, color: "#06B6D4" },
  { name: "Processing", value: 45, color: "#8B5CF6" },
];

// Top products
const topProductsData = [
  { name: "Laptop Pro", sales: 2840 },
  { name: "Mouse", sales: 2210 },
  { name: "USB Cable", sales: 2290 },
  { name: "Monitor", sales: 2000 },
  { name: "Keyboard", sales: 2181 },
];

// Category performance
const categoryData = [
  { name: "Electronics", value: 35 },
  { name: "Accessories", value: 28 },
  { name: "Software", value: 22 },
  { name: "Services", value: 15 },
];

export function AnalyticsDashboard() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Analytics
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Monitor your business performance
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200">
              <Calendar className="w-5 h-5 text-gray-400" />
              <select className="bg-white text-gray-700 text-sm font-medium outline-none">
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Grid Layout - Left Sidebar and Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* LEFT SIDEBAR - Calendar and KPI Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Mini Calendar Card */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">April</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  <div className="font-semibold text-gray-600">Sun</div>
                  <div className="font-semibold text-gray-600">Mon</div>
                  <div className="font-semibold text-gray-600">Tue</div>
                  <div className="font-semibold text-gray-600">Wed</div>
                  <div className="font-semibold text-gray-600">Thu</div>
                  <div className="font-semibold text-gray-600">Fri</div>
                  <div className="font-semibold text-gray-600">Sat</div>
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className={`p-1 ${
                        i === 14
                          ? "bg-blue-500 text-white rounded"
                          : "text-gray-700"
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* KPI Stats in Sidebar */}
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <p className="text-xs text-gray-600 mb-1">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardMetrics.totalProducts}
                </p>
                <p className="text-xs text-green-600 mt-2">
                  +12% from last month
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <p className="text-xs text-gray-600 mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardMetrics.totalOrders}
                </p>
                <p className="text-xs text-green-600 mt-2">+8 today</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <p className="text-xs text-gray-600 mb-1">Success Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardMetrics.successOrders}
                </p>
                <p className="text-xs text-blue-600 mt-2">68% fulfillment</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <p className="text-xs text-gray-600 mb-1">Cart Items</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardMetrics.cartItems}
                </p>
                <p className="text-xs text-amber-600 mt-2">Pending checkout</p>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT - Right Side */}
          <div className="lg:col-span-3 space-y-6">
            {/* Large Line Chart - Monthly Trend */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Monthly Orders Trend
                </CardTitle>
                <CardDescription>
                  Orders performance over 12 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={monthlyTrendData}>
                    <defs>
                      <linearGradient
                        id="colorLine"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={BRAND_COLOR}
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor={BRAND_COLOR}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="month"
                      stroke="#6b7280"
                      style={{ fontSize: "12px" }}
                    />
                    <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: `2px solid ${BRAND_COLOR}`,
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={BRAND_COLOR}
                      strokeWidth={3}
                      dot={{ fill: BRAND_COLOR, r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Metrics Grid - 4 columns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  label: "Today Orders",
                  value: dashboardMetrics.todayOrders,
                  color: "bg-blue-50 border-blue-200",
                },
                {
                  label: "Pending",
                  value: dashboardMetrics.pendingOrders,
                  color: "bg-yellow-50 border-yellow-200",
                },
                {
                  label: "Cancelled",
                  value: dashboardMetrics.cancelledOrders,
                  color: "bg-red-50 border-red-200",
                },
                {
                  label: "Delivered",
                  value: dashboardMetrics.totalDeliveries,
                  color: "bg-green-50 border-green-200",
                },
              ].map((metric, idx) => (
                <div
                  key={idx}
                  className={`${metric.color} p-3 rounded-lg border shadow-sm text-center`}
                >
                  <p className="text-xs text-gray-600 mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Charts Row - Pie Charts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Order Status Pie */}
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Order Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={orderStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {orderStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Delivery Status Pie */}
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Delivery Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={deliveryStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {deliveryStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Bar Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Products Bar Chart */}
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Top Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={topProductsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="name"
                        stroke="#6b7280"
                        style={{ fontSize: "12px" }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: `2px solid ${BRAND_COLOR}`,
                          borderRadius: "8px",
                        }}
                      />
                      <Bar
                        dataKey="sales"
                        fill={BRAND_COLOR}
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Performance Bar Chart */}
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Category Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={categoryData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        type="number"
                        stroke="#6b7280"
                        style={{ fontSize: "12px" }}
                      />
                      <YAxis
                        dataKey="name"
                        type="category"
                        stroke="#6b7280"
                        width={80}
                        style={{ fontSize: "12px" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: `2px solid ${BRAND_COLOR}`,
                          borderRadius: "8px",
                        }}
                      />
                      <Bar
                        dataKey="value"
                        fill={BRAND_COLOR}
                        radius={[0, 8, 8, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Time Period Stats & Market Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Time Period Stats */}
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Time Period Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      {
                        period: "7 Days",
                        value: dashboardMetrics.sevenDayOrders,
                      },
                      {
                        period: "1 Month",
                        value: dashboardMetrics.oneMonthOrders,
                      },
                      {
                        period: "6 Months",
                        value: dashboardMetrics.sixMonthOrders,
                      },
                      {
                        period: "1 Year",
                        value: dashboardMetrics.oneYearOrders,
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-2 bg-gray-50 rounded"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {item.period}
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Market Analysis */}
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Market Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Total Revenue",
                        value: "$45,230",
                        change: "+12%",
                      },
                      {
                        label: "Avg Order Value",
                        value: "$156.50",
                        change: "+5%",
                      },
                      {
                        label: "Conversion Rate",
                        value: "3.2%",
                        change: "+0.8%",
                      },
                      {
                        label: "Customer Satisfaction",
                        value: "4.8/5",
                        change: "+0.3",
                      },
                    ].map((metric, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                      >
                        <p className="text-xs text-gray-700 font-medium">
                          {metric.label}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xl font-bold text-gray-900">
                            {metric.value}
                          </p>
                          <p className="text-xs text-green-600 font-semibold">
                            {metric.change}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
