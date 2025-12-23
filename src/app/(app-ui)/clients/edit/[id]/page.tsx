"use client";

import { Box } from "@mui/material";
import ClientEditForm from "../components/ClientEditForm";
import { useParams } from "next/navigation";
import PageProtection from "@/app/pageProtection";

export default function ClientEditPage() {

    const { id } = useParams();

    return (
        <PageProtection>
            <Box flex={1} p={4} bgcolor="#fafafa">
                <ClientEditForm client_id={parseInt(id as string)} />
            </Box>
        </PageProtection>
    );
}