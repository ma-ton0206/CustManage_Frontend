import { Box } from "@mui/material";
import RegisterCompleteForm from "./components/RegisterCompleteFrom";
import { Suspense } from "react";

export default function RegisterCompletePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
                <RegisterCompleteForm />
            </Box>
        </Suspense>

    );
}
