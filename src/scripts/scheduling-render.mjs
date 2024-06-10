import { lerDoLocalStorage } from "./utils.mjs";

document.addEventListener('DOMContentLoaded', () => {
  const schedules = lerDoLocalStorage('schedules-db') || [];
  const container = document.getElementById('scheduling-container');
  const template = document.getElementById('scheduling-template');

  schedules.forEach((schedule, index) => {
    const clone = template.content.cloneNode(true);
    const img = clone.querySelector('img');
    
    const title = clone.querySelector('.scheduling-info h3');
    const description = clone.querySelector('.scheduling-info p');
    const button = clone.querySelector('.scheduling-info button');

    const status = clone.querySelector('.scheduling-detail h5');
    const day = clone.querySelector('.scheduling-detail p');
    const doctor = clone.querySelector('.scheduling-detail h3');

    if (schedule.status === "cancelled") {
      status.className = "cancelled";
      status.innerText = "Cancelado";

      button.style.backgroundColor = "transparent";
      button.style.color = "#626262";
      button.style.border = "1px solid #626262";
      button.style.cursor = "not-allowed";
      button.setAttribute('disabled', 'true');
    } else if (schedule.status === "pending") {
      status.className = "pending";
      status.innerText = "Agendado";

      button.style.backgroundColor = "#a8c8b5";
      button.style.color = "#fff";
      button.style.border = "1px solid #a8c8b5";
      button.style.cursor = "default";
      button.removeAttribute('disabled');
    } else {
      status.className = "confirmed";
      status.innerText = "Atendido";
    }
    
    button.setAttribute('onclick', `showPrescricaoDialog('${schedule.title}')`);
    const dateList= {
      seg: 'Segunda-Feira',
      terc: 'Terça-Feira',
      quart: 'Quarta-Feira',
      qui: 'Quinta-Feira',
      sex: 'Sexta-Feira',
      sab: 'Sábado',
      dom: 'Domingo'
    };

    img.src = `/src/assets/search/servico-${['a','b','c'][index % 3]}.png`;
    title.textContent = schedule.service;
    description.textContent = schedule.description;
    doctor.textContent = schedule.doctor;
    day.textContent = dateList[schedule.date[0]];
    
    container.appendChild(clone);
  });
});
