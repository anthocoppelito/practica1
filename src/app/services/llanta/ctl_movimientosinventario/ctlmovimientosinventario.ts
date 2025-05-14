import { InventarioLlantas } from "../ctl_inventariollantas/inventariollantas";

export interface CtlMovimientosinventario{
    idMovimientoinventario: number;
    llanta: InventarioLlantas;
    num_precio: number;
    fec_movimiento: Date;
    num_empleado: Number;
    opc_activo: Boolean;
}