"use client";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { GetTopClientOut } from "@/types/Client";
import { useAuth } from "@/app/contexts/auth/auth";
import { getTopSalesAPI } from "@/app/API/sales";
import { GetTopSalesOut } from "@/types/Sales";

export default function TopSales() {
    const { token, isLoggedIn } = useAuth();
    const [data, setData] = useState<GetTopSalesOut[]>([]);

    useEffect(() => {
        if (!isLoggedIn || !token) return;
        const fetchTopSales = async () => {
            const data = await getTopSalesAPI(new Date().getFullYear(), token);
            setData(data);
        }
        fetchTopSales();
    }, [token, isLoggedIn]);

    return (
        <Box mb={4}>
            <Typography variant="h6" gutterBottom>
                トップ3顧客
            </Typography>
            <Box pl={2}>
                {data.map((item) => (
                    <Typography key={item.client_name}>
                        {item.client_name}
                        ￥{item.total_sales_price.toLocaleString()}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
}