const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("test api");
});

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

//Pour BDD
console.log("MONGODB_URI present:", !!process.env.MONGODB_URI);
// 2) Connexion à MongoDB Atlas
async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // options utiles si besoin:
      // serverSelectionTimeoutMS: 8000
    });
    console.log("✅ MongoDB connecté");

    // 3) Démarrer l’API seulement après la connexion
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Serveur écoute sur le port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Erreur connexion MongoDB:", err.message);
    process.exit(1); // force un restart dans Azure si la connexion échoue
  }
}

start();
