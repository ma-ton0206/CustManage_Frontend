"use client";

import { Box, Button, Typography } from "@mui/material";
import BackComponent from "../ui/backComponent";
import { useAuth } from "@/app/contexts/auth/auth";
import "./layout.css";

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} width="100%">
            <Box><BackComponent /></Box>
            <Box className="user-box">
                <Typography variant="subtitle2">使用者名</Typography>
                <Typography variant="body2" color="text.secondary">
                    {user?.user_name || "名前無し"}
                </Typography>

                <Button
                    variant="outlined"
                    color="error"
                    onClick={logout}
                    className="logout-button"
                    size="small"
                >
                    ログアウト
                </Button>
            </Box>
        </Box>
    );
}