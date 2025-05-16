//Este archivo representa un modelo de datos para un artículo de venta
import { InventarioLlantas } from "../llanta/ctl_inventariollantas/inventariollantas";
import { Product } from "../product/product";

export interface SaleItem {
    id: number;
    llantas: InventarioLlantas; // Producto relacionado con la venta
    amount: number; // Cantidad vendida
    price: number; // Precio unitario del producto
    totalPrice: number; // Precio total por este producto
  }