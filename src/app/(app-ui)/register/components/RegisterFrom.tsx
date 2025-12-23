"use client";

import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Select,
    MenuItem,
} from "@mui/material";
// import { useSearchParams } from "next/navigation";
import { AdminCreateUserAPI } from "@/app/API/auth";
import { useAuth } from "@/app/contexts/auth/auth";
import { UserRole } from "@/constants/status";

export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [userRole, setUserRole] = useState(UserRole.USER);
    const [errorMsg, setErrorMsg] = useState("");
    const { token } = useAuth();
    // URLのクエリパラメータからトークンを取得
    // const token = useSearchParams().get("token");

    const handleSubmit = async () => {
        if (email !== emailConfirm) {
            setErrorMsg("メールアドレスが一致しません");
            return;
        }
        try {
            const user_in = { user_email: email, user_role: userRole };
            const result = await AdminCreateUserAPI(user_in, token, setErrorMsg);
            if (result && result.success) {
                alert("仮登録が完了しました。メールをご確認ください。");
                setEmail("")
                setEmailConfirm("")
                setErrorMsg("")
                setUserRole(UserRole.USER)
            } else {
                setErrorMsg( "仮登録に失敗しました");
            }
        } catch (err) {
            console.error('AdminCreateUser error:', err);
            setErrorMsg('通信エラーが発生しました');
        }
    };

    return (
        <>
            <Box display="flex" flexDirection="column" gap={3}>
                <Typography variant="h6">仮登録送信画面</Typography>
                <TextField
                    label="メールアドレス"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="メールアドレス(確認用)"
                    type="email"
                    fullWidth
                    value={emailConfirm}
                    onChange={(e) => setEmailConfirm(e.target.value)}
                />
                <Select
                    label="ユーザー権限"
                    required
                    fullWidth
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value as UserRole)}
                >
                    <MenuItem value={UserRole.USER}>ユーザー</MenuItem>
                    <MenuItem value={UserRole.ADMIN}>管理者</MenuItem>
                </Select>
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
                    仮登録送信
                </Button>
            </Box>
        </>
    );
}
