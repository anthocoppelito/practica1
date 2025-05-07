//Este archivo representa un modelo de datos para una venta
//SaleItem[] representa la lista con los productos vendidos
import { SaleItem } from "./saleItem";

export interface Sale{
    id: number;
    salesList: SaleItem[]; // Lista de elementos vendidos
    totalPrice: number; // Precio total de la venta
  }