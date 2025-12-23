"use client";

import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function NotFoundPage() {
    const router = useRouter();

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bgcolor="#f9f9f9"
            textAlign="center"
            p={4}
        >
            <ErrorOutlineIcon sx={{ fontSize: 100, color: "#d32f2f", mb: 2 }} />
            <Typography variant="h3" fontWeight="bold" gutterBottom>
                404 Not Found
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
                お探しのページは見つかりませんでした。
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={() => router.push("/dashboard")}
                sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: "bold",
                }}
            >
                ホームへ戻る
            </Button>
        </Box>
    );
}
