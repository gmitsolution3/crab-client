export enum FakeOrderStatus {
  FRAUD = "FRAUD",
  LEGIT = "LEGIT",
}

export interface Path {
  route: string;
  timeSpent: number;
  scrollDepth: number;
  mouseMoves: number;
  clicks: number;
  touch: number;
  lastVisit: string;
}

export interface Screen {
  width: number;
  height: number;
  ratio: number;
  orientation: string;
}

export interface RiskOrder {
  _id: string;
  createdAt: string;
  customerIp: string;
  riskScore: number;
  FakeOrderStatus: FakeOrderStatus;
  isEmailVerified: boolean;
  screen: Screen;
  paths: Path[];
}

export interface Summary {
  _id: null;
  totalOrders: number;
  fraudOrders: number;
  legitOrders: number;
  unverifiedEmails: number;
  avgRisk: number;
}

export interface IPStat {
  _id: string;
  orders: number;
  avgRisk: number;
  fraudCount: number;
}

export interface Behavior {
  _id: string;
  totalTime: number;
  avgScroll: number;
  totalClicks: number;
  totalMouse: number;
}

export interface LocationMismatch {
  _id: string;
  customerIp: string;
  riskScore: number;
  FakeOrderStatus: FakeOrderStatus;
  source: string;
  lat: number;
  lng: number;
}

export interface FraudData {
  summary: Summary;
  riskOrders: RiskOrder[];
  ipStats: IPStat[];
  behavior: Behavior[];
  locationMismatch: LocationMismatch[];
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: FraudData;
}
