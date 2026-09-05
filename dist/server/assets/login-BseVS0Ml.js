import { jsxDEV, Fragment } from "react/jsx-dev-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { handleAuthCallback, login, signup, AuthError } from "@netlify/identity";
import { u as useIdentity, G as GradeBridgeLogo } from "./router-B9NdsvbV.js";
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
function LoginPage() {
  const {
    user,
    ready
  } = useIdentity();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isRecoveryFlow, setIsRecoveryFlow] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    if (!ready) return;
    const hash = window.location.hash;
    const shouldHandleRecovery = hash.includes("recovery_token=");
    if (!shouldHandleRecovery) {
      if (user) {
        const role = user.roles?.[0];
        if (role === "admin") navigate({
          to: "/dashboard/admin"
        });
        else if (role === "mentor") navigate({
          to: "/dashboard/mentor"
        });
        else navigate({
          to: "/dashboard/student"
        });
      }
      return;
    }
    let cancelled = false;
    const completeRecovery = async () => {
      setError("");
      try {
        if (!user) {
          await handleAuthCallback();
        }
        if (!cancelled) {
          setIsRecoveryFlow(true);
          setSuccessMsg("Choose a new password to finish signing in.");
          window.history.replaceState({}, "", `${window.location.pathname}${window.location.search}`);
        }
      } catch (err) {
        if (!cancelled) {
          setError("We could not complete the password reset. Please request a fresh email and try again.");
        }
      }
    };
    void completeRecovery();
    return () => {
      cancelled = true;
    };
  }, [ready, user, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      if (isRecoveryFlow) {
        if (newPassword.length < 8) {
          setError("Password must be at least 8 characters long.");
          setLoading(false);
          return;
        }
        if (newPassword !== confirmPassword) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }
        const identityModule = await import("@netlify/identity");
        const updatePassword = identityModule.updateUser;
        if (typeof updatePassword !== "function") {
          throw new Error("Password update is not available in this environment.");
        }
        await updatePassword({
          password: newPassword
        });
        const role = user?.roles?.[0];
        const dashboardPath = role === "admin" ? "/dashboard/admin" : role === "mentor" ? "/dashboard/mentor" : "/dashboard/student";
        setSuccessMsg("Password updated successfully. Redirecting to your dashboard...");
        setNewPassword("");
        setConfirmPassword("");
        navigate({
          to: dashboardPath
        });
        setLoading(false);
        return;
      }
      if (mode === "login") {
        await login(email, password);
      } else {
        const u = await signup(email, password, {
          full_name: name
        });
        if (!u.emailVerified) {
          setSuccessMsg("Check your email to confirm your account before logging in.");
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      if (err instanceof AuthError) {
        if (err.status === 401) setError("Invalid email or password.");
        else if (err.status === 422) setError("Invalid email or password format.");
        else setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
      setLoading(false);
    }
  };
  if (!ready) {
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
      lineNumber: 125,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
      lineNumber: 124,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen flex items-center justify-center px-4 pt-20 stars-bg grid-pattern", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 pointer-events-none", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1/3 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-float" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
        lineNumber: 130,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-1/3 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-float", style: {
        animationDelay: "2s"
      } }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
        lineNumber: 131,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
      lineNumber: 129,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "relative w-full max-w-md", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsxDEV(Link, { to: "/", className: "inline-flex items-center gap-2 group", children: /* @__PURE__ */ jsxDEV(GradeBridgeLogo, {}, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
          lineNumber: 140,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
          lineNumber: 139,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 mt-2 text-sm", children: "Educational Mentoring Platform" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
          lineNumber: 142,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
        lineNumber: 138,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "glass rounded-3xl p-8 shadow-2xl shadow-blue-900/20", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex rounded-xl bg-white/5 p-1 mb-8", children: ["login", "signup"].map((m) => /* @__PURE__ */ jsxDEV("button", { onClick: () => {
          setMode(m);
          setError("");
          setSuccessMsg("");
        }, className: `flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === m ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-slate-400 hover:text-white"}`, children: m === "login" ? "Sign In" : "Create Account" }, m, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
          lineNumber: 148,
          columnNumber: 54
        }, this)) }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
          lineNumber: 147,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          mode === "signup" && /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Full Name" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
              lineNumber: 159,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), required: true, placeholder: "Your full name", className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
              lineNumber: 160,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
            lineNumber: 158,
            columnNumber: 35
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Email Address" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
              lineNumber: 163,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, placeholder: "you@example.com", className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
              lineNumber: 164,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
            lineNumber: 162,
            columnNumber: 13
          }, this),
          isRecoveryFlow ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "New Password" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
                lineNumber: 168,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("input", { type: "password", value: newPassword, onChange: (e) => setNewPassword(e.target.value), required: true, minLength: 8, placeholder: "Create a new password", className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
                lineNumber: 169,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
              lineNumber: 167,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Confirm Password" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
                lineNumber: 172,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("input", { type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true, minLength: 8, placeholder: "Confirm your new password", className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
                lineNumber: 173,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
              lineNumber: 171,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
            lineNumber: 166,
            columnNumber: 31
          }, this) : /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Password" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
              lineNumber: 176,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 8, placeholder: "••••••••", className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
              lineNumber: 177,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
            lineNumber: 175,
            columnNumber: 21
          }, this),
          error && /* @__PURE__ */ jsxDEV("div", { className: "px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm", children: error }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
            lineNumber: 180,
            columnNumber: 23
          }, this),
          successMsg && /* @__PURE__ */ jsxDEV("div", { className: "px-4 py-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 text-sm", children: successMsg }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
            lineNumber: 183,
            columnNumber: 28
          }, this),
          /* @__PURE__ */ jsxDEV("button", { type: "submit", disabled: loading, className: "w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20 btn-shimmer mt-2", children: loading ? /* @__PURE__ */ jsxDEV("span", { className: "flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
              lineNumber: 189,
              columnNumber: 19
            }, this),
            isRecoveryFlow ? "Updating password…" : mode === "login" ? "Signing in…" : "Creating account…"
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
            lineNumber: 188,
            columnNumber: 26
          }, this) : isRecoveryFlow ? "Set New Password" : mode === "login" ? "Sign In" : "Create Account" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
            lineNumber: 187,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
          lineNumber: 157,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-6 text-center text-slate-400 text-sm", children: /* @__PURE__ */ jsxDEV(Link, { to: "/", className: "hover:text-white transition-colors", children: "← Back to Home" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
          lineNumber: 196,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
          lineNumber: 195,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
        lineNumber: 145,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
      lineNumber: 136,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/login.tsx?tsr-split=component",
    lineNumber: 128,
    columnNumber: 10
  }, this);
}
export {
  LoginPage as component
};
