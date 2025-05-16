export interface RegisterSaleRequest {
    salesList: {
      productname: string;//productname o llantaid
      amount: number;
    }[];
  }