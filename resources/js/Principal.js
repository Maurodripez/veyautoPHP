window.addEventListener("load", function (event) {
  $('[data-toggle="tooltip"]').tooltip();
  //btn para crear usuario
  //btn para ingresar
});

$(document).ready(function () {
    $("#citas").fullCalendar({
        header: {
          left: "prev,next today",
          center: "title",
          right: "month,basicWeek,basicDay",
        },
        editable: true,
        events: "MostrarEventos.php",
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
          /*$.ajax({
                url: rutaInicial + "ConsultasCitas.php",
                type: "POST",
                data: {
                  accion: "SaberPrivilegios",
                },
              }).done(function (result) {
                if (result == "operadorAtlas") {
                  alert("No tienes permitido crear Citas");
                  return;
                } else {
                  $("#ModalEventos").modal("show");
                }
              });*/
          // change the day's background color just for fun
          //$(this).css("background-color", "red");
        },
        editable: true,
        eventDrop: function (event, delta) {
          var start = $.fullCalendar.formatDate(event.start, "Y-MM-DD HH:mm:ss");
          var end = $.fullCalendar.formatDate(event.end, "Y-MM-DD HH:mm:ss");
          /* $.ajax({
                url: rutaInicial + "EditarEvento.php",
                data:
                  "title=" +
                  event.title +
                  "&start=" +
                  start +
                  "&end=" +
                  end +
                  "&id=" +
                  event.id,
                type: "POST",
                success: function (response) {
                  displayMessage("Actualizado con exito");
                },
              });*/
        },
        eventClick: function (event) {
          //document.getElementById("idCitaActual").textContent = event.id;
          // $("#ModalMostrarInfoEvento").modal("show");
          //  mostrarInfoCita();
        },
      });
});

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
//funciones para Citas
