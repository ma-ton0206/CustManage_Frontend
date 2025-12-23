import { Box, Container, Typography } from "@mui/material";
import RegisterCompleteForm from "./components/RegisterDompleteFrom";

export default function RegisterCompletePage() {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
            <RegisterCompleteForm />
        </Box>
    );
}
