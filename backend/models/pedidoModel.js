const conexion = require("../config/database");

async function registrarPedido(pedido) {
  const { nombre, correo, producto, cantidad, tamano, llevar, observaciones } =
    pedido;

  const sql = `
    INSERT INTO pedidos
    (nombre, correo, producto, cantidad, tamano, llevar, observaciones)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const [resultado] = await conexion.execute(sql, [
    nombre,
    correo,
    producto,
    cantidad,
    tamano,
    llevar ? 1 : 0,
    observaciones || "",
  ]);

  return resultado.insertId;
}

async function obtenerPedido(id) {
  const sql = "SELECT * FROM pedidos WHERE id = ?";

  const [resultados] = await conexion.execute(sql, [id]);

  return resultados[0] || null;
}

async function obtenerPedidos() {
  const sql = "SELECT * FROM pedidos ORDER BY id DESC";

  const [resultados] = await conexion.execute(sql);

  return resultados;
}

module.exports = {
  registrarPedido,
  obtenerPedido,
  obtenerPedidos,
};
