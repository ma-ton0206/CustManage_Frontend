import { GetSalesOut } from "@/types/Sales";

export const validate = (sales: GetSalesOut) => {
    const errors: string[] = [];
    if (!sales?.sales_price || sales?.sales_price < 0) errors.push("販売価格を0以上で入力してください。");
    if (!sales?.sales_date) errors.push("販売納期を入力してください。");
    if (sales?.purchase_details.length === 0) errors.push("仕入れ明細を1行以上追加してください。");
    sales?.purchase_details.forEach((r, i) => {
        if (!r.supplier_name) errors.push(`明細${i + 1}: 仕入先は必須です。`);
        if (!r.product_name) errors.push(`明細${i + 1}: 商品名は必須です。`);
        if (!r.due_date) errors.push(`明細${i + 1}: 明細納期は必須です。`);
        if (r.qty <= 0) errors.push(`明細${i + 1}: 数量は1以上で入力してください。`);
        if (r.supply_price < 0) errors.push(`明細${i + 1}: 単価は0以上で入力してください。`);
    });
    return errors;
};