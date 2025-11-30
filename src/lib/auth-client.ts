// Client-side safe token reader

export function getAuthClient() {
  if (typeof document === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((c) => c.startsWith("token="));

  if (!cookie) return null;

  const token = cookie.split("=")[1];

  try {
    // No verify (client cannot verify), only decode
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(atob(base64Payload));
    return payload; // { userId, email, role, name }
  } catch {
    return null;
  }
}
