import { lerDoLocalStorage, lerCookie } from "./utils.mjs";

function preencherCampos(tutor_email, pet_name, service) {
    const schedules = lerDoLocalStorage('schedules-db') || [];
    const schedule = schedules.find(schedule => `${schedule.tutor_email}${schedule.pet_name}${schedule.service}` === `${tutor_email}${pet_name}${service}`);
  
    document.getElementById('prescricao-dialog').value = schedule.prescricao || '';
  }

function showPrescricaoDialog(tutor_email, pet_name, service) {
    const dialog = document.getElementById('prescricao-dialog');
    const schedules = lerDoLocalStorage('schedules-db') || [];
    const schedule = schedules.find(schedule => `${schedule.tutor_email}${schedule.pet_name}${schedule.service}` === `${tutor_email}${pet_name}${service}`);
    preencherCampos(tutor_email, pet_name, service)

    const dialogTitle = document.getElementById('dialog-prescricao-title');
    const dialogDescription = document.getElementById('dialog-prescricao');

    dialogTitle.textContent = `Prescrição - ${schedule?.tutor_name ?? "Tutor"}  - ${schedule?.pet_name} Pet`;
    dialogDescription.textContent = schedule.prescricao ?? 'Nenhuma prescrição cadastrada';


    dialog.showModal();
}

function closePrescricaoDialog() {
    const dialog = document.getElementById('prescricao-dialog');
    dialog.close();
}

window.showPrescricaoDialog = showPrescricaoDialog;
window.closePrescricaoDialog = closePrescricaoDialog;