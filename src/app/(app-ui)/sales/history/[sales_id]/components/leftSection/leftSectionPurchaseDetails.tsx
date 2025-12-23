
import { motion } from "framer-motion";
import { GetSalesOut } from "@/types/Sales";
import { Plus, Trash2 } from "lucide-react";
import { PutPurchaseDetailsIn } from "@/types/PurchaseDetails";


type LeftSectionPurchaseDetailsProps = {
    sales: GetSalesOut | undefined,
    toNumber: (v: string) => number,
    addRow: () => void,
    removeRow: (purchase_id: number) => void,
    updatePurchaseDetails: (rowKey: number | string, patch: Partial<PutPurchaseDetailsIn>) => void,
    jpy: (n: number) => string,
}

export default function LeftSectionPurchaseDetails({  sales, toNumber, addRow, removeRow, updatePurchaseDetails, jpy }: LeftSectionPurchaseDetailsProps) {
    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-neutral-200">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
                <h2 className="font-semibold">仕入れ明細（1仕入先 = 1部材）</h2>
                <button
                    onClick={() => addRow()}
                    disabled={!sales}
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-neutral-900 text-white hover:bg-black transition">
                    <Plus size={16} /> 行追加
                </button>
            </div>

            <div className="p-2 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-neutral-600">
                            <th className="py-2 px-3 w-14">No</th>
                            <th className="py-2 px-3 min-w-44">仕入先</th>
                            <th className="py-2 px-3 min-w-56">商品名</th>
                            <th className="py-2 px-3 w-24">数量</th>
                            <th className="py-2 px-3 w-32">単価（円）</th>
                            <th className="py-2 px-3 w-36">金額（自動）</th>
                            <th className="py-2 px-3 w-40">明細納期</th>
                            <th className="py-2 px-3 w-28">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales?.purchase_details.map((r, idx) => {
                            const amount = (r.qty || 0) * (r.supply_price || 0);
                            return (
                                <tr key={r.purchase_id ?? r.front_id as unknown as number} className="border-t border-neutral-100">
                                    <td className="py-2 px-3 text-neutral-500">{idx + 1}</td>
                                    <td className="py-2 px-3">
                                        <input
                                            className="w-full border border-neutral-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
                                            placeholder="例：朝日商事"
                                            value={r.supplier_name}
                                            onChange={(e) =>
                                                updatePurchaseDetails(
                                                    r.purchase_id ?? r.front_id as unknown as number, { supplier_name: e.target.value })}
                                        />
                                    </td>
                                    <td className="py-2 px-3">
                                        <input
                                            className="w-full border border-neutral-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
                                            placeholder="例：差圧発信器 DP-200"
                                            value={r.product_name}
                                            onChange={(e) => updatePurchaseDetails(r.purchase_id ?? r.front_id as unknown as number, { product_name: e.target.value })}
                                        />
                                    </td>
                                    <td className="py-2 px-3">
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            min={1}
                                            className="w-24 border border-neutral-300 rounded-lg px-2 py-1 text-right focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
                                            value={r.qty}
                                            onChange={(e) => updatePurchaseDetails(r.purchase_id ?? r.front_id as unknown as number, { qty: Math.max(1, toNumber(e.target.value)) })}
                                        />
                                    </td>
                                    <td className="py-2 px-3">
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            min={0}
                                            className="w-32 border border-neutral-300 rounded-lg px-2 py-1 text-right focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
                                            value={r.supply_price}
                                            onChange={(e) => updatePurchaseDetails(r.purchase_id ?? r.front_id as unknown as number, { supply_price: Math.max(0, toNumber(e.target.value)) })}
                                        />
                                    </td>
                                    <td className="py-2 px-3 text-right tabular-nums">{jpy(amount)}</td>
                                    <td className="py-2 px-3">
                                        <input
                                            type="date"
                                            className="w-40 border border-neutral-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
                                            value={r.due_date.split('T')[0]}
                                            onChange={(e) => updatePurchaseDetails(r.purchase_id ?? r.front_id as unknown as number, { due_date: e.target.value + 'T00:00:00' })}
                                        />
                                    </td>
                                    <td className="py-2 px-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="p-2 rounded-lg border border-neutral-300 hover:bg-neutral-50 disabled:opacity-40"
                                                onClick={() => removeRow(r.purchase_id ?? r.front_id as unknown as number)}
                                                // disabled={rows.length === 1}
                                                title="削除">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="p-4 border-t border-neutral-100 text-xs text-neutral-500 flex items-center justify-between">
                <div>※ 行は「1仕入先 × 1部材」です。仕入先が変わる場合は行を分けてください。</div>
                <div className="flex items-center gap-2">
                </div>
            </div>
        </motion.div>

    )
}

