//import { StrictMode } from "react";
import { HeroUIProvider } from "@heroui/react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    
  <HeroUIProvider>
    <Auth0Provider
      domain="dev-noq8jx06ofgyidpa.us.auth0.com"
      clientId="aSXZUzGn0fKWP7XMj9fCemsW30lRfA3U"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
        <App />
    </Auth0Provider>
  </HeroUIProvider>,
      
);
