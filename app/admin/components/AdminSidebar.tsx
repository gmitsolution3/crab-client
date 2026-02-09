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
  ChartNoAxesGantt,
  ListTodo,
} from "lucide-react";
import { ComLogo } from "@/app/shared/components/ComLogo";
import { AiOutlineProduct } from "react-icons/ai";
import Image from "next/image";

export function AdminSidebar({ brandInfo }: { brandInfo: any }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<number | null>(null);

  const menu = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    {
      name: "Order",
      icon: ChartNoAxesGantt,
      submenu: [
        { name: "All Order", href: "/admin/order/all-order" },
        { name: "Manage Order", href: "/admin/order/manage-order" },
      ],
    },
    {
      name: "Category",
      icon: Package,
      submenu: [
        { name: "All Category", href: "/admin/category" },
        { name: "Add Category", href: "/admin/category/add-category" },
      ],
    },
    {
      name: "Products",
      icon: AiOutlineProduct,
      submenu: [
        { name: "All Product", href: "/admin/products/all-product" },
        { name: "Add Product", href: "/admin/products/add-product" },
        { name: "Manage Product", href: "/admin/products/manage-product" },
        { name: "Draft Product", href: "/admin/products/draft-product" },
        { name: "Deleted Product", href: "/admin/products/deleted-product" },
      ],
    },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Statistics", href: "/admin/statistics", icon: ListTodo },
    {
      name: "Settings",
      icon: Settings,
      submenu: [
        { name: "General", href: "/admin/settings/general" },
        { name: "Payment", href: "/admin/settings/payment" },
        { name: "Shipping", href: "/admin/settings/shipping" },
      ],
    },
    {
      name: "Fb-Integration",
      icon: Settings,
      submenu: [
        {
          name: "Facebook-Credential",
          href: "/admin/facebook/setting/fb-credential",
        },
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-lg hover:bg-primary transition"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-white/30 backdrop-blur-none z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
    fixed top-0 left-0 w-64 h-screen bg-white border-r border-gray-200 z-40
    transform transition-transform duration-300 ease-in-out
    lg:relative lg:translate-x-0
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    flex flex-col
  `}
      >
        <div className="w-full flex justify-center mt-12 border-b border-b-gray-300 ">
          <Link href={"/"}>
            <Image
              src={brandInfo.logo}
              alt={brandInfo.name}
              width={80}
              height={40}
              className="mb-6"
            />
          </Link>
        </div>

        {/* Brand / Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-200">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">
              {brandInfo.name ? brandInfo.name.charAt(0) : "A"}
            </span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {brandInfo.name}
            </h2>
            <p className="text-xs text-gray-500">Control Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menu.map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                <>
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
                              ? "bg-primary text-white font-semibold"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    pathname === item.href
                      ? "bg-primary text-white font-semibold shadow-md"
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

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 shrink-0">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition font-medium">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
