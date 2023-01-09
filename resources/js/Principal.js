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
  document
    .getElementById("btnAcordeonCrearUsuario")
    .addEventListener("click", () => {
      obtenerEquipos("txtEquipo");
    });
  document
    .getElementById("btnAcordionAsignarFolios")
    .addEventListener("click", () => {
      obtenerEquipos("txtEquipoFolios");
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
    e.preventDefault();
  });
  document
    .getElementById("btnEliminarUsuario")
    .addEventListener("click", () => {
      eliminarUsuario();
    });

  ////////////////////////inicializaciones de citas//////////////////////////////
  actualizarCitas();
  //se escucha el click y muestra crea la tabla de usuarios
  //operadores();
  $('[data-toggle="tooltip"]').tooltip();
  desplegarCitas();
  document.getElementById("btnGuardarCita").addEventListener("click", () => {
    crearCita();
  });
  document.getElementById("btnOffCanvas").addEventListener("click", () => {
    infoAdicional();
  });
  ///////////////////////////////////inicializaciones de carga//////////////////////////////
  document.getElementById("btnCargarExcel").addEventListener("click", () => {
    cargarExcel();
  });
  document.getElementById("btnEliminarCarga").addEventListener("click", () => {
    eliminarCarga();
  });
  document
    .getElementById("btnAcordeonEliminarCargas")
    .addEventListener("click", () => {
      obtenerCargas();
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
    defaultView: "basicDay",
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
      obtenerEquipos("txtCitaEquipo");
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
function crearCita() {
  let fechaValidar = obtenerFechaConvertida(0) + "";
  if (document.getElementById("txtFecha").value <= fechaValidar) {
    mostrarMensajeFade(
      "Por favor, selecciona una fecha valida",
      "danger",
      "divLetreroCrearCita"
    );
    //alert("Por favor, selecciona una fecha valida");
    return;
  }
  if (document.getElementById("txtCitaEquipo").value == "Equipo") {
    mostrarMensajeFade(
      "Por favor, selecciona un equipo",
      "danger",
      "divLetreroCrearCita"
    );
    //alert("Por favor, selecciona un equipo");
    return;
  }
  if (document.getElementById("txtTitulo").value == "") {
    mostrarMensajeFade(
      "Por favor, proporciona un titulo",
      "danger",
      "divLetreroCrearCita"
    );
    //alert("Por favor, proporciona un titulo");
    return;
  }
  if (
    document.getElementById("txtHoraInicio").value >=
    document.getElementById("txtHoraFinal").value
  ) {
    mostrarMensajeFade(
      "Por favor, selecciona un horario valido",
      "danger",
      "divLetreroCrearCita"
    );
    //alert("Por favor, selecciona un horario valido");
    return;
  }
  let folio = document.getElementById("txtFolio").value;
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
      mostrarMensajeFade(
        "Ya existe una cita, validar por favor",
        "danger",
        "divLetreroCrearCita"
      );
      //alert("Ya existe una cita, validar por favor");
      return;
    } else {
      let fecha = document.getElementById("txtFecha").value;
      let horaInicio = document.getElementById("txtHoraInicio").value;
      let horaFin = document.getElementById("txtHoraFinal").value;
      let infoAdicional = document.getElementById("txtInfoAdicional").value;
      let equipo = document.getElementById("txtCitaEquipo").value;
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
          equipo,
          folio,
          accion: "CrearCita",
        },
        type: "POST",
        success: function (result) {
          if (result === "Error, el folio no existe") {
            mostrarMensajeFade(
              "Error, el folio no existe",
              "danger",
              "divLetreroCrearCita"
            );
            return;
          } else {
            mostrarMensajeFade("Cita creada", "success", "divLetreroCrearCita");
            setTimeout(() => {
              location.reload();
            }, 2000);
          }
        },
      });
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
    document.getElementById("txtInfEquipo").value = result.Cita[0].equipo;
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

//////////////////////funciones para creacion de usuarios////////////////
//se manda por medio de fetch los datos necesarios para la creacion de usuarios
function crearEditarUsuario(accion, idLetrero) {
  let checkSupevisor;
  let checkMensajero;
  let checkConsulta;
  let checkTeamleader;
  let checkOperador;
  let idSupevisor;
  let idMensajero;
  let idConsulta;
  let idTeamleader;
  let idOperador;
  let usuario;
  let nombre;
  let password;
  let turno;
  let equipo;
  if (accion === "EditarUsuario") {
    idSupevisor = "checkEditarSupervisor";
    idMensajero = "checkEditarMensajero";
    idConsulta = "checkEditarConsulta";
    idTeamleader = "checkEditarTeamleader";
    idOperador = "checkEditarOperador";
    usuario = document.getElementById("txtEditarUsuario").value;
    nombre = document.getElementById("txtEditarNombre").value;
    password = document.getElementById("txtEditarPassword").value;
    turno = document.getElementById("txtEditarTurno").value;
    equipo = document.getElementById("txtEditarEquipo").value;
  } else {
    idSupevisor = "checkSupervisor";
    idMensajero = "checkMensajero";
    idConsulta = "checkConsulta";
    idTeamleader = "checkTeamleader";
    idOperador = "checkOperador";
    usuario = document.getElementById("txtUsuario").value;
    nombre = document.getElementById("txtNombre").value;
    password = document.getElementById("txtPassword").value;
    turno = document.getElementById("txtTurno").value;
    equipo = document.getElementById("txtEquipo").value;
  }
  //se valida si esta seleccionada y se cambia por no y si
  if (document.getElementById(idSupevisor).checked === true) {
    checkSupevisor = "Si";
  } else {
    checkSupevisor = "No";
  }
  if (document.getElementById(idMensajero).checked === true) {
    checkMensajero = "Si";
  } else {
    checkMensajero = "No";
  }
  if (document.getElementById(idConsulta).checked === true) {
    checkConsulta = "Si";
  } else {
    checkConsulta = "No";
  }
  if (document.getElementById(idTeamleader).checked === true) {
    checkTeamleader = "Si";
  } else {
    checkTeamleader = "No";
  }
  if (document.getElementById(idOperador).checked === true) {
    checkOperador = "Si";
  } else {
    checkOperador = "No";
  }
  let id = document.getElementById("idEditar").textContent;
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
    fetch(controlador + "AccionesUsuario.php", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: dataValidar, // body data type must match "Content-Type" header
    })
      .then((response) => response.json())
      .then((respuesta) => {
        console.log(respuesta);
        if (respuesta >= 1 && accion != "EditarUsuario") {
          mostrarMensajeFade(
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
        fetch(controlador + "AccionesUsuario.php", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          body: data, // body data type must match "Content-Type" header
        })
          .then((response) => response.text())
          .then((respuesta) => {
            console.log(respuesta);
            if (respuesta === "exito") {
              mostrarMensajeFade("Usuario creado", "success", idLetrero);
              mostrarUsuarios("destroy");
              return;
            }
            mostrarMensajeFade("Error al crear usuario", "danger", idLetrero);
            return;
          });
      });
  } else {
    mostrarMensajeFade(
      "Por favor, ingresa todos los campos",
      "danger",
      idLetrero
    );
  }
}
//por medio de datatables obtenemos los resultados y los mostramos
function mostrarUsuarios(getParameter) {
  //deshabilita el evento del click para que no se sumen
  $("#tablaUsuarios tbody").off("click");
  if (getParameter === "destroy") {
    table.destroy();
  }
  //obtiene el id del usuario para editar al mismo
  $("#tablaUsuarios tbody").on("click", "button", function () {
    var data = table.row($(this).parents("tr")).data();
    document.getElementById("idEditar").textContent = data.id;
    obtenerEquipos("txtEditarEquipo");
    console.log(data.id);
    document.getElementById("txtEditarUsuario").value = data.usuario;
    document.getElementById("txtEditarNombre").value = data.nombre;
    document.getElementById("txtEditarTurno").value = data.turno;
    document.getElementById("txtEditarEquipo").value = data.equipo;
    if (data.Supervisor === "Si") {
      document.getElementById("checkEditarSupervisor").checked = true;
    } else {
      document.getElementById("checkEditarSupervisor").checked = false;
    }
    if (data.Mensajero === "Si") {
      document.getElementById("checkEditarMensajero").checked = true;
    } else {
      document.getElementById("checkEditarMensajero").checked = false;
    }
    if (data.Consulta === "Si") {
      document.getElementById("checkEditarConsulta").checked = true;
    } else {
      document.getElementById("checkEditarConsulta").checked = false;
    }
    if (data.Teamleader === "Si") {
      document.getElementById("checkEditarTeamleader").checked = true;
    } else {
      document.getElementById("checkEditarTeamleader").checked = false;
    }
    if (data.Operador === "Si") {
      document.getElementById("checkEditarOperador").checked = true;
    } else {
      document.getElementById("checkEditarOperador").checked = false;
    }
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
        1.5 0 0 0 1 2.5v11z"/></svg></button>`,
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
  }, 300);
}
function eliminarUsuario() {
  if (window.confirm("Eliminar usuario?")) {
    let id = document.getElementById("idEditar").textContent;
    console.log(id);
    let data = new FormData();
    data.append("id", id);
    data.append("accion", "EliminarUsuario");
    fetch(controlador + "AccionesUsuario.php", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: data, // body data type must match "Content-Type" header
    })
      .then((response) => response.text())
      .then((respuesta) => {
        if (respuesta === "Eliminado con exito") {
          mostrarMensajeNoFade(respuesta, "success", "divLetreroEditar");
          setTimeout(function () {
            mostrarUsuarios("destroy");
            $("#modalEditarUsuario").modal("hide");
          }, 2000);
        } else {
          mostrarMensajeNoFade(respuesta, "danger", "divLetreroEditar");
        }
      });
  }
}
//////////////////////////funciones carga de folios////////////////
//se carga el archivo excel para asignar a los equipos
async function cargarExcel() {
  const excelInput = document.getElementById("LeerExcel");
  const contenido = await readXlsxFile(excelInput.files[0]);
  let equipo = document.getElementById("txtEquipoFolios").value;
  if (equipo === "") {
    mostrarMensajeFade("Selecciona un equipo", "danger", "divLetreroCarga");
    return;
  }
  if (!contenido) {
    mostrarMensajeFade(
      "Selecciona un archivo XLSX",
      "danger",
      "divLetreroCarga"
    );
    return;
  }
  let dataCrearCarga = new FormData();
  dataCrearCarga.append("accion", "CrearCarga");
  let cantidadFolios = contenido.length - 1;
  dataCrearCarga.append("cantidadFolios", cantidadFolios);
  fetch(controlador + "CargarInformacion.php", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: dataCrearCarga, // body data type must match "Content-Type" header
  })
    .then((response) => response.text())
    .then((respuesta) => {
      let fk = respuesta;
      for (let x = 1; x < contenido.length; x++) {
        try {
          let fechaAsignacion = contenido[x][3].toISOString().split("T")[0];
          let data = new FormData();
          data.append("accion", "CargarExcel");
          data.append("cantidadFolios", cantidadFolios);
          data.append("folio", contenido[x][0]);
          data.append("poliza", contenido[x][1]);
          data.append("verificador", contenido[x][2]);
          data.append("asegurado", contenido[x][4]);
          data.append("ciudad", contenido[x][5]);
          data.append("colonia", contenido[x][6]);
          data.append("calle", contenido[x][7]);
          data.append("celular", contenido[x][8]);
          data.append("correo", contenido[x][9]);
          data.append("placas", contenido[x][10]);
          data.append("serie", contenido[x][11]);
          data.append("equipo", equipo);
          data.append("fk", fk);
          data.append("fechaAsignacion", fechaAsignacion);
          fetch(controlador + "CargarInformacion.php", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            body: data, // body data type must match "Content-Type" header
          })
            .then((response) => response.text())
            .then((respuesta) => {
              console.log(respuesta);
              if (respuesta === "0") {
                mostrarMensajeNoFade(
                  "error con la fila:" +
                    x +
                    " verificar los datos y volver a cargarlo",
                  "danger",
                  "divLetreroCarga"
                );
              }
            });
        } catch (error) {
          mostrarMensajeNoFade(
            "error con la fila:" +
              x +
              " verificar los datos y volver a cargarlo",
            "danger",
            "divLetreroCarga"
          );
        }
      }
      mostrarMensajeFade("Cargado con exito", "success", "divLetreroCarga");
    });
}
function obtenerCargas() {
  let data = new FormData();
  data.append("accion", "ObtenerCargas");
  fetch(controlador + "CargarInformacion.php", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: data, // body data type must match "Content-Type" header
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((respuesta) => {
      console.log(respuesta);
      $(".cargas").remove();
      let selectCargas = document.getElementById("selectEliminarCarga");
      for (let i in respuesta.Cargas) {
        let option = document.createElement("option");
        option.setAttribute("class", "cargas");
        option.text =
          respuesta.Cargas[i].fechasDeCargas +
          "/Folios: " +
          respuesta.Cargas[i].cantidadFolios;
        option.value = respuesta.Cargas[i].id;
        selectCargas.add(option);
      }
    });
}
//se obtiene el value para saber el id de la carga y asu elminarla
function eliminarCarga() {
  let idCarga = document.getElementById("selectEliminarCarga").value;
  console.log(idCarga);
  let data = new FormData();
  data.append("id", idCarga);
  data.append("accion", "EliminarCarga");
  fetch(controlador + "CargarInformacion.php", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: data, // body data type must match "Content-Type" header
  })
    .then((response) => response.text())
    .then((respuesta) => {
      console.log(respuesta);
    });
}
////////////////////////////funciones generales///////////////////////////
//genera un mensaje , remplaza a las alertas
function mostrarMensajeFade(message, type, idLetrero) {
  const alertPlaceholder = document.getElementById(idLetrero);
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alertFade alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
  //se ejecuta esta linea para hcer desaparecer despues de un tiempo la alerta
  $(".alert.alertFade")
    .fadeTo(5000, 0)
    .slideUp(50, function () {
      $(this).remove();
    });
}
//madna el menaje pero no desaparece hasta que el usuario lo elimine
function mostrarMensajeNoFade(message, type, idLetrero) {
  const alertPlaceholder = document.getElementById(idLetrero);
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alertNoFade alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
}
//se cambian los colores edependiendo como estan los resultados de la tabla
//se accede a las celdas en especifico para verificar si e; valor es verdadero
function cambiarColorCeldas() {
  let nFilas = $("#tablaUsuarios tr").length;
  let idTabla = document.getElementById("tablaUsuarios");
  for (let i = 1; i < nFilas - 1; i++) {
    if (idTabla.rows[i].cells[4].textContent === "Si") {
      cambiosColor(idTabla, i, 4, "0091ff", "ffffff");
    } else {
      cambiosColor(idTabla, i, 4, "AFAFAF", "000000");
    }
    if (idTabla.rows[i].cells[5].textContent === "Si") {
      cambiosColor(idTabla, i, 5, "0091ff", "ffffff");
    } else {
      cambiosColor(idTabla, i, 5, "AFAFAF", "000000");
    }
    if (idTabla.rows[i].cells[6].textContent === "Si") {
      cambiosColor(idTabla, i, 6, "0091ff", "ffffff");
    } else {
      cambiosColor(idTabla, i, 6, "AFAFAF", "000000");
    }
    if (idTabla.rows[i].cells[7].textContent === "Si") {
      cambiosColor(idTabla, i, 7, "0091ff", "ffffff");
    } else {
      cambiosColor(idTabla, i, 7, "AFAFAF", "000000");
    }
    if (idTabla.rows[i].cells[8].textContent === "Si") {
      cambiosColor(idTabla, i, 8, "0091ff", "ffffff");
    } else {
      cambiosColor(idTabla, i, 8, "AFAFAF", "000000");
    }
  }
}
//manda los parametros para que cambien de color
function cambiosColor(idTabla, i, celda, colorBack, colorLetra) {
  idTabla.rows[i].cells[celda].style.backgroundColor = `#${colorBack}`;
  idTabla.rows[i].cells[celda].style.color = `#${colorLetra}`;
}
//obtiene los equipos y los asigna al select que le mandan por parametro
function obtenerEquipos(idselect) {
  let data = new FormData();
  data.append("accion", "ObtenerEquipos");
  fetch(controlador + "AccionesUsuario.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      $(".equipos").remove();
      let selectEquipos = document.getElementById(idselect);
      for (let i in data.Equipos) {
        let option = document.createElement("option");
        option.setAttribute("class", "equipos");
        option.text = data.Equipos[i].nombre;
        selectEquipos.add(option);
      }
    });
}
////////////////////Datos////////////////////////////
function mostrarFolios() {
  //deshabilita el evento del click para que no se sumen
  $("#tablaFolios tbody").off("click");
  if (getParameter === "destroy") {
    table.destroy();
  }
  //obtiene el id del usuario para editar al mismo
  $("#tablaFolios tbody").on("click", "button", function () {
    var data = table.row($(this).parents("tr")).data();
    //document.getElementById("idEditar").textContent = data.id;
    //obtenerEquipos("txtEditarEquipo");
    console.log(data);
    //document.getElementById("txtEditarUsuario").value = data.usuario;
    //document.getElementById("txtEditarNombre").value = data.nombre;
    //document.getElementById("txtEditarTurno").value = data.turno;
    //document.getElementById("txtEditarEquipo").value = data.equipo;
  });

  let data = new FormData();
  data.append("accion", "MostrarFolios");
  table = new DataTable("#tablaFolios", {
    ajax: function (d, cb) {
      fetch("../controllers/accionesFolios.php", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => cb(data));
    },
    columnDefs: [
      { targets: 0, data: "folio" },
      { targets: 1, data: "fechacarga" },
      { targets: 2, data: "ultimoSeguimiento" },
      { targets: 3, data: "situacion" },
      { targets: 4, data: "comentSeguimiento" },
      { targets: 5, data: "diasTranscurridos" },
      { targets: 6, data: "poliza" },
      { targets: 7, data: "asegurado" },
      { targets: 8, data: "celular" },
      { targets: 9, data: "telCasa" },
      { targets: 10, data: "marcaTipo" },
      { targets: 11, data: "numSerie" },
      { targets: 12, data: "estacion" },
      { targets: 13, data: "clasificacion" },
      {
        targets: -1,
        data: null,
        defaultContent: `<div class="btn-group btn-group-sm" role="group">
          <button type="button" class="btn editarUsuario" data-bs-toggle="modal" data-bs-target="#modalEditarUsuario">
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="white" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 
          0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 
          0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 
          1.5 0 0 0 1 2.5v11z"/></svg></button>`,
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
  }, 300);
}
