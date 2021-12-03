jQuery(document).ready(function () {
  // //tooltip
   jQuery('[data-toggle="tooltip"]').tooltip();

  // jQuery(function () {
  //   jQuery('[data-toggle="popover"]').popover();
  // });

  // jQuery(".nv-custom-select").select2();
  // jQuery(".nv-custom-select-desc").select2();
  $(".cd-verticalBar__hamburger").click(function() {
    $('.cd-verticalBar').toggleClass("active");
    $(this).toggleClass("active");
    });
})