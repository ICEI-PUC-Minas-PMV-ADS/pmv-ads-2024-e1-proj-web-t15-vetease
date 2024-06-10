import { lerDoLocalStorage } from "./utils.mjs";
// import { showPrescricaoDialog } from "./modal-prescricao.mjs";

document.addEventListener('DOMContentLoaded', () => {
    const schedules = lerDoLocalStorage('schedules-db') || [];
    const container = document.getElementById('scheduling-erp-container');
    const template = document.getElementById('scheduling-erp-template');

    schedules.forEach((schedule) => {
        const clone = template.content.cloneNode(true);
                
        const title = clone.querySelector('.scheduling-info h3');
        const description = clone.querySelector('.scheduling-info p');
        const buttonCancel = clone.querySelector('#btn-cancel');
        const buttonConfirm = clone.querySelector('#btn-confirm');
        const buttonPrescricao = clone.querySelector('#btn-prescerver');

        const status = clone.querySelector('.scheduling-detail h5');
        const day = clone.querySelector('.scheduling-detail p');
        const doctor = clone.querySelector('.scheduling-detail h3');

        if (schedule.status === "cancelled") {
            status.className = "cancelled"
            status.innerText = "Cancelado"

            buttonPrescricao.style = "display:none;"

            buttonConfirm.style = "background-color: transparent; color: #626262; border: 1px solid #626262; cursor: not-allowed;";
            buttonConfirm.setAttribute('disabled', 'true');

            buttonCancel.style = "background-color: transparent; color: #626262; border: 1px solid #626262; cursor: not-allowed;";
            buttonCancel.setAttribute('disabled', 'true');
        } else if (schedule.status === "pending") {
            status.className = "pending"
            status.innerText = "Aguardando"

            buttonConfirm.setAttribute('onclick', `showPrescricaoDialog('${schedule.title}')`);

            buttonPrescricao.style = "display:none;"
            buttonConfirm.setAttribute('disabled', 'false');
        } else {
            status.innerText = ""

            buttonConfirm.style = "background-color: transparent; color: #626262; border: 1px solid #626262; cursor: not-allowed;";
            buttonConfirm.setAttribute('disabled', 'true');
            
            buttonCancel.style = "background-color: transparent; color: #626262; border: 1px solid #626262; cursor: not-allowed;";
            buttonCancel.setAttribute('disabled', 'true');
            
        }
            
        buttonPrescricao.setAttribute('onclick', `showPrescreverDialog()`);
        const dateList= {seg: 'Segunda-Feira', terc: 'Terça-Feira', quart: 'Quarta-Feira', qui: 'Quinta-Feira', sex: 'Sexta-Feira', sab: 'Sábado', dom: 'Domingo'}

        title.textContent = schedule.service;
        description.textContent = schedule.description;

        doctor.textContent = schedule.doctor;
        day.textContent = dateList[schedule.date[0]];
        

        container.appendChild(clone);
    });
});