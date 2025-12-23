"use client";

import { Button } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from "next/navigation";

export default function BackComponent() {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    }
    return (
        <Button variant="outlined" color="primary" startIcon={<ArrowBackIosNewIcon />} onClick={handleBack}>
            戻る
        </Button>
    );
}