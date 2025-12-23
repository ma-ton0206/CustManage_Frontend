"use client";

import { useAuth } from "@/app/contexts/auth/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PageProtection({ children }: { children: React.ReactNode }) {
    const { isChecking, isLoggedIn } = useAuth();
    const router = useRouter();

    // ★ 初回レンダリング時に “まだ判定が終わってない” 状態

    useEffect(() => {
        if (isChecking) return; // ← 読み込み中は何もしない
        if (!isLoggedIn) router.push("/login");
    }, [isChecking, isLoggedIn]);

    // ★ 判定終わるまで画面を描画しない（フラッシュ防止）
    if (isChecking) {
        return null;
    }

    return <>{children}</>;
}
