"use client";

import { Typography } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Dot } from "recharts";
import { GetSalesTrendMonth } from "@/types/Sales";
import { useState, useEffect } from "react";
import { getYearSalesAPI } from "@/app/API/sales";
import { useAuth } from "@/app/contexts/auth/auth";
import { Box } from "@mui/material";

export default function SalesChart() {
    const { token, isLoggedIn } = useAuth();

    const [data, setData] = useState<GetSalesTrendMonth[]>([]);

    useEffect(() => {
        try {
            if (!isLoggedIn || !token) return;
            const fetchSalesTrend = async () => {
                const data = await getYearSalesAPI(new Date().getFullYear(), token);
                const formattedData = convertToFormattedData(data);
                setData(formattedData);
            };
            fetchSalesTrend();
        } catch (error) {
            console.error(error);
        }
    }, []);

    const convertToFormattedData = (data: GetSalesTrendMonth[]) => {
        return data.map((item) => ({
            month: item.month,
            total_sales_price: item.total_sales_price / 1000,
        }));
    };

    return (
        <>
            <Typography variant="h6" gutterBottom>
                今年度の総売上
            </Typography>
            <Box className="flex justify-center w-full">
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={data} className="p-3">
                        <CartesianGrid strokeDasharray="3 3" />
                        {/* 月を表示 */}
                        <XAxis
                            dataKey="month"
                            tickFormatter={(value) => {
                                return value + "月";
                            }}
                        />
                        {/* 売上金額を表示 */}
                        <YAxis
                            tickFormatter={(value) => {
                                return value + "K円";
                            }}
                        />
                        {/* ツールチップを表示 */}
                        <Tooltip />
                        {/* 線を表示 */}
                        <Line
                            type="monotone"
                            dataKey="total_sales_price"
                            stroke="#00bcd4"
                            strokeWidth={5}
                            dot
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </>
    );
}
