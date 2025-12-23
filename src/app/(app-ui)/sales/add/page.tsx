"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import ClientSearch from "./components/ClientSearch";
import ClientTable from "./components/ClientTable";
import PageProtection from "@/app/pageProtection";

export default function SalesAddPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("name");

    return (
        <PageProtection >
            <Box flex={1} p={4} bgcolor="#fafafa">
                <Typography variant="h6" gutterBottom>
                    顧客選択
                </Typography>

                <ClientSearch
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                />

                <ClientTable searchTerm={searchTerm} sortOption={sortOption} />
            </Box>
        </PageProtection>
    );
}
