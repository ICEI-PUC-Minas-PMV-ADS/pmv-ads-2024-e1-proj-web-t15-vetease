import { lerDoLocalStorage, lerCookie, salvarNoLocalStorage } from "./utils.mjs";

document.getElementById('formPrescrever').addEventListener('submit', (event) => event.preventDefault());

function preencherCampos(tutor_email, pet_name, service) {
    const schedules = lerDoLocalStorage('schedules-db') || [];
    const schedule = schedules.find(schedule => `${schedule.tutor_email}${schedule.pet_name}${schedule.service}` === `${tutor_email}${pet_name}${service}`);
  
    document.getElementById('prescricao').value = schedule.prescricao || '';
  }

function showPrescreverDialog(tutor_email, pet_name, service) {
    const dialog = document.getElementById('dialog-prescrever');
    preencherCampos(tutor_email, pet_name, service);

    const submitButton = document.getElementById('dialog-prescrever-submit');
    submitButton.setAttribute('onclick', `prescreverSubmit('${tutor_email}', '${pet_name}', '${service}')`);

    dialog.showModal();
}

function closePrescreverDialog() {
    const dialog = document.getElementById('dialog-prescrever');
    dialog.close();
}

function prescreverSubmit(tutor_email, pet_name, service) {
    const schedules = lerDoLocalStorage('schedules-db') || [];
    const schedule = schedules.find(schedule => `${schedule.tutor_email}${schedule.pet_name}${schedule.service}` === `${tutor_email}${pet_name}${service}`);

    const prescricao = document.getElementById('prescricao').value;

    schedule.prescricao = prescricao;

    salvarNoLocalStorage('schedules-db', schedules);

    alert('Prescrição salva com sucesso!');
    document.getElementById('prescricao').value = undefined;
    closePrescreverDialog();
}

window.prescreverSubmit = prescreverSubmit;
window.showPrescreverDialog = showPrescreverDialog;
window.closePrescreverDialog = closePrescreverDialog;