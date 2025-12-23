"use client";

import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TablePagination,
} from "@mui/material";
import type { GetSalesOut } from "@/types/Sales";
import { useLoading } from "@/app/contexts/Loading/LoadingContext";
import { SalesStatus } from "@/constants/status";
import { useAuth } from "@/app/contexts/auth/auth";
import { getSalesAPI } from "@/app/API/sales";

type SalesTableProps = {
    searchTerm: string;
    sortOption: string;
};

export default function SalesTable({ searchTerm, sortOption }: SalesTableProps) {
    const [sales, setSales] = useState<GetSalesOut[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { token } = useAuth();

    const { navigateTo } = useLoading();
    useEffect(() => {
        console.log(sales);
    }, [sales]);
    // 仮データ
    useEffect(() => {
        if (!token) {
            console.error("Token is required");
            return;
        }
        const fetchSales = async () => {
            const data = await getSalesAPI(token);
            data.sort((a, b) => (a.sales_id ?? 0) + (b.sales_id ?? 0));
            setSales(data);
        };

        fetchSales();
    }, []);

    const filteredSales = [...sales]
        .filter((s) => s.client_name.includes(searchTerm))
        .sort((a, b) => {
            if (sortOption === "name")
                return a.client_name.localeCompare(b.client_name);
            return 0;
        });

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>物件No.</TableCell>
                            <TableCell>顧客名</TableCell>
                            <TableCell>物件名</TableCell>
                            <TableCell align="center">操作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredSales
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((s) => (
                                <TableRow key={s.sales_id}>
                                    <TableCell>{s.sales_number}</TableCell>
                                    <TableCell>{s.client_name}</TableCell>
                                    <TableCell>{s.sales_name}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => navigateTo(`/sales/history/${s.sales_id}`)}
                                        >
                                            編集
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={filteredSales.length}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}
            />
        </Paper>
    );
}
