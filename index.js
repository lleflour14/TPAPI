const express = require("express");
const app = express();

// Route GET basique
app.get("/", (req, res) => {
    res.send("test api");
});

// Autre route de test
app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
