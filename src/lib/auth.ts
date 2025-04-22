import { UserManagerSettings } from "oidc-client-ts";

export const oidcConfig: UserManagerSettings = {
  authority: "https://cloud.anasroud.com/auth",
  client_id: "2g09ceiljspi692sbhvua06jbb",
  redirect_uri: "https://cloud.anasroud.com/callback",
  response_type: "code",
  scope: "openid profile email",
  post_logout_redirect_uri: "https://cloud.anasroud.com",
  loadUserInfo: true,
  metadata: {
    authorization_endpoint: "https://cloud.anasroud.com/auth/authorize",
    token_endpoint: "https://cloud.anasroud.com/auth/token",
    userinfo_endpoint: "https://cloud.anasroud.com/auth/userinfo",
    end_session_endpoint: "https://cloud.anasroud.com/auth/logout",
  },
}; 