const ACCESS_TOKEN_STORAGE_KEY = "user:access_token";

// TODO: Add refresh token if needed
class TokenSource {
  get accessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  }

  setAccessToken(token: string): void {
    if (token.trim().length > 0) {
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
    }
  }

  clearStorage(): void {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  }
}

export const tokenSource = new TokenSource();
