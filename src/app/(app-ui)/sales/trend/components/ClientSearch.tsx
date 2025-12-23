"use client";

import { Box, TextField } from "@mui/material";

type ClientSearchProps = {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    sortOption: string;
    setSortOption: (value: string) => void;
};

export default function ClientSearch({ searchTerm, setSearchTerm }: ClientSearchProps) {
    return (
        <Box display="flex" alignItems="center" gap={2} mb={3}>
            <TextField
                label="顧客名で検索"
                size="small"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="〇〇株式会社"
            />
        </Box>
    );
}
