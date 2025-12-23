"use client";

import {
    Box,
    TextField,
    Button,
    Paper,
    Typography,
} from "@mui/material";
import { LoginAPI } from "@/app/API/auth";
import { useAuth } from "@/app/contexts/auth/auth";
import { useLoading } from "@/app/contexts/Loading/LoadingContext";
import { GetUserOut } from "@/types/User";

export default function LoginForm() {
    const { email, password, setEmail, setPassword, errorMsg, setErrorMsg, setUser, setToken, setIsLoggedIn } = useAuth();
    const { navigateTo } = useLoading();

    const handleSubmit = async () => {

        const result = await LoginAPI(email, password, setErrorMsg);
        if (result && result.success) {
            sessionStorage.setItem("token", result.token);
            setToken(result.token);
            setIsLoggedIn(true);
            setUser(result.user as GetUserOut);
            navigateTo("/dashboard");
        } else {
            setErrorMsg("ログインに失敗しました");
        }
    };

    return (
        <Paper elevation={2} sx={{ p: 4, width: "100%" }}>
            <Box display="flex" flexDirection="column" gap={3}>
                <TextField
                    label="Email address"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    SIGN IN
                </Button>
            </Box>
        </Paper>
    );
}
