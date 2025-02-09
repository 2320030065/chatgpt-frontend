import React from "react";
import Chat from "./components/Chat";
import { Container, Typography } from "@mui/material";

function App() {
    return (
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h3" gutterBottom sx={{ color: "white" }}>
                ChatGPT Clone
            </Typography>
            <Chat />
        </Container>
    );
}

export default App;
