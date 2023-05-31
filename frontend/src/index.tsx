import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App'

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

console.log(process.env.REACT_APP_OAUTH_CLIENT_ID)

root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID!}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
);