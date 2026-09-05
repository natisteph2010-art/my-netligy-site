import { jsxDEV } from "react/jsx-dev-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { handleAuthCallback, getUser, AuthError } from "@netlify/identity";
import { G as GradeBridgeLogo } from "./router-B_5X4ilg.js";
import "@react-three/fiber";
import "@react-three/drei";
import "three";
import "../server.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "./authorization-kN9PmZWb.js";
import "drizzle-orm/postgres-js";
import "postgres";
import "drizzle-orm/pg-core";
import "drizzle-orm";
function ResetPasswordPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dashboardPath, setDashboardPath] = useState("/dashboard/mentor");
  useEffect(() => {
    const hash = window.location.hash;
    const isRecovery = hash.includes("recovery_token=");
    const isInvite = hash.includes("invite_token=");
    if (!isRecovery && !isInvite) {
      setError("Invalid or expired password reset link.");
      setLoading(false);
      return;
    }
    const completeCallback = async () => {
      setError("");
      setSuccess("Completing your reset link…");
      try {
        await handleAuthCallback();
        const user = await getUser();
        const role = user?.roles?.[0];
        setDashboardPath(role === "admin" ? "/dashboard/admin" : role === "mentor" ? "/dashboard/mentor" : "/dashboard/student");
        setSuccess("Enter a new password to finish signing in.");
        setReady(true);
        setLoading(false);
        window.history.replaceState({}, "", "/reset-password");
      } catch (err) {
        console.error("Password reset callback failed:", err);
        setError("We could not complete the reset link. Please request a new one.");
        setLoading(false);
      }
    };
    void completeCallback();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!ready) return;
    setLoading(true);
    setError("");
    setSuccess("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    try {
      const identity = await import("@netlify/identity");
      const updateUser = identity.updateUser;
      if (typeof updateUser !== "function") {
        throw new Error("Unable to update password in this environment.");
      }
      await updateUser({
        password
      });
      setSuccess("Password updated successfully. Redirecting…");
      setPassword("");
      setConfirmPassword("");
      navigate({
        to: dashboardPath
      });
    } catch (err) {
      if (err instanceof AuthError) {
        setError(err.message);
      } else {
        setError("Unable to update your password. Please try again.");
      }
      console.error("Password update failed:", err);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen flex items-center justify-center px-4 pt-20 stars-bg grid-pattern", children: /* @__PURE__ */ jsxDEV("div", { className: "relative w-full max-w-md", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxDEV(Link, { to: "/", className: "inline-flex items-center gap-2 group", children: /* @__PURE__ */ jsxDEV(GradeBridgeLogo, {}, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
        lineNumber: 89,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
        lineNumber: 88,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 mt-2 text-sm", children: "Reset your mentor password after approval." }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
        lineNumber: 91,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
      lineNumber: 87,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "glass rounded-3xl p-8 shadow-2xl shadow-blue-900/20", children: [
      /* @__PURE__ */ jsxDEV("h1", { className: "text-2xl font-semibold text-white mb-4", children: "Set a new password" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
        lineNumber: 95,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 mb-6", children: "Use the link from your approval email to create a secure password." }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
        lineNumber: 96,
        columnNumber: 11
      }, this),
      error && /* @__PURE__ */ jsxDEV("div", { className: "px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm mb-4", children: error }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
        lineNumber: 98,
        columnNumber: 21
      }, this),
      success && /* @__PURE__ */ jsxDEV("div", { className: "px-4 py-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 text-sm mb-4", children: success }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
        lineNumber: 102,
        columnNumber: 23
      }, this),
      /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "New Password" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
            lineNumber: 108,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), disabled: !ready || loading, required: true, minLength: 8, placeholder: "Create a new password", className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
            lineNumber: 109,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
          lineNumber: 107,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Confirm Password" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
            lineNumber: 112,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("input", { type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), disabled: !ready || loading, required: true, minLength: 8, placeholder: "Confirm your new password", className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
            lineNumber: 113,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
          lineNumber: 111,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("button", { type: "submit", disabled: !ready || loading, className: "w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20 btn-shimmer mt-2", children: loading ? "Processing…" : "Save new password" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
          lineNumber: 115,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
        lineNumber: 106,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-6 text-center text-slate-400 text-sm", children: /* @__PURE__ */ jsxDEV(Link, { to: "/login", className: "hover:text-white transition-colors", children: "Back to Sign In" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
        lineNumber: 121,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
        lineNumber: 120,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
      lineNumber: 94,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
    lineNumber: 86,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/reset-password.tsx?tsr-split=component",
    lineNumber: 85,
    columnNumber: 10
  }, this);
}
export {
  ResetPasswordPage as component
};
