import { routerPush } from './router.mjs';
import { salvarCookie } from './utils.mjs';

document.getElementById('loginForm').addEventListener('submit', authenticate);

function authenticate(event) {
  event.preventDefault(); // Impede o comportamento padrão do formulário

  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  

  const usersDb = JSON.parse(localStorage.getItem('users-db')) || [];
  const user = usersDb.find(user => user.email === email && user.password === password);

  if (!user) { 
    alert('E-mail ou senha incorretos.') 
    return;
  };


  if (user.isEmployee) { 
    routerPush('controle-de-agendamentos') 
    return;
  };

  salvarCookie('user::email', email, 1);

  routerPush('pesquisa');

  return;
}