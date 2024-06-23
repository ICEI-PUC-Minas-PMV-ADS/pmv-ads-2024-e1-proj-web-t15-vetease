import { salvarNoLocalStorage, lerDoLocalStorage } from './utils.mjs';
import { lerCookie, salvarCookie } from './utils.mjs';

// Função para o formulário de completar cadastro
document.getElementById('profileForm').addEventListener('submit', profileUserRegistration);

preencherCampos();

function profileUserRegistration(event) {
  event.preventDefault(); // Impede o comportamento padrão do formulário

  const currentEmail = lerCookie('user::email');

  const name = document.getElementById('profile-name').value;
  const surname = document.getElementById('profile-surname').value;
  const address = document.getElementById('profile-address').value;
  const email = document.getElementById('profile-email').value;

  const usersDb = lerDoLocalStorage('users-db') || [];
  const userIndex = usersDb.findIndex(user => user.email === currentEmail);

  if (userIndex === -1) {
    alert('Usuário não encontrado.');
    return;
  }

  // Atualiza somente os campos especificados, mantendo os outros inalterados
  usersDb[userIndex] = { 
    ...usersDb[userIndex], 
    name, 
    surname, 
    address,
    email
  };

  salvarNoLocalStorage('users-db', usersDb);
  salvarCookie('user::email', email, 1);

  preencherCampos();
  closePerfilDialog();
}


function preencherCampos() {
  const email = lerCookie('user::email');
  const usersDb = JSON.parse(localStorage.getItem('users-db')) || [];
  const user = usersDb.find(user => user.email === email);

  if (!user) {
    alert('Usuário não encontrado.');
    return;
  }

  document.getElementById('profile-name').value = user.name;
  document.getElementById('profile-surname').value = user.surname;
  document.getElementById('profile-address').value = user.address;
  document.getElementById('profile-email').value = user.email;
}