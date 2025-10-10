const express = require("express");
const connectDB = require("./db");
const mongoose = require("mongoose");

const app = express();

// Connexion à MongoDB
connectDB();

// Middleware pour parser JSON
app.use(express.json());

// Route GET basique
app.get("/", (req, res) => {
    res.send("test api");
});

// Route /ping
app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
});

// Route de test DB : liste les collections
app.get("/testdb", async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        res.json({ collections });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Démarrage serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur écoute sur le port ${PORT}`);
});
