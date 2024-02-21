import { User, useAuth0 } from "@auth0/auth0-react";
import { HttpResponse, delay, http } from "msw";
import { server } from "./mocks/server";

export const simulateDelay = (endpoint: string) => {
  server.use(
    http.get(endpoint, async () => {
      await delay();
      return HttpResponse.json([]);
    })
  );
}

export const simulateError = (endpoint: string) => {
  server.use(
    http.get(endpoint, () => HttpResponse.error())
  );
}

type AuthState = { 
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | undefined;
}

export const mockAuthState = (authState: AuthState) => {
  vi.mocked(useAuth0).mockReturnValue({
    ...authState,
    getAccessTokenSilently: vi.fn().mockResolvedValue('a'),
    getAccessTokenWithPopup: vi.fn(),
    getIdTokenClaims: vi.fn(),
    loginWithRedirect: vi.fn(),
    loginWithPopup: vi.fn(),
    logout: vi.fn(),
    handleRedirectCallback: vi.fn()
  })
}