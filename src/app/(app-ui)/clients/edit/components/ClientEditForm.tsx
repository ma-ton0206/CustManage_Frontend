"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { GetClientDetailOut, PutClientIn } from "@/types/Client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useLoading } from "@/app/contexts/Loading/LoadingContext";
import { useAuth } from "@/app/contexts/auth/auth";
import { deleteClientAPI, getClientDetailAPI, updateClientAPI } from "@/app/API/clients";

type ClientEditFormProps = {
    client_id: number;
};

export default function ClientEditForm({ client_id }: ClientEditFormProps) {
    const { id } = useParams();
    const [clientDetail, setClientDetail] = useState<GetClientDetailOut | null>(null);
    const { navigateTo } = useLoading();
    const { token } = useAuth();

    useEffect(() => {
        if (!token || !client_id) {
            return;
        }
        const fetchClientDetail = async () => {
            const res = await getClientDetailAPI(client_id, token);
            if (res) {
                setClientDetail(res);
            }
        }
        fetchClientDetail();
    }, [token, client_id]);

    const handleDeleteClient = async () => {
        if (window.confirm("削除しますか？")) {
            if (!token || !client_id) {
                return;
            }
            const res = await deleteClientAPI(client_id, token);
            if (res) {
                setClientDetail(null);
                navigateTo(`/clients/search`);
            } else {
                ("削除に失敗しました");
            }
        } else {
            console.log("削除をキャンセルしました");
        }
    }

    const handleSaveClient = async () => {
        if (window.confirm("保存しますか？")) {
            if (!token || !client_id) {
                return;
            }
            const updateClientIn: PutClientIn = {
                client_name: clientDetail?.client_name || "",
                industry: clientDetail?.industry || "",
                client_phone: clientDetail?.client_phone || "",
                client_address: clientDetail?.client_address || "",
            }
            const res = await updateClientAPI(client_id, updateClientIn, token);
            if (res) {
                console.log("id:", id, "保存しました");
                navigateTo(`/clients/search`);
            } else {
                console.log("保存に失敗しました");
            }
        }
    }

    return (
        <Box>
            <Typography variant="h6" mb={3}>
                顧客編集
            </Typography>

            <Grid sx={{ display: "flex", flexDirection: "column", gap: 2 }} container spacing={2} mb={3}>
                <Grid item className="flex items-center gap-2">
                    <Typography variant="body1" width="100px">企業名</Typography>
                    <TextField fullWidth size="small" value={clientDetail?.client_name} onChange={(e) => setClientDetail({ ...clientDetail, client_name: e.target.value })} />
                </Grid>
                <Grid item className="flex items-center gap-2">
                    <Typography variant="body1" width="100px">業界</Typography>
                    <TextField fullWidth size="small" value={clientDetail?.industry} onChange={(e) => setClientDetail({ ...clientDetail, industry: e.target.value })} />
                </Grid>
                <Grid item className="flex items-center gap-2">
                    <Typography variant="body1" width="100px">住所</Typography>
                    <TextField fullWidth size="small" value={clientDetail?.client_address} onChange={(e) => setClientDetail({ ...clientDetail, client_address: e.target.value })} />
                </Grid>
                <Grid item className="flex items-center gap-2">
                    <Typography variant="body1" width="100px">電話番号</Typography>
                    <TextField fullWidth size="small" value={clientDetail?.client_phone} onChange={(e) => setClientDetail({ ...clientDetail, client_phone: e.target.value })} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="primary" onClick={() => navigateTo(`/clients/department/${id as string}`)}>組織表</Button>
                </Grid>
            </Grid>

            {/* 下部ボタン */}
            <Box display="flex" justifyContent="space-between" mt={20}>
                <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDeleteClient}>
                    顧客削除
                </Button>
                <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSaveClient}>
                    保存
                </Button>
            </Box>
        </Box>
    );
}
