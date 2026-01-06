"use client";

import React, { createContext, useState, useContext, useMemo } from "react";
import { GetSalesOut, PostSalesIn, PutSalesIn } from "@/types/Sales";
import { GetPurchaseDetailsOut, PutPurchaseDetailsIn } from "@/types/PurchaseDetails";
import { SalesStatus } from "@/constants/status";
import { validate } from "./components/validate";
import { useParams } from "next/navigation";
import { createSalesAPI } from "@/app/API/sales";
import { useAuth } from "@/app/contexts/auth/auth";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

type AddSalesContextType = {
    sales: GetSalesOut;
    setSales: React.Dispatch<React.SetStateAction<GetSalesOut>>;
    profit: number;
    margin: number;
    addRow: () => void;
    removeRow: (rowKey: number | string) => void;
    updatePurchaseDetails: (rowKey: number | string, patch: Partial<PutPurchaseDetailsIn>) => void;
    onSave: () => void;
};

const AddSalesContext = createContext<AddSalesContextType | null>(null);

export const AddSalesProvider = ({ children }: { children: React.ReactNode }) => {
    const params = useParams()
    const { token } = useAuth();
    const router = useRouter();
    const [sales, setSales] = useState<GetSalesOut>(
        {
            client_id: Number(params.id),
            sales_number: "",
            sales_name: "",
            sales_date: new Date().toISOString(),
            client_name: "",
            order_date: new Date().toISOString(),
            sales_price: 0,
            status: SalesStatus.ORDER_CONFIRMED as unknown as typeof SalesStatus,
            sales_note: "",
            purchase_details: [],
        }
    );

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

    const getRowKey = (r: GetPurchaseDetailsOut) =>
        r.purchase_id ?? r.front_id;


    // --- CRUD系関数 ---
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

        const payload: PostSalesIn = {
            sales_name: sales?.sales_name || "",
            sales_price: sales?.sales_price || 0,
            client_id: Number(params.id),
            order_date: sales?.order_date || new Date().toISOString(),
            sales_date: sales?.sales_date || new Date().toISOString(),
            status: sales?.status || SalesStatus.ORDER_CONFIRMED,
            sales_note: sales?.sales_note || "",
            purchase_details: sales?.purchase_details || [],
        };
        try {
            const response = await createSalesAPI(payload, token);
            console.log("SAVE response", response);
            alert("販売登録が完了しました");
            router.push(`/sales/add/`);
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <AddSalesContext.Provider
            value={{ sales, setSales, profit, margin, addRow, removeRow, updatePurchaseDetails, onSave }}
        >
            {children}
        </AddSalesContext.Provider>
    );
};

export const useAddSalesContext = () => {
    const context = useContext(AddSalesContext);
    if (!context) throw new Error("useAddSalesContext must be used within AddSalesProvider");
    return context;
};