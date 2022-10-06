export interface Order {
  Crust: string;
  Flavor: string;
  Size: string;
  Table_No: number;
}

export interface PlacedOrder extends Order {
  Order_ID: string; // Different from the original so I can use UUIDs
  Timestamp: string;
}

export interface Token {
  access_token: string;
}
