import { salvarNoLocalStorage } from "./utils.mjs";


(() => {
  fetch('/src/data/users.json')
    .then(response => response.json())
    .then(data => {    
      const usersDb = JSON.parse(localStorage.getItem('users-db')) || [];
      const updatedUsers = data?.users?.map(user => {
        const userDb = usersDb.find(userDb => userDb.name === user.name);
        if (userDb) {
          // Supondo que deseja incrementar um campo existente (ajuste conforme necessário)
          userDb.difference = (userDb.difference || 0) + (user.difference || 0);
          return userDb;
        }
        return user;
      });

      // Combina os usuários antigos com os atualizados sem duplicar
      const combinedUsers = [...usersDb];
      updatedUsers.forEach(updatedUser => {
        const existingIndex = combinedUsers.findIndex(user => user.name === updatedUser.name);
        if (existingIndex !== -1) {
          combinedUsers[existingIndex] = updatedUser;
        } else {
          combinedUsers.push(updatedUser);
        }
      });

      salvarNoLocalStorage('users-db', combinedUsers);
    })
    .catch(error => console.error('Erro ao buscar os usuários:', error));
})();
