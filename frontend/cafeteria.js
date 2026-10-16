function registrarPedido() {
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const producto = document.getElementById("producto").value;
  const cantidad = Number(document.getElementById("cantidad").value);
  const observaciones = document.getElementById("observaciones").value;
  const llevar = document.getElementById("llevar").checked;

  const seleccionado = document.querySelector('input[name="tamano"]:checked');

  if (!seleccionado) {
    alert("Selecciona el tamaño de la bebida");
    return;
  }

  const tamano = seleccionado.value;

  if (!nombre || !correo || !producto) {
    alert("Completa todos los campos obligatorios");
    return;
  }

  if (!Number.isInteger(cantidad) || cantidad < 1) {
    alert("Ingresa una cantidad válida");
    return;
  }

  if (!["Chico", "Mediano", "Grande"].includes(tamano)) {
    alert("Selecciona un tamaño válido");
    return;
  }

  const parametros = new URLSearchParams({
    nombre,
    correo,
    producto,
    cantidad: String(cantidad),
    tamano,
    llevar: llevar ? "Sí" : "No",
    observaciones,
  });

  window.location.href = "/resumen.html?" + parametros.toString();
}

document
  .getElementById("formulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    registrarPedido();
  });
