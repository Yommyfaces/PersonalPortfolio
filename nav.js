/* 2Tech Consultancy Limited - menu for inner pages */
(function () {
  var btn = document.querySelector('.navbar div.menu-btn');
  var menu = document.querySelector('.navbar .menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      menu.classList.toggle('active');
      var i = btn.querySelector('i');
      if (i) i.classList.toggle('active');
    });
    Array.prototype.forEach.call(menu.querySelectorAll('a'), function (a) {
      a.addEventListener('click', function () { menu.classList.remove('active'); });
    });
  }
})();
