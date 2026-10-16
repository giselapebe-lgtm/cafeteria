const express = require("express");
const path = require("path");
const cors = require("cors");

const pedidosRoutes = require("./routes/pedidosRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const frontend = path.join(__dirname, "../frontend");

app.use(express.static(frontend));

app.get("/", (req, res) => {
  res.sendFile(path.join(frontend, "cafeteria.html"));
});

app.use(pedidosRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});
