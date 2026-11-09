/* 2Tech Consultancy Limited - Formspree form handler
   Any <form data-formspree> on the site is sent to Formspree without leaving the page. */
(function () {
  var ENDPOINT = 'https://formspree.io/f/xgaadlrj';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var forms = document.querySelectorAll('form[data-formspree]');
    Array.prototype.forEach.call(forms, function (form) {
      var status = form.querySelector('.form-ack');
      var button = form.querySelector('button[type="submit"]');
      var buttonText = button ? button.textContent : '';

      function show(msg, isError) {
        if (!status) return;
        status.textContent = msg;
        status.classList.toggle('error', !!isError);
        status.classList.add('show');
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (button) { button.disabled = true; button.textContent = 'Sending…'; }
        if (status) status.classList.remove('show');

        fetch(ENDPOINT, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        }).then(function (res) {
          if (res.ok) {
            form.reset();
            show(form.getAttribute('data-success') ||
              'Thank you, your message has been sent. We aim to respond within two working days.');
          } else {
            return res.json().then(function (data) {
              var msg = (data && data.errors) ? data.errors.map(function (x) { return x.message; }).join(' ') : '';
              show(msg || 'Sorry, something went wrong. Please email us directly.', true);
            });
          }
        }).catch(function () {
          show('Sorry, we could not send your message. Please check your connection or email us directly.', true);
        }).then(function () {
          if (button) { button.disabled = false; button.textContent = buttonText; }
        });
      });
    });
  });
})();
