let controlador = "../controllers/";
var deshabilitarClickEditar = 0;
var primeraTabla = true;
window.addEventListener("load", function (event) {
  //se inicializa la funcion table para no tener conflictos cada vez que se llama
  ////////////////////////inicializaciones//////////////////////////////
  inicializacionesDivs();
  inicializacionesCitas();
  inicializacionestDatos();
  inicializacionesHerramientas();
  inicializacionestGenerales();
  $('[data-toggle="tooltip"]').tooltip();
});

///////////////////////////funciones para Citas/////////////////////////////////////////////
//muestra las citas del operador
function desplegarCitas(mayor, menor) {
  $("#citas").fullCalendar({
    header: {
      left: "prev,next today",
      center: "title",
      right: "month,basicWeek,basicDay",
    },
    defaultView: "basicDay",
    events: `../controllers/MostrarEventos.php?mayor=${mayor}&menor=${menor}`,
    displayEventTime: true,
    eventRender: function (event, element, view) {
      console.log(event);
      //cambia de manera dinamica los colores de las citas, dependiendo la cantidad
      //de dias que esten activas desde su carga
      if (event.dias < 5) {
        element.find(".fc-content").css("color", "#3f3f3f");
        element.find(".fc-content").css("background-color", "#70ffb3");
      } else if (event.dias >= 5 && event.dias < 10) {
        element.find(".fc-content").css("color", "#3f3f3f");
        element.find(".fc-content").css("background-color", "#fdff9c");
      } else if (event.dias >= 10) {
        element.find(".fc-content").css("background-color", "#fc9494");
        element.find(".fc-content").css("color", "#3f3f3f");
      }
      //muestra mas informacion
      element.find(".fc-content").append("<br/>" + event.infoAdicional);
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
function inicializacionesCitas() {
  document.getElementById("btnOffCanvas").addEventListener("click", () => {
    infoAdicional("idCitaActual", "ulListaInfo", "Citas");
  });
  document.getElementById("btnGuardarCita").addEventListener("click", () => {
    crearCita();
  });
  ponerColorCitas();
  desplegarCitas(0, 14);
  conteoFoliosCitas(0, 5, "conteoVerde", "FoliosCitas");
  conteoFoliosCitas(5, 10, "conteoNaranja", "FoliosCitas");
  conteoFoliosCitas(10, 14, "conteoRojo", "FoliosCitas");
  conteoFoliosCitas(0, 5, "verdeNoCita", "FoliosActivosNoCitas");
  conteoFoliosCitas(5, 10, "naranjaNoCita", "FoliosActivosNoCitas");
  conteoFoliosCitas(10, 14, "rojoNoCita", "FoliosActivosNoCitas");
  conteoFoliosCitas(0, 5, "verdeTotal", "FoliosTotalesActivos");
  conteoFoliosCitas(5, 10, "naranjaTotal", "FoliosTotalesActivos");
  conteoFoliosCitas(10, 14, "rojoTotal", "FoliosTotalesActivos");
  conteoFoliosCitas(0, 14, "totalCitas", "TotalCitas");
  conteoFoliosCitas(0, 14, "totalNoCitas", "TotalNoCitas");
  conteoFoliosCitas(0, 14, "totalActivos", "TotalActivos");
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
    //se valida si ya se tiene una cita
    if (result.Respuesta[0].conteo > 0) {
      mostrarMensajeFade(
        "Ya existe una cita, validar por favor",
        "danger",
        "divLetreroCrearCita"
      );
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
          fecha,
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
            //refresca las citas que tenemos
            $("#citas").fullCalendar("refetchEvents");
            setTimeout(() => {
              //cierra el modal
              $("#ModalEventos").modal("hide");
            }, 1000);
          }
        },
      });
    }
  });
}
function mostrarInfoCita() {
  $(".modal-content").css("border", "black solid 1px");
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
function infoAdicional(idCita, idUl, consulta) {
  let id = document.getElementById(idCita).textContent;
  let data = new FormData();
  data.append("id", id);
  data.append("accion", "InfoAdicional");
  data.append("consulta", consulta);
  fetch(controlador + "ConsultasCitas.php", {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((respuesta) => {
      console.log(respuesta);

      let aseguradoFolio = `<div class="row">
        <div class="col">
          <li style='font-size: 13px' class="list-group-item"><strong>Asegurado:</strong> ${respuesta.InfoAdicional[0].asegurado}</li>
        </div>
        <div class="col">
          <li style='font-size: 13px' class="list-group-item">Folio: ${respuesta.InfoAdicional[0].folio}</li>
        </div>
        <div class="col">
          <li style='font-size: 13px' class="list-group-item">Poliza: ${respuesta.InfoAdicional[0].poliza}</li>
        </div>
      </div>`;
      let polizaCelular = `<div class="row">
        <div class="col">
          <li style='font-size: 13px' class="list-group-item">Celular: ${respuesta.InfoAdicional[0].celular}</li>
        </div>
        <div class="col">
          <li style='font-size: 13px' class="list-group-item">Correo: ${respuesta.InfoAdicional[0].correo}</li>
        </div>
        <div class="col">
          <li style='font-size: 13px' class="list-group-item">Telefono casa: ${respuesta.InfoAdicional[0].telCasa}</li>
        </div>
      </div>`;
      let domicilioAlcaldia = `<div class="row">
        <div class="col">
          <li style='font-size: 13px' class="list-group-item">Domicilio: ${respuesta.InfoAdicional[0].domicilio}</li>
        </div>
        <div class="col">
          <li style='font-size: 13px' class="list-group-item">Alcaldia: ${respuesta.InfoAdicional[0].alcaldia}</li>
        </div>
        <div class="col">
          <li style='font-size: 13px' class="list-group-item">Colonia: ${respuesta.InfoAdicional[0].colonia}</li>
        </div>
      </div>`;
      let coloniaEstado = `<div class="row">
        <div class="col">
          <li style='font-size: 13px' class="list-group-item">Estado: ${respuesta.InfoAdicional[0].estado}</li>
        </div>
        <div class="col">
          <li style='font-size: 13px' class="list-group-item">C.P: ${respuesta.InfoAdicional[0].cp}</li>
        </div>
        <div class="col">
          <li style='font-size: 13px' class="list-group-item">Marca: ${respuesta.InfoAdicional[0].marcaTipo}</li>
        </div>
      </div>`;
      let seriePlacas = `<div class="row">
        <div class="col">
          <li style='font-size: 13px' class="list-group-item">Serie: ${respuesta.InfoAdicional[0].numSerie}</li>
        </div>
        <div class="col">
          <li style='font-size: 13px' class="list-group-item">Placas: ${respuesta.InfoAdicional[0].placas}</li>
        </div>
        <div class="col">
          <li style='font-size: 13px' class="list-group-item">Fecha carga: ${respuesta.InfoAdicional[0].fechacarga}</li>
        </div>
      </div>`;
      let cargaAsignacion = `<div class="row">
        <div class="col">
          <li style='font-size: 13px' class="list-group-item">Fecha asignacion: ${respuesta.InfoAdicional[0].fechaAsignacion}</li>
        </div>
        <div class="col">
          <li style='font-size: 13px' class="list-group-item">Fecha entrega: ${respuesta.InfoAdicional[0].fechaEntrega}</li>
        </div>
        <div class="col">
          <li style='font-size: 13px' class="list-group-item">Fecha vigencia: ${respuesta.InfoAdicional[0].fechaVigencia}</li>
        </div>
      </div>`;
      let ul = document.getElementById(idUl);
      ul.innerHTML =
        aseguradoFolio +
        polizaCelular +
        domicilioAlcaldia +
        coloniaEstado +
        seriePlacas +
        cargaAsignacion;
      document.getElementById("txtEditarCelular").value =
        respuesta.InfoAdicional[0].celular;
      document.getElementById("txtEditarTelCasa").value =
        respuesta.InfoAdicional[0].telCasa;
      document.getElementById("txtEditarTelOficina").value =
        respuesta.InfoAdicional[0].telOficina;
      document.getElementById("txtEditarMarcaTipo").value =
        respuesta.InfoAdicional[0].marcaTipo;
      document.getElementById("txtEditarCorreo").value =
        respuesta.InfoAdicional[0].correo;
      document.getElementById("txtEditarModelo").value =
        respuesta.InfoAdicional[0].modelo;
      document.getElementById("txtEditarPlacas").value =
        respuesta.InfoAdicional[0].placas;
      document.getElementById("txtEditarSerie").value =
        respuesta.InfoAdicional[0].numSerie;
      document.getElementById("txtFechaAsignacion").value =
        respuesta.InfoAdicional[0].fechacarga;
    });
}
function actualizarDatos() {
  let id = document.getElementById("idFolio").textContent;
  let data = new FormData();
  data.append("accion", "ActualizarInfo");
  data.append("id", id);
  data.append("celular", document.getElementById("txtEditarCelular").value);
  data.append("telCasa", document.getElementById("txtEditarTelCasa").value);
  data.append(
    "telOficina",
    document.getElementById("txtEditarTelOficina").value
  );
  data.append("marcaTipo", document.getElementById("txtEditarMarcaTipo").value);
  data.append("correo", document.getElementById("txtEditarCorreo").value);
  data.append("modelo", document.getElementById("txtEditarModelo").value);
  data.append("placas", document.getElementById("txtEditarPlacas").value);
  data.append("numSerie", document.getElementById("txtEditarSerie").value);
  data.append("equipo", document.getElementById("txtEditarEquipoFolio").value);
  try {
    fetch(controlador + "AccionesFolios.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.text())
      .then((respuesta) => {
        console.log(respuesta);
        if (respuesta === "Exito al actualizar") {
          mostrarMensajeFade(
            "Exito al actualizar folio",
            "success",
            "divActualizarDatos"
          );
        } else {
          mostrarMensajeNoFade(
            "Error al actualizar Folio",
            "danger",
            "divActualizarDatos"
          );
        }
      });
  } catch (error) {
    mostrarMensajeNoFade(
      "Error al actualizar Folio",
      "danger",
      "divActualizarDatos"
    );
    return;
  }
}
//oculta los cintillos que son de otros dias
//solo se ocultan encontrando los componentes con su color
function ponerColorCitas() {
  let listado = document.querySelectorAll(".listadoColores");
  let verde = "rgb(112, 255, 179)";
  let rojo = "rgb(252, 148, 148)";
  let naranja = "rgb(253, 255, 156)";
  for (let i = 0; i < listado.length; i++) {
    listado[i].addEventListener("click", (e) => {
      let listadoFC = document.querySelectorAll(".fc-content");
      let listadoFCC = document.querySelectorAll(".fc-day-grid-event");
      for (let n = 0; n < listadoFC.length; n++) {
        let colorCintillo = listadoFC[n].style.backgroundColor;
        if (
          listado[i].id === "btnCitasVerdes" &&
          (colorCintillo === rojo || colorCintillo === naranja)
        ) {
          listadoFC[n].style.display = "none";
          listadoFCC[n].style.borderColor = "#ffffff00";
        } else if (
          listado[i].id === "btnCitasNaranjas" &&
          (colorCintillo === rojo || colorCintillo === verde)
        ) {
          listadoFCC[n].style.borderColor = "#ffffff00";
          listadoFC[n].style.display = "none";
        } else if (
          listado[i].id === "btnCitasRojas" &&
          (colorCintillo === verde || colorCintillo === naranja)
        ) {
          listadoFCC[n].style.borderColor = "#ffffff00";
          listadoFC[n].style.display = "none";
        } else {
          listadoFCC[n].style.borderColor = "white";
          listadoFC[n].style.display = "";
        }
      }
    });
  }
}
function conteoFoliosCitas(mayor, menor, id, accion) {
  let data = new FormData();
  data.append("accion", accion);
  data.append("mayor", mayor);
  data.append("menor", menor);
  fetch(controlador + "ConsultasCitas.php", {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((respuesta) => {
      document.getElementById(id).textContent = respuesta.Folios[0].conteo;
    });
}
//////////////////////funciones para herramientas////////////////
function inicializacionesHerramientas() {
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
  mostrarUsuarios("inicial");
  //se evita asi generar varias veces la misma peticion si no es necesaria
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
}
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
function mostrarUsuarios() {
  //deshabilita el evento del click para que no se sumen
  $("#tablaUsuarios tbody").off("click");
  //obtiene el id del usuario para editar al mismo
  $("#tablaUsuarios tbody").on("click", "button", function () {
    var data = table.row($(this).parents("tr")).data();
    document.getElementById("idEditar").textContent = data.id;
    obtenerEquipos("txtEditarEquipo");
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
    //se pintan las celdas de la tabla dependiendo cuantos dias han pasado
    rowCallback: function (row, data) {
      if (data.Consulta === "Si") {
        $($(row).find("td")[4]).css("background-color", "#c1d7e7");
      } else {
        $($(row).find("td")[4]).css("background-color", "#C8C8C8");
      }
      if (data.Mensajero === "Si") {
        $($(row).find("td")[5]).css("background-color", "#c1d7e7");
      } else {
        $($(row).find("td")[5]).css("background-color", "#C8C8C8");
      }
      if (data.Operador === "Si") {
        $($(row).find("td")[6]).css("background-color", "#c1d7e7");
      } else {
        $($(row).find("td")[6]).css("background-color", "#C8C8C8");
      }
      if (data.Supervisor === "Si") {
        $($(row).find("td")[7]).css("background-color", "#c1d7e7");
      } else {
        $($(row).find("td")[7]).css("background-color", "#C8C8C8");
      }
      if (data.Teamleader === "Si") {
        $($(row).find("td")[8]).css("background-color", "#c1d7e7");
      } else {
        $($(row).find("td")[8]).css("background-color", "#C8C8C8");
      }
    },
    language: {
      search: "Buscar",
    },
    fixedHeader: true,
    destroy: true, //linea para no causar conflicto con otras tablas
    ordering: false,
    info: false,
    scrollY: "50vh",
    scrollCollapse: true,
    paging: false,
    responsive: true,
  });
  //se emplea la funcion para retrasar un poco el cabio de colores
  setTimeout(() => {
    //cambiarColorCeldas();
  }, 300);
}
async function eliminarUsuario() {
  if (window.confirm("Eliminar usuario?")) {
    let id = document.getElementById("idEditar").textContent;
    let data = new FormData();
    data.append("id", id);
    let url = "AccionesUsuario.php";
    data.append("accion", "EliminarUsuario");
    let eliminarUsuario = new claseFetch(data, url).fetchTexto();
    let respuesta = await eliminarUsuario;
    if (respuesta === "Eliminado con exito") {
      mostrarMensajeNoFade(respuesta, "success", "divLetreroEditar");
      setTimeout(function () {
        mostrarUsuarios("destroy");
        $("#modalEditarUsuario").modal("hide");
      }, 1500);
    } else {
      mostrarMensajeNoFade(respuesta, "danger", "divLetreroEditar");
    }
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
          console.log(fechaAsignacion);
          let data = new FormData();
          data.append("accion", "CargarExcel");
          data.append("cantidadFolios", cantidadFolios);
          data.append("folio", contenido[x][0]);
          data.append("poliza", contenido[x][1]);
          data.append("verificador", contenido[x][2]);
          data.append("asegurado", contenido[x][4]);
          data.append("colonia", contenido[x][5]);
          data.append("calle", contenido[x][6]);
          data.append("celular", contenido[x][7]);
          data.append("correo", contenido[x][8]);
          data.append("placas", contenido[x][9]);
          data.append("serie", contenido[x][10]);
          data.append("cp", contenido[x][11]);
          data.append("del", contenido[x][12]);
          data.append("estado", contenido[x][13]);
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
////////////////////Datos////////////////////////////
function inicializacionestDatos() {
  document.getElementById("btnEliminarFolio").addEventListener("click", () => {
    eliminarFolio();
  });
  document.getElementById("btnBuscarFiltro").addEventListener("click", () => {
    conteoEstatusFiltros();
  });
  document
    .getElementById("btnGenerarCitaFolios")
    .addEventListener("click", () => {
      generarCitasFolios();
    });
  document
    .getElementById("btnActualizarFolio")
    .addEventListener("click", () => {
      actualizarDatos();
    });
  conteoSituacion(
    "ConteoSituacion",
    "conteoNuevos",
    obtenerFechaConvertida(30),
    obtenerFechaConvertida(0),
    obtenerFechaConvertida(30),
    obtenerFechaConvertida(0),
    "Nuevo"
  );
  conteoSituacion(
    "ConteoSituacion",
    "conteoSeguimiento",
    obtenerFechaConvertida(30),
    obtenerFechaConvertida(0),
    obtenerFechaConvertida(30),
    obtenerFechaConvertida(0),
    "En seguimiento"
  );
  conteoSituacion(
    "ConteoSituacion",
    "conteoConcluidos",
    obtenerFechaConvertida(30),
    obtenerFechaConvertida(0),
    obtenerFechaConvertida(30),
    obtenerFechaConvertida(0),
    "Concluido"
  );
  conteoSituacion(
    "ConteoTotal",
    "totalSituacion",
    obtenerFechaConvertida(30),
    obtenerFechaConvertida(0),
    obtenerFechaConvertida(30),
    obtenerFechaConvertida(0),
    "Nuevo"
  );
  dateRange("fechaSegRange");
  dateRange("fechaCargaRange");
  obtenerEquipos("filtroEquipo");
  conteoFoliosCitas(0, 5, "conteoVerdeDatos", "FoliosCitas");
  conteoFoliosCitas(5, 10, "conteoNaranjaDatos", "FoliosCitas");
  conteoFoliosCitas(10, 14, "conteoRojoDatos", "FoliosCitas");
  conteoFoliosCitas(0, 5, "verdeNoCitaDatos", "FoliosActivosNoCitas");
  conteoFoliosCitas(5, 10, "naranjaNoCitaDatos", "FoliosActivosNoCitas");
  conteoFoliosCitas(10, 14, "rojoNoCitaDatos", "FoliosActivosNoCitas");
  conteoFoliosCitas(0, 5, "verdeTotalDatos", "FoliosTotalesActivos");
  conteoFoliosCitas(5, 10, "naranjaTotalDatos", "FoliosTotalesActivos");
  conteoFoliosCitas(10, 14, "rojoTotalDatos", "FoliosTotalesActivos");
  conteoFoliosCitas(0, 14, "totalCitasDatos", "TotalCitas");
  conteoFoliosCitas(0, 14, "totalNoCitasDatos", "TotalNoCitas");
  conteoFoliosCitas(0, 14, "totalActivosDatos", "TotalActivos");
}
function mostrarFolios() {
  busquedaEnVivo();
  let data = new FormData();
  data.append("accion", "MostrarFolios");
  table = new DataTable("#tablaFolios", {
    ajax: function (d, cb) {
      fetch("../controllers/AccionesFolios.php", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => cb(data));
    },
    columnDefs: [
      { targets: 1, data: "folio" },
      { targets: 2, data: "fechacarga" },
      { targets: 3, data: "fechaSeguimiento" },
      { targets: 4, data: "estatus" },
      { targets: 5, data: "comentSeguimiento" },
      { targets: 6, data: "dias" },
      { targets: 7, data: "poliza" },
      { targets: 8, data: "asegurado" },
      { targets: 9, data: "celular" },
      { targets: 10, data: "telCasa" },
      { targets: 11, data: "marcaTipo" },
      { targets: 12, data: "numSerie" },
      { targets: 13, data: "estacion" },
      { targets: 14, data: "situacion" },
      {
        targets: 0,
        data: null,
        defaultContent: `<button type="button" class="btn editarFolios btn-sm" data-bs-toggle="modal" data-bs-target="#modalEditarFolio">
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="white" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 
          0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 
          0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 
          1.5 0 0 0 1 2.5v11z"/></svg></button>`,
      },
    ],
    //se pintan las celdas de la tabla dependiendo cuantos dias han pasado
    rowCallback: function (row, data) {
      if (data.dias < 5) {
        $($(row).find("td")).css("background-color", "#99fac6");
      } else if (data.dias < 10) {
        $($(row).find("td")).css("background-color", "#fdff9c");
      } else if (data.dias <= 13) {
        $($(row).find("td")).css("background-color", "#fc9494");
      } else {
        $($(row).find("td")).css("background-color", "#C8C8C8");
      }
    },
    language: {
      search: "Búsqueda general",
      searchPlaceholder: "Buscar",
      zeroRecords: "Ningún folio cumple con los parámetros",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Anterior",
      },
      processing: "Procesando...",
      loadingRecords: "Cargando...",
      infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
    },
    fixedHeader: true,
    destroy: true, //linea para no causar conflicto con otras tablas
    ordering: false,
    info: false,
    bLengthChange: false,
    scrollCollapse: true,
    paging: true,
    responsive: true,
  });
  //deshabilita el evento del click para que no se sumen
  $("#tablaFolios tbody").off("click");
  //obtiene el id del usuario para editar al mismo
  $("#tablaFolios tbody").on("click", "button", function () {
    let data = table.row($(this).parents("tr")).data();
    document.getElementById("idFolio").textContent = data.id;
    infoAdicional("idFolio", "ulListaInfoFolio", "Folios");
    obtenerEquipos("txtEditarEquipoFolio");
    document.getElementById("txtFolioFolio").value = data.folio;
    //se retrasa la funcion para evitar que no se asigne el valor normal
    setTimeout(() => {
      document.getElementById("txtEditarEquipoFolio").value = data.equipo;
    }, 50);
  });
}
async function conteoSituacion(
  accion,
  id,
  mayorCarga,
  menorCarga,
  mayorSeg,
  menorSeg,
  situacion
) {
  let data = new FormData();
  let url = controlador + "AccionesFolios.php";
  data.append("accion", accion);
  data.append("mayorCarga", mayorCarga);
  data.append("menorCarga", menorCarga);
  data.append("mayorSeg", mayorSeg);
  data.append("menorSeg", menorSeg);
  data.append("situacion", situacion);
  let consulta = new claseFetch(data, url);
  let respuesta = await consulta.fetchTexto();
  document.getElementById(id).textContent = respuesta;
  console.log(respuesta);
}
async function conteoEstatusFiltros() {
  let mayorCarga = document
    .getElementById("fechaCargaRange")
    .value.split(" a ")[0];
  let menorCarga = document
    .getElementById("fechaCargaRange")
    .value.split(" a ")[1];
  let mayorSeg = document.getElementById("fechaSegRange").value.split(" a ")[0];
  let menorSeg = document.getElementById("fechaSegRange").value.split(" a ")[1];
  let data = new FormData();
  let url = controlador + "AccionesFolios.php";
  data.append("accion", "ConteoEstatusFiltros");
  data.append("mayorCarga", mayorCarga);
  data.append("menorCarga", menorCarga);
  data.append("mayorSeg", mayorSeg);
  data.append("menorSeg", menorSeg);
  data.append("estatus", estatus);
  let consulta = new claseFetch(data, url);
  let respuesta = await consulta.fetchTexto();
  document.getElementById(id).textContent = respuesta;
  console.log(respuesta);
}
async function generarCitasFolios() {
  let fechaValidar = obtenerFechaConvertida(0) + "";
  if (document.getElementById("txtFechaFolio").value <= fechaValidar) {
    mostrarMensajeFade(
      "Por favor, selecciona una fecha valida",
      "danger",
      "divLetreroCrearCitaFolio"
    );
    return;
  }
  if (document.getElementById("txtTituloFolio").value == "") {
    mostrarMensajeFade(
      "Por favor, proporciona un titulo",
      "danger",
      "divLetreroCrearCitaFolio"
    );
    return;
  }
  if (
    document.getElementById("txtHoraInicioFolio").value >=
    document.getElementById("txtHoraFinalFolio").value
  ) {
    mostrarMensajeFade(
      "Por favor, selecciona un horario valido",
      "danger",
      "divLetreroCrearCitaFolio"
    );
    return;
  }
  let data = new FormData();
  let fecha = document.getElementById("txtFechaFolio").value;
  let horaInicio = document.getElementById("txtHoraInicioFolio").value;
  let horaFin = document.getElementById("txtHoraFinalFolio").value;
  data.append("fecha", fecha);
  data.append(
    "infoAdicional",
    document.getElementById("txtInfoAdicionalFolio").value
  );
  data.append("equipo", document.getElementById("txtEditarEquipoFolio").value);
  data.append("start", `${fecha} ${horaInicio}:00`);
  data.append("end", `${fecha} ${horaFin}:00`);
  data.append("title", document.getElementById("txtTituloFolio").value);
  data.append("folio", document.getElementById("txtFolioFolio").value);
  data.append("accion", "CrearCita");
  let url = controlador + "ConsultasCitas.php";
  let consulta = new claseFetch(data, url);
  let respuesta = await consulta.fetchTexto();
  if (respuesta === "Error, el folio no existe o ya hay existe una cita") {
    mostrarMensajeFade(respuesta, "danger", "divLetreroCrearCitaFolio");
    return;
  } else {
    mostrarMensajeFade(respuesta, "success", "divLetreroCrearCitaFolio");
    //refresca las citas que tenemos
    $("#citas").fullCalendar("refetchEvents");
  }
  console.log(respuesta);
}
//elimina el folio, se manda a la base de datos y solo se oculta para estar todavia
//disponible en caso de necesitarlo
async function eliminarFolio() {
  if (window.confirm("Eliminar folio?")) {
    console.log(document.getElementById("idFolio").textContent);
    let url = controlador + "AccionesFolios.php";
    let data = new FormData();
    data.append("id", document.getElementById("idFolio").textContent);
    data.append("accion", "EliminarFolio");
    let consulta = new claseFetch(data, url);
    let respuesta = await consulta.fetchTexto();
    if (respuesta === "Eliminado con exito") {
      mostrarMensajeFade(respuesta, "success", "divLetreroEliminarCitaFolio");
      setTimeout(() => {
        $("#modalEditarFolio").modal("hide");
        mostrarFolios();
      }, 2000);
    } else {
      mostrarMensajeFade(respuesta, "danger", "divLetreroEliminarCitaFolio");
    }
  }
}
////////////////////////////funciones generales///////////////////////////
function dateRange(id) {
  $("#" + id)
    .dateRangePicker({
      language: "es",
    })
    .on("datepicker-closed", function () {
      let fecha = document.getElementById(id).value.split(" to ");
      document.getElementById(id).value = fecha[0] + " a " + fecha[1];
      /* This event will be triggered after date range picker close animation */
    });
}
function inicializacionesDivs() {
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
    mostrarFolios("inicial");
  });
  document.getElementById("btnHerramientas").addEventListener("click", () => {
    document.getElementById("divCitas").style.display = "none";
    document.getElementById("divDatos").style.display = "none";
    document.getElementById("divHerramientas").style.display = "";
  });
  document.getElementById("txtEquipo").addEventListener("click", () => {
    obtenerEquipos("txtEquipo");
  });
  document
    .getElementById("btnAcordionAsignarFolios")
    .addEventListener("click", () => {
      obtenerEquipos("txtEquipoFolios");
    });
}
function inicializacionestGenerales() {
  datePicker();
}
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
      cambiosColor(idTabla, i, 4, "c1d7e7", "aliceblue");
    } else {
      cambiosColor(idTabla, i, 4, "AFAFAF", "000000");
    }
    if (idTabla.rows[i].cells[5].textContent === "Si") {
      cambiosColor(idTabla, i, 5, "c1d7e7", "aliceblue");
    } else {
      cambiosColor(idTabla, i, 5, "AFAFAF", "000000");
    }
    if (idTabla.rows[i].cells[6].textContent === "Si") {
      cambiosColor(idTabla, i, 6, "c1d7e7", "aliceblue");
    } else {
      cambiosColor(idTabla, i, 6, "AFAFAF", "000000");
    }
    if (idTabla.rows[i].cells[7].textContent === "Si") {
      cambiosColor(idTabla, i, 7, "c1d7e7", "aliceblue");
    } else {
      cambiosColor(idTabla, i, 7, "AFAFAF", "000000");
    }
    if (idTabla.rows[i].cells[8].textContent === "Si") {
      cambiosColor(idTabla, i, 8, "c1d7e7", "aliceblue");
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
      console.log(data);
      $(".equipos").remove();
      let selectEquipos = document.getElementById(idselect);
      for (let i in data.Equipos) {
        let option = document.createElement("option");
        option.setAttribute("class", "equipos");
        option.text = data.Equipos[i].nombre;
        option.value = data.Equipos[i].nombre;
        selectEquipos.add(option);
      }
    });
}
//funcion para la busquedqa en vivo
//Creamos una fila en el head de la tabla y lo clonamos para cada columna
function busquedaEnVivo() {
  if (primeraTabla == true) {
    $("#tablaFolios thead tr").clone(true).appendTo("#tablaFolios thead");
  }
  $("#tablaFolios thead tr:eq(1) th").each(function (i) {
    if (i != 0) {
      $(this).html(
        '<input class="form-control form-control-sm" type="text" placeholder="Buscar" aria-label=".form-control-sm">'
      );

      $("input", this).on("keyup change", function () {
        if (table.column(i).search() !== this.value) {
          table.column(i).search(this.value).draw();
        }
      });
    } else {
      $(this).html("<p></p>");
    }
  });
  primeraTabla = false;
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
function datePicker() {
  $(".datepicker").datepicker();
  $.datepicker.setDefaults(
    ($.datepicker.regional["es"] = {
      closeText: "Cerrar",
      prevText: "< Ant",
      nextText: "Sig >",
      currentText: "Hoy",
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
      dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Juv", "Vie", "Sáb"],
      dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
      weekHeader: "Sm",
      dateFormat: "yy-mm-dd",
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: "",
    })
  );
}
//////////////////////////////CLASES //////////////////////////////////////////////////
/*********************************************************************************** */
class claseFetch {
  constructor(data, url) {
    this.data = data;
    this.url = controlador + url;
  }
  get fetchJson() {
    return this.fetchJson();
  }
  get fetchTexto() {
    return this.fetchTexto();
  }
  fetchTexto() {
    let retorno = fetch(this.url, {
      method: "POST",
      body: this.data,
    }).then((response) => {
      return response.text();
    });
    return retorno;
  }
  fetchJson() {
    let retorno = fetch(this.url, {
      method: "POST",
      body: this.data,
    }).then((response) => {
      return response.json();
    });
    return retorno;
  }
}
//////////////////FUNCIONES NO UTILIZADAS///////////////////////////
/*function obtenerCitasPorColor() {
  let listado = document.querySelectorAll(".listadoColores");
  let listadoConteo = document.querySelectorAll(".rounded-pill");
  for (let i = 0; i < listado.length; i++) {
    listado[i].addEventListener("click", (e) => {
      switch (i) {
        case 0:
          listado[i + 1].style.background = "white";
          listado[i + 2].style.background = "white";
          listadoConteo[i + 1].style.color = "black";
          listadoConteo[i + 2].style.color = "black";
          listado[i + 1].style.color = "black";
          listado[i + 2].style.color = "black";
          break;
        case 1:
          listado[i - 1].style.background = "white";
          listado[i + 1].style.background = "white";
          listadoConteo[i - 1].style.color = "black";
          listadoConteo[i + 1].style.color = "black";
          listado[i - 1].style.color = "black";
          listado[i + 1].style.color = "black";
          break;
        case 2:
          listado[i - 1].style.background = "white";
          listado[i - 2].style.background = "white";
          listadoConteo[i - 1].style.color = "black";
          listadoConteo[i - 2].style.color = "black";
          listado[i - 1].style.color = "black";
          listado[i - 2].style.color = "black";
          break;
      }
      console.log(i);
      console.log(listado[i].id);
      console.log(listadoConteo[i]);
      document.getElementById(listado[i].id).style.background = "#138ce9";
      document.getElementById(listadoConteo[i]).style.color = "white";
      document.getElementById(listado[i].id).style.color = "white";
    });
  }
}*/
/*********************************************************************************** */
/////////////////FUNCIONES DE PRUEBA Y CLASES///////////////////////
async function mandarDatos() {
  let data = new FormData();
  let url = "prueba.php";
  let url2 = "pruebatexto.php";
  data.append("accion", "Hola");
  //let clase = new claseFetch();
  //let resultadoClase = await clase.fetchTexto(data);
  //let resultadoClaseJson = await clase.fetchJson(data, url);
  //console.log(resultadoClaseJson);
  let pruebaNueva = new claseFetch(data, url);
  let pruebaNueva2 = new claseFetch(data, url2);
  console.log(await pruebaNueva.fetchJson());
  console.log(await pruebaNueva2.fetchTexto());
  //console.log(resultadoClase);
}
/*class claseFetch {
  fetchTexto(data) {
    let retorno = fetch(controlador + "prueba.php", {
      method: "POST",
      body: data,
    }).then((response) => {
      return response.text();
    });
    return retorno;
  }
  fetchJson(data, url) {
    let retorno = fetch(controlador + url, {
      method: "POST",
      body: data,
    }).then((response) => {
      return response.json();
    });
    return retorno;
  }
}*/
