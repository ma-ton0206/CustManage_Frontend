import { Box } from "@mui/material";
import SalesChart from "./components/SalesChart";
import TaskList from "./components/TaskList";
import TopSales from "./components/TopSales";
import PageProtection from "@/app/pageProtection";

export default function DashboardPage() {
    return (
        <PageProtection>
            <>
                {/* メインコンテンツ */}
                <Box flex={1} p={4} bgcolor="#fafafa">
                    {/* 売上グラフ */}
                    <Box mb={4}>
                        <SalesChart />
                    </Box>
                    {/* トップ3顧客 */}
                    <TopSales />
                    {/* 未対応案件 */}
                    <Box>
                        <TaskList />
                    </Box>
                </Box>
            </>
        </PageProtection>
    );
}
