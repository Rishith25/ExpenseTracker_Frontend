import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://272306b42a11342ab1dfdb961bcc5a2b@o4506932182712320.ingest.us.sentry.io/4507142651445248",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
