const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("test api");
});

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

console.log("MONGODB_URI present:", Boolean(uri));

async function start() {
  if (!uri) {
    console.error(
      "❌ MONGODB_URI manquant. Ajoute-le aux variables d’environnement."
    );
    process.exit(1);
  }
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connecté");
  } catch (err) {
    console.error("❌ Erreur connexion MongoDB:", err.message);
    // Option 1: continuer quand même à démarrer le serveur
    // Option 2: process.exit(1) pour échouer le démarrage
  }

  app.listen(PORT, "0.0.0.0", () =>
    console.log(`🚀 Serveur écoute sur le port ${PORT}`)
  );
}

start();
