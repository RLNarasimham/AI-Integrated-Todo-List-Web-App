import React, { useState } from "react";
import Draggable from "react-draggable";

const ChatAssistant = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([
        "How can I be more productive?",
        "What are the best time management tips?",
        "How do I organize my tasks effectively?"
    ]);
    const [isOpen, setIsOpen] = useState(false);

    const generateSuggestions = () => {
        const suggestionSets = [
            ["What are some effective study techniques?", "How to improve focus?", "Best ways to avoid distractions?"],
            ["How to create a daily task schedule?", "What is the Pomodoro technique?", "How to manage work-life balance?"],
            ["What are the best apps for task management?", "How to set realistic goals?", "How to handle procrastination?"]
        ];
        return suggestionSets[Math.floor(Math.random() * suggestionSets.length)];
    };

    const sendMessage = async () => {
        if (!input) return;
        const newMessages = [...messages, { text: input, sender: "user" }];
        setMessages(newMessages);
        setInput("");

        try {
            const response = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            setMessages([...newMessages, { text: data.reply, sender: "bot" }]);

            setSuggestions(generateSuggestions());
        } catch (error) {
            console.error("Error:", error);
            setMessages([...newMessages, { text: "AI is unavailable. Try again later.", sender: "bot" }]);
        }
    };

    return (
        <Draggable>
            <div style={styles.chatContainer}>
                <div style={styles.chatHeader} onClick={() => setIsOpen(!isOpen)}>
                    TODO BOT at your service!! 💬
                </div>
                {isOpen && (
                    <div style={styles.chatBody}>
                        <div style={styles.messageContainer}>
                            {messages.map((msg, index) => (
                                <div key={index} style={msg.sender === "user" ? styles.userMessage : styles.botMessage}>
                                    <strong>{msg.sender === "user" ? "You" : "AI"}:</strong> {msg.text}
                                </div>
                            ))}
                        </div>

                        <h4 style={styles.suggestionTitle}>Suggested Questions:</h4>
                        <div style={styles.suggestionContainer}>
                            {suggestions.map((question, index) => (
                                <button key={index} onClick={() => setInput(question)} style={styles.suggestionButton}>
                                    {question}
                                </button>
                            ))}
                        </div>

                        <div style={styles.inputContainer}>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                style={styles.inputField}
                                placeholder="Ask something..."
                            />
                            <button onClick={sendMessage} style={styles.sendButton}>Send</button>
                        </div>
                    </div>
                )}
            </div>
        </Draggable>
    );
};

const styles = {
    chatContainer: {
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 320,
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
        zIndex: 1000,
        overflow: "hidden",
    },
    chatHeader: {
        backgroundColor: "#0078D4",
        color: "#fff",
        padding: "10px",
        cursor: "pointer",
        textAlign: "center",
        fontWeight: "bold",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
    },
    chatBody: {
        padding: "10px",
        maxHeight: "350px",
        overflowY: "auto",
    },
    messageContainer: {
        maxHeight: "200px",
        overflowY: "auto",
        paddingBottom: "10px",
    },
    userMessage: {
        backgroundColor: "#DCF8C6",
        padding: "8px",
        borderRadius: "10px",
        marginBottom: "5px",
        textAlign: "right",
    },
    botMessage: {
        backgroundColor: "#EAEAEA",
        padding: "8px",
        borderRadius: "10px",
        marginBottom: "5px",
        textAlign: "left",
    },
    suggestionTitle: {
        fontSize: "14px",
        fontWeight: "bold",
        marginTop: "10px",
    },
    suggestionContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "5px",
        marginBottom: "10px",
    },
    suggestionButton: {
        backgroundColor: "#f1f1f1",
        border: "none",
        padding: "6px 10px",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "12px",
    },
    suggestionButtonHover: {
        backgroundColor: "#ddd",
    },
    inputContainer: {
        display: "flex",
        alignItems: "center",
    },
    inputField: {
        flex: 1,
        padding: "8px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    sendButton: {
        backgroundColor: "#0078D4",
        color: "white",
        border: "none",
        padding: "8px 15px",
        borderRadius: "5px",
        marginLeft: "5px",
        cursor: "pointer",
    },
};

export default ChatAssistant;
