import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { GetSalesOut } from "@/types/Sales";
import { SalesStatus } from "@/constants/status";

type LeftSectionHeaderProps = {
    profit: number,
    setSales: React.Dispatch<React.SetStateAction<GetSalesOut | undefined>>,
    sales: GetSalesOut | undefined,
    toNumber: (v: string) => number,
}

export default function LeftSectionHeader({ profit, setSales, sales, toNumber }: LeftSectionHeaderProps) {

    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-neutral-200">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
                <h2 className="font-semibold">販売ヘッダ</h2>
                <div className="flex items-center gap-3 text-sm text-neutral-500">
                    <AlertTriangle size={16} className={profit < 0 ? "text-red-500" : "hidden"} />
                    {profit < 0 ? "販売価格が仕入合計を下回っています" : null}
                </div>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-neutral-600 mb-1">販売価格（円）</label>
                    <input
                        type="number"
                        inputMode="numeric"
                        className="w-full border border-neutral-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
                        placeholder="例：1,500,000"
                        value={sales?.sales_price?.toString() || ""}
                        onChange={(e) =>
                            setSales((prev) => prev ? { ...prev, sales_price: toNumber(e.target.value) } : prev)
                        }

                        min={0}
                    />
                </div>
                <div>
                    <label className="block text-sm text-neutral-600 mb-1">状況</label>
                    <select
                        className="w-full border border-neutral-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
                        value={sales?.status?.toString() || SalesStatus.ORDER_CONFIRMED.toString()}
                        onChange={(e) =>
                            setSales((prev) =>
                                prev ? { ...prev, status: Number(e.target.value) as unknown as typeof SalesStatus } : prev
                            )
                        }   

                    >
                        <option value={SalesStatus.ORDER_CONFIRMED}>受注済み</option>
                        <option value={SalesStatus.NOT_SOLD}>未売上</option>
                        <option value={SalesStatus.SOLD}>売上済み</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm text-neutral-600 mb-1">注文日</label>
                    <input
                        type="date"
                        className="w-full border border-neutral-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
                        value={sales?.order_date.split('T')[0] || ""}
                        onChange={(e) => setSales((prev) => prev ? { ...prev, order_date: e.target.value } : prev)}
                    />
                </div>
                <div>
                    <label className="block text-sm text-neutral-600 mb-1">売上日</label>
                    <input
                        type="date"
                        className="w-full border border-neutral-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
                        value={sales?.sales_date.split('T')[0] || ""}
                        onChange={(e) => setSales((prev) => prev ? { ...prev, sales_date: e.target.value } : prev)}
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm text-neutral-600 mb-1">備考</label>
                    <textarea
                        className="w-full border border-neutral-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900/20 min-h-[72px]"
                        placeholder="社内メモ等"
                        value={sales?.sales_note || ""}
                        onChange={(e) => setSales((prev) => prev ? { ...prev, sales_note: e.target.value } : prev)}
                    />
                </div>
            </div>
        </motion.div>
    )
}
