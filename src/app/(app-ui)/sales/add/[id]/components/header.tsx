import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type HeaderProps = {
    onSave: () => void;
}
export default function Header({ onSave }: HeaderProps) {
    const router = useRouter();

    return (
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-neutral-200">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-xl font-semibold">
                        販売登録
                    </motion.div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={onSave} className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-neutral-900 text-white hover:bg-black transition shadow-sm">
                        <Save size={16} /> 保存
                    </button>

                    <button
                        className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 bg-white border border-neutral-300 hover:bg-neutral-50"
                        onClick={() => router.back()}>
                        <XCircle size={16} /> キャンセル
                    </button>
                </div>
            </div>
        </div>
    );
}