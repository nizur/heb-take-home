export interface Order {
  Crust: string;
  Flavor: string;
  Size: string;
  Table_No: number;
}

export interface PlacedOrder extends Order {
  Order_ID: number;
  Timestamp: string;
}

export interface Token {
  access_token: string;
}
