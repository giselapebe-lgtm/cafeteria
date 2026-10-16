const parametros = new URLSearchParams(window.location.search);

const cliente = parametros.get("cliente");

documen.getElementById("cliente").textContent = cliente;
