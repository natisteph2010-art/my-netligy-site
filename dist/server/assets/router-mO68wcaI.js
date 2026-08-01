import { createRootRoute, HeadContent, Scripts, useRouterState, Link, createFileRoute, lazyRouteComponent, useNavigate, redirect, createRouter } from "@tanstack/react-router";
import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import { getUser, onAuthChange, logout, handleAuthCallback, signup, AuthError } from "@netlify/identity";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "../server.js";
import { g as getAdminUser, d as db, a as announcements, s as students, m as mentorProfiles, b as mentoringSessions, c as mentorApplications } from "./authorization-DEwvlZPH.js";
import { desc, and, eq, lte, or, isNull, gt, inArray, asc, gte, count } from "drizzle-orm";
const IdentityContext = createContext(null);
function IdentityProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    getUser().then((u) => {
      setUser(u ?? null);
      setReady(true);
    });
    const unsubscribe = onAuthChange((_event, u) => {
      setUser(u ?? null);
    });
    return unsubscribe;
  }, []);
  return /* @__PURE__ */ jsx(IdentityContext.Provider, { value: { user, ready, logout }, children });
}
function useIdentity() {
  const ctx = useContext(IdentityContext);
  if (!ctx) throw new Error("useIdentity must be used within an IdentityProvider");
  return ctx;
}
const AUTH_HASH_PATTERN = /^#(confirmation_token|recovery_token|invite_token|email_change_token|access_token)=/;
function CallbackHandler({ children }) {
  useEffect(() => {
    const hash = window.location.hash;
    if (!AUTH_HASH_PATTERN.test(hash)) return;
    const isRecovery = hash.includes("recovery_token=");
    const isInvite = hash.includes("invite_token=");
    if ((isRecovery || isInvite) && window.location.pathname !== "/reset-password") {
      window.location.assign(`/reset-password${hash}`);
      return;
    }
    void handleAuthCallback().catch((error) => {
      console.error("Auth callback failed:", error);
    });
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children });
}
function GradeBridgeLogo({ compact = false, className = "" }) {
  return /* @__PURE__ */ jsx(
    "img",
    {
      src: "/gradebridge-logo.svg",
      alt: "GradeBridge",
      "data-sb-object-id": "content/site.json",
      "data-sb-field-path": "logo.src",
      "data-sb-alt-field-path": "logo.alt",
      className: `${compact ? "h-10 w-10" : "h-16 w-52"} object-contain ${className}`
    }
  );
}
const Route$k = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GradeBridge — Educational Mentoring Platform" },
      { name: "description", content: "GradeBridge connects IGCSE mentors with students through free tutoring and mentorship." }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap" }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: "scroll-smooth", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { className: "bg-slate-950 text-white antialiased", children: [
      /* @__PURE__ */ jsx(IdentityProvider, { children: /* @__PURE__ */ jsxs(CallbackHandler, { children: [
        /* @__PURE__ */ jsx(NavBar, {}),
        children
      ] }) }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const { user, ready, logout: logout2 } = useIdentity();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (pathname.startsWith("/dashboard/admin")) return null;
  const role = user?.roles?.[0] ?? (user ? "student" : null);
  const dashboardPath = role === "admin" ? "/dashboard/admin" : role === "mentor" ? "/dashboard/mentor" : "/dashboard/student";
  return /* @__PURE__ */ jsxs("nav", { className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-950/95 backdrop-blur-md shadow-lg shadow-blue-500/5 border-b border-white/5" : "bg-transparent"}`, children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-16", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center gap-2 group", children: /* @__PURE__ */ jsx(GradeBridgeLogo, { compact: true, className: "group-hover:opacity-90 transition-opacity" }) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-6 text-sm font-medium", children: [
        /* @__PURE__ */ jsx("a", { href: "/#about", className: "text-slate-300 hover:text-white transition-colors", children: "About" }),
        /* @__PURE__ */ jsx("a", { href: "/#programs", className: "text-slate-300 hover:text-white transition-colors", children: "Programs" }),
        /* @__PURE__ */ jsx(Link, { to: "/mentors", className: "text-slate-300 hover:text-white transition-colors", children: "Mentors" }),
        /* @__PURE__ */ jsx("a", { href: "/#contact", className: "text-slate-300 hover:text-white transition-colors", children: "Contact" }),
        ready && user ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Link, { to: dashboardPath, className: "text-slate-300 hover:text-white transition-colors", children: "Dashboard" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => logout2().then(() => window.location.href = "/"),
              className: "px-4 py-1.5 rounded-lg border border-white/20 text-slate-300 hover:text-white hover:border-white/40 transition-all text-sm",
              children: "Sign Out"
            }
          )
        ] }) : ready ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Link, { to: "/login", className: "text-slate-300 hover:text-white transition-colors", children: "Sign In" }),
          /* @__PURE__ */ jsx(Link, { to: "/apply/mentor", className: "px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20", children: "Join Now" })
        ] }) : null,
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setDarkMode(!darkMode),
            className: "w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all",
            "aria-label": "Toggle dark mode",
            children: darkMode ? "☀" : "🌙"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setMobileOpen(!mobileOpen),
          className: "md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5",
          "aria-label": "Menu",
          children: [
            /* @__PURE__ */ jsx("span", { className: `block w-5 h-0.5 bg-white transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}` }),
            /* @__PURE__ */ jsx("span", { className: `block w-5 h-0.5 bg-white transition-opacity ${mobileOpen ? "opacity-0" : ""}` }),
            /* @__PURE__ */ jsx("span", { className: `block w-5 h-0.5 bg-white transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}` })
          ]
        }
      )
    ] }) }),
    mobileOpen && /* @__PURE__ */ jsxs("div", { className: "md:hidden bg-slate-900/98 backdrop-blur-md border-b border-white/10 py-4 px-4 flex flex-col gap-3 text-sm", children: [
      /* @__PURE__ */ jsx("a", { href: "/#about", onClick: () => setMobileOpen(false), className: "text-slate-300 hover:text-white py-2", children: "About" }),
      /* @__PURE__ */ jsx("a", { href: "/#programs", onClick: () => setMobileOpen(false), className: "text-slate-300 hover:text-white py-2", children: "Programs" }),
      /* @__PURE__ */ jsx(Link, { to: "/mentors", onClick: () => setMobileOpen(false), className: "text-slate-300 hover:text-white py-2", children: "Mentors" }),
      /* @__PURE__ */ jsx("a", { href: "/#contact", onClick: () => setMobileOpen(false), className: "text-slate-300 hover:text-white py-2", children: "Contact" }),
      ready && user ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Link, { to: dashboardPath, onClick: () => setMobileOpen(false), className: "text-slate-300 hover:text-white py-2", children: "Dashboard" }),
        /* @__PURE__ */ jsx("button", { onClick: () => logout2().then(() => window.location.href = "/"), className: "text-left text-slate-300 hover:text-white py-2", children: "Sign Out" })
      ] }) : ready ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Link, { to: "/login", onClick: () => setMobileOpen(false), className: "text-slate-300 hover:text-white py-2", children: "Sign In" }),
        /* @__PURE__ */ jsx(Link, { to: "/apply/mentor", onClick: () => setMobileOpen(false), className: "text-blue-400 hover:text-blue-300 py-2 font-medium", children: "Join Now" })
      ] }) : null
    ] })
  ] });
}
const $$splitComponentImporter$1 = () => import("./reset-password-UZkUTkhM.js");
const Route$j = createFileRoute("/reset-password")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const Route$i = createFileRoute("/mentors")({
  component: MentorDirectoryPage
});
const SUBJECTS_FILTER = [
  "All",
  "Math",
  "Physics",
  "Chem",
  "Bio",
  "English",
  "Geo",
  "Computer Science",
  "Business",
  "ICT",
  "Global Citizenship"
];
const SCHEDULE_SUBJECTS = [
  "Math",
  "Physics",
  "Chem",
  "Bio",
  "English",
  "Geo",
  "Computer Science",
  "Business",
  "ICT",
  "Global Citizenship"
];
function MentorDirectoryPage() {
  const { user, ready } = useIdentity();
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [error, setError] = useState("");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [scheduleForm, setScheduleForm] = useState({
    studentName: "",
    studentContact: "",
    subject: "Math",
    topicDescription: "",
    scheduledAt: ""
  });
  const [scheduleStatus, setScheduleStatus] = useState("");
  const [submittingSchedule, setSubmittingSchedule] = useState(false);
  useEffect(() => {
    if (!ready) return;
    if (!user) {
      navigate({ to: "/login" });
      return;
    }
    const params = new URLSearchParams();
    if (subjectFilter !== "All") params.set("subject", subjectFilter);
    if (search) params.set("search", search);
    fetch(`/api/mentors/directory?${params}`).then((r) => {
      if (r.status === 401) {
        navigate({ to: "/login" });
        return null;
      }
      return r.json();
    }).then((data) => {
      if (data) setMentors(data);
      setLoading(false);
    }).catch(() => {
      setError("Failed to load mentors.");
      setLoading(false);
    });
  }, [ready, user, subjectFilter, search, navigate]);
  const parseSubjects = (raw) => {
    try {
      return JSON.parse(raw);
    } catch {
      return raw.split(",").map((s) => s.trim());
    }
  };
  const getInitials = (name) => name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const openScheduleModal = (mentor) => {
    setSelectedMentor(mentor);
    setScheduleForm({
      studentName: "",
      studentContact: "",
      subject: "Math",
      topicDescription: "",
      scheduledAt: ""
    });
    setScheduleStatus("");
  };
  const submitSchedule = async (event) => {
    event.preventDefault();
    if (!selectedMentor) return;
    setSubmittingSchedule(true);
    setScheduleStatus("");
    try {
      const response = await fetch("/api/mentors/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mentorIdentityUserId: selectedMentor.identityUserId,
          studentName: scheduleForm.studentName,
          studentContact: scheduleForm.studentContact,
          subject: scheduleForm.subject,
          topicDescription: scheduleForm.topicDescription,
          scheduledAt: scheduleForm.scheduledAt
        })
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Request failed.");
      setScheduleStatus("Session request saved as pending.");
      setSelectedMentor(null);
      setTimeout(() => window.location.reload(), 700);
    } catch (err) {
      setScheduleStatus(err instanceof Error ? err.message : "Unable to submit request.");
    } finally {
      setSubmittingSchedule(false);
    }
  };
  if (!ready || loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-400", children: "Loading mentor directory…" })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("span", { className: "text-teal-400 font-semibold tracking-wider uppercase text-sm", children: "Mentor Directory" }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl sm:text-5xl font-black mt-3 mb-4 text-white", children: [
          "Find your ",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "next connection" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 max-w-2xl mx-auto", children: "Browse approved mentors, filter by subject, and explore a clean profile list to find the right connection for your academic goals." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row gap-4 mb-8", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400", children: "🔍" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search mentors by name, bio, or subject…",
            className: "w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-8", children: SUBJECTS_FILTER.map((s) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setSubjectFilter(s),
          className: `px-4 py-2 rounded-xl text-sm font-medium transition-all ${subjectFilter === s ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "glass border border-white/10 text-slate-300 hover:text-white hover:border-blue-500/30"}`,
          children: s
        },
        s
      )) }),
      error && /* @__PURE__ */ jsx("div", { className: "text-center py-12 text-red-400", children: error }),
      mentors.length === 0 && !error ? /* @__PURE__ */ jsxs("div", { className: "text-center py-20", children: [
        /* @__PURE__ */ jsx("div", { className: "text-5xl mb-4", children: "🔍" }),
        /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-xl mb-2", children: "No mentors found" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400", children: "Try adjusting your search or filters." })
      ] }) : /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 xl:grid-cols-3 gap-6", children: mentors.map((mentor) => {
        const subjects = parseSubjects(mentor.subjects);
        return /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-6 card-glow glass-hover flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm overflow-hidden", children: mentor.profilePicUrl ? /* @__PURE__ */ jsx("img", { src: mentor.profilePicUrl, alt: mentor.fullName, className: "w-full h-full object-cover" }) : getInitials(mentor.fullName) }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-lg truncate", children: mentor.fullName }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs", children: subjects.slice(0, 2).join(" · ") || "IGCSE Mentor" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-sm leading-relaxed mb-4 flex-1", children: mentor.bio || mentor.reason || "An approved mentor ready to share their experience." }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 mb-4", children: subjects.slice(0, 4).map((subject) => /* @__PURE__ */ jsx("span", { className: "px-2 py-1 rounded-md bg-sky-400/10 text-sky-200 text-xs", children: subject }, subject)) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 mt-auto", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400", children: mentor.availability || "Flexible availability" }),
            mentor.contactEmail && /* @__PURE__ */ jsx("a", { href: `mailto:${mentor.contactEmail}`, className: "inline-flex items-center px-4 py-2 rounded-lg bg-sky-500 text-white text-sm font-semibold hover:bg-sky-400 transition-colors", children: "Connect →" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1", children: (mentor.weeklyApprovedCount ?? 0) >= 4 ? /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-300", children: "Fully Booked This Week" }) : /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300", children: [
              Math.max(0, 4 - (mentor.weeklyApprovedCount ?? 0)),
              " slots left this week"
            ] }) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                disabled: (mentor.weeklyApprovedCount ?? 0) >= 4,
                onClick: () => openScheduleModal(mentor),
                className: "px-3 py-2 rounded-lg bg-white/5 text-white text-sm font-semibold border border-white/10 hover:border-sky-400/50 hover:bg-sky-500/10 disabled:opacity-45 disabled:cursor-not-allowed",
                children: "Schedule Session"
              }
            )
          ] })
        ] }, mentor.id);
      }) })
    ] }),
    selectedMentor && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl shadow-blue-950/40", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3 mb-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-sky-300", children: "Session Request" }),
          /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-black text-white", children: [
            "Book with ",
            selectedMentor.fullName
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setSelectedMentor(null), className: "text-slate-400 hover:text-white", children: "✕" })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submitSchedule, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-sm text-slate-300", children: [
            /* @__PURE__ */ jsx("span", { className: "mb-1 block", children: "Student Name" }),
            /* @__PURE__ */ jsx("input", { required: true, value: scheduleForm.studentName, onChange: (e) => setScheduleForm((f) => ({ ...f, studentName: e.target.value })), className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "block text-sm text-slate-300", children: [
            /* @__PURE__ */ jsx("span", { className: "mb-1 block", children: "Student Contact" }),
            /* @__PURE__ */ jsx("input", { required: true, value: scheduleForm.studentContact, onChange: (e) => setScheduleForm((f) => ({ ...f, studentContact: e.target.value })), className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white", placeholder: "Email or Telegram" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "block text-sm text-slate-300", children: [
          /* @__PURE__ */ jsx("span", { className: "mb-1 block", children: "Subject" }),
          /* @__PURE__ */ jsx("select", { required: true, value: scheduleForm.subject, onChange: (e) => setScheduleForm((f) => ({ ...f, subject: e.target.value })), className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white", children: SCHEDULE_SUBJECTS.map((subject) => /* @__PURE__ */ jsx("option", { value: subject, children: subject }, subject)) })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "block text-sm text-slate-300", children: [
          /* @__PURE__ */ jsx("span", { className: "mb-1 block", children: "Topic Description" }),
          /* @__PURE__ */ jsx("textarea", { required: true, rows: 4, value: scheduleForm.topicDescription, onChange: (e) => setScheduleForm((f) => ({ ...f, topicDescription: e.target.value })), className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white", placeholder: "Describe the topic you want help with." })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "block text-sm text-slate-300", children: [
          /* @__PURE__ */ jsx("span", { className: "mb-1 block", children: "Date & Time" }),
          /* @__PURE__ */ jsx("input", { required: true, type: "datetime-local", value: scheduleForm.scheduledAt, onChange: (e) => setScheduleForm((f) => ({ ...f, scheduledAt: e.target.value })), className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white" })
        ] }),
        scheduleStatus && /* @__PURE__ */ jsx("p", { className: "text-sm text-sky-300", children: scheduleStatus }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setSelectedMentor(null), className: "rounded-xl border border-white/10 px-4 py-2 text-slate-300", children: "Cancel" }),
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: submittingSchedule, className: "rounded-xl bg-sky-500 px-4 py-2 font-semibold text-white disabled:opacity-60", children: submittingSchedule ? "Submitting…" : "Send Request" })
        ] })
      ] })
    ] }) })
  ] });
}
const $$splitComponentImporter = () => import("./login-DKDfvroC.js");
const Route$h = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const heroKicker = "The Knowledge Network";
const heroEyebrow = "GradeBridge";
const heroHeadline = "A clearer path to";
const heroHighlight = "understanding.";
const heroSubtitle = "Students and mentors connected through knowledge, experience, and the quiet confidence that comes from learning together.";
const heroPrimaryCta = "Become a mentor";
const heroSecondaryCta = "Enroll as a student";
const aboutEyebrow = "About GradeBridge";
const aboutTitle = "Built by students, for students";
const aboutBody1 = "GradeBridge was founded by IGCSE graduates who understood the unique challenges of navigating the Pearson Edexcel curriculum. We know how overwhelming it can feel — and we built this community to change that.";
const aboutBody2 = "Our mentors don't just teach content — they share lived experience, exam strategies, and the mindset needed to excel. Every student deserves access to quality guidance regardless of background.";
const aboutCards$1 = [{ "icon": "📌", "title": "Founded", "value": "2023", "desc": "By IGCSE graduates" }, { "icon": "🌍", "title": "Mission", "value": "Free Access", "desc": "Quality mentorship for all" }, { "icon": "🏆", "title": "Focus", "value": "A* Results", "desc": "Proven exam strategies" }, { "icon": "🤗", "title": "Community", "value": "200+ Members", "desc": "Growing student network" }];
const programsEyebrow = "Our Programs";
const programsTitle = "Structured Support at Every Step";
const programCards$1 = [{ "icon": "📚", "eyebrow": "Weekly", "title": "Free Tutoring Sessions", "description": "Every week, experienced mentors lead focused tutoring sessions covering IGCSE subjects. From exam technique to concept mastery — we've got it covered.", "benefits": ["Live interactive sessions", "All major IGCSE subjects", "Q&A time included", "Recorded for later review"] }, { "icon": "💬", "eyebrow": "Monthly", "title": "In-Person Q&A Sessions", "description": "Once a month, we gather in person for open Q&A sessions where students can ask anything — from study strategies to career advice and everything in between.", "benefits": ["Face-to-face interaction", "No question too small", "Multiple mentors present", "Networking opportunities"] }];
const homePageContent = {
  heroKicker,
  heroEyebrow,
  heroHeadline,
  heroHighlight,
  heroSubtitle,
  heroPrimaryCta,
  heroSecondaryCta,
  aboutEyebrow,
  aboutTitle,
  aboutBody1,
  aboutBody2,
  aboutCards: aboutCards$1,
  programsEyebrow,
  programsTitle,
  programCards: programCards$1
};
function AnnouncementBanner({ className = "" }) {
  const [items, setItems] = useState([]);
  const [dismissed, setDismissed] = useState([]);
  useEffect(() => {
    fetch("/api/announcements").then((r) => r.ok ? r.json() : []).then((data) => Array.isArray(data) && setItems(data)).catch(() => {
    });
  }, []);
  const visible = items.filter((a) => !dismissed.includes(a.id));
  if (visible.length === 0) return null;
  return /* @__PURE__ */ jsx("div", { className: `space-y-3 ${className}`, children: visible.map((a) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: `glass rounded-2xl px-5 py-4 flex items-start gap-4 border ${a.pinned ? "border-blue-500/40 shadow-lg shadow-blue-500/10" : "border-white/10"}`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center flex-shrink-0 text-white", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", "data-sb-object-id": "content/site.json", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            a.pinned && /* @__PURE__ */ jsx("span", { "data-sb-field-path": "pinnedLabel", className: "text-xs font-semibold text-blue-300 uppercase tracking-wider", children: "Pinned" }),
            /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold", children: a.title })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-sm mt-1 leading-relaxed", children: a.body })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setDismissed((d) => [...d, a.id]),
            className: "text-slate-400 hover:text-white transition-colors flex-shrink-0",
            "aria-label": "Dismiss",
            children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) })
          }
        )
      ]
    },
    a.id
  )) });
}
function EntranceOverlay() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1900);
    return () => window.clearTimeout(timer);
  }, []);
  if (!visible) return null;
  return /* @__PURE__ */ jsxs("div", { className: "entrance-overlay", "aria-hidden": "true", "data-sb-object-id": "content/site.json", children: [
    /* @__PURE__ */ jsx("div", { className: "entrance-grid" }),
    /* @__PURE__ */ jsx("div", { className: "entrance-energy-line" }),
    /* @__PURE__ */ jsxs("div", { className: "entrance-mark", children: [
      /* @__PURE__ */ jsx(GradeBridgeLogo, { compact: true, className: "entrance-logo" }),
      /* @__PURE__ */ jsx("span", { "data-sb-field-path": "overlayTitle", children: "Knowledge Network" })
    ] })
  ] });
}
const NODES = [
  { label: "Mathematics", symbol: "∑", className: "hub-node-math" },
  { label: "Physics", symbol: "F = ma", className: "hub-node-physics" },
  { label: "Chemistry", symbol: "⚗", className: "hub-node-chemistry" },
  { label: "Mentors", symbol: "◎", className: "hub-node-mentor" },
  { label: "Students", symbol: "◌", className: "hub-node-student" },
  { label: "Books", symbol: "▤", className: "hub-node-books" }
];
function GraduationCapIcon() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 64 64", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "capGlow", x1: "8", y1: "8", x2: "56", y2: "56", gradientUnits: "userSpaceOnUse", children: [
      /* @__PURE__ */ jsx("stop", { stopColor: "#E0F2FE" }),
      /* @__PURE__ */ jsx("stop", { offset: "0.48", stopColor: "#7DD3FC" }),
      /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#BAE6FD" })
    ] }) }),
    /* @__PURE__ */ jsx("path", { d: "M11 23.5L32 14L53 23.5L32 33L11 23.5Z", stroke: "url(#capGlow)", strokeWidth: "3.2", strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx("path", { d: "M18.5 28.5V40.5C18.5 40.5 24.1 45.5 32 45.5C39.9 45.5 45.5 40.5 45.5 40.5V28.5", stroke: "url(#capGlow)", strokeWidth: "3.2", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx("path", { d: "M48.5 27.5V39.5", stroke: "url(#capGlow)", strokeWidth: "3.2", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx("path", { d: "M50.5 39.5C50.5 43.3 41.5 46.5 32 46.5C22.5 46.5 13.5 43.3 13.5 39.5", stroke: "url(#capGlow)", strokeWidth: "2.6", strokeLinecap: "round", opacity: "0.88" })
  ] });
}
function KnowledgeHub() {
  const sceneRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (event) => {
      const bounds = scene.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      setTilt({ x: y * -8, y: x * 10 });
    };
    const reset = () => setTilt({ x: 0, y: 0 });
    scene.addEventListener("pointermove", onMove);
    scene.addEventListener("pointerleave", reset);
    return () => {
      scene.removeEventListener("pointermove", onMove);
      scene.removeEventListener("pointerleave", reset);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { ref: sceneRef, className: "knowledge-hub", "aria-label": "Interactive knowledge network visualization", "data-sb-object-id": "content/site.json", children: [
    /* @__PURE__ */ jsx("div", { className: "hub-aura" }),
    /* @__PURE__ */ jsx("div", { className: "hub-plane hub-plane-one" }),
    /* @__PURE__ */ jsx("div", { className: "hub-plane hub-plane-two" }),
    /* @__PURE__ */ jsx("div", { className: "hub-connections" }),
    /* @__PURE__ */ jsxs("div", { className: "hub-core", style: { transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }, children: [
      /* @__PURE__ */ jsx("div", { className: "hub-core-ring" }),
      /* @__PURE__ */ jsx("div", { className: "hub-core-light" }),
      /* @__PURE__ */ jsx(GraduationCapIcon, {})
    ] }),
    NODES.map((node, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: `hub-node ${node.className}`,
        style: { transform: `translateZ(${index * 8}px) rotateX(${tilt.x * 0.35}deg) rotateY(${tilt.y * 0.35}deg)` },
        children: [
          /* @__PURE__ */ jsx("span", { className: "hub-node-symbol", "data-sb-field-path": `hubNodes.${index}.symbol`, children: node.symbol }),
          /* @__PURE__ */ jsx("span", { className: "hub-node-label", "data-sb-field-path": `hubNodes.${index}.label`, children: node.label })
        ]
      },
      node.label
    )),
    /* @__PURE__ */ jsx("div", { className: "hub-orbit hub-orbit-one" }),
    /* @__PURE__ */ jsx("div", { className: "hub-orbit hub-orbit-two" })
  ] });
}
function ParticleNetwork({ className = "", density = 42 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parent = canvas.parentElement;
    let animationFrame = 0;
    let particles = [];
    let width = 0;
    let height = 0;
    const resize = () => {
      const bounds = parent?.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds?.width || window.innerWidth;
      height = bounds?.height || window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: Math.min(density, width < 640 ? 24 : density) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        radius: Math.random() * 1.4 + 0.6
      }));
    };
    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        if (!reduceMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x < -10 || particle.x > width + 10) particle.vx *= -1;
          if (particle.y < -10 || particle.y > height + 10) particle.vy *= -1;
        }
        context.beginPath();
        context.fillStyle = "rgba(125, 211, 252, 0.72)";
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }
      for (let first = 0; first < particles.length; first += 1) {
        for (let second = first + 1; second < particles.length; second += 1) {
          const dx = particles[first].x - particles[second].x;
          const dy = particles[first].y - particles[second].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            context.beginPath();
            context.strokeStyle = `rgba(56, 189, 248, ${0.16 * (1 - distance / 150)})`;
            context.lineWidth = 0.7;
            context.moveTo(particles[first].x, particles[first].y);
            context.lineTo(particles[second].x, particles[second].y);
            context.stroke();
          }
        }
      }
      if (!reduceMotion) animationFrame = requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [density]);
  return /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: `particle-network ${className}`, "aria-hidden": "true" });
}
const Route$g = createFileRoute("/")({
  component: LandingPage
});
const DEFAULT_ABOUT_CARDS = [
  { icon: "📌", title: "Founded", value: "2023", desc: "By IGCSE graduates" },
  { icon: "🌍", title: "Mission", value: "Free Access", desc: "Quality mentorship for all" },
  { icon: "🏆", title: "Focus", value: "A* Results", desc: "Proven exam strategies" },
  { icon: "🤗", title: "Community", value: "200+ Members", desc: "Growing student network" }
];
const DEFAULT_PROGRAM_CARDS = [
  {
    icon: "📚",
    eyebrow: "Weekly",
    title: "Free Tutoring Sessions",
    description: "Every week, experienced mentors lead focused tutoring sessions covering IGCSE subjects. From exam technique to concept mastery — we've got it covered.",
    benefits: ["Live interactive sessions", "All major IGCSE subjects", "Q&A time included", "Recorded for later review"]
  },
  {
    icon: "💬",
    eyebrow: "Monthly",
    title: "In-Person Q&A Sessions",
    description: "Once a month, we gather in person for open Q&A sessions where students can ask anything — from study strategies to career advice and everything in between.",
    benefits: ["Face-to-face interaction", "No question too small", "Multiple mentors present", "Networking opportunities"]
  }
];
const SUBJECTS = ["Math", "Physics", "Chem", "Bio", "English", "Geo", "Computer Science", "Business", "ICT", "Global Citizenship"];
const BENEFITS = [
  { icon: "🆓", title: "Completely Free", desc: "All tutoring and Q&A sessions are free of charge for registered students." },
  { icon: "🎯", title: "Experienced Mentors", desc: "Learn from students who have successfully completed IGCSE with excellent grades." },
  { icon: "📅", title: "Flexible Schedule", desc: "Weekly and monthly sessions planned around your school timetable." },
  { icon: "🤝", title: "Peer Support", desc: "Build lasting connections with students who understand your journey." },
  { icon: "📖", title: "Curated Resources", desc: "Access study materials, past papers, and strategies proven to work." },
  { icon: "💡", title: "Live Q&A Sessions", desc: "Get your burning questions answered in real-time by experienced mentors." }
];
const pageContent = homePageContent;
const aboutCards = pageContent.aboutCards?.length ? pageContent.aboutCards : DEFAULT_ABOUT_CARDS;
const programCards = pageContent.programCards?.length ? pageContent.programCards : DEFAULT_PROGRAM_CARDS;
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".section-fade").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
function LandingPage() {
  useScrollReveal();
  const [contactStatus, setContactStatus] = useState("idle");
  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setContactStatus("sending");
    try {
      const formData = new FormData(event.currentTarget);
      const body = new URLSearchParams();
      formData.forEach((value, key) => {
        if (typeof value === "string") body.append(key, value);
      });
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
      });
      if (!response.ok) throw new Error("Contact form submission failed");
      event.currentTarget.reset();
      setContactStatus("sent");
    } catch {
      setContactStatus("error");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(EntranceOverlay, {}),
    /* @__PURE__ */ jsx("div", { className: "fixed top-16 left-1/2 -translate-x-1/2 z-40 w-full max-w-3xl px-4", children: /* @__PURE__ */ jsx(AnnouncementBanner, {}) }),
    /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex items-center overflow-hidden cinematic-surface grid-pattern pt-20", "data-sb-object-id": "content/pages/home.json", children: [
      /* @__PURE__ */ jsx("div", { className: "aurora-layer" }),
      /* @__PURE__ */ jsx(ParticleNetwork, { density: 52 }),
      /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-2 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "hero-content", children: [
          /* @__PURE__ */ jsxs("div", { className: "hero-kicker inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.16em] uppercase mb-8 animate-fade-in-up", "data-sb-field-path": "heroKicker", children: [
            /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse" }),
            pageContent.heroKicker
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sky-200 font-medium tracking-[0.28em] uppercase text-xs mb-5", "data-sb-field-path": "heroEyebrow", children: pageContent.heroEyebrow }),
          /* @__PURE__ */ jsx("div", { "data-sb-object-id": "content/pages/home.json", "data-sb-field-path": "heroHeadline", children: /* @__PURE__ */ jsxs("h1", { "data-sb-field-path": "heroHeadline", className: "hero-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] mb-7", children: [
            pageContent.heroHeadline,
            " ",
            /* @__PURE__ */ jsx("strong", { "data-sb-field-path": "heroHighlight", className: "gradient-text", children: pageContent.heroHighlight })
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-lg sm:text-xl max-w-xl mb-9 leading-relaxed", "data-sb-field-path": "heroSubtitle", children: pageContent.heroSubtitle }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-12", children: [
            /* @__PURE__ */ jsxs(Link, { to: "/apply/mentor", className: "btn-shimmer px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-xl shadow-sky-900/30 hover:shadow-sky-500/30 hover:-translate-y-0.5 transition-all duration-300", "data-sb-field-path": "heroPrimaryCta", children: [
              pageContent.heroPrimaryCta,
              " ",
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "→" })
            ] }),
            /* @__PURE__ */ jsx(Link, { to: "/register/student", className: "btn-shimmer px-7 py-3.5 rounded-xl border border-sky-300/30 bg-sky-950/40 text-sky-100 font-semibold hover:bg-sky-900/50 hover:border-sky-200/60 transition-all duration-300", "data-sb-field-path": "heroSecondaryCta", children: pageContent.heroSecondaryCta })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative flex justify-center lg:justify-end", children: /* @__PURE__ */ jsx(KnowledgeHub, {}) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-[10px] uppercase tracking-[0.2em]", children: [
        /* @__PURE__ */ jsx("span", { children: "Explore the network" }),
        /* @__PURE__ */ jsx("div", { className: "w-px h-9 bg-gradient-to-b from-sky-300 to-transparent animate-pulse" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { id: "about", className: "py-24 px-4 sm:px-6 lg:px-8", "data-sb-object-id": "content/pages/home.json", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "section-fade grid md:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "text-teal-400 font-semibold tracking-wider uppercase text-sm", "data-sb-field-path": "aboutEyebrow", children: pageContent.aboutEyebrow }),
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl font-black mt-3 mb-6 text-white", "data-sb-field-path": "aboutTitle", children: [
          pageContent.aboutTitle,
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "for students" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-lg mb-6 leading-relaxed", "data-sb-field-path": "aboutBody1", children: pageContent.aboutBody1 }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-lg mb-8 leading-relaxed", "data-sb-field-path": "aboutBody2", children: pageContent.aboutBody2 }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: SUBJECTS.map((s) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-full glass border border-blue-500/20 text-blue-300 text-sm", children: s }, s)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-600/20 to-teal-500/20 rounded-3xl blur-2xl" }),
        /* @__PURE__ */ jsx("div", { className: "relative glass rounded-3xl p-8 space-y-4", "data-sb-object-id": "content/pages/home.json", "data-sb-field-path": "aboutCards", children: aboutCards.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors", "data-sb-field-path": `aboutCards.${index}`, children: [
          /* @__PURE__ */ jsx("span", { className: "text-2xl", "data-sb-field-path": `aboutCards.${index}.icon`, children: item.icon }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs uppercase tracking-wider", "data-sb-field-path": `aboutCards.${index}.title`, children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "text-white font-bold", "data-sb-field-path": `aboutCards.${index}.value`, children: item.value })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm", "data-sb-field-path": `aboutCards.${index}.desc`, children: item.desc })
        ] }, item.title)) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { id: "programs", className: "py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30", "data-sb-object-id": "content/pages/home.json", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-fade text-center mb-16", children: [
        /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-semibold tracking-wider uppercase text-sm", "data-sb-field-path": "programsEyebrow", children: pageContent.programsEyebrow }),
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl font-black mt-3 text-white", "data-sb-field-path": "programsTitle", children: [
          pageContent.programsTitle.replace("Support", "Support"),
          " ",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "Support" }),
          " at Every Step"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "section-fade grid md:grid-cols-2 gap-8", "data-sb-object-id": "content/pages/home.json", "data-sb-field-path": "programCards", children: programCards.map((card, index) => /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-8 card-glow glass-hover relative overflow-hidden group", "data-sb-field-path": `programCards.${index}`, children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/15 transition-colors" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-2xl mb-6 shadow-lg shadow-blue-500/30", "data-sb-field-path": `programCards.${index}.icon`, children: card.icon }),
          /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 text-xs font-semibold uppercase tracking-wider", "data-sb-field-path": `programCards.${index}.eyebrow`, children: card.eyebrow }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-white mt-4 mb-3", "data-sb-field-path": `programCards.${index}.title`, children: card.title }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-300 leading-relaxed mb-6", "data-sb-field-path": `programCards.${index}.description`, children: card.description }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-slate-300 text-sm", children: card.benefits.map((item, bindex) => /* @__PURE__ */ jsxs("li", { "data-sb-field-path": `programCards.${index}.benefits.${bindex}`, className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-teal-400", children: "✓" }),
            " ",
            item
          ] }, `${index}-${bindex}`)) })
        ] })
      ] }, card.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-fade text-center mb-16", children: [
        /* @__PURE__ */ jsx("span", { className: "text-cyan-300 font-semibold tracking-wider uppercase text-sm", children: "Why Join GradeBridge" }),
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl font-black mt-3 text-white", children: [
          "Everything You Need to ",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "Succeed" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "section-fade grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: BENEFITS.map((benefit) => /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-6 glass-hover card-glow group cursor-default", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl mb-4 group-hover:scale-110 transition-transform", children: benefit.icon }),
        /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-lg mb-2", children: benefit.title }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm leading-relaxed", children: benefit.desc })
      ] }, benefit.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-fade text-center mb-16", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl font-black text-white", children: [
          "Ready to ",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "Get Started?" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 mt-4 text-lg", children: "Choose your path and join the GradeBridge community today." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "section-fade grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/apply/mentor",
            className: "group relative block rounded-3xl overflow-hidden cursor-pointer",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-sky-600 to-blue-800 opacity-90 group-hover:opacity-100 transition-opacity" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" }),
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" }),
              /* @__PURE__ */ jsxs("div", { className: "relative p-10", children: [
                /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-xl", children: "🎓" }),
                /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-white mb-3", children: "Are You a Mentor?" }),
                /* @__PURE__ */ jsx("p", { className: "text-blue-100 text-lg mb-8 leading-relaxed", children: "Share your IGCSE knowledge and experience. Help the next generation achieve their goals." }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-white font-semibold text-lg group-hover:gap-5 transition-all", children: [
                  "Apply to Mentor ",
                  /* @__PURE__ */ jsx("span", { children: "→" })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/register/student",
            className: "group relative block rounded-3xl overflow-hidden cursor-pointer",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-teal-600 to-cyan-700 opacity-90 group-hover:opacity-100 transition-opacity" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" }),
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" }),
              /* @__PURE__ */ jsxs("div", { className: "relative p-10", children: [
                /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-xl", children: "📖" }),
                /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-white mb-3", children: "Upcoming IGCSE Student?" }),
                /* @__PURE__ */ jsx("p", { className: "text-teal-100 text-lg mb-8 leading-relaxed", children: "Register to access free mentoring, tutoring sessions, and connect with experienced IGCSE graduates." }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-white font-semibold text-lg group-hover:gap-5 transition-all", children: [
                  "Register Now ",
                  /* @__PURE__ */ jsx("span", { children: "→" })
                ] })
              ] })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "contact", className: "py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto section-fade text-center", children: [
      /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-semibold tracking-wider uppercase text-sm", children: "Get In Touch" }),
      /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl font-black mt-3 mb-6 text-white", children: [
        "Have Questions? ",
        /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "We're Here." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-lg mb-12", children: "Reach out through any of the platforms below. We'd love to hear from you." }),
      /* @__PURE__ */ jsxs(
        "form",
        {
          name: "contact",
          method: "POST",
          "data-netlify": "true",
          "netlify-honeypot": "bot-field",
          action: "/__forms.html",
          onSubmit: handleContactSubmit,
          className: "glass rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-900/20 mb-10 text-left",
          children: [
            /* @__PURE__ */ jsx("input", { type: "hidden", name: "form-name", value: "contact" }),
            /* @__PURE__ */ jsx("p", { className: "hidden", children: /* @__PURE__ */ jsxs("label", { children: [
              "Do not fill this out: ",
              /* @__PURE__ */ jsx("input", { name: "bot-field" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-5 mb-5", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "contact-name", className: "block text-slate-300 text-sm font-medium mb-2", children: "Name" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "contact-name",
                    name: "name",
                    type: "text",
                    required: true,
                    className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all",
                    placeholder: "Your name"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "contact-email", className: "block text-slate-300 text-sm font-medium mb-2", children: "Email" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "contact-email",
                    name: "email",
                    type: "email",
                    required: true,
                    className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all",
                    placeholder: "you@example.com"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "contact-subject", className: "block text-slate-300 text-sm font-medium mb-2", children: "Subject" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "contact-subject",
                  name: "subject",
                  type: "text",
                  className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all",
                  placeholder: "How can we help?"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "contact-message", className: "block text-slate-300 text-sm font-medium mb-2", children: "Message" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "contact-message",
                  name: "message",
                  required: true,
                  rows: 5,
                  className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none",
                  placeholder: "Write your message..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: contactStatus === "sending",
                  className: "px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all btn-shimmer disabled:opacity-60 disabled:hover:scale-100",
                  children: contactStatus === "sending" ? "Sending..." : contactStatus === "sent" ? "Sent!" : "Send Message"
                }
              ),
              contactStatus === "sent" && /* @__PURE__ */ jsx("p", { className: "text-teal-300 text-sm font-medium", children: "Sent!" }),
              contactStatus === "error" && /* @__PURE__ */ jsx("p", { className: "text-red-300 text-sm font-medium", children: "Something went wrong. Please try again." })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-3 gap-6", children: [
        { icon: "📧", label: "Email", value: "hello@gradebridge.com", href: "mailto:hello@gradebridge.com" },
        { icon: "📱", label: "Telegram", value: "@GradeBridge", href: "#" },
        { icon: "📸", label: "Instagram", value: "@gradebridge", href: "#" }
      ].map((c) => /* @__PURE__ */ jsxs("a", { href: c.href, className: "glass rounded-2xl p-6 glass-hover card-glow text-center block", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl mb-3", children: c.icon }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm mb-1", children: c.label }),
        /* @__PURE__ */ jsx("p", { className: "text-white font-semibold", children: c.value })
      ] }, c.label)) })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { className: "border-t border-white/5 py-16 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-4 gap-10 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsx(GradeBridgeLogo, { compact: true }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-white text-lg", children: "GradeBridge" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm leading-relaxed max-w-xs", children: "GradeBridge — a student-led academic community dedicated to empowering IGCSE students through mentorship and community." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold mb-4", children: "Quick Links" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-slate-400 text-sm", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/#about", className: "hover:text-white transition-colors", children: "About GradeBridge" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/#programs", className: "hover:text-white transition-colors", children: "Programs" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/apply/mentor", className: "hover:text-white transition-colors", children: "Become a Mentor" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/register/student", className: "hover:text-white transition-colors", children: "Student Registration" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/mentors", className: "hover:text-white transition-colors", children: "Mentor Directory" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold mb-4", children: "Connect" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-slate-400 text-sm", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Instagram" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Telegram" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "WhatsApp" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "mailto:hello@gradebridge.com", className: "hover:text-white transition-colors", children: "Email Us" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-sm", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " GradeBridge. All rights reserved."
        ] }),
        /* @__PURE__ */ jsx("p", { children: "Student-Led · Free Forever · Community Driven" })
      ] })
    ] }) })
  ] });
}
const Route$f = createFileRoute("/register/student")({
  component: StudentRegisterPage
});
const GRADE_LEVELS = [
  "Year 9",
  "Year 10",
  "Year 11",
  "Year 12",
  "Year 13"
];
function StudentRegisterPage() {
  const { user, ready } = useIdentity();
  useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gradeLevel: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const identityUser = await signup(form.email, form.password, { full_name: form.fullName });
      await fetch("/api/register/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          age: parseInt(form.age, 10),
          gradeLevel: form.gradeLevel,
          email: form.email,
          identityUserId: identityUser?.id || "pending"
        })
      });
      setSubmitted(true);
    } catch (err) {
      if (err instanceof AuthError) {
        if (err.status === 422) setError("Invalid email or password. Password must be at least 8 characters.");
        else setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
    setLoading(false);
  };
  if (submitted) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center px-4 pt-20 stars-bg", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-md", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-4xl mx-auto mb-6 shadow-2xl shadow-teal-500/30 animate-pulse-glow", children: "🎉" }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-black text-white mb-4", children: "Welcome to GradeBridge!" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-300 mb-4 leading-relaxed", children: "Your account has been created. Please check your email to confirm your account — then you'll be able to sign in and access the mentor directory." }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm mb-8", children: "Once confirmed, sign in to find mentors, book sessions, and join our community." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx(Link, { to: "/login", className: "inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:opacity-90 transition-opacity text-center", children: "Sign In" }),
        /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-block px-8 py-3 rounded-xl glass border border-white/10 text-slate-300 hover:text-white font-semibold transition-all text-center", children: "Back to Home" })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen px-4 py-24 stars-bg grid-pattern", children: /* @__PURE__ */ jsxs("div", { className: "max-w-lg mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-flex items-center gap-2 mb-6 group", children: /* @__PURE__ */ jsx(GradeBridgeLogo, {}) }),
      /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-teal-500/20 text-teal-300 text-sm font-medium mb-6", children: "📖 Student Registration" }),
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-black text-white mb-3", children: [
        "Join ",
        /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "GradeBridge Today" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-400", children: "Register to access free mentoring, connect with experienced IGCSE graduates, and join our community." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "glass rounded-3xl p-8 shadow-2xl shadow-blue-900/20 space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Full Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: form.fullName,
              onChange: (e) => set("fullName", e.target.value),
              required: true,
              placeholder: "Your full name",
              className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 transition-all"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Age" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              value: form.age,
              onChange: (e) => set("age", e.target.value),
              required: true,
              min: 12,
              max: 20,
              placeholder: "15",
              className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 transition-all"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Grade Level" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: form.gradeLevel,
              onChange: (e) => set("gradeLevel", e.target.value),
              required: true,
              className: "w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-all appearance-none",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select grade" }),
                GRADE_LEVELS.map((g) => /* @__PURE__ */ jsx("option", { value: g, children: g }, g))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Email Address" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              value: form.email,
              onChange: (e) => set("email", e.target.value),
              required: true,
              placeholder: "you@example.com",
              className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 transition-all"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Password" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              value: form.password,
              onChange: (e) => set("password", e.target.value),
              required: true,
              minLength: 8,
              placeholder: "Min. 8 characters",
              className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 transition-all"
            }
          )
        ] })
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm", children: error }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-500 text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-teal-500/20 btn-shimmer",
          children: loading ? /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
            "Creating account…"
          ] }) : "Create My Account 🚀"
        }
      ),
      /* @__PURE__ */ jsxs("p", { className: "text-center text-slate-500 text-sm", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/login", className: "text-blue-400 hover:text-blue-300 transition-colors", children: "Sign in" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 grid grid-cols-3 gap-4 text-center", children: [
      { icon: "🆓", label: "Always Free" },
      { icon: "🎓", label: "Expert Mentors" },
      { icon: "💬", label: "Live Q&As" }
    ].map((b) => /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "text-2xl mb-1", children: b.icon }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs", children: b.label })
    ] }, b.label)) })
  ] }) });
}
const Route$e = createFileRoute("/dashboard/student")({
  component: StudentDashboard
});
function StudentDashboard() {
  const { user, ready, logout: logout2 } = useIdentity();
  const navigate = useNavigate();
  useEffect(() => {
    if (ready && !user) navigate({ to: "/login" });
  }, [ready, user, navigate]);
  if (!ready || !user) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 stars-bg", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsx(AnnouncementBanner, { className: "mb-8" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
      /* @__PURE__ */ jsx("span", { className: "text-slate-400 text-sm", children: "Student Dashboard" }),
      /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-black text-white mt-1", children: [
        "Welcome back, ",
        /* @__PURE__ */ jsx("span", { className: "gradient-text", children: user.name || user.email }),
        " 👋"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8", children: [
      { icon: "📚", label: "Weekly Sessions", value: "52/yr" },
      { icon: "💬", label: "Monthly Q&As", value: "12/yr" },
      { icon: "🎓", label: "Available Mentors", value: "25+" },
      { icon: "🆓", label: "Cost", value: "Free" }
    ].map((s) => /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5 text-center card-glow", children: [
      /* @__PURE__ */ jsx("div", { className: "text-2xl mb-1", children: s.icon }),
      /* @__PURE__ */ jsx("div", { className: "text-xl font-black text-white", children: s.value }),
      /* @__PURE__ */ jsx("div", { className: "text-slate-400 text-xs mt-0.5", children: s.label })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 mb-8", children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/mentors",
          className: "glass rounded-3xl p-8 card-glow glass-hover group block",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl mb-4 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform", children: "🎓" }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Browse Mentor Directory" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm leading-relaxed", children: "Find your perfect mentor by subject, availability, or grade. Connect directly through their profile." }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors", children: "View Directory →" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-8", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-2xl mb-4 shadow-lg shadow-teal-500/20", children: "📅" }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Upcoming Sessions" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 mt-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-teal-400 text-lg", children: "📚" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-white text-sm font-medium", children: "Weekly Tutoring" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs", children: "Every Saturday · 10:00 AM" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-white/5 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-blue-400 text-lg", children: "💬" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-white text-sm font-medium", children: "Monthly Q&A" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs", children: "First Sunday of each month" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-8", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-lg mb-4", children: "My Account" }),
      /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs uppercase tracking-wider mb-1", children: "Email" }),
          /* @__PURE__ */ jsx("p", { className: "text-white font-medium", children: user.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs uppercase tracking-wider mb-1", children: "Name" }),
          /* @__PURE__ */ jsx("p", { className: "text-white font-medium", children: user.name || "—" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs uppercase tracking-wider mb-1", children: "Account Type" }),
          /* @__PURE__ */ jsx("p", { className: "text-teal-400 font-medium", children: "Student" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs uppercase tracking-wider mb-1", children: "Membership" }),
          /* @__PURE__ */ jsx("p", { className: "text-green-400 font-medium", children: "Free · Active" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => logout2().then(() => window.location.href = "/"),
          className: "mt-6 px-6 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-white/20 text-sm font-medium transition-all",
          children: "Sign Out"
        }
      )
    ] })
  ] }) });
}
const Route$d = createFileRoute("/dashboard/mentor")({
  component: MentorDashboard
});
const AVAILABLE_SUBJECTS$1 = [
  "Mathematics",
  "Additional Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Business Studies",
  "English Language",
  "English Literature",
  "History",
  "Geography",
  "Computer Science",
  "ICT"
];
function MentorDashboard() {
  const { user, ready, logout: logout2 } = useIdentity();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});
  const [saveMsg, setSaveMsg] = useState("");
  const [subjectsList, setSubjectsList] = useState([]);
  const [gradeInputs, setGradeInputs] = useState([]);
  const [sessionsView, setSessionsView] = useState("requests");
  const [sessions, setSessions] = useState([]);
  const [sessionActionMsg, setSessionActionMsg] = useState("");
  const [logDrafts, setLogDrafts] = useState({});
  useEffect(() => {
    if (ready && !user) {
      navigate({ to: "/login" });
      return;
    }
    if (ready && user) {
      fetch(`/api/mentors/profile/${user.id}`).then((r) => r.ok ? r.json() : null).then((data) => {
        if (data) {
          setProfile(data);
          setForm(data);
          try {
            setSubjectsList(JSON.parse(data.subjects));
          } catch {
            setSubjectsList(data.subjects?.split(",").map((s) => s.trim()) || []);
          }
          try {
            const g = JSON.parse(data.igcseGrades || "{}");
            setGradeInputs(Object.entries(g).map(([subject, grade]) => ({ subject, grade })));
          } catch {
          }
        }
      });
      fetch(`/api/mentors/sessions?mentorId=${user.id}`).then((r) => r.ok ? r.json() : null).then((data) => {
        if (data?.sessions) setSessions(data.sessions);
      });
    }
  }, [ready, user, navigate]);
  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const toggleSubject = (s) => {
    setSubjectsList((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };
  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const gradesObj = {};
    gradeInputs.forEach(({ subject, grade }) => {
      if (subject && grade) gradesObj[subject] = grade;
    });
    await fetch(`/api/mentors/profile/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        subjects: subjectsList,
        igcseGrades: JSON.stringify(gradesObj)
      })
    });
    setSaveMsg("Profile saved!");
    setEditing(false);
    setSaving(false);
    setTimeout(() => setSaveMsg(""), 3e3);
  };
  const pendingSessions = sessions.filter((session) => session.status === "PENDING");
  const upcomingSessions = sessions.filter((session) => session.status === "UPCOMING");
  const completedSessions = sessions.filter((session) => session.status === "COMPLETED");
  const sessionNeedsLogging = upcomingSessions.filter((session) => new Date(session.scheduledAt).getTime() < Date.now());
  const updateSessionStatus = async (sessionId, action, payload) => {
    const response = await fetch(`/api/mentors/sessions/${sessionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...payload })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setSessionActionMsg(data.error || "Action failed.");
      return;
    }
    setSessionActionMsg(action === "approve" ? "Request approved." : action === "decline" ? "Request declined." : "Session logged successfully.");
    fetch(`/api/mentors/sessions?mentorId=${user.id}`).then((r) => r.ok ? r.json() : null).then((data2) => {
      if (data2?.sessions) setSessions(data2.sessions);
    });
  };
  const handleLogSubmit = async (sessionId) => {
    const draft = logDrafts[sessionId];
    if (!draft) return;
    await updateSessionStatus(sessionId, "complete", {
      actualDurationMinutes: Number(draft.actualDurationMinutes),
      topicsCovered: draft.topicsCovered,
      evidenceLink: draft.evidenceLink
    });
  };
  if (!ready || !user) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 stars-bg", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsx(AnnouncementBanner, { className: "mb-8" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "text-slate-400 text-sm", children: "Mentor Dashboard" }),
        /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-black text-white mt-1", children: [
          "Hello, ",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: user.name || user.email }),
          " 🎓"
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => logout2().then(() => window.location.href = "/"),
          className: "px-4 py-2 rounded-lg border border-white/10 text-slate-300 hover:text-white text-sm transition-all",
          children: "Sign Out"
        }
      )
    ] }),
    saveMsg && /* @__PURE__ */ jsxs("div", { className: "mb-6 px-4 py-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 text-sm", children: [
      "✓ ",
      saveMsg
    ] }),
    !profile ? /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-8 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "text-4xl mb-4", children: "⏳" }),
      /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-xl mb-2", children: "Profile Under Review" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-400 leading-relaxed", children: "Your mentor application is being reviewed by our admin team. Once approved, you'll be able to set up your profile and appear in the mentor directory." }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm mt-4", children: "Expected review time: 3–5 business days" })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-white font-bold text-xl", children: "My Profile" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setEditing(!editing),
              className: `px-4 py-2 rounded-xl text-sm font-medium transition-all ${editing ? "bg-white/10 text-slate-300 hover:text-white" : "bg-blue-600 text-white hover:opacity-90 shadow-lg shadow-blue-500/20"}`,
              children: editing ? "Cancel" : "✏ Edit Profile"
            }
          )
        ] }),
        editing ? /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Profile Picture URL" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                value: form.profilePicUrl || "",
                onChange: (e) => set("profilePicUrl", e.target.value),
                placeholder: "https://...",
                className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Biography" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: form.bio || "",
                onChange: (e) => set("bio", e.target.value),
                rows: 4,
                placeholder: "Tell students about yourself...",
                className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-slate-300 text-sm font-medium mb-3", children: [
              "IGCSE Grades ",
              /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "(subject + grade)" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2 mb-3", children: gradeInputs.map((g, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  value: g.subject,
                  onChange: (e) => {
                    const copy = [...gradeInputs];
                    copy[i] = { ...copy[i], subject: e.target.value };
                    setGradeInputs(copy);
                  },
                  placeholder: "Subject",
                  className: "flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-sm"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  value: g.grade,
                  onChange: (e) => {
                    const copy = [...gradeInputs];
                    copy[i] = { ...copy[i], grade: e.target.value };
                    setGradeInputs(copy);
                  },
                  placeholder: "A*",
                  className: "w-20 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-sm"
                }
              ),
              /* @__PURE__ */ jsx("button", { onClick: () => setGradeInputs(gradeInputs.filter((_, idx) => idx !== i)), className: "px-3 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm transition-colors", children: "✕" })
            ] }, i)) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setGradeInputs([...gradeInputs, { subject: "", grade: "" }]),
                className: "text-blue-400 hover:text-blue-300 text-sm transition-colors",
                children: "+ Add Grade"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-slate-300 text-sm font-medium mb-3", children: "Subjects You Teach" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: AVAILABLE_SUBJECTS$1.map((s) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => toggleSubject(s),
                className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${subjectsList.includes(s) ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-white/5 text-slate-300 border border-white/10 hover:border-blue-500/30"}`,
                children: s
              },
              s
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Why I Help Students" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: form.reason || "",
                onChange: (e) => set("reason", e.target.value),
                rows: 3,
                placeholder: "What motivates you to mentor?",
                className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Availability" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                value: form.availability || "",
                onChange: (e) => set("availability", e.target.value),
                placeholder: "e.g., Weekday evenings, Saturday mornings",
                className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-slate-300 text-sm font-medium mb-3", children: "Contact & Social Media" }),
            /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: [
              { field: "contactEmail", label: "📧 Email", placeholder: "contact@example.com" },
              { field: "instagram", label: "📸 Instagram", placeholder: "@username" },
              { field: "telegram", label: "✈ Telegram", placeholder: "@username" },
              { field: "whatsapp", label: "💬 WhatsApp", placeholder: "+1234567890" },
              { field: "linkedin", label: "💼 LinkedIn", placeholder: "https://linkedin.com/in/..." }
            ].map(({ field, label, placeholder }) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-slate-400 text-xs mb-1", children: label }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  value: form[field] || "",
                  onChange: (e) => set(field, e.target.value),
                  placeholder,
                  className: "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-sm transition-all"
                }
              )
            ] }, field)) })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: saveProfile,
              disabled: saving,
              className: "w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20",
              children: saving ? "Saving…" : "Save Profile ✓"
            }
          )
        ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5", children: [
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs uppercase tracking-wider mb-1", children: "Email" }),
              /* @__PURE__ */ jsx("p", { className: "text-white font-medium", children: user.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5", children: [
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs uppercase tracking-wider mb-1", children: "Availability" }),
              /* @__PURE__ */ jsx("p", { className: "text-white font-medium", children: profile.availability || "Not set" })
            ] })
          ] }),
          profile.bio && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs uppercase tracking-wider mb-1", children: "Biography" }),
            /* @__PURE__ */ jsx("p", { className: "text-white text-sm leading-relaxed", children: profile.bio })
          ] }),
          subjectsList.length > 0 && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-white/5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs uppercase tracking-wider mb-2", children: "Subjects" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: subjectsList.map((s) => /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-lg bg-blue-500/15 text-blue-300 text-xs", children: s }, s)) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm", children: "Your profile is visible in the mentor directory." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-6 flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-lg", children: "✓" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-white font-semibold", children: "Approved Mentor" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm", children: "Your profile is live in the mentor directory" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white/5 px-3 py-2 text-sm text-slate-300", children: [
            "Total Hours Taught: ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-white", children: (profile.totalHoursTaught ?? 0).toFixed(1) })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/mentors", className: "px-4 py-2 rounded-xl bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 text-sm transition-colors", children: "View Directory →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-sky-300", children: "Sessions" }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-white", children: "Requests & Logbook" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex rounded-xl bg-white/5 p-1", children: [
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setSessionsView("requests"), className: `rounded-lg px-3 py-1.5 text-sm font-semibold ${sessionsView === "requests" ? "bg-blue-600 text-white" : "text-slate-300"}`, children: "Requests & Upcoming" }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setSessionsView("completed"), className: `rounded-lg px-3 py-1.5 text-sm font-semibold ${sessionsView === "completed" ? "bg-blue-600 text-white" : "text-slate-300"}`, children: "Completed Logs" })
          ] })
        ] }),
        sessionActionMsg && /* @__PURE__ */ jsx("p", { className: "mb-4 rounded-xl bg-sky-500/10 px-3 py-2 text-sm text-sky-200", children: sessionActionMsg }),
        sessionsView === "requests" ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          pendingSessions.length === 0 && upcomingSessions.length === 0 ? /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-slate-400", children: "No session requests or upcoming sessions yet." }) : null,
          pendingSessions.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Pending Requests" }),
            pendingSessions.map((session) => /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-white font-semibold", children: session.studentName }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm text-slate-400", children: [
                  session.studentContact,
                  " · ",
                  session.subject,
                  " · ",
                  new Date(session.scheduledAt).toLocaleString()
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-slate-300", children: session.topicDescription })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx("button", { type: "button", onClick: () => updateSessionStatus(session.id, "approve"), className: "rounded-lg bg-teal-500 px-3 py-2 text-sm font-semibold text-white", children: "Approve" }),
                /* @__PURE__ */ jsx("button", { type: "button", onClick: () => updateSessionStatus(session.id, "decline"), className: "rounded-lg bg-red-500/20 px-3 py-2 text-sm font-semibold text-red-300", children: "Decline" })
              ] })
            ] }) }, session.id))
          ] }),
          upcomingSessions.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Upcoming Sessions" }),
            upcomingSessions.map((session) => /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-white font-semibold", children: session.studentName }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm text-slate-400", children: [
                  session.subject,
                  " · ",
                  new Date(session.scheduledAt).toLocaleString()
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-slate-300", children: session.topicDescription })
              ] }),
              sessionNeedsLogging.some((item) => item.id === session.id) && /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-100", children: [
                /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "Log Notes & Evidence" }),
                /* @__PURE__ */ jsxs("div", { className: "mt-2 space-y-2", children: [
                  /* @__PURE__ */ jsx("input", { value: logDrafts[session.id]?.actualDurationMinutes ?? "", onChange: (e) => setLogDrafts((prev) => ({ ...prev, [session.id]: { actualDurationMinutes: e.target.value, topicsCovered: prev[session.id]?.topicsCovered ?? "", evidenceLink: prev[session.id]?.evidenceLink ?? "" } })), placeholder: "Actual duration (minutes)", className: "w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white" }),
                  /* @__PURE__ */ jsx("textarea", { rows: 3, value: logDrafts[session.id]?.topicsCovered ?? "", onChange: (e) => setLogDrafts((prev) => ({ ...prev, [session.id]: { actualDurationMinutes: prev[session.id]?.actualDurationMinutes ?? "", topicsCovered: e.target.value, evidenceLink: prev[session.id]?.evidenceLink ?? "" } })), placeholder: "Topics covered", className: "w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white" }),
                  /* @__PURE__ */ jsx("input", { value: logDrafts[session.id]?.evidenceLink ?? "", onChange: (e) => setLogDrafts((prev) => ({ ...prev, [session.id]: { actualDurationMinutes: prev[session.id]?.actualDurationMinutes ?? "", topicsCovered: prev[session.id]?.topicsCovered ?? "", evidenceLink: e.target.value } })), placeholder: "Evidence link (optional)", className: "w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white" }),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: () => handleLogSubmit(session.id), className: "rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white", children: "Submit Log" })
                ] })
              ] })
            ] }) }, session.id))
          ] })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          completedSessions.length === 0 ? /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-slate-400", children: "No completed logs yet." }) : null,
          completedSessions.map((session) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-white font-semibold", children: session.studentName }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm text-slate-400", children: [
                  session.subject,
                  " · Completed ",
                  new Date(session.completedAt || session.scheduledAt).toLocaleString()
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-sm text-slate-300", children: [
                "Duration: ",
                session.actualDurationMinutes ?? 0,
                " min"
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-slate-300", children: session.topicsCovered || "No notes recorded." }),
            session.evidenceLink && /* @__PURE__ */ jsx("a", { href: session.evidenceLink, className: "mt-2 inline-block text-sm text-sky-300", children: "View evidence" })
          ] }, session.id))
        ] })
      ] })
    ] })
  ] }) });
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getServerUser = createServerFn({
  method: "GET"
}).handler(createSsrRpc("49106938b52c8bf2e7795ac418917757130e43844a341613882f98c174227919"));
const Route$c = createFileRoute("/dashboard/admin")({
  beforeLoad: async () => {
    const user = await getServerUser();
    if (!user) throw redirect({ to: "/login" });
    if (user.role !== "admin" && !user.roles?.includes("admin")) {
      throw redirect({ to: "/" });
    }
  },
  component: AdminDashboard
});
const I = {
  dashboard: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  applications: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  mentors: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  students: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
  sessions: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  announcements: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
  settings: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  logout: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  bell: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  chevron: "M19 9l-7 7-7-7",
  plus: "M12 4v16m8-8H4",
  pin: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
  edit: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  trash: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
  archive: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
  check: "M5 13l4 4L19 7",
  x: "M6 18L18 6M6 6l12 12",
  info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  menu: "M4 6h16M4 12h16M4 18h16"
};
function Icon({ path, className = "w-5 h-5" }) {
  return /* @__PURE__ */ jsx("svg", { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.8, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: path }) });
}
const NAV = [
  { key: "dashboard", label: "Dashboard", icon: I.dashboard },
  { key: "applications", label: "Mentor Applications", icon: I.applications },
  { key: "mentors", label: "Mentors", icon: I.mentors },
  { key: "students", label: "Students", icon: I.students },
  { key: "sessions", label: "Tutoring Sessions", icon: I.sessions },
  { key: "announcements", label: "Announcements", icon: I.announcements },
  { key: "settings", label: "Settings", icon: I.settings }
];
const VIEW_TITLES = {
  dashboard: "Dashboard",
  applications: "Mentor Applications",
  mentors: "Mentors",
  students: "Students",
  sessions: "Tutoring Sessions",
  announcements: "Announcements",
  settings: "Settings"
};
const initials = (name) => name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
const parseList = (raw) => {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v : Object.entries(v).map(([k, g]) => `${k}: ${g}`);
  } catch {
    return raw.split(",").map((s) => s.trim()).filter(Boolean);
  }
};
function AdminDashboard() {
  const { user, ready, logout: logout2 } = useIdentity();
  const navigate = useNavigate();
  const [view, setView] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [appsLoading, setAppsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [passwordSetupWarning, setPasswordSetupWarning] = useState(null);
  const [announcements2, setAnnouncements] = useState([]);
  const [annLoading, setAnnLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [students2, setStudents] = useState([]);
  const [mentorsLoading, setMentorsLoading] = useState(false);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  useEffect(() => {
    if (!ready) return;
    if (!user) {
      navigate({ to: "/login" });
      return;
    }
    if (user.role !== "admin" && !user.roles?.includes("admin")) {
      navigate({ to: "/" });
      return;
    }
    loadStats();
  }, [ready, user, navigate]);
  useEffect(() => {
    if (view === "applications") loadApplications();
    if (view === "announcements") loadAnnouncements();
    if (view === "mentors") loadMentors();
    if (view === "students") loadStudents();
    if (view === "dashboard") loadStats();
  }, [view, statusFilter]);
  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3e3);
  };
  const loadStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) setStats(await res.json());
    } catch {
    }
  };
  const loadApplications = async () => {
    setAppsLoading(true);
    try {
      const res = await fetch(`/api/applications/mentor?status=${statusFilter}`);
      if (res.ok) setApplications(await res.json());
    } catch {
    }
    setAppsLoading(false);
  };
  const loadMentors = async () => {
    setMentorsLoading(true);
    try {
      const res = await fetch("/api/admin/mentors");
      if (res.ok) setMentors(await res.json());
    } catch {
    }
    setMentorsLoading(false);
  };
  const loadStudents = async () => {
    setStudentsLoading(true);
    try {
      const res = await fetch("/api/admin/students");
      if (res.ok) setStudents(await res.json());
    } catch {
    }
    setStudentsLoading(false);
  };
  const loadAnnouncements = async () => {
    setAnnLoading(true);
    try {
      const res = await fetch("/api/announcements?scope=all");
      if (res.ok) setAnnouncements(await res.json());
    } catch {
    }
    setAnnLoading(false);
  };
  const reviewApp = async (id, action) => {
    if (action === "reject" && !window.confirm("Decline and permanently remove this application?")) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/applications/mentor/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action })
      });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        if (action === "approve" && data.createdUser && !data.passwordResetSent) {
          setPasswordSetupWarning({ applicationId: id, email: data.email || "" });
          flash("Mentor approved, but the password setup email failed to send. A warning is shown below so this can be fixed.");
        } else {
          setPasswordSetupWarning(null);
          flash(
            action === "approve" ? data.passwordResetSent ? "Mentor approved — profile created and password setup email sent." : data.createdUser ? "Mentor approved — profile created. Ask them to use “Forgot password” on login if needed." : "Mentor approved — profile created and dashboard access granted." : action === "reject" ? "Application declined and removed." : "More information requested from applicant."
          );
        }
        loadApplications();
        loadStats();
      } else {
        const data = await res.json().catch(() => ({}));
        flash(data.error || "Action failed. Please try again.");
      }
    } catch {
    }
    setActionLoading(null);
  };
  const resendPasswordSetup = async (applicationId) => {
    setActionLoading(applicationId);
    try {
      const res = await fetch(`/api/applications/mentor/${applicationId}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "resend_password_setup" })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.passwordResetSent) {
        flash("Password setup email sent successfully.");
        setPasswordSetupWarning(null);
      } else {
        flash(data.error || "Unable to resend the password setup email.");
      }
    } catch {
      flash("Unable to resend the password setup email.");
    } finally {
      setActionLoading(null);
    }
  };
  const saveAnnouncement = async (data) => {
    const isEdit = !!editing;
    const res = await fetch(isEdit ? `/api/announcements/${editing.id}` : "/api/announcements", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      flash(isEdit ? "Announcement updated." : "Announcement published.");
      setEditorOpen(false);
      setEditing(null);
      loadAnnouncements();
    }
  };
  const patchAnnouncement = async (id, patch) => {
    const res = await fetch(`/api/announcements/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch)
    });
    if (res.ok) loadAnnouncements();
  };
  const deleteAnnouncement = async (id) => {
    if (!window.confirm("Delete this announcement permanently?")) return;
    const res = await fetch(`/api/announcements/${id}`, { method: "DELETE" });
    if (res.ok) {
      flash("Announcement deleted.");
      loadAnnouncements();
    }
  };
  if (!ready || !user) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" }) });
  }
  const adminName = user.name || user.email?.split("@")[0] || "Administrator";
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 text-slate-900 admin-shell", children: [
    mobileOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-slate-900/40 z-30 lg:hidden", onClick: () => setMobileOpen(false) }),
    /* @__PURE__ */ jsxs(
      "aside",
      {
        className: `fixed top-0 left-0 z-40 h-full bg-white text-slate-700 border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out
          ${collapsed ? "lg:w-20" : "lg:w-64"} w-64
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "h-16 flex items-center gap-3 px-5 border-b border-white/5 flex-shrink-0", children: [
            /* @__PURE__ */ jsx(GradeBridgeLogo, { compact: true, className: "flex-shrink-0" }),
            !collapsed && /* @__PURE__ */ jsx("span", { className: "sr-only", children: "GradeBridge" })
          ] }),
          /* @__PURE__ */ jsx("nav", { className: "flex-1 px-3 py-5 space-y-1 overflow-y-auto", children: NAV.map((item) => {
            const active = view === item.key;
            return /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  setView(item.key);
                  setMobileOpen(false);
                },
                title: collapsed ? item.label : void 0,
                className: `w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200
                  ${active ? "bg-sky-400 text-white shadow-lg shadow-sky-400/25" : "text-slate-500 hover:text-slate-900 hover:bg-sky-50"}
                  ${collapsed ? "lg:justify-center" : ""}`,
                children: [
                  /* @__PURE__ */ jsx(Icon, { path: item.icon, className: "w-5 h-5 flex-shrink-0" }),
                  !collapsed && /* @__PURE__ */ jsx("span", { className: "truncate", children: item.label })
                ]
              },
              item.key
            );
          }) }),
          /* @__PURE__ */ jsx("div", { className: "px-3 py-4 border-t border-white/5 flex-shrink-0", children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => logout2().then(() => window.location.href = "/"),
              title: collapsed ? "Logout" : void 0,
              className: `w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-red-500/10 hover:text-red-300 transition-all
              ${collapsed ? "lg:justify-center" : ""}`,
              children: [
                /* @__PURE__ */ jsx(Icon, { path: I.logout, className: "w-5 h-5 flex-shrink-0" }),
                !collapsed && /* @__PURE__ */ jsx("span", { children: "Logout" })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: `transition-all duration-300 ${collapsed ? "lg:pl-20" : "lg:pl-64"}`, children: [
      /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-20 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center gap-3 px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => window.innerWidth < 1024 ? setMobileOpen(true) : setCollapsed(!collapsed),
            className: "w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors",
            "aria-label": "Toggle sidebar",
            children: /* @__PURE__ */ jsx(Icon, { path: I.menu })
          }
        ),
        /* @__PURE__ */ jsx("h1", { className: "text-lg font-bold text-slate-900 hidden sm:block", children: VIEW_TITLES[view] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 max-w-md mx-auto hidden md:block", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400", children: /* @__PURE__ */ jsx(Icon, { path: I.search, className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Search applications, mentors, students…",
              className: "w-full bg-slate-100 border border-transparent rounded-xl pl-9 pr-4 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 ml-auto md:ml-0", children: [
          /* @__PURE__ */ jsxs("button", { className: "relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors", "aria-label": "Notifications", children: [
            /* @__PURE__ */ jsx(Icon, { path: I.bell }),
            !!stats?.pendingApplications && /* @__PURE__ */ jsx("span", { className: "absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pl-2 sm:border-l sm:border-slate-200", children: [
            /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold", children: initials(adminName) }),
            /* @__PURE__ */ jsxs("div", { className: "hidden sm:block leading-tight", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-slate-800", children: adminName }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: "Administrator" })
            ] })
          ] })
        ] })
      ] }),
      toast && /* @__PURE__ */ jsxs("div", { className: "fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 text-white text-sm shadow-2xl flex items-center gap-2 admin-fade-in", children: [
        /* @__PURE__ */ jsx(Icon, { path: I.check, className: "w-4 h-4 text-blue-400" }),
        toast
      ] }),
      /* @__PURE__ */ jsxs("main", { className: "p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto", children: [
        view === "dashboard" && /* @__PURE__ */ jsx(DashboardHome, { name: adminName, stats, onGo: setView }),
        view === "applications" && /* @__PURE__ */ jsx(
          Applications,
          {
            applications,
            loading: appsLoading,
            statusFilter,
            setStatusFilter,
            expanded,
            setExpanded,
            actionLoading,
            onReview: reviewApp,
            onRefresh: loadApplications,
            onResendPasswordSetup: resendPasswordSetup,
            passwordSetupWarning,
            search
          }
        ),
        view === "announcements" && /* @__PURE__ */ jsx(
          Announcements,
          {
            items: announcements2,
            loading: annLoading,
            onNew: () => {
              setEditing(null);
              setEditorOpen(true);
            },
            onEdit: (a) => {
              setEditing(a);
              setEditorOpen(true);
            },
            onDelete: deleteAnnouncement,
            onPatch: patchAnnouncement
          }
        ),
        view === "mentors" && /* @__PURE__ */ jsx(
          MentorsList,
          {
            mentors,
            loading: mentorsLoading,
            search,
            onRefresh: loadMentors
          }
        ),
        view === "students" && /* @__PURE__ */ jsx(
          StudentsList,
          {
            students: students2,
            loading: studentsLoading,
            search,
            onRefresh: loadStudents
          }
        ),
        view === "sessions" && /* @__PURE__ */ jsx(Placeholder, { title: "Tutoring Sessions", icon: I.sessions, desc: "Scheduled and past tutoring sessions will be managed from this space." }),
        view === "settings" && /* @__PURE__ */ jsx(SettingsPanel, { email: user.email || "" })
      ] })
    ] }),
    editorOpen && /* @__PURE__ */ jsx(
      AnnouncementEditor,
      {
        initial: editing,
        onClose: () => {
          setEditorOpen(false);
          setEditing(null);
        },
        onSave: saveAnnouncement
      }
    )
  ] });
}
function StatCard({ label, value, icon, accent }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsx("div", { className: `w-11 h-11 rounded-xl flex items-center justify-center ${accent}`, children: /* @__PURE__ */ jsx(Icon, { path: icon, className: "w-5 h-5" }) }) }),
    /* @__PURE__ */ jsx("p", { className: "text-3xl font-black text-slate-900 mt-4", children: value }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-1", children: label })
  ] });
}
function DashboardHome({ name, stats, onGo }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 admin-fade-in", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900", children: "Welcome back, Administrator." }),
      /* @__PURE__ */ jsxs("p", { className: "text-slate-500 mt-1", children: [
        "Here's an overview of ",
        name ? "your platform" : "GradeBridge",
        " today."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Pending Mentor Applications", value: stats?.pendingApplications ?? 0, icon: I.applications, accent: "bg-amber-50 text-amber-600" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Active Mentors", value: stats?.activeMentors ?? 0, icon: I.mentors, accent: "bg-blue-50 text-blue-600" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Registered Students", value: stats?.registeredStudents ?? 0, icon: I.students, accent: "bg-emerald-50 text-emerald-600" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Upcoming Tutoring Sessions", value: stats?.upcomingSessions ?? 0, icon: I.sessions, accent: "bg-indigo-50 text-indigo-600" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => onGo("applications"), className: "text-left bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group", children: [
        /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsx(Icon, { path: I.applications }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-slate-900", children: "Review Mentor Applications" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-1", children: "Approve, decline, or request more information from applicants." }),
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-sm font-medium text-blue-600 mt-3", children: [
          "Go to applications ",
          /* @__PURE__ */ jsx(Icon, { path: I.chevron, className: "w-4 h-4 -rotate-90" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => onGo("announcements"), className: "text-left bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group", children: [
        /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsx(Icon, { path: I.announcements }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-slate-900", children: "Manage Announcements" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-1", children: "Publish updates shown across the landing page and dashboards." }),
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-sm font-medium text-blue-600 mt-3", children: [
          "Go to announcements ",
          /* @__PURE__ */ jsx(Icon, { path: I.chevron, className: "w-4 h-4 -rotate-90" })
        ] })
      ] })
    ] })
  ] });
}
function Applications(props) {
  const { applications, loading, statusFilter, setStatusFilter, expanded, setExpanded, actionLoading, onReview, onRefresh, onResendPasswordSetup, passwordSetupWarning, search } = props;
  const tabs = [
    { key: "pending", label: "Pending" },
    { key: "more_info", label: "Awaiting Info" },
    { key: "approved", label: "Approved" }
  ];
  const q = search.trim().toLowerCase();
  const filtered = q ? applications.filter((a) => `${a.fullName} ${a.email} ${a.school} ${a.subjects}`.toLowerCase().includes(q)) : applications;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5 admin-fade-in", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex bg-slate-100 rounded-xl p-1", children: tabs.map((t) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setStatusFilter(t.key),
          className: `px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${statusFilter === t.key ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`,
          children: t.label
        },
        t.key
      )) }),
      /* @__PURE__ */ jsx("button", { onClick: onRefresh, className: "text-sm text-slate-500 hover:text-slate-800 transition-colors", children: "↻ Refresh" })
    ] }),
    passwordSetupWarning && /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-amber-200 bg-amber-50 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-amber-800", children: "Password setup email delivery failed" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-700", children: "The mentor account was created, but the password setup email was not delivered. Use the button below to resend it." })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onResendPasswordSetup(passwordSetupWarning.applicationId),
          className: "inline-flex items-center justify-center rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 transition-colors",
          children: "Resend password setup email"
        }
      )
    ] }),
    loading ? /* @__PURE__ */ jsx("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-14 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(Icon, { path: I.applications, className: "w-6 h-6" }) }),
      /* @__PURE__ */ jsxs("p", { className: "font-semibold text-slate-800", children: [
        "No ",
        statusFilter === "more_info" ? "awaiting-info" : statusFilter,
        " applications"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-1", children: "New submissions will appear here for review." })
    ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: filtered.map((app) => {
      const open = expanded === app.id;
      const grades = parseList(app.igcseGrades || "");
      return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setExpanded(open ? null : app.id),
            className: "w-full p-4 sm:p-5 flex items-center gap-4 text-left hover:bg-slate-50 transition-colors",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0", children: initials(app.fullName) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "font-semibold text-slate-900 truncate", children: app.fullName }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 truncate", children: app.school })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "hidden md:flex flex-wrap gap-1 max-w-xs justify-end", children: parseList(app.subjects).slice(0, 3).map((s) => /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium", children: s }, s)) }),
              /* @__PURE__ */ jsx(Icon, { path: I.chevron, className: `w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}` })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxs("div", { className: "border-t border-slate-100 p-5 sm:p-6 space-y-5 bg-slate-50/50", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsx(Field, { label: "Email", value: app.email }),
            /* @__PURE__ */ jsx(Field, { label: "Phone", value: app.phone }),
            /* @__PURE__ */ jsx(Field, { label: "School / University", value: app.school }),
            /* @__PURE__ */ jsx(Field, { label: "Availability", value: app.availability })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2", children: "Subjects to Teach" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: parseList(app.subjects).map((s) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium", children: s }, s)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2", children: "IGCSE Grades" }),
            grades.length ? /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: grades.map((g) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-medium", children: g }, g)) }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: "Detailed in the personal statement below." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2", children: "Personal Statement" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-700 leading-relaxed bg-white rounded-xl p-4 border border-slate-200", children: app.statement })
          ] }),
          statusFilter !== "approved" && /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pt-1", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => onReview(app.id, "approve"),
                disabled: actionLoading === app.id,
                className: "flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm shadow-blue-600/20",
                children: [
                  /* @__PURE__ */ jsx(Icon, { path: I.check, className: "w-4 h-4" }),
                  " Approve Mentor"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => onReview(app.id, "more_info"),
                disabled: actionLoading === app.id,
                className: "flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 disabled:opacity-50 transition-colors",
                children: [
                  /* @__PURE__ */ jsx(Icon, { path: I.info, className: "w-4 h-4" }),
                  " Request More Info"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => onReview(app.id, "reject"),
                disabled: actionLoading === app.id,
                className: "flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-red-200 text-red-600 font-semibold hover:bg-red-50 disabled:opacity-50 transition-colors",
                children: [
                  /* @__PURE__ */ jsx(Icon, { path: I.x, className: "w-4 h-4" }),
                  " Decline Mentor"
                ]
              }
            )
          ] })
        ] })
      ] }, app.id);
    }) })
  ] });
}
function Field({ label, value }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1", children: label }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-800 break-words", children: value || "—" })
  ] });
}
function Announcements(props) {
  const { items, loading, onNew, onEdit, onDelete, onPatch } = props;
  const active = items.filter((a) => !a.archived);
  const archived = items.filter((a) => a.archived);
  const Card = ({ a }) => /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-2xl border shadow-sm p-5 transition-all ${a.pinned ? "border-blue-300 ring-1 ring-blue-100" : "border-slate-200"}`, children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        a.pinned && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md", children: [
          /* @__PURE__ */ jsx(Icon, { path: I.pin, className: "w-3 h-3" }),
          " Pinned"
        ] }),
        a.archived && /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md", children: "Archived" }),
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-slate-900 truncate", children: a.title })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 mt-2 leading-relaxed", children: a.body }),
      /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-400 mt-3", children: [
        a.publishDate ? `Published ${new Date(a.publishDate).toLocaleDateString()}` : "Draft",
        a.expiresAt ? ` · Expires ${new Date(a.expiresAt).toLocaleDateString()}` : ""
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 mt-4 pt-4 border-t border-slate-100", children: [
      /* @__PURE__ */ jsx(IconBtn, { label: a.pinned ? "Unpin" : "Pin", icon: I.pin, onClick: () => onPatch(a.id, { pinned: !a.pinned }), active: a.pinned }),
      /* @__PURE__ */ jsx(IconBtn, { label: "Edit", icon: I.edit, onClick: () => onEdit(a) }),
      /* @__PURE__ */ jsx(IconBtn, { label: a.archived ? "Unarchive" : "Archive", icon: I.archive, onClick: () => onPatch(a.id, { archived: !a.archived }) }),
      /* @__PURE__ */ jsx(IconBtn, { label: "Delete", icon: I.trash, onClick: () => onDelete(a.id), danger: true })
    ] })
  ] });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 admin-fade-in", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: "Announcements appear on the landing page and student & mentor dashboards." }),
      /* @__PURE__ */ jsxs("button", { onClick: onNew, className: "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20", children: [
        /* @__PURE__ */ jsx(Icon, { path: I.plus, className: "w-4 h-4" }),
        " New Announcement"
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsx("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" }) }) : items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-14 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(Icon, { path: I.announcements, className: "w-6 h-6" }) }),
      /* @__PURE__ */ jsx("p", { className: "font-semibold text-slate-800", children: "No announcements yet" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-1", children: "Create your first announcement to broadcast it across the platform." })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2", children: active.map((a) => /* @__PURE__ */ jsx(Card, { a }, a.id)) }),
      archived.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3", children: "Archived" }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2 opacity-75", children: archived.map((a) => /* @__PURE__ */ jsx(Card, { a }, a.id)) })
      ] })
    ] })
  ] });
}
function IconBtn({ label, icon, onClick, danger, active }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick,
      title: label,
      className: `inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors
        ${danger ? "text-red-600 hover:bg-red-50" : active ? "text-blue-600 bg-blue-50" : "text-slate-500 hover:bg-slate-100"}`,
      children: [
        /* @__PURE__ */ jsx(Icon, { path: icon, className: "w-4 h-4" }),
        " ",
        label
      ]
    }
  );
}
function MentorsList({ mentors, loading, search, onRefresh }) {
  const q = search.trim().toLowerCase();
  const filtered = q ? mentors.filter(
    (mentor) => [mentor.fullName, mentor.email, mentor.subjects, mentor.bio, mentor.contactEmail || ""].some((value) => value.toLowerCase().includes(q))
  ) : mentors;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5 admin-fade-in", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: "Approved mentor profiles and contact details." }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: "Use the search box to locate mentors by name, email, or subject." })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: onRefresh, className: "inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors", children: "↻ Refresh" })
    ] }),
    loading ? /* @__PURE__ */ jsx("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-14 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-semibold text-slate-900", children: "No mentors found" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-2", children: "Approve mentor applications to populate this list." })
    ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: filtered.map((mentor) => /* @__PURE__ */ jsx("div", { className: "bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "p-5 sm:p-6 grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-slate-400 mb-2", children: "Name" }),
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-slate-900", children: mentor.fullName }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-1", children: mentor.email })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-slate-400 mb-2", children: "Subjects" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: parseList(mentor.subjects).map((subject) => /* @__PURE__ */ jsx("span", { className: "inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700", children: subject }, subject)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-slate-400 mb-2", children: "Contact" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: mentor.contactEmail || mentor.email }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 mt-2", children: mentor.isPublic ? "Public profile" : "Private profile" })
      ] })
    ] }) }, mentor.id)) })
  ] });
}
function StudentsList({ students: students2, loading, search, onRefresh }) {
  const q = search.trim().toLowerCase();
  const filtered = q ? students2.filter(
    (student) => [student.fullName, student.email, student.gradeLevel].some((value) => value.toLowerCase().includes(q))
  ) : students2;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5 admin-fade-in", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: "Registered students in the system." }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: "Search by name, email, or grade level." })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: onRefresh, className: "inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors", children: "↻ Refresh" })
    ] }),
    loading ? /* @__PURE__ */ jsx("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-14 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-semibold text-slate-900", children: "No students found" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-2", children: "Student registrations will appear here after they sign up." })
    ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: filtered.map((student) => /* @__PURE__ */ jsx("div", { className: "bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "p-5 sm:p-6 grid gap-4 sm:grid-cols-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-slate-400 mb-2", children: "Name" }),
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-slate-900", children: student.fullName }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-1", children: student.email })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-slate-400 mb-2", children: "Grade" }),
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-slate-900", children: student.gradeLevel })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-slate-400 mb-2", children: "Age" }),
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-slate-900", children: student.age })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-slate-400 mb-2", children: "Joined" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: new Date(student.createdAt).toLocaleDateString() })
      ] })
    ] }) }, student.id)) })
  ] });
}
function AnnouncementEditor({ initial, onClose, onSave }) {
  const toInput = (d) => d ? new Date(d).toISOString().slice(0, 10) : "";
  const [title, setTitle] = useState(initial?.title || "");
  const [body, setBody] = useState(initial?.body || "");
  const [publishDate, setPublishDate] = useState(toInput(initial?.publishDate ?? null) || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [expiresAt, setExpiresAt] = useState(toInput(initial?.expiresAt ?? null));
  const [pinned, setPinned] = useState(initial?.pinned || false);
  const [saving, setSaving] = useState(false);
  const submit = async () => {
    if (!title.trim() || !body.trim()) return;
    setSaving(true);
    await onSave({ title, body, publishDate, expiresAt: expiresAt || null, pinned });
    setSaving(false);
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm admin-fade-in", onClick: onClose, children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-100", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-bold text-slate-900", children: initial ? "Edit Announcement" : "New Announcement" }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100", children: /* @__PURE__ */ jsx(Icon, { path: I.x, className: "w-4 h-4" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: "Title" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            value: title,
            onChange: (e) => setTitle(e.target.value),
            placeholder: "Announcement title",
            className: "w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: "Message" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: body,
            onChange: (e) => setBody(e.target.value),
            rows: 4,
            placeholder: "Write the announcement…",
            className: "w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: "Publish date" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "date",
              value: publishDate,
              onChange: (e) => setPublishDate(e.target.value),
              className: "w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: [
            "Expiration ",
            /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-normal", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "date",
              value: expiresAt,
              onChange: (e) => setExpiresAt(e.target.value),
              className: "w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", checked: pinned, onChange: (e) => setPinned(e.target.checked), className: "w-4 h-4 rounded accent-blue-600" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: "Pin to top across the platform" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-3 px-6 py-4 border-t border-slate-100", children: [
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors", children: "Cancel" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: submit,
          disabled: saving || !title.trim() || !body.trim(),
          className: "flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors",
          children: saving ? "Saving…" : initial ? "Save Changes" : "Publish"
        }
      )
    ] })
  ] }) });
}
function Placeholder({ title, icon, desc: desc2 }) {
  return /* @__PURE__ */ jsxs("div", { className: "admin-fade-in bg-white rounded-2xl border border-slate-200 p-14 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsx(Icon, { path: icon, className: "w-7 h-7" }) }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-slate-900", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed", children: desc2 }),
    /* @__PURE__ */ jsx("span", { className: "inline-block mt-5 text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full", children: "Coming soon" })
  ] });
}
function SettingsPanel({ email }) {
  return /* @__PURE__ */ jsxs("div", { className: "admin-fade-in space-y-5 max-w-2xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-bold text-slate-900 mb-4", children: "Administrator Account" }),
      /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsx(Field, { label: "Email", value: email }),
        /* @__PURE__ */ jsx(Field, { label: "Role", value: "Administrator" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-bold text-slate-900 mb-2", children: "Admin & Mentor Roles" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-500 leading-relaxed", children: [
        "New administrators are added via ",
        /* @__PURE__ */ jsx("strong", { className: "text-slate-700", children: "Netlify Dashboard → Identity → [User] → Roles" }),
        " by adding the ",
        /* @__PURE__ */ jsx("code", { className: "text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded", children: "admin" }),
        " role. Approving a mentor application automatically grants the applicant the ",
        /* @__PURE__ */ jsx("code", { className: "text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded", children: "mentor" }),
        " role and Mentor Dashboard access."
      ] })
    ] })
  ] });
}
const Route$b = createFileRoute("/apply/mentor")({
  component: MentorApplyPage
});
const AVAILABLE_SUBJECTS = [
  "Mathematics",
  "Additional Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Combined Science",
  "Economics",
  "Business Studies",
  "English Language",
  "English Literature",
  "History",
  "Geography",
  "Computer Science",
  "ICT",
  "Art & Design",
  "Music"
];
const AVAILABILITY_OPTIONS = [
  "Weekday mornings",
  "Weekday afternoons",
  "Weekday evenings",
  "Saturday mornings",
  "Saturday afternoons",
  "Sunday mornings",
  "Sunday afternoons"
];
function MentorApplyPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    school: "",
    subjects: [],
    statement: "",
    availability: []
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const toggleSubject = (s) => {
    set("subjects", form.subjects.includes(s) ? form.subjects.filter((x) => x !== s) : [...form.subjects, s]);
  };
  const toggleAvailability = (a) => {
    set("availability", form.availability.includes(a) ? form.availability.filter((x) => x !== a) : [...form.availability, a]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.subjects.length === 0) {
      setError("Please select at least one subject.");
      return;
    }
    if (form.availability.length === 0) {
      setError("Please select at least one availability slot.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/applications/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, availability: form.availability.join(", ") })
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Submission failed. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Network error. Please check your connection.");
    }
    setLoading(false);
  };
  if (submitted) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center px-4 pt-20 stars-bg", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-md", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center text-4xl mx-auto mb-6 shadow-2xl shadow-teal-500/30 animate-pulse-glow", children: "✓" }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-black text-white mb-4", children: "Application Submitted!" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-300 mb-8 leading-relaxed", children: "Thank you for applying to become a GradeBridge mentor. Our team will review your application and get back to you within 3–5 business days." }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:opacity-90 transition-opacity", children: "Return to Home" })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen px-4 py-24 stars-bg grid-pattern", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-flex items-center gap-2 mb-6 group", children: /* @__PURE__ */ jsx(GradeBridgeLogo, {}) }),
      /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-blue-300 text-sm font-medium mb-6", children: "🎓 Mentor Application" }),
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-black text-white mb-3", children: [
        "Become a ",
        /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "GradeBridge Mentor" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-400", children: "Share your IGCSE expertise and help the next generation succeed. Applications are reviewed within 3–5 business days." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 mb-8", children: [1, 2, 3].map((s) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 flex-1", children: [
      /* @__PURE__ */ jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-white/10 text-slate-400"}`, children: step > s ? "✓" : s }),
      s < 3 && /* @__PURE__ */ jsx("div", { className: `flex-1 h-0.5 ${step > s ? "bg-blue-600" : "bg-white/10"}` })
    ] }, s)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs text-slate-400 mb-10 -mt-4", children: [
      /* @__PURE__ */ jsx("span", { children: "Personal Info" }),
      /* @__PURE__ */ jsx("span", { children: "Subjects" }),
      /* @__PURE__ */ jsx("span", { children: "Statement" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "glass rounded-3xl p-8 shadow-2xl shadow-blue-900/20", children: [
      step === 1 && /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white mb-6", children: "Personal Information" }),
        [
          { field: "fullName", label: "Full Name", type: "text", placeholder: "Your full name" },
          { field: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
          { field: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 000-0000" },
          { field: "school", label: "Current School / University", type: "text", placeholder: "Where are you studying?" }
        ].map(({ field, label, type, placeholder }) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: label }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type,
              value: form[field],
              onChange: (e) => set(field, e.target.value),
              required: true,
              placeholder,
              className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
            }
          )
        ] }, field)),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              if (!form.fullName || !form.email || !form.phone || !form.school) {
                setError("Please fill in all fields.");
                return;
              }
              setError("");
              setStep(2);
            },
            className: "w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-blue-500/20 mt-2",
            children: "Next: Select Subjects →"
          }
        )
      ] }),
      step === 2 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white mb-2", children: "Subjects & Availability" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-slate-300 text-sm font-medium mb-3", children: [
            "Subjects You Can Teach ",
            /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "(select all that apply)" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: AVAILABLE_SUBJECTS.map((s) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => toggleSubject(s),
              className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${form.subjects.includes(s) ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-white/5 text-slate-300 border border-white/10 hover:border-blue-500/30 hover:text-white"}`,
              children: s
            },
            s
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-slate-300 text-sm font-medium mb-3", children: [
            "Availability ",
            /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "(select all that apply)" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: AVAILABILITY_OPTIONS.map((a) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => toggleAvailability(a),
              className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${form.availability.includes(a) ? "bg-teal-600 text-white shadow-md shadow-teal-500/20" : "bg-white/5 text-slate-300 border border-white/10 hover:border-teal-500/30 hover:text-white"}`,
              children: a
            },
            a
          )) })
        ] }),
        error && /* @__PURE__ */ jsx("p", { className: "text-red-400 text-sm", children: error }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setStep(1), className: "flex-1 py-3 rounded-xl glass border border-white/10 text-slate-300 hover:text-white font-semibold transition-all", children: "← Back" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                if (form.subjects.length === 0) {
                  setError("Select at least one subject.");
                  return;
                }
                if (form.availability.length === 0) {
                  setError("Select at least one availability slot.");
                  return;
                }
                setError("");
                setStep(3);
              },
              className: "flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-blue-500/20",
              children: "Next: Statement →"
            }
          )
        ] })
      ] }),
      step === 3 && /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white mb-2", children: "Personal Statement" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm", children: "Tell us about yourself, your IGCSE experience, why you want to mentor, and what makes you a great candidate." }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: [
            "Personal Statement ",
            /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "(min 100 words)" })
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: form.statement,
              onChange: (e) => set("statement", e.target.value),
              required: true,
              minLength: 100,
              rows: 8,
              placeholder: "Share your IGCSE journey, the grades you achieved, your teaching style, and why you're passionate about helping fellow students...",
              className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
            }
          ),
          /* @__PURE__ */ jsxs("p", { className: "text-slate-500 text-xs mt-1", children: [
            form.statement.split(/\s+/).filter(Boolean).length,
            " words"
          ] })
        ] }),
        error && /* @__PURE__ */ jsx("div", { className: "px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm", children: error }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setStep(2), className: "flex-1 py-3 rounded-xl glass border border-white/10 text-slate-300 hover:text-white font-semibold transition-all", children: "← Back" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: loading,
              className: "flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20 btn-shimmer",
              children: loading ? /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                "Submitting…"
              ] }) : "Submit Application 🚀"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
const Route$a = createFileRoute("/api/announcements")({
  server: {
    handlers: {
      // GET /api/announcements            -> public: active (published, not expired, not archived)
      // GET /api/announcements?scope=all  -> admin: every announcement
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const scope = url.searchParams.get("scope");
        if (scope === "all") {
          if (!await getAdminUser()) {
            return Response.json({ error: "Access denied" }, { status: 403 });
          }
          const rows2 = await db.select().from(announcements).orderBy(desc(announcements.pinned), desc(announcements.createdAt));
          return Response.json(rows2);
        }
        const now = /* @__PURE__ */ new Date();
        const rows = await db.select().from(announcements).where(
          and(
            eq(announcements.archived, false),
            lte(announcements.publishDate, now),
            or(isNull(announcements.expiresAt), gt(announcements.expiresAt, now))
          )
        ).orderBy(desc(announcements.pinned), desc(announcements.publishDate));
        return Response.json(rows);
      },
      POST: async ({ request }) => {
        const user = await getAdminUser();
        if (!user) {
          return Response.json({ error: "Access denied" }, { status: 403 });
        }
        try {
          const body = await request.json();
          const { title, body: message, publishDate, expiresAt, pinned } = body;
          if (!title || !message) {
            return Response.json({ error: "Title and message are required" }, { status: 400 });
          }
          const [row] = await db.insert(announcements).values({
            title,
            body: message,
            publishDate: publishDate ? new Date(publishDate) : /* @__PURE__ */ new Date(),
            expiresAt: expiresAt ? new Date(expiresAt) : null,
            pinned: !!pinned,
            authorEmail: user.email
          }).returning();
          return Response.json(row, { status: 201 });
        } catch (err) {
          console.error("Create announcement error:", err);
          return Response.json({ error: "Failed to create announcement" }, { status: 500 });
        }
      }
    }
  }
});
const Route$9 = createFileRoute("/api/register/student")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { fullName, age, gradeLevel, email, identityUserId } = body;
          if (!fullName || !age || !gradeLevel || !email) {
            return Response.json({ error: "All fields are required" }, { status: 400 });
          }
          const [student] = await db.insert(students).values({
            identityUserId: identityUserId || "pending",
            fullName,
            age: parseInt(age, 10),
            gradeLevel,
            email
          }).returning();
          return Response.json({ success: true, id: student.id }, { status: 201 });
        } catch (err) {
          console.error("Student registration error:", err);
          return Response.json({ error: "Failed to register student" }, { status: 500 });
        }
      }
    }
  }
});
const ALLOWED_SUBJECTS = [
  "Math",
  "Physics",
  "Chem",
  "Bio",
  "English",
  "Geo",
  "Computer Science",
  "Business",
  "ICT",
  "Global Citizenship"
];
const MAX_WEEKLY_APPROVED = 4;
const startOfWeek$1 = (date) => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + diff);
  start.setHours(0, 0, 0, 0);
  return start;
};
const endOfWeek$1 = (date) => {
  const end = new Date(date);
  const start = startOfWeek$1(date);
  end.setTime(start.getTime());
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
};
const loadWeekSessions = async (mentorIdentityUserId) => {
  const weekStart = startOfWeek$1(/* @__PURE__ */ new Date());
  const weekEnd = endOfWeek$1(/* @__PURE__ */ new Date());
  const records = await db.select().from(mentoringSessions).where(
    and(
      eq(mentoringSessions.mentorIdentityUserId, mentorIdentityUserId),
      or(eq(mentoringSessions.status, "UPCOMING"), eq(mentoringSessions.status, "COMPLETED")),
      gte(mentoringSessions.scheduledAt, weekStart),
      lte(mentoringSessions.scheduledAt, weekEnd)
    )
  );
  return records;
};
const computeUniqueCount = (records) => {
  const distinct = new Set(records.map((session) => `${session.studentName}::${session.studentContact}`));
  return distinct.size;
};
const Route$8 = createFileRoute("/api/mentors/sessions")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const user = await getUser();
        if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
        const url = new URL(request.url);
        const mentorIdentityUserId = url.searchParams.get("mentorId") || user.id;
        const scope = url.searchParams.get("scope") || "dashboard";
        const isMentorOwner = user.roles?.includes("mentor") && user.id === mentorIdentityUserId;
        const isAdmin = user.roles?.includes("admin");
        if (!isMentorOwner && !isAdmin) {
          return Response.json({ error: "Forbidden" }, { status: 403 });
        }
        const requestedStatuses = scope === "completed" ? ["COMPLETED"] : scope === "requests" ? ["PENDING"] : ["PENDING", "UPCOMING", "COMPLETED", "DECLINED"];
        const records = await db.select().from(mentoringSessions).where(
          and(
            eq(mentoringSessions.mentorIdentityUserId, mentorIdentityUserId),
            inArray(mentoringSessions.status, requestedStatuses)
          )
        ).orderBy(asc(mentoringSessions.scheduledAt));
        const weeklyRecords = await loadWeekSessions(mentorIdentityUserId);
        const weeklyApprovedCount = computeUniqueCount(weeklyRecords);
        const reminderWindowStart = /* @__PURE__ */ new Date();
        reminderWindowStart.setHours(reminderWindowStart.getHours() + 24);
        for (const record of records) {
          if (record.status !== "UPCOMING" || record.reminderSentAt) continue;
          if (record.scheduledAt && new Date(record.scheduledAt) <= reminderWindowStart) {
            await db.update(mentoringSessions).set({ reminderSentAt: /* @__PURE__ */ new Date(), updatedAt: /* @__PURE__ */ new Date() }).where(eq(mentoringSessions.id, record.id));
          }
        }
        return Response.json({
          mentorIdentityUserId,
          weeklyApprovedCount,
          maxWeeklyCapacity: MAX_WEEKLY_APPROVED,
          sessions: records
        });
      },
      POST: async ({ request }) => {
        const user = await getUser();
        if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
        const body = await request.json();
        const {
          mentorIdentityUserId,
          studentName,
          studentContact,
          subject,
          topicDescription,
          scheduledAt
        } = body;
        if (!mentorIdentityUserId || !studentName || !studentContact || !subject || !topicDescription || !scheduledAt) {
          return Response.json({ error: "Missing scheduling fields." }, { status: 400 });
        }
        if (!ALLOWED_SUBJECTS.includes(subject)) {
          return Response.json({ error: "Invalid subject selected." }, { status: 400 });
        }
        const [mentor] = await db.select().from(mentorProfiles).where(eq(mentorProfiles.identityUserId, mentorIdentityUserId));
        if (!mentor) {
          return Response.json({ error: "Mentor not found." }, { status: 404 });
        }
        const scheduledDate = new Date(scheduledAt);
        if (Number.isNaN(scheduledDate.getTime())) {
          return Response.json({ error: "Invalid session date/time." }, { status: 400 });
        }
        const weeklyRecords = await loadWeekSessions(mentorIdentityUserId);
        const weeklyCount = computeUniqueCount(weeklyRecords);
        if (weeklyCount >= MAX_WEEKLY_APPROVED) {
          return Response.json({ error: "Fully booked this week." }, { status: 409 });
        }
        await db.insert(mentoringSessions).values({
          mentorIdentityUserId,
          studentName,
          studentContact,
          subject,
          topicDescription,
          scheduledAt: scheduledDate,
          status: "PENDING",
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        });
        return Response.json({ success: true }, { status: 201 });
      }
    }
  }
});
const Route$7 = createFileRoute("/api/mentors/directory")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const user = await getUser();
        if (!user) {
          return Response.json({ error: "Unauthorized. Register as a student to access the mentor directory." }, { status: 401 });
        }
        const url = new URL(request.url);
        const subject = url.searchParams.get("subject");
        const search = url.searchParams.get("search")?.toLowerCase();
        let mentors = await db.select().from(mentorProfiles).where(eq(mentorProfiles.isPublic, true));
        const allSessions = await db.select().from(mentoringSessions);
        const weekStart = /* @__PURE__ */ new Date();
        weekStart.setDate(weekStart.getDate() - (weekStart.getDay() + 6) % 7);
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);
        const mentorCounts = /* @__PURE__ */ new Map();
        for (const session of allSessions) {
          if (!session.scheduledAt || !session.mentorIdentityUserId) continue;
          const scheduledAt = new Date(session.scheduledAt);
          if (scheduledAt < weekStart || scheduledAt > weekEnd) continue;
          if (session.status !== "UPCOMING" && session.status !== "COMPLETED") continue;
          const mentorKey = session.mentorIdentityUserId;
          const studentKey = `${session.studentName}::${session.studentContact}`;
          const current = mentorCounts.get(mentorKey) ?? /* @__PURE__ */ new Set();
          current.add(studentKey);
          mentorCounts.set(mentorKey, current);
        }
        mentors = mentors.map((mentor) => ({
          ...mentor,
          weeklyApprovedCount: mentorCounts.get(mentor.identityUserId)?.size ?? 0,
          weeklyCapacity: 4
        }));
        if (subject) {
          mentors = mentors.filter((m) => {
            try {
              const subs = JSON.parse(m.subjects);
              return Array.isArray(subs) && subs.some((s) => s.toLowerCase().includes(subject.toLowerCase()));
            } catch {
              return m.subjects.toLowerCase().includes(subject.toLowerCase());
            }
          });
        }
        if (search) {
          mentors = mentors.filter(
            (m) => m.fullName.toLowerCase().includes(search) || m.bio.toLowerCase().includes(search) || m.subjects.toLowerCase().includes(search)
          );
        }
        return Response.json(mentors);
      }
    }
  }
});
const Route$6 = createFileRoute("/api/applications/mentor")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { fullName, email, phone, school, subjects, statement, availability } = body;
          if (!fullName || !email || !phone || !school || !subjects || !statement || !availability) {
            return Response.json({ error: "All fields are required" }, { status: 400 });
          }
          const [application] = await db.insert(mentorApplications).values({
            fullName,
            email,
            phone,
            school,
            subjects: Array.isArray(subjects) ? JSON.stringify(subjects) : subjects,
            statement,
            availability,
            status: "pending"
          }).returning();
          return Response.json({ success: true, id: application.id }, { status: 201 });
        } catch (err) {
          console.error("Mentor application error:", err);
          return Response.json({ error: "Failed to submit application" }, { status: 500 });
        }
      },
      GET: async ({ request }) => {
        if (!await getAdminUser()) {
          return Response.json({ error: "Access denied" }, { status: 403 });
        }
        const url = new URL(request.url);
        const status = url.searchParams.get("status") || "pending";
        const apps = await db.select().from(mentorApplications).where(eq(mentorApplications.status, status)).orderBy(mentorApplications.createdAt);
        return Response.json(apps);
      }
    }
  }
});
const Route$5 = createFileRoute("/api/announcements/$id")({
  server: {
    handlers: {
      // Edit an announcement or toggle pinned / archived state.
      PUT: async ({ request, params }) => {
        if (!await getAdminUser()) {
          return Response.json({ error: "Access denied" }, { status: 403 });
        }
        const id = parseInt(params.id, 10);
        try {
          const body = await request.json();
          const updates = { updatedAt: /* @__PURE__ */ new Date() };
          if (body.title !== void 0) updates.title = body.title;
          if (body.body !== void 0) updates.body = body.body;
          if (body.publishDate !== void 0)
            updates.publishDate = body.publishDate ? new Date(body.publishDate) : /* @__PURE__ */ new Date();
          if (body.expiresAt !== void 0)
            updates.expiresAt = body.expiresAt ? new Date(body.expiresAt) : null;
          if (body.pinned !== void 0) updates.pinned = !!body.pinned;
          if (body.archived !== void 0) updates.archived = !!body.archived;
          const [row] = await db.update(announcements).set(updates).where(eq(announcements.id, id)).returning();
          if (!row) return Response.json({ error: "Not found" }, { status: 404 });
          return Response.json(row);
        } catch (err) {
          console.error("Update announcement error:", err);
          return Response.json({ error: "Failed to update announcement" }, { status: 500 });
        }
      },
      DELETE: async ({ params }) => {
        if (!await getAdminUser()) {
          return Response.json({ error: "Access denied" }, { status: 403 });
        }
        const id = parseInt(params.id, 10);
        await db.delete(announcements).where(eq(announcements.id, id));
        return Response.json({ success: true });
      }
    }
  }
});
const Route$4 = createFileRoute("/api/admin/students")({
  server: {
    handlers: {
      GET: async () => {
        if (!await getAdminUser()) {
          return Response.json({ error: "Access denied" }, { status: 403 });
        }
        const studentList = await db.select().from(students).orderBy(students.fullName);
        return Response.json(studentList);
      }
    }
  }
});
const Route$3 = createFileRoute("/api/admin/stats")({
  server: {
    handlers: {
      GET: async () => {
        if (!await getAdminUser()) {
          return Response.json({ error: "Access denied" }, { status: 403 });
        }
        const [pending] = await db.select({ value: count() }).from(mentorApplications).where(eq(mentorApplications.status, "pending"));
        const [mentors] = await db.select({ value: count() }).from(mentorProfiles);
        const [studentCount] = await db.select({ value: count() }).from(students);
        return Response.json({
          pendingApplications: pending?.value ?? 0,
          activeMentors: mentors?.value ?? 0,
          registeredStudents: studentCount?.value ?? 0,
          upcomingSessions: 0
        });
      }
    }
  }
});
const Route$2 = createFileRoute("/api/admin/mentors")({
  server: {
    handlers: {
      GET: async () => {
        if (!await getAdminUser()) {
          return Response.json({ error: "Access denied" }, { status: 403 });
        }
        const mentors = await db.select().from(mentorProfiles).orderBy(mentorProfiles.fullName);
        return Response.json(mentors);
      }
    }
  }
});
const startOfWeek = (date) => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + diff);
  start.setHours(0, 0, 0, 0);
  return start;
};
const endOfWeek = (date) => {
  const end = new Date(date);
  const start = startOfWeek(date);
  end.setTime(start.getTime());
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
};
const getMentorWeeklyUniqueCount = async (mentorIdentityUserId) => {
  const records = await db.select().from(mentoringSessions).where(
    and(
      eq(mentoringSessions.mentorIdentityUserId, mentorIdentityUserId),
      or(eq(mentoringSessions.status, "UPCOMING"), eq(mentoringSessions.status, "COMPLETED")),
      gte(mentoringSessions.scheduledAt, startOfWeek(/* @__PURE__ */ new Date())),
      lte(mentoringSessions.scheduledAt, endOfWeek(/* @__PURE__ */ new Date()))
    )
  );
  const unique = new Set(records.map((session) => `${session.studentName}::${session.studentContact}`));
  return unique.size;
};
const Route$1 = createFileRoute("/api/mentors/sessions/$id")({
  server: {
    handlers: {
      PATCH: async ({ request, params }) => {
        const user = await getUser();
        if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
        const body = await request.json();
        const { action } = body;
        const sessionId = Number(params.id);
        const [session] = await db.select().from(mentoringSessions).where(eq(mentoringSessions.id, sessionId));
        if (!session) {
          return Response.json({ error: "Session not found." }, { status: 404 });
        }
        if (user.id !== session.mentorIdentityUserId && !user.roles?.includes("admin")) {
          return Response.json({ error: "Forbidden" }, { status: 403 });
        }
        if (action === "approve") {
          if (session.status !== "PENDING") {
            return Response.json({ error: "Only pending requests can be approved." }, { status: 409 });
          }
          const weeklyApprovedCount = await getMentorWeeklyUniqueCount(session.mentorIdentityUserId);
          if (weeklyApprovedCount >= 4) {
            return Response.json({ error: "Mentor has already reached the weekly booking limit." }, { status: 409 });
          }
          await db.update(mentoringSessions).set({
            status: "UPCOMING",
            approvedAt: /* @__PURE__ */ new Date(),
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq(mentoringSessions.id, sessionId));
          return Response.json({ success: true });
        }
        if (action === "decline") {
          await db.update(mentoringSessions).set({
            status: "DECLINED",
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq(mentoringSessions.id, sessionId));
          return Response.json({ success: true });
        }
        if (action === "complete") {
          if (session.status !== "UPCOMING") {
            return Response.json({ error: "Only upcoming sessions can be completed." }, { status: 409 });
          }
          const duration = Number(body.actualDurationMinutes);
          const topicsCovered = String(body.topicsCovered || "");
          const evidenceLink = String(body.evidenceLink || "");
          if (!duration || duration <= 0 || !topicsCovered.trim()) {
            return Response.json({ error: "Actual duration and topics covered are required." }, { status: 400 });
          }
          const [mentorRecord] = await db.select().from(mentorProfiles).where(eq(mentorProfiles.identityUserId, session.mentorIdentityUserId));
          if (!mentorRecord) {
            return Response.json({ error: "Mentor profile missing." }, { status: 404 });
          }
          const hoursToAdd = duration / 60;
          await db.update(mentoringSessions).set({
            status: "COMPLETED",
            actualDurationMinutes: duration,
            topicsCovered,
            evidenceLink,
            completedAt: /* @__PURE__ */ new Date(),
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq(mentoringSessions.id, sessionId));
          await db.update(mentorProfiles).set({
            totalHoursTaught: Number(mentorRecord.totalHoursTaught ?? 0) + hoursToAdd,
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq(mentorProfiles.identityUserId, session.mentorIdentityUserId));
          return Response.json({ success: true });
        }
        return Response.json({ error: "Unsupported action." }, { status: 400 });
      }
    }
  }
});
const Route = createFileRoute("/api/mentors/profile/$userId")({
  server: {
    handlers: {
      PUT: async ({ request, params }) => {
        const user = await getUser();
        if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
        if (user.id !== params.userId && !user.roles?.includes("admin")) {
          return Response.json({ error: "Forbidden" }, { status: 403 });
        }
        const body = await request.json();
        const { bio, igcseGrades, subjects, reason, availability, profilePicUrl, instagram, telegram, whatsapp, contactEmail, linkedin } = body;
        const [existing] = await db.select().from(mentorProfiles).where(eq(mentorProfiles.identityUserId, params.userId));
        if (!existing) {
          return Response.json({ error: "Mentor profile not found" }, { status: 404 });
        }
        await db.update(mentorProfiles).set({
          bio: bio ?? existing.bio,
          igcseGrades: igcseGrades ?? existing.igcseGrades,
          subjects: Array.isArray(subjects) ? JSON.stringify(subjects) : subjects ?? existing.subjects,
          reason: reason ?? existing.reason,
          availability: availability ?? existing.availability,
          profilePicUrl: profilePicUrl ?? existing.profilePicUrl,
          instagram: instagram ?? existing.instagram,
          telegram: telegram ?? existing.telegram,
          whatsapp: whatsapp ?? existing.whatsapp,
          contactEmail: contactEmail ?? existing.contactEmail,
          linkedin: linkedin ?? existing.linkedin,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(mentorProfiles.identityUserId, params.userId));
        return Response.json({ success: true });
      },
      GET: async ({ params }) => {
        const [profile] = await db.select().from(mentorProfiles).where(eq(mentorProfiles.identityUserId, params.userId));
        if (!profile) return Response.json({ error: "Not found" }, { status: 404 });
        return Response.json(profile);
      }
    }
  }
});
const ResetPasswordRoute = Route$j.update({
  id: "/reset-password",
  path: "/reset-password",
  getParentRoute: () => Route$k
});
const MentorsRoute = Route$i.update({
  id: "/mentors",
  path: "/mentors",
  getParentRoute: () => Route$k
});
const LoginRoute = Route$h.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$k
});
const IndexRoute = Route$g.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$k
});
const RegisterStudentRoute = Route$f.update({
  id: "/register/student",
  path: "/register/student",
  getParentRoute: () => Route$k
});
const DashboardStudentRoute = Route$e.update({
  id: "/dashboard/student",
  path: "/dashboard/student",
  getParentRoute: () => Route$k
});
const DashboardMentorRoute = Route$d.update({
  id: "/dashboard/mentor",
  path: "/dashboard/mentor",
  getParentRoute: () => Route$k
});
const DashboardAdminRoute = Route$c.update({
  id: "/dashboard/admin",
  path: "/dashboard/admin",
  getParentRoute: () => Route$k
});
const ApplyMentorRoute = Route$b.update({
  id: "/apply/mentor",
  path: "/apply/mentor",
  getParentRoute: () => Route$k
});
const ApiAnnouncementsRoute = Route$a.update({
  id: "/api/announcements",
  path: "/api/announcements",
  getParentRoute: () => Route$k
});
const ApiRegisterStudentRoute = Route$9.update({
  id: "/api/register/student",
  path: "/api/register/student",
  getParentRoute: () => Route$k
});
const ApiMentorsSessionsRoute = Route$8.update({
  id: "/api/mentors/sessions",
  path: "/api/mentors/sessions",
  getParentRoute: () => Route$k
});
const ApiMentorsDirectoryRoute = Route$7.update({
  id: "/api/mentors/directory",
  path: "/api/mentors/directory",
  getParentRoute: () => Route$k
});
const ApiApplicationsMentorRoute = Route$6.update({
  id: "/api/applications/mentor",
  path: "/api/applications/mentor",
  getParentRoute: () => Route$k
});
const ApiAnnouncementsIdRoute = Route$5.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => ApiAnnouncementsRoute
});
const ApiAdminStudentsRoute = Route$4.update({
  id: "/api/admin/students",
  path: "/api/admin/students",
  getParentRoute: () => Route$k
});
const ApiAdminStatsRoute = Route$3.update({
  id: "/api/admin/stats",
  path: "/api/admin/stats",
  getParentRoute: () => Route$k
});
const ApiAdminMentorsRoute = Route$2.update({
  id: "/api/admin/mentors",
  path: "/api/admin/mentors",
  getParentRoute: () => Route$k
});
const ApiMentorsSessionsIdRoute = Route$1.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => ApiMentorsSessionsRoute
});
const ApiMentorsProfileUserIdRoute = Route.update({
  id: "/api/mentors/profile/$userId",
  path: "/api/mentors/profile/$userId",
  getParentRoute: () => Route$k
});
const ApiAnnouncementsRouteChildren = {
  ApiAnnouncementsIdRoute
};
const ApiAnnouncementsRouteWithChildren = ApiAnnouncementsRoute._addFileChildren(ApiAnnouncementsRouteChildren);
const ApiMentorsSessionsRouteChildren = {
  ApiMentorsSessionsIdRoute
};
const ApiMentorsSessionsRouteWithChildren = ApiMentorsSessionsRoute._addFileChildren(ApiMentorsSessionsRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  LoginRoute,
  MentorsRoute,
  ResetPasswordRoute,
  ApiAnnouncementsRoute: ApiAnnouncementsRouteWithChildren,
  ApplyMentorRoute,
  DashboardAdminRoute,
  DashboardMentorRoute,
  DashboardStudentRoute,
  RegisterStudentRoute,
  ApiAdminMentorsRoute,
  ApiAdminStatsRoute,
  ApiAdminStudentsRoute,
  ApiApplicationsMentorRoute,
  ApiMentorsDirectoryRoute,
  ApiMentorsSessionsRoute: ApiMentorsSessionsRouteWithChildren,
  ApiRegisterStudentRoute,
  ApiMentorsProfileUserIdRoute
};
const routeTree = Route$k._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  GradeBridgeLogo as G,
  router as r,
  useIdentity as u
};
