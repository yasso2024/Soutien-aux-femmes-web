import { createContext, useEffect, useState } from "react";
import { getMe } from "../api/auth";
import { savePlayerID } from "../api/users";

export const AuthContext = createContext(null);

async function registerOneSignal(userId) {
  try {
    const OS = window.OneSignal;
    if (!OS) { console.warn("[OneSignal] SDK not loaded yet"); return; }
    await OS.login(String(userId));
    const subscriptionId = OS.User?.PushSubscription?.id;
    console.log("[OneSignal] linked user:", userId, "| subscription id:", subscriptionId);
    if (subscriptionId) {
      await savePlayerID(subscriptionId);
      console.log("[OneSignal] player id saved to backend:", subscriptionId);
    } else {
      console.warn("[OneSignal] no subscription id after login — user may not have opted in yet");
    }
  } catch (err) {
    console.warn("OneSignal registration failed:", err.message);
  }
}

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("auth-token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("auth-token");
    setToken(null);
    setUser(null);
    try { window.OneSignal?.logout(); } catch {}
  };

  useEffect(() => {
    async function loadUser() {
      setLoading(true);

      try {
        if (!token) {
          setUser(null);
          return;
        }

        localStorage.setItem("auth-token", token);
        const response = await getMe();
        setUser(response.data.user);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [token]);

  // Register user with OneSignal whenever the user object is set
  useEffect(() => {
    if (user?._id) {
      registerOneSignal(user._id);
    }
  }, [user?._id]);

  return (
    <AuthContext.Provider
      value={{ token, setToken, user, setUser, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}