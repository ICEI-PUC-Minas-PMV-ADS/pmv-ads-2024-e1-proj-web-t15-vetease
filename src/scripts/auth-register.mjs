import { routerPush } from './router.mjs';
import { salvarNoLocalStorage } from './utils.mjs';

// Função para o formulário de cadastro inicial
document.getElementById('registerForm').addEventListener('submit', registerUser);

function registerUser(event) {
  event.preventDefault(); // Impede o comportamento padrão do formulário

  let email = document.getElementById('register-email').value;
  let password = document.getElementById('register-password').value;

  const usersDb = JSON.parse(localStorage.getItem('users-db')) || [];
  const userExists = usersDb.find(user => user.email === email);

  if (userExists) {
    alert('Usuário já registrado com este e-mail.');
    return;
  }

  const newUser = { email, password, isEmployee: false, name: '', surname: '', address: ''};
  usersDb.push(newUser);

  salvarNoLocalStorage('users-db', usersDb);

  routerPush(`completar-cadastro`, { email });
  return;
}

