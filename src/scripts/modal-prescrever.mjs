import { lerDoLocalStorage, lerCookie } from "./utils.mjs";

function showPrescreverDialog() {
    const dialog = document.getElementById('dialog-prescrever');
    // const schedules = lerDoLocalStorage('schedules-db') || [];
    // const email = lerCookie('user::email');

    // const schedule = schedules.find(schedule => schedule.tutor_email === email);

    // const dialogTitle = `Prescrição`;
    // const dialogDescription = document.getElementById('dialog-prescricao');

    // dialogTitle.textContent = `Prescrição - ${schedule.tutor_name}  - ${schedule.pet_name}`;
    // dialogDescription.textContent = schedule.prescricao;


    dialog.showModal();
}

function closePrescreverDialog() {
    const dialog = document.getElementById('dialog-prescrever');
    dialog.close();
}

function prescreverSubmit() {
    const email = lerCookie('user::email');
    const schedules = lerDoLocalStorage('schedules-db') || [];
    const schedule = schedules.find(schedule => schedule.tutor_email === email);

    const prescricao = document.getElementById('prescricao').value;

    schedule.prescricao = prescricao;

    salvarNoLocalStorage('schedules-db', schedules);

    alert('Prescrição salva com sucesso!');
    closePrescreverDialog();
}

document.getElementById('formPrescrever').addEventListener('submit', prescreverSubmit);

window.showPrescreverDialog = showPrescreverDialog;
window.closePrescreverDialog = closePrescreverDialog;