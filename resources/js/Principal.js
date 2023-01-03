let controlador = "../controllers/";
window.addEventListener("load", function (event) {
  operadores();
  $('[data-toggle="tooltip"]').tooltip();
  desplegarCitas();
  document.getElementById("btnGuardarCita").addEventListener("click", () => {
    guardarCita();
  });
});

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
    $("#listaInfoAdicional").collapse("hide");
  });
}
function infoAdicional() {
  let id = document.getElementById("idCitaActual").textContent;
  $.ajax({
    url: rutaInicial + "ConsultasCitas.php",
    type: "POST",
    dataType: "JSON",
    data: {
      accion: "InfoAdicional",
      id,
    },
  }).done(function (response) {
    console.log(response);
    let asegurado = `<li style='font-size: 13px' class="list-group-item">Asegurado: ${response.InfoAdicional[0].asegurado}</li>`;
    let telefonoPrincipal = `<li style='font-size: 13px' class="list-group-item">Telefono: ${response.InfoAdicional[0].telefonoPrincipal}</li>`;
    let marca = `<li style='font-size: 13px' class="list-group-item">Marca: ${response.InfoAdicional[0].marca}</li>`;
    let tipo = `<li style='font-size: 13px' class="list-group-item">Tipo: ${response.InfoAdicional[0].tipo}</li>`;
    let modelo = `<li style='font-size: 13px' class="list-group-item">Modelo: ${response.InfoAdicional[0].modelo}</li>`;
    let numSerie = `<li style='font-size: 13px' class="list-group-item">Serie: ${response.InfoAdicional[0].numSerie}</li>`;
    let contacto = `<li style='font-size: 13px' class="list-group-item">Contacto: ${response.InfoAdicional[0].contacto}</li>`;
    let telContacto = `<li style='font-size: 13px' class="list-group-item">Telefono: ${response.InfoAdicional[0].telContacto}</li>`;
    let ul = document.getElementById("ulListaInfo");
    ul.innerHTML =
      asegurado +
      telefonoPrincipal +
      marca +
      tipo +
      modelo +
      numSerie +
      contacto +
      telContacto;
  });
}

//se manda por medio de fetch los datos necesarios para la creacion de usuarios
async function crearUsuario() {
  let usuario = document.getElementById("usuario").value;
  let nombre = document.getElementById("nombre").value;
  let password = document.getElementById("password").value;
  let perfil = document.getElementById("perfil").value;
  let turno = document.getElementById("turno").value;
  let equipo = document.getElementById("equipo").value;
  if (
    usuario.length > 0 &&
    nombre.length > 0 &&
    password.length > 0 &&
    perfil.length > 0 &&
    turno.length > 0 &&
    equipo.length > 0
  ) {
    let data = new FormData();
    data.append("usuario", usuario);
    data.append("nombre", nombre);
    data.append("password", password);
    data.append("perfil", perfil);
    data.append("turno", turno);
    data.append("equipo", equipo);
    const response = await fetch("../controllers/CreacionUsuario.php", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: data, // body data type must match "Content-Type" header
    });
    console.log(response.text());
  }
}
