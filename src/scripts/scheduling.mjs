import { salvarNoLocalStorage, lerDoLocalStorage } from './utils.mjs';
import { lerCookie } from './utils.mjs';

// Função para o formulário de completar cadastro
document.getElementById('formScheduling').addEventListener('submit', scheduleRegistration);

function scheduleRegistration(event) {
  event.preventDefault(); // Impede o comportamento padrão do formulário

  const email = lerCookie('user::email');
  const usersDb = lerDoLocalStorage('users-db') || [];
  const user = usersDb.find(user => user.email === email);

  if (!user) {
    alert('Usuário não encontrado.');
    return;
  }

  const service = document.getElementById('service-input').value;
  const doctor = document.getElementById('doctor-input').value;
  const pet_name = document.getElementById('petName').value;
  const weight = document.getElementById('weight').value;
  const race = document.getElementById('race').value;
  const description = document.getElementById('description').value;
  const date = Array.from(document.querySelectorAll('input[name="preferences"]:checked')).map(checkbox => checkbox.value);

  if (!pet_name || !weight || !race || !description) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  const newSchedule = {
    tutor_name: user.name,
    tutor_email: user.email,
    pet_name,
    weight,
    race,
    description,
    date,
    service,
    doctor,
    status: 'pending' // pedding, confirmed, canceled
  };

  const schedulesDb = lerDoLocalStorage('schedules-db') || [];
  schedulesDb.push(newSchedule);
  salvarNoLocalStorage('schedules-db', schedulesDb);

  alert('Agendamento confirmado!');
  closeDialog();
}
