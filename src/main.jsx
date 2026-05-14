import React from "react";
import ReactDOM from "react-dom/client";
import { App as AntApp } from "antd";
import App from "./App";
import AuthProvider from "./contexts/AuthContext";
import "antd/dist/reset.css";

// Only initialise OneSignal when running on the configured port (5173)
const ONESIGNAL_PORT = "5173";

if (window.location.port === ONESIGNAL_PORT) {
  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(async function (OneSignal) {
    try {
      await OneSignal.init({
        appId: "6eebf422-2b44-4bd6-8521-35f6d57df588",
        notifyButton: { enable: false },
        allowLocalhostAsSecureOrigin: true,
      });

      const permission = OneSignal.Notifications.permissionNative;
      const isSubscribed = OneSignal.User?.PushSubscription?.optedIn;

      console.log("[OneSignal] permission:", permission);
      console.log("[OneSignal] already subscribed:", isSubscribed);
      console.log("[OneSignal] subscription id:", OneSignal.User?.PushSubscription?.id);

      if (!isSubscribed) {
        if (permission === "default") {
          // First visit: show the browser permission popup
          await OneSignal.Notifications.requestPermission();
        } else if (permission === "granted") {
          // Already allowed: activate subscription silently
          await OneSignal.User.PushSubscription.optIn();
        }
      }

      // Log the final subscription id after opt-in
      console.log("[OneSignal] final subscription id:", OneSignal.User?.PushSubscription?.id);
    } catch (err) {
      // Silent — init errors are non-fatal
    }
  });

  // Load the OneSignal SDK script dynamically
  const script = document.createElement("script");
  script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
  script.defer = true;
  document.head.appendChild(script);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AntApp>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AntApp>
  </React.StrictMode>
);