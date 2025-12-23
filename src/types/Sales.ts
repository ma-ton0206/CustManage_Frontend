import { SalesStatus } from "@/constants/status";
import { GetPurchaseDetailsOut, PutPurchaseDetailsIn, PostPurchaseDetailsIn } from "@/types/PurchaseDetails";

export type GetSalesOut = {
    sales_id?: number;
    client_id: number;
    sales_number: string;
    sales_name: string;
    sales_date: string;
    client_name: string;
    order_date: string;
    sales_price: number;
    status: typeof SalesStatus;
    sales_note: string;
    purchase_details: GetPurchaseDetailsOut[];
}

export type GetSalesTrendIn = {
    client_id: number;
}

export type GetSalesTrendOut = {
    year: number;
    data: GetSalesTrendMonth[];
}

export type GetSalesTrendMonth = {
    month: number;
    total_sales_price: number;
}

export type GetSalesDetailIn = {
    sales_number: string;
}

export type GetSalesDetailOut = {
    sales_id: number;
    client_name: string;
    order_date: string;
    sales_date: string;
    status: typeof SalesStatus;
    sales_note: string;
    purchase_details: GetPurchaseDetailsOut[];
}

export type PutSalesIn = {
    sales_name: string;
    sales_price: number;
    order_date: string;
    sales_date: string;
    status: typeof SalesStatus;
    sales_note: string;
    purchase_details: PutPurchaseDetailsIn[];
}

export type PutSalesOut = {
    sales_id: number;
}

export type PostSalesIn = {
    sales_name: string;
    sales_price: number;
    client_id: number;
    order_date: string;
    sales_date: string;
    status: typeof SalesStatus;
    sales_note: string;
    purchase_details: PostPurchaseDetailsIn[];
}

export type PostSalesOut = {
    sales_id: number;
}

export type DeleteSalesOut = {
    sales_id: number;
}

export type GetYearSalesOut = {
    month: number;
    total_sales_price: number;
}

export type FormattedData = {
    month: string;
    total_sales_price: number;
}

export type GetTopSalesOut = {
    client_name: string;
    total_sales_price: number;
}