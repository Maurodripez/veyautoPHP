window.addEventListener("load", function (event) {
  //btn para crear usuario
  document
    .getElementById("btnIngresar")
    .addEventListener("click", function (event) {
      loginUsuario();
    });
    //btn para ingresar
});

////////funciones login///////
async function loginUsuario() {
  let usuario = document.getElementById("usuario").value;
  let password = document.getElementById("password").value;
  if (
    usuario.length > 0 &&
    password.length > 0
  ) {
    let data = new FormData();
    data.append("usuario", usuario);
    data.append("password", password);
    const response = await fetch("../../controllers/LoginUsuarios.php", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: data, // body data type must match "Content-Type" header
    });
    console.log(response.text());
  }
}
//////////////////////////////////////