// "use client";

// import { ComLogo } from "@/app/shared/components/ComLogo";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export function AdminSidebar() {
//   const pathname = usePathname();

//   const menu = [
//     { name: "Dashboard", href: "/admin" },
//     { name: "Users", href: "/admin/users" },
//     { name: "Products", href: "/admin/products" },
//   ];

//   return (
//     <aside className="w-64 bg-white border-r">
//       <div className="p-4 font-bold text-lg">Admin Panel</div>

//       <div className="p-4 border-b border-gray-300 mb-4">
//         <ComLogo/>
//       </div>

//       <nav className="space-y-1">
//         {menu.map((item) => (
//           <Link
//             key={item.href}
//             href={item.href}
//             className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
//               pathname === item.href ? "bg-gray-100 font-semibold" : ""
//             }`}
//           >
//             {item.name}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Package,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { ComLogo } from "@/app/shared/components/ComLogo";

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<number | null>(null);

  const menu = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    {
      name: "Products",
      icon: Package,
      submenu: [
        { name: "All Product", href: "/admin/products/all-product" },
        { name: "Add Product", href: "/admin/products/add-product" },
        { name: "Manage Product", href: "/admin/products/manage-product" },
        { name: "Draft Product", href: "/admin/products/draft-product" },
        { name: "Deleted Product", href: "/admin/products/deleted-product" },
      ],
    },
    {
      name: "Settings",
      icon: Settings,
      submenu: [
        { name: "General", href: "/admin/settings/general" },
        { name: "Payment", href: "/admin/settings/payment" },
        { name: "Shipping", href: "/admin/settings/shipping" },
      ],
    },
  ];

  const toggleSubmenu = (index: number) => {
    setExpandedMenu(expandedMenu === index ? null : index);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#0970B4] text-white rounded-lg hover:bg-blue-700 transition"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 lg:relative w-64 h-screen bg-white border-r border-gray-200 shadow-lg lg:shadow-none transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="w-full flex justify-center mt-12 border-b border-b-gray-300">
          <ComLogo />
        </div>

        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0970B4] flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Admin</h2>
              <p className="text-xs text-gray-500">Control Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-200px)]">
          {menu.map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(index)}
                    className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-200 rounded-lg transition"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${
                        expandedMenu === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedMenu === index && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.href}
                          href={subitem.href}
                          onClick={() => setIsOpen(false)}
                          className={`block px-4 py-2 text-sm rounded-lg transition ${
                            pathname === subitem.href
                              ? "bg-[#0970B4] text-white font-semibold"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    pathname === item.href
                      ? "bg-[#0970B4] text-white font-semibold shadow-md"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Footer Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition font-medium">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
