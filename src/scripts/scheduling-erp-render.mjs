import { lerDoLocalStorage, salvarNoLocalStorage } from "./utils.mjs";

document.addEventListener('DOMContentLoaded', () => {
    const schedules = lerDoLocalStorage('schedules-db') || [];
    const container = document.getElementById('scheduling-erp-container');
    const template = document.getElementById('scheduling-erp-template');

    schedules.forEach((schedule) => {
        const clone = template.content.cloneNode(true);
                
        const title = clone.querySelector('.scheduling-info h3');
        const description = clone.querySelector('.scheduling-info p');
        const buttonCancel = clone.querySelector('#btn-scheduling-cancel');
        const buttonConfirm = clone.querySelector('#btn-scheduling-confirm');
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

            buttonConfirm.setAttribute('onclick', `scheduleConfirm('${schedule.tutor_email}', '${schedule.pet_name}', '${schedule.service}')`);
            buttonCancel.setAttribute('onclick', `scheduleCancel('${schedule.tutor_email}', '${schedule.pet_name}', '${schedule.service}')`);

            buttonPrescricao.style = "display:none;"
        } else {
            status.innerText = ""

            buttonConfirm.style = "background-color: transparent; color: #626262; border: 1px solid #626262; cursor: not-allowed;";
            
            buttonCancel.style = "background-color: transparent; color: #626262; border: 1px solid #626262; cursor: not-allowed;";

            buttonPrescricao.setAttribute('onclick', `showPrescreverDialog('${schedule.tutor_email}', '${schedule.pet_name}', '${schedule.service}')`);
            
        }
            
        const dateList= {seg: 'Segunda-Feira', terc: 'Terça-Feira', quart: 'Quarta-Feira', qui: 'Quinta-Feira', sex: 'Sexta-Feira', sab: 'Sábado', dom: 'Domingo'}

        title.textContent = schedule.service;
        description.textContent = schedule.description;

        doctor.textContent = schedule.doctor;
        day.textContent = dateList[schedule.date[0]];
        

        container.appendChild(clone);
    });
});


function scheduleConfirm(tutor_email, pet_name, service) {
    const confirmValue = confirm(`Tem certeza que deseja confirmar o agendamento?`);

    if(confirmValue) {
        const schedules = lerDoLocalStorage('schedules-db') || [];
    
        const schedule = schedules.find(schedule => `${schedule.tutor_email}${schedule.pet_name}${schedule.service}` === `${tutor_email}${pet_name}${service}`);
    
        schedule.status = 'confirmed';
    
        salvarNoLocalStorage('schedules-db', schedules);
        
        location.reload();
    }
}

window.scheduleConfirm = scheduleConfirm;

function scheduleCancel(tutor_email, pet_name, service) {
    const confirmValue = confirm(`Tem certeza que deseja cancelar o agendamento?`);

    if(confirmValue) {
        const schedules = lerDoLocalStorage('schedules-db') || [];

        const schedule = schedules.find(schedule => {
            return `${schedule.tutor_email}${schedule.pet_name}${schedule.service}` === `${tutor_email}${pet_name}${service}`
        })
        schedule.status = 'cancelled';

        salvarNoLocalStorage('schedules-db', schedules);

        location.reload();
    }
}

window.scheduleCancel = scheduleCancel;