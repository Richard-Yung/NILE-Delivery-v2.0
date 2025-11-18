export type UserRole = "client" | "livreur" | "admin";
export type Session = {
  role: UserRole;
  email: string;
  name?: string;
};

const KEY = "nile_session";

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function notify() {
  try {
    window.dispatchEvent(new CustomEvent(KEY));
  } catch {}
}

export function setSession(s: Session) {
  localStorage.setItem(KEY, JSON.stringify(s));
  notify();
}

export function clearSession() {
  localStorage.removeItem(KEY);
  notify();
}
