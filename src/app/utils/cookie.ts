
export function getCookie(name: string): string | undefined {
  const cookies = document.cookie.split(';');
  return cookies.find(c => c.trim().startsWith(name + '='))?.split('=')[1];
}
