import { Bell, Settings, LogOut, User } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      {/* Left side - Logo/Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#0970B4] flex items-center justify-center">
          <span className="text-white font-bold text-lg">A</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
          <p className="text-xs text-gray-500">E-commerce Dashboard</p>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Settings */}
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
          <Settings size={20} />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">John Admin</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#0970B4] flex items-center justify-center text-white font-semibold">
            JA
          </div>
        </div>

        {/* Logout */}
        <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition ml-2">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
