const pedidoModel = require("../models/pedidoModel");

function validarPedido(pedido) {
  const { nombre, correo, producto, cantidad, tamano, observaciones } = pedido;

  return (
    typeof nombre === "string" &&
    nombre.trim() !== "" &&
    typeof correo === "string" &&
    correo.trim() !== "" &&
    typeof producto === "string" &&
    producto.trim() !== "" &&
    Number.isInteger(Number(cantidad)) &&
    Number(cantidad) > 0 &&
    ["Chico", "Mediano", "Grande"].includes(tamano) &&
    (observaciones === undefined || typeof observaciones === "string")
  );
}

async function registrarPedido(req, res) {
  try {
    const pedido = req.body;

    if (!validarPedido(pedido)) {
      return res.status(400).json({
        mensaje: "Los datos del pedido son inválidos",
      });
    }

    const id = await pedidoModel.registrarPedido({
      nombre: pedido.nombre.trim(),
      correo: pedido.correo.trim(),
      producto: pedido.producto.trim(),
      cantidad: Number(pedido.cantidad),
      tamano: pedido.tamano,
      llevar: pedido.llevar === true,
      observaciones: pedido.observaciones || "",
    });

    res.status(201).json({
      mensaje: "Pedido guardado correctamente",
      id,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al guardar el pedido",
    });
  }
}

async function obtenerPedido(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        mensaje: "ID de pedido inválido",
      });
    }

    const pedido = await pedidoModel.obtenerPedido(id);

    if (!pedido) {
      return res.status(404).json({
        mensaje: "Pedido no encontrado",
      });
    }

    res.json(pedido);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al consultar el pedido",
    });
  }
}

async function obtenerPedidos(req, res) {
  try {
    const pedidos = await pedidoModel.obtenerPedidos();

    res.json(pedidos);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al consultar los pedidos",
    });
  }
}

module.exports = {
  registrarPedido,
  obtenerPedido,
  obtenerPedidos,
};
