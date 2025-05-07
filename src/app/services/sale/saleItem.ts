//Este archivo representa un modelo de datos para un artículo de venta
import { Product } from "../product/product";

export interface SaleItem {
    id: number;
    product: Product; // Producto relacionado con la venta
    amount: number; // Cantidad vendida
    price: number; // Precio unitario del producto
    totalPrice: number; // Precio total por este producto
  }