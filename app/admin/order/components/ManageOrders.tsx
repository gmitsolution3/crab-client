"use client";

import { useState, useMemo } from "react";
import {
  ChevronDown,
  Plus,
  UserCheck,
  RefreshCw,
  Truck,
  Search,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Order } from "./types";
import OrdersTable from "./OrdersTable";
import OrdersCards from "./OrdersCards";

const ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Courier",
  "On Hold",
  "Cancelled",
  "Return",
  "Completed",
];

const MOCK_ORDERS: Order[] = [
  {
    _id: "695baa0c4e9a977281036b5b",
    customerInfo: {
      firstName: "Tariqul",
      lastName: "Khan",
      phone: "01817247388",
      email: "anik@gmail.com",
    },
    quantity: 7,
    courierName: "Pathao",
    courierStatus: "Pending",
    status: "Pending",
    note: "Handle with care",
    createdAt: "2026-01-05T12:09:48.266Z",
    grandTotal: 17376,
  },
  {
    _id: "695baa2c4e9a977281036b5c",
    customerInfo: {
      firstName: "Tariqul",
      lastName: "Khan",
      phone: "01817247388",
      email: "anik@gmail.com",
    },
    quantity: 2,
    courierName: "Steadfast",
    courierStatus: "Pending",
    status: "Processing",
    note: "Standard delivery",
    createdAt: "2026-01-05T12:10:20.885Z",
    grandTotal: 7730,
  },
  {
    _id: "695baa3f4e9a977281036b5d",
    customerInfo: {
      firstName: "Tariqul",
      lastName: "Khan",
      phone: "01817247388",
      email: "anik@gmail.com",
    },
    quantity: 2,
    courierName: "TigerParse",
    courierStatus: "Pending",
    status: "Courier",
    note: "Outside Dhaka",
    createdAt: "2026-01-05T12:10:39.823Z",
    grandTotal: 765,
  },
  {
    _id: "695baa5b4e9a977281036b5e",
    customerInfo: {
      firstName: "Tariqul",
      lastName: "Khan",
      phone: "01817247388",
      email: "anik@gmail.com",
    },
    quantity: 2,
    courierName: "Pathao",
    courierStatus: "In Transit",
    status: "Courier",
    note: "",
    createdAt: "2026-01-05T12:11:07.353Z",
    grandTotal: 4672,
  },
  {
    _id: "695bb1ba8f783c30fede9144",
    customerInfo: {
      firstName: "Tariqul",
      lastName: "Khan",
      phone: "01817247388",
      email: "anik@gmail.com",
    },
    quantity: 1,
    courierName: "Steadfast",
    courierStatus: "Delivered",
    status: "Completed",
    note: "Completed successfully",
    createdAt: "2026-01-05T12:42:34.996Z",
    grandTotal: 412.5,
  },
];

export default function ManageOrders() {
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [bulkActionDropdownOpen, setBulkActionDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = useMemo(() => {
    let result = MOCK_ORDERS;

    if (filterStatus) {
      result = result.filter((order) => order.status === filterStatus);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((order) => {
        const orderId = order._id.toLowerCase();
        const customerName =
          `${order.customerInfo.firstName} ${order.customerInfo.lastName}`.toLowerCase();
        const phoneNumber = order.customerInfo.phone.toLowerCase();

        return (
          orderId.includes(query) ||
          customerName.includes(query) ||
          phoneNumber.includes(query)
        );
      });
    }

    return result;
  }, [filterStatus, searchQuery]);

  const toggleOrderSelection = (orderId: string) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId);
    } else {
      newSelected.add(orderId);
    }
    setSelectedOrders(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedOrders.size === filteredOrders.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(filteredOrders.map((order) => order._id)));
    }
  };

  const handleBulkAction = (action: string) => {
    const selectedIds = Array.from(selectedOrders);
    if (selectedIds.length === 0) {
      alert("Please select orders first");
      return;
    }

    switch (action) {
      case "assign-user":
        alert(`Assign user to orders: ${selectedIds.join(", ")}`);
        break;
      case "status-change":
        alert(`Change status for orders: ${selectedIds.join(", ")}`);
        break;
      case "update-courier":
        alert(`Update courier status for orders: ${selectedIds.join(", ")}`);
        break;
      case "add-new":
        alert("Add New Order");
        break;
    }
    setBulkActionDropdownOpen(false);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="max-w-full">
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
            <Input
              placeholder="Search by Order ID, Customer Name, or Phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 text-sm sm:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto bg-transparent text-sm sm:text-base"
                  >
                    {filterStatus
                      ? `Filter: ${filterStatus}`
                      : "Filter by Status"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 sm:w-56">
                  <DropdownMenuCheckboxItem
                    checked={!filterStatus}
                    onCheckedChange={() => setFilterStatus(null)}
                  >
                    All Orders
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  {ORDER_STATUSES.map((status) => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={filterStatus === status}
                      onCheckedChange={() => setFilterStatus(status)}
                    >
                      {status}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                onClick={() => handleBulkAction("add-new")}
                className="flex-1 sm:flex-none gap-2"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add New Order</span>
                <span className="sm:hidden">Add Order</span>
              </Button>

              <DropdownMenu
                open={bulkActionDropdownOpen}
                onOpenChange={setBulkActionDropdownOpen}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={selectedOrders.size > 0 ? "default" : "outline"}
                    className="flex-1 sm:flex-none gap-2"
                    disabled={selectedOrders.size === 0}
                  >
                    <span className="hidden sm:inline">Actions</span>
                    <span className="sm:hidden">Acts</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem
                    checked={false}
                    onCheckedChange={() => handleBulkAction("assign-user")}
                  >
                    <UserCheck className="mr-2 h-4 w-4" />
                    Assign User
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={false}
                    onCheckedChange={() => handleBulkAction("status-change")}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Status Change
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={false}
                    onCheckedChange={() => handleBulkAction("update-courier")}
                  >
                    <Truck className="mr-2 h-4 w-4" />
                    Update Courier Status
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-5 lg:mt-6 text-xs sm:text-sm text-muted-foreground">
          Showing {filteredOrders.length} order
          {filteredOrders.length !== 1 ? "s" : ""}
          {filterStatus && ` with status: ${filterStatus}`}
          {searchQuery && ` matching "${searchQuery}"`}
          {selectedOrders.size > 0 && ` • ${selectedOrders.size} selected`}
        </div>

        <div className="mt-4 sm:mt-5 lg:mt-6">
          <div className="md:hidden">
            <OrdersCards
              orders={filteredOrders}
              selectedOrders={selectedOrders}
              onToggleOrderSelection={toggleOrderSelection}
            />
          </div>
          <div className="hidden md:block overflow-x-auto rounded-lg">
            <OrdersTable
              orders={filteredOrders}
              selectedOrders={selectedOrders}
              onToggleOrderSelection={toggleOrderSelection}
              onToggleSelectAll={toggleSelectAll}
              allSelected={
                filteredOrders.length > 0 &&
                selectedOrders.size === filteredOrders.length
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
