import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from "react-oidc-context";

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_DMQJK4oAu",
  client_id: "eslchaetbgv72fopeo0f6mvtf",
  redirect_uri: "https://cloud.anasroud.com",
  response_type: "code",
  scope: "email openid phone",
};

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </StrictMode>
);
