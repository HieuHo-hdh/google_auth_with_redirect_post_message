export const GOOGLE_OAUTH_CONFIG = {
  clientId: import.meta.env.VITE_CLIENT_ID!,
  redirectUri: 'http://localhost:3333/api/v1/google_authentication_redirect', // Must match the redirect URI in Google Cloud Console
  scope: 'email profile', // Adjust scopes as needed
  responseType: 'code', // Use 'code' for authorization code flow
  authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
};