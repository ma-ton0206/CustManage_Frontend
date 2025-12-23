import { Typography, Box } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { FormattedData } from "@/types/Sales";


export default function SalesChart({ data }: { data: FormattedData[] }) {


    return (
        <>
            <Typography variant="h6" gutterBottom>
                売上推移
            </Typography>
            <Box className="flex justify-center w-full">
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={data} className="p-3">
                        <CartesianGrid strokeDasharray="3 3" />
                        {/* 月を表示 */}
                        <XAxis
                            dataKey="month"
                            tickFormatter={(value) => {
                                return value;
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
