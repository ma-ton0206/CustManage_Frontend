"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, TextField, Button } from "@mui/material";
import SalesChart from "./components/salesChart";
import PageProtection from "@/app/pageProtection";
import { useAuth } from "@/app/contexts/auth/auth";
import { getSalesTrendAPI } from "@/app/API/sales";
import { FormattedData, GetSalesTrendOut } from "@/types/Sales";

export default function ClientTrendPage() {
    const { id } = useParams();
    const { token } = useAuth();

    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [data, setData] = useState<GetSalesTrendOut[]>([]);
    const [formattedData, setFormattedData] = useState<FormattedData[]>([]);


    const fetchSalesTrend = async () => {
        if (!token) {
            console.error("Token is required");
            return;
        }
        const data = await getSalesTrendAPI(Number(id), startDate, endDate, token);
        setData(data);
    };


    useEffect(() => {
        const flatData: FormattedData[] = data.flatMap((item) =>
            item.data.map((m) => ({
                month: `${item.year}/${m.month}`,
                total_sales_price: m.total_sales_price / 1000,
            }))
        )
        setFormattedData(flatData);
    }, [data]);

    return (
        <PageProtection>
            <Box flex={1} p={4} bgcolor="#fafafa">
                <Typography variant="h6" gutterBottom>
                    売上推移
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Box>
                        <Typography sx={{ fontSize: 14, fontWeight: 600 }} gutterBottom>
                            開始日
                        </Typography>
                        <TextField
                            type="date"
                            size="small"
                            value={startDate}
                            sx={{ width: 150 }}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: 14, fontWeight: 600 }} gutterBottom>
                            終了日
                        </Typography>
                        <TextField
                            type="date"
                            size="small"
                            value={endDate}
                            sx={{ width: 150 }}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: 14, fontWeight: 600 }} gutterBottom>
                            検索
                        </Typography>
                        <Button variant="contained" size="small" onClick={fetchSalesTrend}>
                            開始
                        </Button>
                    </Box>
                </Box>
                <SalesChart data={formattedData} />
            </Box>
        </PageProtection>
    );
}