window.addEventListener("load", function (event) {
  document
    .getElementById("btnCrearUsuario")
    .addEventListener("click", function (evento) {
      // Aquí todo el código que se ejecuta cuando se da click al botón
      crearUsuario();
    });
});

//se manda por medio de fetch los datos necesarios para la creacion de usuarios
async function crearUsuario() {
  let data = {
    usuario: document.getElementById("usuario").value,
  };

  // Ejemplo implementando el metodo POST:
  // Opciones por defecto estan marcadas con un *
  const response = await fetch("../models/CreacionUsuario.php", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  console.log(response.text()); // parses JSON response into native JavaScript objects
}
        