import { routerPush } from './router.mjs';
import { salvarNoLocalStorage } from './utils.mjs';
import { salvarCookie } from './utils.mjs';

// Função para o formulário de completar cadastro
document.getElementById('completeForm').addEventListener('submit', completeUserRegistration);

function completeUserRegistration(event) {
  event.preventDefault(); // Impede o comportamento padrão do formulário

  // Pega o email pelo searchParams ?email=
  const email = new URLSearchParams(window.location.search).get('email');
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const address = document.getElementById('address').value;

  const usersDb = JSON.parse(localStorage.getItem('users-db')) || [];
  const userIndex = usersDb.findIndex(user => user.email === email);

  if (userIndex === -1) {
    alert('Usuário não encontrado.');
    return;
  }

  // Atualiza somente os campos especificados, mantendo os outros inalterados
  usersDb[userIndex] = { 
    ...usersDb[userIndex], 
    name, 
    surname, 
    address 
  };

  salvarNoLocalStorage('users-db', usersDb);
  salvarCookie('user::email', email, 1);

  routerPush('pesquisa');
}