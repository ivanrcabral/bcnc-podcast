export function getCookie(name: string) {
  let ca: Array<string> = document.cookie.split(";");
  let caLen: number = ca.length;
  let cookieName = `${name}=`;
  let c: string;

  for (let i: number = 0; i < caLen; i += 1) {
    c = ca[i].replace(/^\s+/g, "");
    if (c.indexOf(cookieName) == 0) {
      return localStorage.getItem(name);
    }
  }

  return "";
}

export function deleteCookie(name: string) {
  setCookie(name, "", -1);
  localStorage.removeItem(name)
}

export function setCookie(
  name: string,
  value: string,
  expire: number = 86400
) {
  const today = new Date()
  today.setSeconds(expire)
  let expires: string = `expires=${today.toUTCString()}`;
  const path: string = "";
  let cpath: string = path ? `; path=${path}` : "";
  document.cookie = `${name}="."; ${expires}${cpath}`;
  localStorage.setItem(name, value)
}


