"use client";

import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Link,
    Paper,
} from "@mui/material";
// import { useSearchParams } from "next/navigation";
import { RegisterCompleteAPI } from "@/app/API/auth";
import { useSearchParams } from "next/navigation";
import { useLoading } from "@/app/contexts/Loading/LoadingContext";

export default function RegisterCompleteForm() {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    // URLのクエリパラメータからトークンを取得
    const token = useSearchParams().get("token");
    const { navigateTo } = useLoading();

    const handleSubmit = async () => {
        try {
            if (!token) {
                setErrorMsg('トークンがありません');
                return;
            }
            if (password !== passwordConfirm) {
                setErrorMsg("パスワードが一致しません");
                return;
            }
            const result = await RegisterCompleteAPI(userName, password, userEmail, token, setErrorMsg);
            if (result && result.success) {
                alert("登録完了しました。ログインしてください。");
                navigateTo("/login");
            }
        } catch (err) {
            console.error('RegisterComplete error:', err);
            setErrorMsg('通信エラーが発生しました');
        }
    };

    return (
        <Paper elevation={2} sx={{ p: 4, width: "100%" }}>
            <Box display="flex" flexDirection="column" gap={3}>
                <Typography variant="h6">本登録</Typography>
                <TextField
                    label="ユーザー名"
                    type="text"
                    fullWidth
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                    label="メールアドレス"
                    type="email"
                    fullWidth
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <TextField
                    label="パスワード"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    label="パスワード(確認用)"
                    type="password"
                    fullWidth
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                {errorMsg && <Typography color="error">{errorMsg}</Typography>}
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                        backgroundColor: "#1976d2",
                        "&:hover": { backgroundColor: "#115293" },
                    }}
                    onClick={handleSubmit}
                >
                    SIGN UP
                </Button>
            </Box>
        </Paper>
    );
}
