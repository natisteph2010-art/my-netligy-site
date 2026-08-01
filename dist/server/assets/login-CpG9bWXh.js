import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { handleAuthCallback, login, signup, AuthError } from "@netlify/identity";
import { u as useIdentity, G as GradeBridgeLogo } from "./router-B-N60cL0.js";
import "../server.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "./authorization-C4iwimjJ.js";
import "drizzle-orm/netlify-db";
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
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex items-center justify-center px-4 pt-20 stars-bg grid-pattern", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/3 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-float" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-1/3 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-float", style: {
        animationDelay: "2s"
      } })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-flex items-center gap-2 group", children: /* @__PURE__ */ jsx(GradeBridgeLogo, {}) }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 mt-2 text-sm", children: "Educational Mentoring Platform" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-8 shadow-2xl shadow-blue-900/20", children: [
        /* @__PURE__ */ jsx("div", { className: "flex rounded-xl bg-white/5 p-1 mb-8", children: ["login", "signup"].map((m) => /* @__PURE__ */ jsx("button", { onClick: () => {
          setMode(m);
          setError("");
          setSuccessMsg("");
        }, className: `flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === m ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-slate-400 hover:text-white"}`, children: m === "login" ? "Sign In" : "Create Account" }, m)) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          mode === "signup" && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Full Name" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), required: true, placeholder: "Your full name", className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Email Address" }),
            /* @__PURE__ */ jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, placeholder: "you@example.com", className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all" })
          ] }),
          isRecoveryFlow ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "New Password" }),
              /* @__PURE__ */ jsx("input", { type: "password", value: newPassword, onChange: (e) => setNewPassword(e.target.value), required: true, minLength: 8, placeholder: "Create a new password", className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Confirm Password" }),
              /* @__PURE__ */ jsx("input", { type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true, minLength: 8, placeholder: "Confirm your new password", className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all" })
            ] })
          ] }) : /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Password" }),
            /* @__PURE__ */ jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 8, placeholder: "••••••••", className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all" })
          ] }),
          error && /* @__PURE__ */ jsx("div", { className: "px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm", children: error }),
          successMsg && /* @__PURE__ */ jsx("div", { className: "px-4 py-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 text-sm", children: successMsg }),
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, className: "w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20 btn-shimmer mt-2", children: loading ? /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
            isRecoveryFlow ? "Updating password…" : mode === "login" ? "Signing in…" : "Creating account…"
          ] }) : isRecoveryFlow ? "Set New Password" : mode === "login" ? "Sign In" : "Create Account" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 text-center text-slate-400 text-sm", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-white transition-colors", children: "← Back to Home" }) })
      ] })
    ] })
  ] });
}
export {
  LoginPage as component
};
