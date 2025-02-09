import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Box, Typography, Paper } from "@mui/material";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]); // Functional state update

    try {
      const response = await axios.post("http://localhost:5000/chat", { message: input });

      const botMessage = { text: response.data.response, sender: "bot" }; // Use correct response key
      setMessages((prev) => [...prev, botMessage]); // Append bot message
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, bgcolor: "#1e1e1e", color: "white" }}>
        <Typography variant="h4" gutterBottom>ChatGPT Clone</Typography>
        <Box sx={{ maxHeight: 300, overflowY: "auto", mb: 2, p: 2, bgcolor: "#333", borderRadius: 2 }}>
          {messages.map((msg, index) => (
            <Typography key={index} sx={{ color: msg.sender === "user" ? "lightblue" : "lightgreen", mt: 1 }}>
              <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
            </Typography>
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
            onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Send on Enter
          />
          <Button variant="contained" onClick={sendMessage}>Send</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat;
