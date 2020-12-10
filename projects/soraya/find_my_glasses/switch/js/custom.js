window.onload = function () {};

$(document).ready(function () {
  $(document).scroll(function () {});
  $(document).mousemove(function (event) {});

  changeClass();
});

function changeClass() {
  $('.cell')
    .on('mouseenter', function () {
      let $this = $(this);
      if ($this.hasClass('switch-1')) {
        $this.removeClass('switch-1').addClass('switch-2');
      } else if ($this.hasClass('switch-2')) {
        $this.removeClass('switch-2');
      } else {
        $this.addClass('switch-1');
      }
    })
    .on('click', function () {
      $(this).toggleClass('switch-click');
    });
}
