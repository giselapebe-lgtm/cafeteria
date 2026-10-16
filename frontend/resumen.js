const parametros = new URLSearchParams(window.location.search);

const nombre = parametros.get("nombre");
const correo = parametros.get("correo");
const producto = parametros.get("producto");
const cantidad = Number(parametros.get("cantidad"));
const tamano = parametros.get("tamano");
const llevar = parametros.get("llevar") === "Sí";
const observaciones = parametros.get("observaciones") || "";

const resumen = document.getElementById("resumen");
const mensaje = document.getElementById("mensaje");
const botonConfirmar = document.getElementById("confirmar");
const botonVolver = document.getElementById("volver");

const pedidoValido =
  Boolean(nombre?.trim()) &&
  Boolean(correo?.trim()) &&
  Boolean(producto?.trim()) &&
  Number.isInteger(cantidad) &&
  cantidad > 0 &&
  ["Chico", "Mediano", "Grande"].includes(tamano) &&
  ["Sí", "No"].includes(parametros.get("llevar"));

function mostrarPedido() {
  if (!pedidoValido) {
    resumen.textContent = "No se recibieron datos válidos del pedido.";
    botonConfirmar.disabled = true;
    return;
  }

  resumen.innerHTML = "";

  const campos = [
    ["Cliente", nombre],
    ["Correo", correo],
    ["Producto", producto],
    ["Cantidad", cantidad],
    ["Tamaño", tamano],
    ["Para llevar", llevar ? "Sí" : "No"],
    ["Observaciones", observaciones || "Ninguna"],
  ];

  campos.forEach(([etiqueta, valor]) => {
    const parrafo = document.createElement("p");
    parrafo.textContent = `${etiqueta}: ${valor}`;
    resumen.appendChild(parrafo);
  });
}

async function confirmarPedido() {
  if (!pedidoValido) {
    return;
  }

  const pedido = {
    nombre,
    correo,
    producto,
    cantidad,
    tamano,
    llevar,
    observaciones,
  };

  botonConfirmar.disabled = true;
  botonConfirmar.textContent = "Guardando pedido...";
  mensaje.textContent = "";

  try {
    const respuesta = await fetch("/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || "Error al guardar el pedido");
    }

    mensaje.textContent = `Pedido registrado correctamente. Número de pedido: ${datos.id}`;

    botonConfirmar.textContent = "Pedido confirmado";
    botonVolver.textContent = "Nuevo pedido";

    window.history.replaceState(
      {},
      "",
      "/resumen.html?id=" + encodeURIComponent(datos.id),
    );
  } catch (error) {
    console.error(error);
    mensaje.textContent = error.message;
    botonConfirmar.disabled = false;
    botonConfirmar.textContent = "Confirmar pedido";
  }
}

botonConfirmar.addEventListener("click", confirmarPedido);

botonVolver.addEventListener("click", () => {
  window.location.href = "/";
});

mostrarPedido();
