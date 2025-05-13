import { Marcas } from "../cat_marcas/marcas";
import { Modelos } from "../cat_modelos/modelos";
import { Rines } from "../cat_rines/rines";

export interface InventarioLlantas{
    id_llanta: number;
    marca: Marcas;
    modelo: Modelos;
    rin: Rines;
    num_preciobasico: number;
    fec_alta: Date;
    opc_activo: Boolean;
}