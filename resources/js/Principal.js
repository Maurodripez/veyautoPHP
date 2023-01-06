let controlador = "../controllers/";
var deshabilitarClickEditar = 0;

window.addEventListener("load", function (event) {
  ///////////////////////inicializaciones generales///////////////////////////////
  //se muestran los div dependiendo la seccion que se elija
  document.getElementById("btnCitas").addEventListener("click", () => {
    document.getElementById("divCitas").style.display = "";
    document.getElementById("divDatos").style.display = "none";
    document.getElementById("divHerramientas").style.display = "none";
  });
  document.getElementById("btnDatos").addEventListener("click", () => {
    document.getElementById("divCitas").style.display = "none";
    document.getElementById("divDatos").style.display = "";
    document.getElementById("divHerramientas").style.display = "none";
  });
  document.getElementById("btnHerramientas").addEventListener("click", () => {
    document.getElementById("divCitas").style.display = "none";
    document.getElementById("divDatos").style.display = "none";
    document.getElementById("divHerramientas").style.display = "";
  });

  ///////////////////////inicializaciones de usuario//////////////////////////////
  //se inicializa la funcion table para no tener conflictos cada vez que se llama
  let table;
  //se evita asi generar varias veces la misma peticion si no es necesaria
  mostrarUsuarios("inicial");
  $("#btnMostrarUsuarios").on("click", function () {
    //se pregunta si el boton no tiene la clase collapsed para no desplegar varias veces la misma funcion
    if (!$("#btnMostrarUsuariosHijo").hasClass("collapsed")) {
      mostrarUsuarios("destroy");
    }
  });
  $("#btnEditarUsuario").on("click", function () {
    //se pregunta si el boton no tiene la clase collapsed para no desplegar varias veces la misma funcion
    crearEditarUsuario("EditarUsuario", "divLetreroEditar");
  });
  document.getElementById("btnCrearUsuario").addEventListener("click", (e) => {
    crearEditarUsuario("CrearUsuario", "liveAlertPlaceholder");
  });
  ////////////////////////inicializaciones de citas//////////////////////////////
  actualizarCitas();
  //se escucha el click y muestra crea la tabla de usuarios
  operadores();
  $('[data-toggle="tooltip"]').tooltip();
  desplegarCitas();
  document.getElementById("btnGuardarCita").addEventListener("click", () => {
    guardarCita();
  });
  document.getElementById("btnOffCanvas").addEventListener("click", () => {
    infoAdicional();
  });
});
//se ejecuta la funcion cada minuto para refrescar las citas
function actualizarCitas() {
  setInterval(desplegarCitas, 60000);
}

//funciones para Citas
//muestra las citas del operador
function desplegarCitas() {
  $("#citas").fullCalendar({
    header: {
      left: "prev,next today",
      center: "title",
      right: "month,basicWeek,basicDay",
    },
    editable: true,
    events: "../controllers/MostrarEventos.php",
    displayEventTime: true,
    eventRender: function (event, element, view) {
      if (event.allDay === "true") {
        event.allDay = true;
      } else {
        event.allDay = false;
      }
    },
    locale: "es",
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    selectable: true,
    selectHelper: true,
    dayClick: function (date) {
      $("#txtFecha").val(date.format());
      $("#ModalEventos").modal("show");
      // change the day's background color just for fun
      //$(this).css("background-color", "red");
    },
    editable: false,
    eventClick: function (event) {
      document.getElementById("idCitaActual").textContent = event.id;
      $("#ModalMostrarInfoEvento").modal("show");
      mostrarInfoCita();
    },
  });
}
//se crea la funcion para obtener la fecha actual en formato yyyy-mm-dd
function obtenerFechaConvertida(n) {
  const date = new Date();
  date.setDate(date.getDate() - n);
  const pad = (n) => n.toString().padStart(2, "0");

  const yyyy = date.getFullYear(),
    mm = pad(date.getMonth() + 1),
    dd = pad(date.getDate());

  return `${yyyy}-${mm}-${dd}`;
}
//se genera la cita, primero validando si existe ya una cita y despues generandolaF
function guardarCita() {
  let fechaValidar = obtenerFechaConvertida(0) + "";
  if (document.getElementById("txtFecha").value <= fechaValidar) {
    alert("Por favor, selecciona una fecha valida");
    return;
  }
  if (document.getElementById("txtVeri").value == "Verificador") {
    alert("Por favor, selecciona un asesor");
    return;
  }
  if (document.getElementById("txtTitulo").value == "") {
    alert("Por favor, proporciona un titulo");
    return;
  }
  if (
    document.getElementById("txtHoraInicio").value >=
    document.getElementById("txtHoraFinal").value
  ) {
    alert("Por favor, selecciona un horario valido");
    return;
  }
  let folio = document.getElementById("txtFolio").value;
  console.log(folio);
  $.ajax({
    url: "../controllers/ConsultasCitas.php",
    type: "POST",
    dataType: "json",
    data: {
      folio,
      accion: "ValidarCita",
    },
  }).done(function (result) {
    console.log(result);
    //se valida si ya se tiene una cita
    if (result.Respuesta[0].conteo > 0) {
      alert("Ya existe una cita, validar por favor");
      return;
    } else {
      let fecha = document.getElementById("txtFecha").value;
      let horaInicio = document.getElementById("txtHoraInicio").value;
      let horaFin = document.getElementById("txtHoraFinal").value;
      let infoAdicional = document.getElementById("txtInfoAdicional").value;
      let veri = document.getElementById("txtVeri").value;
      let start = `${fecha} ${horaInicio}:00`;
      let end = `${fecha} ${horaFin}:00`;
      let title = document.getElementById("txtTitulo").value;
      $.ajax({
        url: "../controllers/ConsultasCitas.php",
        data: {
          title,
          start,
          end,
          infoAdicional,
          veri,
          folio,
          accion: "CrearCita",
        },
        type: "POST",
        success: function (result) {
          if (result === "Error, el folio no existe") {
            alert(result);
            return;
          } else {
            location.reload();
            alert(result);
          }
        },
      });
    }
  });
}
//muestran todos los operadores para poder asignar una cita
function operadores() {
  $.ajax({
    url: "../controllers/ConsultasCitas.php",
    type: "POST",
    dataType: "JSON",
    data: {
      accion: "MostrarOperadores",
    },
  }).done(function (result) {
    $(".operadores").remove();
    let selectIntegradores = document.getElementById("txtVeri");
    for (let i in result.Operadores) {
      let option = document.createElement("option");
      option.setAttribute("class", "operadores");
      option.text = result.Operadores[i].nombre;
      selectIntegradores.add(option);
    }
  });
}
function mostrarInfoCita() {
  let id = document.getElementById("idCitaActual").textContent;
  console.log(id);
  $.ajax({
    url: controlador + "ConsultasCitas.php",
    type: "POST",
    dataType: "JSON",
    data: {
      accion: "MostrarInfoCita",
      id,
    },
  }).done(function (result) {
    console.log(result);
    let fecha = result.Cita[0].start.split(" ");
    let fechaFinal = result.Cita[0].end.split(" ");
    document.getElementById("txtInfoFecha").value = fecha[0];
    document.getElementById("txtInfoTitulo").value = result.Cita[0].title;
    document.getElementById("txtInfoHoraInicio").value = fecha[1];
    document.getElementById("txtInfoHoraFinal").value = fechaFinal[1];
    document.getElementById("txtInfoInfoAdicional").value =
      result.Cita[0].infoAdicional;
    document.getElementById("txtInfVeri").value = result.Cita[0].verificador;
    //se oculta el collapse para que no muestre informacion erronea
  });
}
function infoAdicional() {
  let id = document.getElementById("idCitaActual").textContent;
  $.ajax({
    url: controlador + "ConsultasCitas.php",
    type: "POST",
    dataType: "JSON",
    data: {
      accion: "InfoAdicional",
      id,
    },
  }).done(function (response) {
    console.log(response);
    let asegurado = `<li style='font-size: 13px' class="list-group-item"><strong>Asegurado:</strong> ${response.InfoAdicional[0].asegurado}</li>`;
    let folio = `<li style='font-size: 13px' class="list-group-item">Folio: ${response.InfoAdicional[0].folio}</li>`;
    let poliza = `<li style='font-size: 13px' class="list-group-item">Poliza: ${response.InfoAdicional[0].poliza}</li>`;
    let celular = `<li style='font-size: 13px' class="list-group-item">Celular: ${response.InfoAdicional[0].celular}</li>`;
    let correo = `<li style='font-size: 13px' class="list-group-item">Correo: ${response.InfoAdicional[0].correo}</li>`;
    let telCasa = `<li style='font-size: 13px' class="list-group-item">Telefono casa: ${response.InfoAdicional[0].telCasa}</li>`;
    let domicilio = `<li style='font-size: 13px' class="list-group-item">Domicilio: ${response.InfoAdicional[0].domicilio}</li>`;
    let alcaldia = `<li style='font-size: 13px' class="list-group-item">Alcaldia: ${response.InfoAdicional[0].alcaldia}</li>`;
    let colonia = `<li style='font-size: 13px' class="list-group-item">Colonia: ${response.InfoAdicional[0].colonia}</li>`;
    let estado = `<li style='font-size: 13px' class="list-group-item">Estado: ${response.InfoAdicional[0].estado}</li>`;
    let cp = `<li style='font-size: 13px' class="list-group-item">C.P: ${response.InfoAdicional[0].cp}</li>`;
    let marcaTipo = `<li style='font-size: 13px' class="list-group-item">Marca: ${response.InfoAdicional[0].marcaTipo}</li>`;
    let numSerie = `<li style='font-size: 13px' class="list-group-item">Serie: ${response.InfoAdicional[0].numSerie}</li>`;
    let placas = `<li style='font-size: 13px' class="list-group-item">Placas: ${response.InfoAdicional[0].placas}</li>`;
    let fechacarga = `<li style='font-size: 13px' class="list-group-item">Fecha carga: ${response.InfoAdicional[0].fechacarga}</li>`;
    let fechaAsignacion = `<li style='font-size: 13px' class="list-group-item">Fecha asignacion: ${response.InfoAdicional[0].fechaAsignacion}</li>`;
    let fechaEntrega = `<li style='font-size: 13px' class="list-group-item">Fecha entrega: ${response.InfoAdicional[0].fechaEntrega}</li>`;
    let fechaVigencia = `<li style='font-size: 13px' class="list-group-item">Fecha vigencia: ${response.InfoAdicional[0].fechaVigencia}</li>`;
    let ul = document.getElementById("ulListaInfo");
    ul.innerHTML =
      asegurado +
      folio +
      poliza +
      celular +
      correo +
      telCasa +
      domicilio +
      alcaldia +
      colonia +
      estado +
      cp +
      marcaTipo +
      numSerie +
      placas +
      fechacarga +
      fechaAsignacion +
      fechaEntrega +
      fechaVigencia;
  });
}

//se manda por medio de fetch los datos necesarios para la creacion de usuarios
async function crearEditarUsuario(accion, idLetrero) {
  let checkSupevisor;
  let checkMensajero;
  let checkConsulta;
  let checkTeamleader;
  let checkOperador;
  if (document.getElementById("checkSupervisor").checked === true) {
    checkSupevisor = "Si";
  } else {
    checkSupevisor = "No";
  }
  if (document.getElementById("checkMensajero").checked === true) {
    checkMensajero = "Si";
  } else {
    checkMensajero = "No";
  }
  if (document.getElementById("checkConsulta").checked === true) {
    checkConsulta = "Si";
  } else {
    checkConsulta = "No";
  }
  if (document.getElementById("checkTeamleader").checked === true) {
    checkTeamleader = "Si";
  } else {
    checkTeamleader = "No";
  }
  if (document.getElementById("checkOperador").checked === true) {
    checkOperador = "Si";
  } else {
    checkOperador = "No";
  }
  let usuario;
  let nombre;
  let password;
  let turno;
  let equipo;
  if (accion === "EditarUsuario") {
    usuario = document.getElementById("txtEditarUsuario").value;
    nombre = document.getElementById("txtEditarNombre").value;
    password = document.getElementById("txtEditarPassword").value;
    turno = document.getElementById("txtEditarTurno").value;
    equipo = document.getElementById("txtEditarEquipo").value;
  } else {
    usuario = document.getElementById("txtUsuario").value;
    nombre = document.getElementById("txtNombre").value;
    password = document.getElementById("txtPassword").value;
    turno = document.getElementById("txtTurno").value;
    equipo = document.getElementById("txtEquipo").value;
  }
  let id = document.getElementById("idEditar").textContent;
  console.log(id);
  console.log(usuario);
  console.log(nombre);
  console.log(password);
  console.log(turno);
  console.log(equipo);
  if (
    usuario.length > 0 &&
    nombre.length > 0 &&
    password.length > 0 &&
    turno.length > 0 &&
    equipo.length > 0
  ) {
    let dataValidar = new FormData();
    dataValidar.append("accion", "ValidarExistencia");
    dataValidar.append("usuario", usuario);
    let request = await fetch(controlador + "AccionesUsuario.php", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: dataValidar, // body data type must match "Content-Type" header
    });
    const respuesta = await request.json();
    console.log(respuesta);
    if (respuesta === 1 && accion != "EditarUsuario") {
      mostrarMensaje(
        "Usuario existente, ingresa uno distinto",
        "danger",
        idLetrero
      );
      return;
    }
    let data = new FormData();
    data.append("usuario", usuario);
    data.append("nombre", nombre);
    data.append("password", password);
    data.append("turno", turno);
    data.append("equipo", equipo);
    data.append("accion", accion);
    data.append("supervisor", checkSupevisor);
    data.append("mensajero", checkMensajero);
    data.append("consulta", checkConsulta);
    data.append("teamleader", checkTeamleader);
    data.append("operador", checkOperador);

    data.append("id", id);
    request = await fetch(controlador + "AccionesUsuario.php", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: data, // body data type must match "Content-Type" header
    });
    const datos = await request.text();
    console.log(datos);
    if (datos === "exito") {
      mostrarMensaje("Usuario creado", "success", idLetrero);
      mostrarUsuarios("destroy");
      return;
    }
    mostrarMensaje("Error al crear usuario", "danger", idLetrero);
    return;
  }
  mostrarMensaje("Por favor, ingresa todos los campos", "danger", idLetrero);
}

function mostrarUsuarios(getParameter) {
  //deshabilita el evento del click para que no se sumen
  $("#tablaUsuarios tbody").off("click");
  if (getParameter === "destroy") {
    table.destroy();
  }
  //obtiene el id del usuario para editar al mismo
  $("#tablaUsuarios tbody").on("click", "button", function () {
    var data = table.row($(this).parents("tr")).data();
    console.log(data);
    document.getElementById("txtEditarUsuario").value = data.usuario;
    document.getElementById("txtEditarNombre").value = data.nombre;
    document.getElementById("txtEditarPerfil").value = data.perfil;
    document.getElementById("txtEditarTurno").value = data.turno;
    document.getElementById("txtEditarEquipo").value = data.equipo;
    document.getElementById("idEditar").textContent = data.id;
  });

  let data = new FormData();
  data.append("accion", "MostrarUsuarios");
  table = new DataTable("#tablaUsuarios", {
    ajax: function (d, cb) {
      fetch("../controllers/AccionesUsuario.php", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => cb(data));
    },
    columnDefs: [
      { targets: 0, data: "usuario" },
      { targets: 1, data: "nombre" },
      { targets: 2, data: "turno" },
      { targets: 3, data: "equipo" },
      { targets: 4, data: "Supervisor" },
      { targets: 5, data: "Mensajero" },
      { targets: 6, data: "Consulta" },
      { targets: 7, data: "Teamleader" },
      { targets: 8, data: "Operador" },
      {
        targets: -1,
        data: null,
        defaultContent: `<div class="btn-group btn-group-sm" role="group">
        <button type="button" class="btn editarUsuario" data-bs-toggle="modal" data-bs-target="#modalEditarUsuario">
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="white" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 
        0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 
        0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 
        1.5 0 0 0 1 2.5v11z"/></svg></button>
        <button type="button" class="btn eliminarUsuario"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white"
        class="bi bi-trash3" viewBox="0 0 16 16"><path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 
        0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 
        16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 
        0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 
        5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 
        0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/></svg></button></div>`,
      },
    ],
    language: {
      search: "Buscar",
    },
    ordering: false,
    info: false,
    scrollY: "50vh",
    scrollCollapse: true,
    paging: false,
  });
  //se emplea la funcion para retrasar un poco el cabio de colores
  setTimeout(() => {
    cambiarColorCeldas();
  }, 100);
}

function a() {
  alert("Hola función a");
}

function b() {
  alert("Hola función mifunción");
}
//funciones generales
//genera un mensaje , remplaza a las alertas
function mostrarMensaje(message, type, idLetrero) {
  const alertPlaceholder = document.getElementById(idLetrero);
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
  //se ejecuta esta linea para hcer desaparecer despues de un tiempo la alerta
  $(".alert")
    .fadeTo(4000, 0)
    .slideUp(100, function () {
      $(this).remove();
    });
}
function cambiarColorCeldas() {
  let nFilas = $("#tablaUsuarios tr").length;
  let idTabla = document.getElementById("tablaUsuarios");
  for (let i = 1; i < nFilas - 1; i++) {
    if (idTabla.rows[i].cells[4].textContent === "Si") {
      cambiosColor(idTabla, i,4);
    } else {
      idTabla.rows[i].cells[4].style.backgroundColor = "rgb(12,34,56)";
    }
    if (idTabla.rows[i].cells[5].textContent === "Si") {
      cambiosColor(idTabla, i,5);
    } else {
      idTabla.rows[i].cells[5].style.backgroundColor = "rgb(12,34,56)";
    }
    if (idTabla.rows[i].cells[6].textContent === "Si") {
      cambiosColor(idTabla, i,6);
    } else {
      idTabla.rows[i].cells[6].style.backgroundColor = "rgb(12,34,56)";
    }
    if (idTabla.rows[i].cells[7].textContent === "Si") {
      cambiosColor(idTabla, i,7);
    } else {
      idTabla.rows[i].cells[7].style.backgroundColor = "rgb(12,34,56)";
    }
    if (idTabla.rows[i].cells[8].textContent === "Si") {
      cambiosColor(idTabla, i,8);
    } else {
      idTabla.rows[i].cells[8].style.backgroundColor = "rgb(12,34,56)";
    }
  }
}
function cambiosColor(idTabla, i,celda) {
  idTabla.rows[i].cells[celda].style.backgroundColor = "green";
  idTabla.rows[i].cells[celda].style.color = "white";
}
