function showDialog(title) {
    const dialog = document.getElementById('dialog');
    const dialogTitle = document.getElementById('dialog-title');
    const dialogDescription = document.getElementById('dialog-description');
    const serviceField =  document.getElementById('service-input');
    const doctorField =  document.getElementById('doctor-input');

    
    fetch('https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2024-e1-proj-web-t15-vetease/data/services.json')
      .then(response => response.json())
      .then(data => {
        const service = data.services.find(service => service.title === title);
        const doctor = data.services.find(service => {if (service.title === title) return service.doctor;});
        
        dialogTitle.textContent = `Atendimento - ${service.title}`;
        dialogDescription.textContent = service.description;
        serviceField.value = service.title;
        doctorField.value = doctor.doctor;

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