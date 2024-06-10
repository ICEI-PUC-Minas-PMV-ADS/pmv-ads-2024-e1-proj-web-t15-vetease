export function routerPush(path, params = {}) {
  const searchParams = new URLSearchParams();
  for (const key in params) {
    searchParams.append(key, params[key]);
  }
  window.location
    .assign(`${path}.html?${searchParams.toString()}`);
}

window.routerPush = routerPush;