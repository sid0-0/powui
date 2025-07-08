import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import BaseHtml from "./base.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div dangerouslySetInnerHTML={{ __html: BaseHtml }} />
    <App />
  </StrictMode>
);
