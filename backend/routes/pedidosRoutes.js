const express = require("express");
const router = express.Router();

const pedidosController = require("../controllers/pedidosController");

router.post("/pedidos", pedidosController.registrarPedido);

router.get("/pedidos", pedidosController.obtenerPedidos);

router.get("/pedidos/:id", pedidosController.obtenerPedido);

module.exports = router;
