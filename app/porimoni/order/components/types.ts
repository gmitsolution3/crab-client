export interface Order {
  _id: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  quantity: number;
  courierName: string;
  courierStatus: string;
  status: string;
  note: string;
  createdAt: string;
  grandTotal: number;
  orderStatus: string
}
