import { motion } from "framer-motion";
import { GetSalesOut } from "@/types/Sales";

type RightSectionSummaryProps = {
    profit: number,
    margin: number,
    sales: GetSalesOut | undefined,
    jpy: (n: number) => string,
}

export default function RightSectionSummary({ profit, margin, sales, jpy }: RightSectionSummaryProps) {
    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-neutral-200">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
                <h3 className="font-semibold">サマリー</h3>
            </div>
            <div className="p-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                    <span className="text-neutral-600">販売価格</span>
                    <span className="font-medium tabular-nums">{jpy(sales?.sales_price || 0)}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-neutral-600">仕入合計</span>
                    <span className="font-medium tabular-nums">{jpy(sales?.purchase_details.reduce((sum, r) => sum + (r.qty || 0) * (r.supply_price || 0), 0) || 0)}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-neutral-600">粗利</span>
                    <span className={`font-semibold tabular-nums ${profit < 0 ? "text-red-600" : "text-emerald-600"}`}>{jpy(profit || 0)}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-neutral-600">粗利率</span>
                    <span className={`font-semibold tabular-nums ${profit < 0 ? "text-red-600" : ""}`}>{sales?.sales_price ? `${margin}%` : "-"}</span>
                </div>
            </div>
        </motion.div>
    )
}