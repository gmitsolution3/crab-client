"use client";
import { Eye, Edit, Printer, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import type { Order } from "./types";
import { formatDate, getStatusBadgeVariant } from "./utlis";

interface OrdersTableProps {
  orders: Order[];
  selectedOrders: Set<string>;
  onToggleOrderSelection: (orderId: string) => void;
  onToggleSelectAll: () => void;
  allSelected: boolean;
}

const courierStatusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  "In Transit": "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Failed: "bg-red-100 text-red-800",
};

export default function OrdersTable({
  orders,
  selectedOrders,
  onToggleOrderSelection,
  onToggleSelectAll,
  allSelected,
}: OrdersTableProps) {
  const handleAction = (action: string, orderId: string) => {
    switch (action) {
      case "view":
        alert(`View order: ${orderId}`);
        break;
      case "edit":
        alert(`Edit order: ${orderId}`);
        break;
      case "print":
        window.print();
        break;
      case "delete":
        alert(`Delete order: ${orderId}`);
        break;
    }
  };

  return (
    <div className="w-full border rounded-lg overflow-hidden bg-white">
      <Table className="text-xs sm:text-sm">
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted">
            <TableHead className="w-10 sm:w-12 px-2 sm:px-4">
              <Checkbox
                checked={allSelected}
                onCheckedChange={onToggleSelectAll}
              />
            </TableHead>
            <TableHead className="px-2 sm:px-4 min-w-32 sm:min-w-auto">
              Customer
            </TableHead>
            <TableHead className="hidden sm:table-cell px-2 sm:px-4">
              Phone
            </TableHead>
            <TableHead className="px-2 sm:px-4 min-w-24 sm:min-w-auto">
              Order ID
            </TableHead>
            <TableHead className="hidden md:table-cell px-2 sm:px-4">
              Date
            </TableHead>
            <TableHead className="px-2 sm:px-4 text-center w-16 sm:w-auto">
              Qty
            </TableHead>
            <TableHead className="hidden lg:table-cell px-2 sm:px-4">
              Courier
            </TableHead>
            <TableHead className="hidden lg:table-cell px-2 sm:px-4">
              C. Status
            </TableHead>
            <TableHead className="px-2 sm:px-4">Status</TableHead>
            <TableHead className="hidden xl:table-cell px-2 sm:px-4 max-w-32">
              Note
            </TableHead>
            <TableHead className="hidden sm:table-cell px-2 sm:px-4 text-right">
              Total
            </TableHead>
            <TableHead className="w-12 sm:w-16 px-2 sm:px-4 text-center">
              Acts
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={12}
                className="text-center py-8 text-muted-foreground text-sm"
              >
                No orders found
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow
                key={order._id}
                className={
                  selectedOrders.has(order._id)
                    ? "bg-blue-50 hover:bg-blue-100"
                    : "hover:bg-muted/50"
                }
              >
                <TableCell className="px-2 sm:px-4">
                  <Checkbox
                    checked={selectedOrders.has(order._id)}
                    onCheckedChange={() => onToggleOrderSelection(order._id)}
                  />
                </TableCell>
                <TableCell className="px-2 sm:px-4 font-medium text-xs sm:text-sm">
                  <div>{order.customerInfo.firstName}</div>
                  <div className="hidden sm:block text-muted-foreground">
                    {order.customerInfo.lastName}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell px-2 sm:px-4 text-xs sm:text-sm">
                  {order.customerInfo.phone}
                </TableCell>
                <TableCell className="px-2 sm:px-4 font-mono text-xs">
                  {order._id.slice(-6).toUpperCase()}
                </TableCell>
                <TableCell className="hidden md:table-cell px-2 sm:px-4 text-xs sm:text-sm">
                  {formatDate(order.createdAt)}
                </TableCell>
                <TableCell className="px-2 sm:px-4 text-center font-medium text-xs sm:text-sm">
                  {order.quantity}
                </TableCell>
                <TableCell className="hidden lg:table-cell px-2 sm:px-4 text-xs sm:text-sm">
                  {order.courierName}
                </TableCell>
                <TableCell className="hidden lg:table-cell px-2 sm:px-4">
                  <Badge
                    className={`text-xs ${
                      courierStatusColors[order.courierStatus] ||
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.courierStatus}
                  </Badge>
                </TableCell>
                <TableCell className="px-2 sm:px-4">
                  <Badge
                    variant={getStatusBadgeVariant(order.status)}
                    className="text-xs"
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden xl:table-cell px-2 sm:px-4 text-xs max-w-32 truncate">
                  {order.note || "—"}
                </TableCell>
                <TableCell className="hidden sm:table-cell px-2 sm:px-4 font-medium text-xs sm:text-sm text-right">
                  ৳
                  {order.grandTotal.toLocaleString("en-BD", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="px-2 sm:px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        ⋯
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem
                        onClick={() => handleAction("view", order._id)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleAction("edit", order._id)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleAction("print", order._id)}
                      >
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleAction("delete", order._id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
