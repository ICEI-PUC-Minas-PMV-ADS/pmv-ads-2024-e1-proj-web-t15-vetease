import { lerDoLocalStorage, lerCookie } from "./utils.mjs";

function showPrescricaoDialog() {
    const dialog = document.getElementById('prescricao-dialog');
    const schedules = lerDoLocalStorage('schedules-db') || [];
    const email = lerCookie('user::email');

    const schedule = schedules.find(schedule => schedule.tutor_email === email);

    const dialogTitle = document.getElementById('dialog-prescricao-title');
    const dialogDescription = document.getElementById('dialog-prescricao');

    dialogTitle.textContent = `Prescrição - ${schedule.tutor_name}  - ${schedule.pet_name}`;
    dialogDescription.textContent = schedule.prescricao;


    dialog.showModal();
}

function closePrescricaoDialog() {
    const dialog = document.getElementById('prescricao-dialog');
    dialog.close();
}

window.showPrescricaoDialog = showPrescricaoDialog;
window.closePrescricaoDialog = closePrescricaoDialog;