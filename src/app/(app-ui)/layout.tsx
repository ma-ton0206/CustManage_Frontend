import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Box } from "@mui/material";

export default function AppUILayout({ children }: { children: React.ReactNode }) {
    return (
        <Box display="flex" minHeight="100vh">
            <Sidebar />
            <Box flex={1} bgcolor="#fafafa" p={4}>
                <Box
                    mb={3}
                    sx={{ borderBottom: "1px solid #ddd" }}
                    display="flex"
                    justifyContent="flex-end"
                >
                    <Header />
                </Box>
                {children}
            </Box>
        </Box>
    );
}
