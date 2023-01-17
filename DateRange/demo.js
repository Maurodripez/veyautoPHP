$(function () {
  $("#date-range0")
    .dateRangePicker({
      language: "es",
    })
    .on("datepicker-closed", function () {
      /* This event will be triggered after date range picker close animation */
      console.log(document.getElementById("date-range0").value);
    });
});
