"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import SalesSearch from "./components/salesSearch";
import SalesTable from "./components/salesTable";
import PageProtection from "@/app/pageProtection";

export default function ClientsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("name");

    return (
        <PageProtection>
            <Box flex={1} p={4} bgcolor="#fafafa">
                <Typography variant="h6" gutterBottom>
                    販売実績一覧
                </Typography>

                <SalesSearch
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                />

                <SalesTable searchTerm={searchTerm} sortOption={sortOption} />
            </Box>
        </PageProtection>
    );
}
