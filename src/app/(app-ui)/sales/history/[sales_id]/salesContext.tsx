"use client";

import React, { createContext, useState, useContext, useMemo, useEffect } from "react";
import { GetSalesOut, PutSalesIn, PutSalesOut } from "@/types/Sales";
import { GetPurchaseDetailsOut, PutPurchaseDetailsIn } from "@/types/PurchaseDetails";
import { SalesStatus } from "@/constants/status";
import { validate } from "./components/validate";
import { useParams } from "next/navigation";
import { useAuth } from "@/app/contexts/auth/auth";
import { getSalesDetailAPI, putSalesAPI } from "@/app/API/sales";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

type SalesContextType = {
    sales?: GetSalesOut;
    setSales: React.Dispatch<React.SetStateAction<GetSalesOut | undefined>>;
    profit: number;
    margin: number;
    addRow: () => void;
    removeRow: (rowKey: number | string) => void;
    updatePurchaseDetails: (rowKey: number | string, patch: Partial<PutPurchaseDetailsIn>) => void;
    onSave: () => void;
};

const SalesContext = createContext<SalesContextType | null>(null);

export const SalesProvider = ({ children }: { children: React.ReactNode }) => {
    const { token } = useAuth();
    const params = useParams();
    const router = useRouter();
    const [sales, setSales] = useState<GetSalesOut | undefined>(undefined);

    // 粗利と粗利率
    const profit = useMemo(
        () => (sales?.sales_price || 0) -
            (sales?.purchase_details?.reduce((sum, r) => sum + (r.qty || 0) * (r.supply_price || 0), 0) || 0),
        [sales?.sales_price, sales?.purchase_details]
    );

    const margin = useMemo(
        () => (sales?.sales_price ? Math.round((profit / sales.sales_price) * 100) : 0),
        [profit, sales?.sales_price]
    );

    const addRow = () => setSales((prev) => ({
        ...prev,
        purchase_details: [
            ...(prev?.purchase_details || []),
            { front_id: uuidv4(), supplier_name: "", product_name: "", qty: 1, supply_price: 0, due_date: new Date().toISOString().split('T')[0] }
        ]
    } as GetSalesOut));

    const removeRow = (rowKey: number | string) =>
        setSales((prev) => ({
            ...prev,
            purchase_details: prev?.purchase_details.filter((r) => getRowKey(r) !== rowKey)
        } as GetSalesOut));

    const getRowKey = (r: GetPurchaseDetailsOut) =>
        r.purchase_id ?? r.front_id;


    const updatePurchaseDetails = (
        rowKey: number | string,
        patch: Partial<PutPurchaseDetailsIn>
    ) =>
        setSales(prev => ({
            ...prev,
            purchase_details: prev?.purchase_details.map(r =>
                getRowKey(r) === rowKey
                    ? { ...r, ...patch }
                    : r
            )
        } as GetSalesOut));



    const onSave = async () => {
        const errors = validate(sales as GetSalesOut);
        if (errors.length) {
            alert(errors.join("\n"));
            return;
        }

        const payload: PutSalesIn = {
            sales_name: sales?.sales_name || "",
            sales_price: sales?.sales_price || 0,
            order_date: sales?.order_date || new Date().toISOString(),
            sales_date: sales?.sales_date || new Date().toISOString(),
            status: sales?.status || SalesStatus.ORDER_CONFIRMED as unknown as typeof SalesStatus,
            sales_note: sales?.sales_note || "",
            purchase_details: sales?.purchase_details.map((r) => ({
                purchase_id: r.purchase_id as number,
                supplier_name: r.supplier_name,
                product_name: r.product_name,
                qty: r.qty,
                supply_price: r.supply_price,
                due_date: r.due_date,
            })) || [],
        };

        const response = await putSalesAPI(Number(params.sales_id), payload, token);
        console.log("SAVE response", response);
        console.log("SAVE payload", payload);
        alert("販売情報を更新しました");
        router.push(`/sales/search`);
    };

    useEffect(() => {
        const fetchSales = async () => {
            if (!token) {
                console.error("Token is required");
                return;
            }
            const response = await getSalesDetailAPI(Number(params.sales_id), token);
            setSales(response as GetSalesOut);
        };
        fetchSales();
    }, [params.sales_id, token]);

    return (
        <SalesContext.Provider
            value={{ sales, setSales, profit, margin, addRow, removeRow, updatePurchaseDetails, onSave }}
        >
            {children}
        </SalesContext.Provider>
    );
};

export const useSalesContext = () => {
    const context = useContext(SalesContext);
    if (!context) throw new Error("useSalesContext must be used within SalesProvider");
    return context;
};