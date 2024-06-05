document.getElementById('form-submit').addEventListener('action', function(event) {
  event.preventDefault();
  alert('Você clicou no botão!');
});

document.querySelectorAll('summary').forEach(summary => {
  summary.addEventListener('click', function () {
      const details = this.parentElement;
      document.querySelectorAll('details').forEach(det => {
          if (det !== details) {
              det.removeAttribute('open');
          }
      });
  });
});
  