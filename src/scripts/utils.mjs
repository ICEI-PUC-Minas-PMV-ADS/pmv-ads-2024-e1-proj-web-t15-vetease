export function salvarNoLocalStorage(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

export function lerDoLocalStorage(chave) {
  const dados = localStorage.getItem(chave);
  return dados ? JSON.parse(dados) : null;
}

export function salvarCookie(nome, valor, dias) {
  const data = new Date();
  data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000));
  const expires = "expires=" + data.toUTCString();
  document.cookie = nome + "=" + valor + ";" + expires + ";path=/";
}


export function lerCookie(nome) {
  const nomeEQ = nome + "=";
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(nomeEQ) === 0) {
          return cookie.substring(nomeEQ.length, cookie.length);
      }
  }
  return null;
}


function abrirIndexedDB(nomeDB, versao, callback) {
  const request = indexedDB.open(nomeDB, versao);
  
  request.onerror = function(event) {
      console.error("Erro ao abrir IndexedDB:", event);
  };
  
  request.onsuccess = function(event) {
      callback(event.target.result);
  };
  
  request.onupgradeneeded = function(event) {
      const db = event.target.result;
      db.createObjectStore("dados", { keyPath: "id", autoIncrement: true });
  };
}

function salvarNoIndexedDB(db, valor) {
  const transacao = db.transaction(["dados"], "readwrite");
  const store = transacao.objectStore("dados");
  store.add(valor);
  
  transacao.oncomplete = function() {
      console.log("Dados salvos com sucesso no IndexedDB.");
  };
  
  transacao.onerror = function(event) {
      console.error("Erro ao salvar no IndexedDB:", event);
  };
}

function lerDoIndexedDB(db, id, callback) {
  const transacao = db.transaction(["dados"]);
  const store = transacao.objectStore("dados");
  const request = store.get(id);
  
  request.onsuccess = function(event) {
      callback(event.target.result);
  };
  
  request.onerror = function(event) {
      console.error("Erro ao ler do IndexedDB:", event);
  };
}



