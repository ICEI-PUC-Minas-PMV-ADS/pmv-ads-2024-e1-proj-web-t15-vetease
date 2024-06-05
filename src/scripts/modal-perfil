function showDialog(title) {
    const dialog = document.getElementById('dialog');
    const dialogTitle = document.getElementById('dialog-title');
    const dialogDescription = document.getElementById('dialog-description');

    
    fetch('/src/data/services.json')
      .then(response => response.json())
      .then(data => {
        const service = data.services.find(service => service.title === title);
        dialogTitle.textContent = `Atendimento - ${service.title}`;
        dialogDescription.textContent = service.description;

        dialog.showModal();
      });
}

function closeDialog() {
    dialog.close();
}

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