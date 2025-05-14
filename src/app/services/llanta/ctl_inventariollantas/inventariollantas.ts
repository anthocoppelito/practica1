import { Marcas } from "../cat_marcas/marcas";
import { Modelos } from "../cat_modelos/modelos";
import { Rines } from "../cat_rines/rines";

export interface InventarioLlantas{
    idLlanta: number;
    marca: Marcas | null;
    modelo: Modelos | null;
    rines: Rines | null;
    num_preciobasico: number;
    fec_alta: Date;
    num_existencia: number;
}