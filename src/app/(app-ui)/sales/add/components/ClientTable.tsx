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
import type { GetClientOut } from "@/types/Client";
import { useLoading } from "@/app/contexts/Loading/LoadingContext";
import { useAuth } from "@/app/contexts/auth/auth";
import { getClientsAPI } from "@/app/API/clients";

type ClientTableProps = {
    searchTerm: string;
    sortOption: string;
};

export default function ClientTable({ searchTerm, sortOption }: ClientTableProps) {
    const [clients, setClients] = useState<GetClientOut[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { token } = useAuth();

    const { navigateTo } = useLoading();

    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchClients = async () => {
            const data = await getClientsAPI(token);
            setClients(data);
        };
        fetchClients();
    }, [token]);

    const filteredClients = clients
        //顧客検索
        .filter((c) => c.client_name.includes(searchTerm))
        //ソート
        .sort((a, b) => {
            if (sortOption === "name") return a.client_name.localeCompare(b.client_name);
            return 0;
        });

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>顧客名</TableCell>
                            <TableCell>住所</TableCell>
                            <TableCell>電話番号</TableCell>
                            <TableCell align="center">操作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredClients
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((c) => (
                                <TableRow key={c.client_id}>
                                    <TableCell>{c.client_name}</TableCell>
                                    <TableCell>{c.client_address}</TableCell>
                                    <TableCell>{c.client_phone}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => navigateTo(`/sales/add/${c.client_id}`)}
                                        >
                                            選択
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
                count={filteredClients.length}
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
