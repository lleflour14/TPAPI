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
app.listen(PORT, () => {
    console.log(`Serveur écoute sur le port ${PORT}`);
});
