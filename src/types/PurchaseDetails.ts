export type GetPurchaseDetailsOut = {
    purchase_id?: number;
    front_id?: string;
    supplier_name: string;
    product_name: string;
    qty: number;
    supply_price: number;
    due_date: string;
}

export type PutPurchaseDetailsIn = {
    supplier_name: string;
    product_name: string;
    qty: number;
    supply_price: number;
    due_date: string;
    purchase_id: number;
}

export type PutPurchaseDetailsOut = {
    purchase_id: number;
}

export type PostPurchaseDetailsIn = {
    supplier_name: string;
    product_name: string;
    qty: number;
    supply_price: number;
    due_date: string;
}