"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import SaveIcon from "@mui/icons-material/Save";
import { PostClientIn } from "@/types/Client";
import { useState } from "react";
import { useLoading } from "@/app/contexts/Loading/LoadingContext";
import { useAuth } from "@/app/contexts/auth/auth";
import { createClientAPI } from "@/app/API/clients";
import PageProtection from "@/app/pageProtection";

export default function ClientAddPage() {
    const [clientDetail, setClientDetail] = useState<PostClientIn>({
        client_name: "",
        industry: "",
        client_phone: "",
        client_address: "",
    });
    const { navigateTo } = useLoading();
    const { token } = useAuth();

    const handleSaveClient = async () => {
        if (window.confirm("保存しますか？")) {
            if (!token) {
                return;
            }
            const res = await createClientAPI(clientDetail, token);
            if (res) {
                navigateTo(`/clients/search`);
            }
        } else {
            console.log("保存をキャンセルしました");
        }
    }

    return (
        <PageProtection>
            <Box>
                <Typography variant="h6" mb={3}>
                    顧客追加
                </Typography>

                <Grid sx={{ display: "flex", flexDirection: "column", gap: 2 }} container spacing={2} mb={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="企業名" variant="outlined" size="small" value={clientDetail?.client_name} onChange={(e) => setClientDetail({ ...clientDetail, client_name: e.target.value })} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="業界" variant="outlined" size="small" value={clientDetail?.industry} onChange={(e) => setClientDetail({ ...clientDetail, industry: e.target.value })} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="住所" variant="outlined" size="small" value={clientDetail?.client_address} onChange={(e) => setClientDetail({ ...clientDetail, client_address: e.target.value })} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="電話番号" variant="outlined" size="small" value={clientDetail?.client_phone} onChange={(e) => setClientDetail({ ...clientDetail, client_phone: e.target.value })} />
                    </Grid>
                </Grid>

                {/* 下部ボタン */}
                <Box display="flex" justifyContent="space-between" mt={20}>
                    <div></div>
                    <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSaveClient}>
                        保存
                    </Button>
                </Box>
            </Box>
        </PageProtection>
    );
}
