// Import necessary modules
import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Box, Typography, Paper } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Function to send a message to the backend
  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/chat", { message: input });

      const botMessage = { text: response.data.response, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, bgcolor: "#1e1e1e", color: "white" }}>
        <Typography variant="h4" gutterBottom>
          Karthikeya's AI
        </Typography>
        <Box
          sx={{
            maxHeight: 300,
            overflowY: "auto",
            mb: 2,
            p: 2,
            bgcolor: "#333",
            borderRadius: 2,
          }}
        >
          {messages.map((msg, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              {msg.sender === "user" ? (
                <PersonIcon sx={{ color: "lightblue" }} />
              ) : (
                <SmartToyIcon sx={{ color: "lightgreen" }} />
              )}
              <Typography sx={{ color: msg.sender === "user" ? "lightblue" : "lightgreen" }}>
                <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ bgcolor: "white", borderRadius: 1 }}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat;
