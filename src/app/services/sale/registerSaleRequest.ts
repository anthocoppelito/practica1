export interface RegisterSaleRequest {
    salesList: {
      productname: string;
      amount: number;
    }[];
  }