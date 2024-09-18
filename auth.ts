// util/auth.ts
function setToken(token: string) {
  localStorage.setItem('authToken', token);
}

function getToken() {
  return localStorage.getItem('authToken') || '';
}

export { setToken, getToken };
