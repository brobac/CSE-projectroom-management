import { Tokens, User } from "@types";

const USER_LOCALSTORAGE_KEY = "cse_user";
const TOKEN_LOALSTORAGE_KEY = "cse_token";

export const storageService = {
  getStoredUser(): User | null {
    const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  },

  setStoredUser(user: User): void {
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
  },
  clearStoredUser(): void {
    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
  },

  getStoredToken(): Tokens | null {
    const storedToken = localStorage.getItem(TOKEN_LOALSTORAGE_KEY);
    return storedToken ? JSON.parse(storedToken) : null;
  },

  setStoredToken(token: Tokens): void {
    localStorage.setItem(TOKEN_LOALSTORAGE_KEY, JSON.stringify(token));
  },

  clearStoredToken(): void {
    localStorage.removeItem(TOKEN_LOALSTORAGE_KEY);
  },
};
