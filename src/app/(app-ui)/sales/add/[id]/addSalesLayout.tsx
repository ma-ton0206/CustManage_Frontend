"use client";

import { useAddSalesContext } from "./addSalesContext";
import Header from "./components/header";
import LeftSectionHeader from "./components/leftSection/leftSectionHeader";
import LeftSectionPurchaseDetails from "./components/leftSection/leftSectionPurchaseDetails";
import RightSectionSummary from "./components/rightSection/rightSectionSummary";


// --- Utils ---
// const uid = () => Math.random().toString(36).slice(2, 10);
const toNumber = (v: string) => (v === "" || isNaN(Number(v)) ? 0 : Number(v));
const jpy = (n: number) => n.toLocaleString("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 });

export default function AddSalesLayout() {
    const { sales, setSales, profit, margin, addRow, removeRow, updatePurchaseDetails, onSave } = useAddSalesContext();

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900">
            <Header onSave={onSave} />

            <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: フォーム */}
                <section className="lg:col-span-2 space-y-6">
                    {/* 販売ヘッダ */}
                    <LeftSectionHeader profit={profit} setSales={setSales} sales={sales} toNumber={toNumber} />
                    {/* 仕入れ明細テーブル */}
                    <LeftSectionPurchaseDetails
                        sales={sales}
                        toNumber={toNumber}
                        addRow={addRow}
                        removeRow={removeRow}
                        updatePurchaseDetails={updatePurchaseDetails}
                        jpy={jpy}
                    />
                </section>

                {/* Right: サマリー */}
                <aside className="space-y-4">
                    <RightSectionSummary profit={profit} margin={margin} sales={sales} jpy={jpy} />
                </aside>
            </main>
        </div>
    );
}

