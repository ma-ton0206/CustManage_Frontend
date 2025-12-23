import { Box, Container, Typography } from "@mui/material";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
            >
                <Typography variant="h5" gutterBottom>
                    CustManage
                </Typography>
                <LoginForm />
            </Box>
        </Container>
    );
}
