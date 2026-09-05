import { createRootRoute, HeadContent, Scripts, useRouterState, Link, createFileRoute, lazyRouteComponent, useNavigate, redirect, createRouter } from "@tanstack/react-router";
import { jsxDEV, Fragment } from "react/jsx-dev-runtime";
import { useState, useEffect, createContext, useContext, useRef, useMemo } from "react";
import { getUser, onAuthChange, logout, handleAuthCallback, signup, AuthError } from "@netlify/identity";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Line, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "../server.js";
import { g as getAdminUser, d as db, a as announcements, s as students, m as mentorProfiles, b as mentoringSessions, c as mentorApplications, u as userAccounts } from "./authorization-kN9PmZWb.js";
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
  return /* @__PURE__ */ jsxDEV(IdentityContext.Provider, { value: { user, ready, logout }, children }, void 0, false, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/lib/identity-context.tsx",
    lineNumber: 34,
    columnNumber: 5
  }, this);
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
  return /* @__PURE__ */ jsxDEV(Fragment, { children }, void 0, false, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/CallbackHandler.tsx",
    lineNumber: 26,
    columnNumber: 10
  }, this);
}
function GradeBridgeLogo({ compact = false, className = "" }) {
  return /* @__PURE__ */ jsxDEV(
    "img",
    {
      src: "/gradebridge-logo.svg",
      alt: "GradeBridge",
      "data-sb-object-id": "content/site.json",
      "data-sb-field-path": "logo.src",
      "data-sb-alt-field-path": "logo.alt",
      className: `${compact ? "h-10 w-10" : "h-16 w-52"} object-contain ${className}`
    },
    void 0,
    false,
    {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/GradeBridgeLogo.tsx",
      lineNumber: 8,
      columnNumber: 5
    },
    this
  );
}
const Route$l = createRootRoute({
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
  return /* @__PURE__ */ jsxDEV("html", { lang: "en", className: "scroll-smooth", children: [
    /* @__PURE__ */ jsxDEV("head", { children: /* @__PURE__ */ jsxDEV(HeadContent, {}, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
      lineNumber: 29,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
      lineNumber: 28,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("body", { className: "bg-slate-950 text-white antialiased", children: [
      /* @__PURE__ */ jsxDEV(IdentityProvider, { children: /* @__PURE__ */ jsxDEV(CallbackHandler, { children: [
        /* @__PURE__ */ jsxDEV(NavBar, {}, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
          lineNumber: 34,
          columnNumber: 13
        }, this),
        children
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
        lineNumber: 33,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
        lineNumber: 32,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Scripts, {}, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
        lineNumber: 38,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
      lineNumber: 31,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
    lineNumber: 27,
    columnNumber: 5
  }, this);
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
  return /* @__PURE__ */ jsxDEV("nav", { className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-950/95 backdrop-blur-md shadow-lg shadow-blue-500/5 border-b border-white/5" : "bg-transparent"}`, children: [
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between h-16", children: [
      /* @__PURE__ */ jsxDEV(Link, { to: "/", className: "flex items-center gap-2 group", children: /* @__PURE__ */ jsxDEV(GradeBridgeLogo, { compact: true, className: "group-hover:opacity-90 transition-opacity" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
        lineNumber: 75,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
        lineNumber: 74,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "hidden md:flex items-center gap-6 text-sm font-medium", children: [
        /* @__PURE__ */ jsxDEV("a", { href: "/#about", className: "text-slate-300 hover:text-white transition-colors", children: "About" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
          lineNumber: 80,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("a", { href: "/#programs", className: "text-slate-300 hover:text-white transition-colors", children: "Programs" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
          lineNumber: 81,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Link, { to: "/mentors", className: "text-slate-300 hover:text-white transition-colors", children: "Mentors" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
          lineNumber: 82,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Link, { to: "/assistant", className: "text-slate-300 hover:text-white transition-colors", children: "Assistant" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
          lineNumber: 83,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("a", { href: "/#contact", className: "text-slate-300 hover:text-white transition-colors", children: "Contact" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
          lineNumber: 84,
          columnNumber: 15
        }, this),
        ready && user ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV(Link, { to: dashboardPath, className: "text-slate-300 hover:text-white transition-colors", children: "Dashboard" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
            lineNumber: 87,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => logout2().then(() => window.location.href = "/"),
              className: "px-4 py-1.5 rounded-lg border border-white/20 text-slate-300 hover:text-white hover:border-white/40 transition-all text-sm",
              children: "Sign Out"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
              lineNumber: 88,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
          lineNumber: 86,
          columnNumber: 15
        }, this) : ready ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV(Link, { to: "/login", className: "text-slate-300 hover:text-white transition-colors", children: "Sign In" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
            lineNumber: 97,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(Link, { to: "/apply/mentor", className: "px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20", children: "Join Now" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
            lineNumber: 98,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
          lineNumber: 96,
          columnNumber: 15
        }, this) : null,
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setDarkMode(!darkMode),
            className: "w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all",
            "aria-label": "Toggle dark mode",
            children: darkMode ? "☀" : "🌙"
          },
          void 0,
          false,
          {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
            lineNumber: 103,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
        lineNumber: 79,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setMobileOpen(!mobileOpen),
          className: "md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5",
          "aria-label": "Menu",
          children: [
            /* @__PURE__ */ jsxDEV("span", { className: `block w-5 h-0.5 bg-white transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}` }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
              lineNumber: 118,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: `block w-5 h-0.5 bg-white transition-opacity ${mobileOpen ? "opacity-0" : ""}` }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
              lineNumber: 119,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: `block w-5 h-0.5 bg-white transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}` }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
              lineNumber: 120,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
          lineNumber: 113,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
      lineNumber: 72,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
      lineNumber: 71,
      columnNumber: 7
    }, this),
    mobileOpen && /* @__PURE__ */ jsxDEV("div", { className: "md:hidden bg-slate-900/98 backdrop-blur-md border-b border-white/10 py-4 px-4 flex flex-col gap-3 text-sm", children: [
      /* @__PURE__ */ jsxDEV("a", { href: "/#about", onClick: () => setMobileOpen(false), className: "text-slate-300 hover:text-white py-2", children: "About" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
        lineNumber: 128,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("a", { href: "/#programs", onClick: () => setMobileOpen(false), className: "text-slate-300 hover:text-white py-2", children: "Programs" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
        lineNumber: 129,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(Link, { to: "/assistant", onClick: () => setMobileOpen(false), className: "text-slate-300 hover:text-white py-2", children: "Assistant" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
        lineNumber: 130,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(Link, { to: "/mentors", onClick: () => setMobileOpen(false), className: "text-slate-300 hover:text-white py-2", children: "Mentors" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
        lineNumber: 131,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("a", { href: "/#contact", onClick: () => setMobileOpen(false), className: "text-slate-300 hover:text-white py-2", children: "Contact" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
        lineNumber: 132,
        columnNumber: 11
      }, this),
      ready && user ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
        /* @__PURE__ */ jsxDEV(Link, { to: dashboardPath, onClick: () => setMobileOpen(false), className: "text-slate-300 hover:text-white py-2", children: "Dashboard" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
          lineNumber: 135,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("button", { onClick: () => logout2().then(() => window.location.href = "/"), className: "text-left text-slate-300 hover:text-white py-2", children: "Sign Out" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
          lineNumber: 136,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
        lineNumber: 134,
        columnNumber: 13
      }, this) : ready ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
        /* @__PURE__ */ jsxDEV(Link, { to: "/login", onClick: () => setMobileOpen(false), className: "text-slate-300 hover:text-white py-2", children: "Sign In" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
          lineNumber: 140,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(Link, { to: "/apply/mentor", onClick: () => setMobileOpen(false), className: "text-blue-400 hover:text-blue-300 py-2 font-medium", children: "Join Now" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
          lineNumber: 141,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
        lineNumber: 139,
        columnNumber: 13
      }, this) : null
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
      lineNumber: 127,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/__root.tsx",
    lineNumber: 68,
    columnNumber: 5
  }, this);
}
const $$splitComponentImporter$1 = () => import("./reset-password-BTcftIVb.js");
const Route$k = createFileRoute("/reset-password")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const Route$j = createFileRoute("/mentors")({
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
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
        lineNumber: 136,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Loading mentor directory…" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
        lineNumber: 137,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
      lineNumber: 135,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
      lineNumber: 134,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-teal-400 font-semibold tracking-wider uppercase text-sm", children: "Mentor Directory" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
          lineNumber: 147,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("h1", { className: "text-4xl sm:text-5xl font-black mt-3 mb-4 text-white", children: [
          "Find your ",
          /* @__PURE__ */ jsxDEV("span", { className: "gradient-text", children: "next connection" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 149,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
          lineNumber: 148,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 max-w-2xl mx-auto", children: "Browse approved mentors, filter by subject, and explore a clean profile list to find the right connection for your academic goals." }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
          lineNumber: 151,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
        lineNumber: 146,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row gap-4 mb-8", children: /* @__PURE__ */ jsxDEV("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400", children: "🔍" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
          lineNumber: 159,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "text",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search mentors by name, bio, or subject…",
            className: "w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
          },
          void 0,
          false,
          {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 160,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
        lineNumber: 158,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
        lineNumber: 157,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2 mb-8", children: SUBJECTS_FILTER.map((s) => /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setSubjectFilter(s),
          className: `px-4 py-2 rounded-xl text-sm font-medium transition-all ${subjectFilter === s ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "glass border border-white/10 text-slate-300 hover:text-white hover:border-blue-500/30"}`,
          children: s
        },
        s,
        false,
        {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
          lineNumber: 173,
          columnNumber: 13
        },
        this
      )) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
        lineNumber: 171,
        columnNumber: 9
      }, this),
      error && /* @__PURE__ */ jsxDEV("div", { className: "text-center py-12 text-red-400", children: error }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
        lineNumber: 188,
        columnNumber: 11
      }, this),
      mentors.length === 0 && !error ? /* @__PURE__ */ jsxDEV("div", { className: "text-center py-20", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-5xl mb-4", children: "🔍" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
          lineNumber: 193,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "text-white font-bold text-xl mb-2", children: "No mentors found" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
          lineNumber: 194,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Try adjusting your search or filters." }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
          lineNumber: 195,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
        lineNumber: 192,
        columnNumber: 11
      }, this) : /* @__PURE__ */ jsxDEV("div", { className: "grid md:grid-cols-2 xl:grid-cols-3 gap-6", children: mentors.map((mentor) => {
        const subjects = parseSubjects(mentor.subjects);
        return /* @__PURE__ */ jsxDEV("div", { className: "glass rounded-3xl p-6 card-glow glass-hover flex flex-col", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 mb-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm overflow-hidden", children: mentor.profilePicUrl ? /* @__PURE__ */ jsxDEV("img", { src: mentor.profilePicUrl, alt: mentor.fullName, className: "w-full h-full object-cover" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
              lineNumber: 205,
              columnNumber: 47
            }, this) : getInitials(mentor.fullName) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
              lineNumber: 204,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "text-white font-bold text-lg truncate", children: mentor.fullName }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
                lineNumber: 208,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-xs", children: subjects.slice(0, 2).join(" · ") || "IGCSE Mentor" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
                lineNumber: 209,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
              lineNumber: 207,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 203,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300 text-sm leading-relaxed mb-4 flex-1", children: mentor.bio || mentor.reason || "An approved mentor ready to share their experience." }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 212,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-1.5 mb-4", children: subjects.slice(0, 4).map((subject) => /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-1 rounded-md bg-sky-400/10 text-sky-200 text-xs", children: subject }, subject, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 215,
            columnNumber: 23
          }, this)) }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 213,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-3 mt-auto", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400", children: mentor.availability || "Flexible availability" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
              lineNumber: 219,
              columnNumber: 21
            }, this),
            mentor.contactEmail && /* @__PURE__ */ jsxDEV("a", { href: `mailto:${mentor.contactEmail}`, className: "inline-flex items-center px-4 py-2 rounded-lg bg-sky-500 text-white text-sm font-semibold hover:bg-sky-400 transition-colors", children: "Connect →" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
              lineNumber: 221,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 218,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "mt-4 flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1", children: (mentor.weeklyApprovedCount ?? 0) >= 4 ? /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-300", children: "Fully Booked This Week" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
              lineNumber: 227,
              columnNumber: 25
            }, this) : /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300", children: [
              Math.max(0, 4 - (mentor.weeklyApprovedCount ?? 0)),
              " slots left this week"
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
              lineNumber: 229,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
              lineNumber: 225,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                disabled: (mentor.weeklyApprovedCount ?? 0) >= 4,
                onClick: () => openScheduleModal(mentor),
                className: "px-3 py-2 rounded-lg bg-white/5 text-white text-sm font-semibold border border-white/10 hover:border-sky-400/50 hover:bg-sky-500/10 disabled:opacity-45 disabled:cursor-not-allowed",
                children: "Schedule Session"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
                lineNumber: 232,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 224,
            columnNumber: 19
          }, this)
        ] }, mentor.id, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
          lineNumber: 202,
          columnNumber: 17
        }, this);
      }) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
        lineNumber: 198,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
      lineNumber: 145,
      columnNumber: 7
    }, this),
    selectedMentor && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl shadow-blue-950/40", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-3 mb-5", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs uppercase tracking-[0.2em] text-sky-300", children: "Session Request" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 253,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-2xl font-black text-white", children: [
            "Book with ",
            selectedMentor.fullName
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 254,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
          lineNumber: 252,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("button", { type: "button", onClick: () => setSelectedMentor(null), className: "text-slate-400 hover:text-white", children: "✕" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
          lineNumber: 256,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
        lineNumber: 251,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("form", { onSubmit: submitSchedule, className: "space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-sm text-slate-300", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "mb-1 block", children: "Student Name" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
              lineNumber: 262,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("input", { required: true, value: scheduleForm.studentName, onChange: (e) => setScheduleForm((f) => ({ ...f, studentName: e.target.value })), className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
              lineNumber: 263,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 261,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("label", { className: "block text-sm text-slate-300", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "mb-1 block", children: "Student Contact" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
              lineNumber: 266,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("input", { required: true, value: scheduleForm.studentContact, onChange: (e) => setScheduleForm((f) => ({ ...f, studentContact: e.target.value })), className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white", placeholder: "Email or Telegram" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
              lineNumber: 267,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 265,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
          lineNumber: 260,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("label", { className: "block text-sm text-slate-300", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "mb-1 block", children: "Subject" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 272,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("select", { required: true, value: scheduleForm.subject, onChange: (e) => setScheduleForm((f) => ({ ...f, subject: e.target.value })), className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white", children: SCHEDULE_SUBJECTS.map((subject) => /* @__PURE__ */ jsxDEV("option", { value: subject, children: subject }, subject, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 275,
            columnNumber: 21
          }, this)) }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 273,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
          lineNumber: 271,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("label", { className: "block text-sm text-slate-300", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "mb-1 block", children: "Topic Description" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 281,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("textarea", { required: true, rows: 4, value: scheduleForm.topicDescription, onChange: (e) => setScheduleForm((f) => ({ ...f, topicDescription: e.target.value })), className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white", placeholder: "Describe the topic you want help with." }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 282,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
          lineNumber: 280,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("label", { className: "block text-sm text-slate-300", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "mb-1 block", children: "Date & Time" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 286,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("input", { required: true, type: "datetime-local", value: scheduleForm.scheduledAt, onChange: (e) => setScheduleForm((f) => ({ ...f, scheduledAt: e.target.value })), className: "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 287,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
          lineNumber: 285,
          columnNumber: 15
        }, this),
        scheduleStatus && /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-sky-300", children: scheduleStatus }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
          lineNumber: 290,
          columnNumber: 34
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end gap-3 pt-2", children: [
          /* @__PURE__ */ jsxDEV("button", { type: "button", onClick: () => setSelectedMentor(null), className: "rounded-xl border border-white/10 px-4 py-2 text-slate-300", children: "Cancel" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 293,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("button", { type: "submit", disabled: submittingSchedule, className: "rounded-xl bg-sky-500 px-4 py-2 font-semibold text-white disabled:opacity-60", children: submittingSchedule ? "Submitting…" : "Send Request" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
            lineNumber: 294,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
          lineNumber: 292,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
        lineNumber: 259,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
      lineNumber: 250,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
      lineNumber: 249,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/mentors.tsx",
    lineNumber: 144,
    columnNumber: 5
  }, this);
}
const $$splitComponentImporter = () => import("./login-BX8hWCeY.js");
const Route$i = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const Route$h = createFileRoute("/assistant")({
  component: AssistantPage
});
const MENTORS = [
  { id: 1, name: "Sarah Connor", subjects: ["Aerodynamics", "Math"] },
  { id: 2, name: "Alex Rivera", subjects: ["CAD", "Drones"] },
  { id: 3, name: "Aisha Bekele", subjects: ["Physics", "Math"] },
  { id: 4, name: "Samuel Tesfaye", subjects: ["Chemistry", "Biology"] }
];
function AssistantPage() {
  const { user, ready } = useIdentity();
  const [status, setStatus] = useState("Initializing…");
  const [messages, setMessages] = useState([]);
  const [engineReady, setEngineReady] = useState(false);
  const [useMock, setUseMock] = useState(false);
  const [bookings, setBookings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("gb_bookings") || "[]");
    } catch {
      return [];
    }
  });
  const inputRef = useRef(null);
  const mentorsRef = useRef(MENTORS);
  const engineRef = useRef(null);
  useEffect(() => {
    (async () => {
      setStatus("Creating engine…");
      try {
        const webllm = await import("https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.46/+esm");
        engineRef.current = await webllm.CreateMLCEngine({ backend: "webgpu" });
        setEngineReady(true);
        setStatus("Ready");
      } catch (err) {
        console.warn("WebLLM init failed, falling back to mock", err);
        setUseMock(true);
        setEngineReady(false);
        setStatus("Ready (mock)");
      }
    })();
  }, []);
  useEffect(() => {
    localStorage.setItem("gb_bookings", JSON.stringify(bookings));
  }, [bookings]);
  function append(role, text) {
    setMessages((m) => [...m, { role, text }]);
  }
  function renderMentors(list = mentorsRef.current) {
    mentorsRef.current = list;
  }
  async function fetchMentors({ subject, search } = {}) {
    if (!ready) return mentorsRef.current;
    try {
      const params = new URLSearchParams();
      if (subject) params.set("subject", subject);
      if (search) params.set("search", search);
      const res = await fetch(`/api/mentors/directory?${params.toString()}`);
      if (res.status === 401) {
        setStatus("Sign in to access mentor directory");
        return mentorsRef.current;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        mentorsRef.current = data;
        return data;
      }
      return mentorsRef.current;
    } catch (e) {
      console.warn("Failed to fetch mentors, falling back to local list", e);
      return mentorsRef.current;
    }
  }
  async function callChat(history) {
    if (useMock) {
      const last = history.slice().reverse().find((h) => h.role === "user")?.content || "";
      if (/book/i.test(last)) {
        return { choices: [{ message: { tool_calls: [{ name: "bookMentorSession", arguments: { mentorName: "Sarah Connor", time: "Tomorrow 4pm", studentName: "Student" } }] } }] };
      }
      if (/find|search|mentor/i.test(last)) {
        const subj = (last.match(/aerodynamics|math|cad|drones|physics|chemistry|biology|programming/i) || ["Math"])[0];
        return { choices: [{ message: { tool_calls: [{ name: "searchMentors", arguments: { subject: subj } }] } }] };
      }
      return { choices: [{ message: { content: "I can help book mentors, search mentors, and toggle settings." } }] };
    }
    try {
      const resp = await engineRef.current.chat.completions.create({ model: "Llama-3.2-1B-Instruct-q4f16_1-MLC", messages: history, max_tokens: 256 });
      return resp;
    } catch (e) {
      console.error("chat call failed", e);
      setUseMock(true);
      return callChat(history);
    }
  }
  async function executeTool(name, args) {
    if (name === "searchMentors") {
      const subject = args.subject || args.query || "";
      const found = await fetchMentors({ subject });
      renderMentors(found);
      return { results: found };
    }
    if (name === "bookMentorSession") {
      try {
        const mentors = await fetchMentors({});
        const mentor = mentors.find((m) => (m.fullName || m.name || "").toLowerCase() === String(args.mentorName || "").toLowerCase()) || mentors[0];
        if (!mentor) throw new Error("Mentor not found");
        const body = {
          mentorIdentityUserId: mentor.identityUserId || mentor.identity_user_id || mentor.userId || mentor.id,
          studentName: args.studentName || user?.user_metadata?.full_name || user?.email || "Student",
          studentContact: user?.email || args.studentContact || "",
          subject: args.subject || "Math",
          topicDescription: args.topicDescription || args.topic || "Booked via assistant",
          scheduledAt: args.time || args.scheduledAt
        };
        if (!body.mentorIdentityUserId) throw new Error("Mentor identity id missing");
        if (!body.scheduledAt) throw new Error("Missing scheduled time");
        const res = await fetch("/api/mentors/sessions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
        const payload = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(payload.error || "Booking failed");
        const code = `GB-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
        const booking = { mentor: mentor.fullName || mentor.name, mentorId: mentor.identityUserId || mentor.id, student: body.studentName, time: body.scheduledAt, code };
        setBookings((b) => [...b, booking]);
        return { success: true, booking };
      } catch (err) {
        const mentor = MENTORS.find((m) => m.name.toLowerCase() === String(args.mentorName || "").toLowerCase()) || MENTORS[0];
        const code = `GB-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
        const booking = { mentor: mentor.name, mentorId: mentor.id, student: args.studentName || "Student", time: args.time, code };
        setBookings((b) => [...b, booking]);
        return { success: false, error: String(err), booking };
      }
    }
    if (name === "toggleDarkMode") {
      document.body.classList.toggle("dark-mode");
      return { dark: document.body.classList.contains("dark-mode") };
    }
    if (name === "navigateToPage") {
      window.location.hash = "#/" + (args.pageName || "home");
      return { navigated: true };
    }
    throw new Error("Unknown tool " + name);
  }
  async function handleSend(text) {
    append("user", text);
    const history = [{ role: "system", content: "You are a helpful student assistant." }, ...messages.map((m) => ({ role: m.role, content: m.text })), { role: "user", content: text }];
    setStatus("Thinking…");
    const resp = await callChat(history);
    const choice = resp.choices && resp.choices[0] ? resp.choices[0] : resp;
    const message = choice.message || choice;
    const tool_calls = message.tool_calls || message.function_call || null;
    if (tool_calls) {
      const calls = Array.isArray(tool_calls) ? tool_calls : [tool_calls];
      for (const call of calls) {
        const name = call.name || call.function_call && call.function_call.name;
        let args = call.arguments || call.function_call && call.function_call.arguments || {};
        if (typeof args === "string") {
          try {
            args = JSON.parse(args);
          } catch {
          }
        }
        append("assistant", `Executing ${name}`);
        const result = await executeTool(name, args);
        append("assistant", `Result: ${JSON.stringify(result)}`);
      }
      setStatus("Ready");
      const final = await callChat([{ role: "system", content: "Summarize." }]);
      const finalMsg = final.choices && final.choices[0] && final.choices[0].message && final.choices[0].message.content ? final.choices[0].message.content : "Done.";
      append("assistant", finalMsg);
      return;
    }
    const assistantText = message.content || message.text || JSON.stringify(message);
    append("assistant", assistantText);
    setStatus("Ready");
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen p-6", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 rounded-lg p-4 flex flex-col", style: { minHeight: "70vh" }, children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-bold", children: "Site Assistant — Mentor Helper" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
            lineNumber: 207,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-sm text-slate-400", children: "Ask to find mentors, book sessions, or navigate the site." }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
            lineNumber: 208,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
          lineNumber: 206,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-sm text-slate-300", children: status }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
          lineNumber: 210,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
        lineNumber: 205,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-auto p-2 space-y-2 bg-slate-950/20 rounded", children: messages.map((m, i) => /* @__PURE__ */ jsxDEV("div", { className: `p-2 rounded ${m.role === "user" ? "bg-blue-500 text-white self-end" : "bg-slate-800 text-slate-200"}`, children: /* @__PURE__ */ jsxDEV("div", { className: "text-sm", children: m.text }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
        lineNumber: 215,
        columnNumber: 17
      }, this) }, i, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
        lineNumber: 214,
        columnNumber: 15
      }, this)) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
        lineNumber: 212,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-3 flex gap-2", children: [
        /* @__PURE__ */ jsxDEV("input", { ref: inputRef, className: "flex-1 p-2 rounded bg-transparent border border-slate-700", placeholder: 'Try: "Find physics mentors"' }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
          lineNumber: 220,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            className: "px-3 rounded bg-sky-500 text-slate-900 font-bold",
            onClick: () => {
              const v = inputRef.current?.value?.trim();
              if (!v) return;
              inputRef.current.value = "";
              handleSend(v);
            },
            children: "Send"
          },
          void 0,
          false,
          {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
            lineNumber: 221,
            columnNumber: 13
          },
          this
        ),
        !user && /* @__PURE__ */ jsxDEV(
          "button",
          {
            className: "px-3 rounded border border-slate-700 text-slate-200",
            onClick: () => window.location.href = "/login",
            title: "Sign in to access mentors",
            children: "Sign In"
          },
          void 0,
          false,
          {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
            lineNumber: 233,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
        lineNumber: 219,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
      lineNumber: 204,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 rounded-lg p-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxDEV("strong", { children: "Mentor Directory" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
            lineNumber: 247,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-sm text-slate-400", children: "Live" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
            lineNumber: 248,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
          lineNumber: 246,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 max-h-64 overflow-auto", children: mentorsRef.current.map((m) => /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center p-2 rounded bg-slate-800", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "font-medium", children: m.name }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
              lineNumber: 254,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-sm text-slate-400", children: m.subjects.join(", ") }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
              lineNumber: 255,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
            lineNumber: 253,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-sm text-slate-400", children: [
            "ID ",
            m.id
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
            lineNumber: 257,
            columnNumber: 19
          }, this)
        ] }, m.id, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
          lineNumber: 252,
          columnNumber: 17
        }, this)) }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
          lineNumber: 250,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
        lineNumber: 245,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 rounded-lg p-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxDEV("strong", { children: "Bookings" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
            lineNumber: 265,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-sm text-slate-400", children: "Persistent" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
            lineNumber: 266,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
          lineNumber: 264,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 max-h-40 overflow-auto text-sm", children: bookings.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400", children: "No bookings yet" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
          lineNumber: 269,
          columnNumber: 40
        }, this) : bookings.map((b, i) => /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded bg-slate-800", children: [
          b.student,
          " — ",
          b.mentor,
          " @ ",
          b.time,
          " (",
          b.code,
          ")"
        ] }, i, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
          lineNumber: 270,
          columnNumber: 17
        }, this)) }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
          lineNumber: 268,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
        lineNumber: 263,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 rounded-lg p-3", children: [
        /* @__PURE__ */ jsxDEV("strong", { children: "Execution Log" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
          lineNumber: 276,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-slate-400 mt-2", children: "Messages are stored locally and tools execute in-browser." }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
          lineNumber: 277,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
        lineNumber: 275,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
      lineNumber: 244,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
    lineNumber: 203,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/assistant.tsx",
    lineNumber: 202,
    columnNumber: 5
  }, this);
}
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
  return /* @__PURE__ */ jsxDEV("div", { className: `space-y-3 ${className}`, children: visible.map((a) => /* @__PURE__ */ jsxDEV(
    "div",
    {
      className: `glass rounded-2xl px-5 py-4 flex items-start gap-4 border ${a.pinned ? "border-blue-500/40 shadow-lg shadow-blue-500/10" : "border-white/10"}`,
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center flex-shrink-0 text-white", children: /* @__PURE__ */ jsxDEV("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/AnnouncementBanner.tsx",
          lineNumber: 40,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/AnnouncementBanner.tsx",
          lineNumber: 39,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/AnnouncementBanner.tsx",
          lineNumber: 38,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0", "data-sb-object-id": "content/site.json", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            a.pinned && /* @__PURE__ */ jsxDEV("span", { "data-sb-field-path": "pinnedLabel", className: "text-xs font-semibold text-blue-300 uppercase tracking-wider", children: "Pinned" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/AnnouncementBanner.tsx",
              lineNumber: 45,
              columnNumber: 28
            }, this),
            /* @__PURE__ */ jsxDEV("h4", { className: "text-white font-semibold", children: a.title }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/AnnouncementBanner.tsx",
              lineNumber: 46,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/AnnouncementBanner.tsx",
            lineNumber: 44,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300 text-sm mt-1 leading-relaxed", children: a.body }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/AnnouncementBanner.tsx",
            lineNumber: 48,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/AnnouncementBanner.tsx",
          lineNumber: 43,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setDismissed((d) => [...d, a.id]),
            className: "text-slate-400 hover:text-white transition-colors flex-shrink-0",
            "aria-label": "Dismiss",
            children: /* @__PURE__ */ jsxDEV("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/AnnouncementBanner.tsx",
              lineNumber: 56,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/AnnouncementBanner.tsx",
              lineNumber: 55,
              columnNumber: 13
            }, this)
          },
          void 0,
          false,
          {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/AnnouncementBanner.tsx",
            lineNumber: 50,
            columnNumber: 11
          },
          this
        )
      ]
    },
    a.id,
    true,
    {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/AnnouncementBanner.tsx",
      lineNumber: 32,
      columnNumber: 9
    },
    this
  )) }, void 0, false, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/AnnouncementBanner.tsx",
    lineNumber: 30,
    columnNumber: 5
  }, this);
}
function EntranceOverlay() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1900);
    return () => window.clearTimeout(timer);
  }, []);
  if (!visible) return null;
  return /* @__PURE__ */ jsxDEV("div", { className: "entrance-overlay", "aria-hidden": "true", "data-sb-object-id": "content/site.json", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "entrance-grid" }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/EntranceOverlay.tsx",
      lineNumber: 16,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "entrance-energy-line" }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/EntranceOverlay.tsx",
      lineNumber: 17,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "entrance-mark", children: [
      /* @__PURE__ */ jsxDEV(GradeBridgeLogo, { compact: true, className: "entrance-logo" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/EntranceOverlay.tsx",
        lineNumber: 19,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("span", { "data-sb-field-path": "overlayTitle", children: "Knowledge Network" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/EntranceOverlay.tsx",
        lineNumber: 20,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/EntranceOverlay.tsx",
      lineNumber: 18,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/EntranceOverlay.tsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
}
const NODES = [
  { label: "Mathematics", symbol: "∑", position: [2.5, 1.4, 0.6], color: "#7dd3fc", accent: true },
  { label: "Physics", symbol: "F=ma", position: [-2.7, 1.1, -0.5], color: "#38bdf8", accent: false },
  { label: "Chemistry", symbol: "⌬", position: [2.2, -1.5, -0.8], color: "#67e8f9", accent: false },
  { label: "Biology", symbol: "⬡", position: [-2.4, -1.3, 0.7], color: "#5eead4", accent: false },
  { label: "Mentors", symbol: "◎", position: [0.2, 2.6, -0.9], color: "#bae6fd", accent: true },
  { label: "Students", symbol: "◌", position: [-0.4, -2.6, 0.4], color: "#7dd3fc", accent: false },
  { label: "English", symbol: "Aa", position: [3.1, -0.2, 0.9], color: "#38bdf8", accent: false },
  { label: "Computing", symbol: "{ }", position: [-3.2, 0, -0.6], color: "#67e8f9", accent: false }
];
const EDGES = [
  [4, 0],
  [4, 1],
  [4, 6],
  [4, 7],
  [5, 2],
  [5, 3],
  [5, 0],
  [5, 7],
  [0, 6],
  [1, 7],
  [2, 6],
  [3, 5]
];
function GraduationCap() {
  const cap = useRef(null);
  const tassel = useRef(null);
  const ring1 = useRef(null);
  const ring2 = useRef(null);
  useFrame(({ clock }, delta) => {
    if (cap.current) {
      cap.current.rotation.y += delta * 0.5;
      cap.current.position.y = Math.sin(clock.elapsedTime * 1.2) * 0.08;
    }
    if (tassel.current) {
      tassel.current.rotation.z = Math.sin(clock.elapsedTime * 1.6) * 0.18;
    }
    if (ring1.current) ring1.current.rotation.z += delta * 0.25;
    if (ring2.current) ring2.current.rotation.z -= delta * 0.18;
  });
  const boardMaterial = /* @__PURE__ */ jsxDEV(
    "meshStandardMaterial",
    {
      color: "#0b1f3a",
      emissive: "#0ea5e9",
      emissiveIntensity: 0.6,
      roughness: 0.35,
      metalness: 0.5
    },
    void 0,
    false,
    {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
      lineNumber: 54,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ jsxDEV("group", { children: [
    /* @__PURE__ */ jsxDEV("group", { ref: cap, rotation: [0.15, 0, 0], children: [
      /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0.42, 0], children: [
        /* @__PURE__ */ jsxDEV("boxGeometry", { args: [1.5, 0.05, 1.5] }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
          lineNumber: 68,
          columnNumber: 11
        }, this),
        boardMaterial
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
        lineNumber: 67,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0.4, 0], children: [
        /* @__PURE__ */ jsxDEV("boxGeometry", { args: [1.56, 0.02, 1.56] }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
          lineNumber: 73,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("meshBasicMaterial", { color: "#38bdf8", transparent: true, opacity: 0.7 }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
          lineNumber: 74,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
        lineNumber: 72,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0.14, 0], children: [
        /* @__PURE__ */ jsxDEV("cylinderGeometry", { args: [0.5, 0.56, 0.42, 40] }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
          lineNumber: 79,
          columnNumber: 11
        }, this),
        boardMaterial
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
        lineNumber: 78,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0.47, 0], children: [
        /* @__PURE__ */ jsxDEV("sphereGeometry", { args: [0.08, 20, 20] }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
          lineNumber: 85,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "meshStandardMaterial",
          {
            color: "#e0f2fe",
            emissive: "#7dd3fc",
            emissiveIntensity: 2.2,
            roughness: 0.2
          },
          void 0,
          false,
          {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
            lineNumber: 86,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
        lineNumber: 84,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("group", { ref: tassel, position: [0, 0.47, 0], children: [
        /* @__PURE__ */ jsxDEV("mesh", { position: [0.34, -0.01, 0.34], rotation: [0, -Math.PI / 4, Math.PI / 2], children: [
          /* @__PURE__ */ jsxDEV("cylinderGeometry", { args: [0.015, 0.015, 0.96, 8] }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
            lineNumber: 98,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("meshBasicMaterial", { color: "#7dd3fc" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
            lineNumber: 99,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
          lineNumber: 97,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("mesh", { position: [0.66, -0.32, 0.66], children: [
          /* @__PURE__ */ jsxDEV("cylinderGeometry", { args: [0.015, 0.015, 0.62, 8] }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
            lineNumber: 103,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("meshBasicMaterial", { color: "#7dd3fc" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
            lineNumber: 104,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
          lineNumber: 102,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("mesh", { position: [0.66, -0.66, 0.66], children: [
          /* @__PURE__ */ jsxDEV("coneGeometry", { args: [0.09, 0.22, 12] }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
            lineNumber: 108,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "meshStandardMaterial",
            {
              color: "#38bdf8",
              emissive: "#38bdf8",
              emissiveIntensity: 1.6,
              roughness: 0.3
            },
            void 0,
            false,
            {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
              lineNumber: 109,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
          lineNumber: 107,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
        lineNumber: 95,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
      lineNumber: 65,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("mesh", { scale: 2.1, children: [
      /* @__PURE__ */ jsxDEV("sphereGeometry", { args: [0.62, 32, 32] }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
        lineNumber: 121,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshBasicMaterial", { color: "#0ea5e9", transparent: true, opacity: 0.07 }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
        lineNumber: 122,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
      lineNumber: 120,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("mesh", { ref: ring1, rotation: [Math.PI / 2.2, 0.3, 0], children: [
      /* @__PURE__ */ jsxDEV("torusGeometry", { args: [1.5, 0.012, 16, 120] }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
        lineNumber: 126,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshBasicMaterial", { color: "#7dd3fc", transparent: true, opacity: 0.55 }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
        lineNumber: 127,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
      lineNumber: 125,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("mesh", { ref: ring2, rotation: [Math.PI / 1.7, -0.4, 0.2], children: [
      /* @__PURE__ */ jsxDEV("torusGeometry", { args: [1.9, 8e-3, 16, 120] }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
        lineNumber: 130,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshBasicMaterial", { color: "#67e8f9", transparent: true, opacity: 0.35 }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
        lineNumber: 131,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
      lineNumber: 129,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("pointLight", { position: [0, 0, 0], intensity: 3, distance: 9, color: "#38bdf8" }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
      lineNumber: 133,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
    lineNumber: 64,
    columnNumber: 5
  }, this);
}
function KnowledgeNode({ node }) {
  const mesh = useRef(null);
  const [hovered, setHovered] = useState(false);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 2 + node.position[0]) * 0.06;
    const target = hovered ? 1.35 : pulse;
    mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, target, 0.15));
  });
  const radius = node.accent ? 0.34 : 0.26;
  return /* @__PURE__ */ jsxDEV(Float, { speed: 2, rotationIntensity: 0.3, floatIntensity: 0.6, children: /* @__PURE__ */ jsxDEV("group", { position: node.position, children: [
    /* @__PURE__ */ jsxDEV(
      "mesh",
      {
        ref: mesh,
        onPointerOver: (e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        },
        onPointerOut: () => {
          setHovered(false);
          document.body.style.cursor = "auto";
        },
        children: [
          /* @__PURE__ */ jsxDEV("icosahedronGeometry", { args: [radius, 2] }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
            lineNumber: 166,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(
            "meshStandardMaterial",
            {
              color: node.color,
              emissive: node.color,
              emissiveIntensity: hovered ? 2.6 : 1.4,
              roughness: 0.25,
              metalness: 0.2
            },
            void 0,
            false,
            {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
              lineNumber: 167,
              columnNumber: 11
            },
            this
          )
        ]
      },
      void 0,
      true,
      {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
        lineNumber: 154,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("mesh", { scale: 1.7, children: [
      /* @__PURE__ */ jsxDEV("sphereGeometry", { args: [radius, 24, 24] }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
        lineNumber: 177,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("meshBasicMaterial", { color: node.color, transparent: true, opacity: hovered ? 0.18 : 0.09 }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
        lineNumber: 178,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
      lineNumber: 176,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(Html, { center: true, position: [0, radius + 0.55, 0], distanceFactor: 9, pointerEvents: "none", children: /* @__PURE__ */ jsxDEV("div", { className: "constellation-label", "data-hovered": hovered, children: [
      /* @__PURE__ */ jsxDEV("span", { className: "constellation-symbol", children: node.symbol }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
        lineNumber: 182,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("span", { className: "constellation-name", children: node.label }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
        lineNumber: 183,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
      lineNumber: 181,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
      lineNumber: 180,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
    lineNumber: 153,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
    lineNumber: 152,
    columnNumber: 5
  }, this);
}
function Connections() {
  return /* @__PURE__ */ jsxDEV("group", { children: EDGES.map(([a, b], i) => /* @__PURE__ */ jsxDEV(
    Line,
    {
      points: [NODES[a].position, [0, 0, 0], NODES[b].position],
      color: "#38bdf8",
      lineWidth: 0.7,
      transparent: true,
      opacity: 0.28
    },
    i,
    false,
    {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
      lineNumber: 195,
      columnNumber: 9
    },
    this
  )) }, void 0, false, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
    lineNumber: 193,
    columnNumber: 5
  }, this);
}
function StarField({ count: count2 = 120 }) {
  const points = useRef(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count2 * 3);
    for (let i = 0; i < count2; i++) {
      const r = 6 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count2]);
  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.02;
  });
  return /* @__PURE__ */ jsxDEV("points", { ref: points, children: [
    /* @__PURE__ */ jsxDEV("bufferGeometry", { children: /* @__PURE__ */ jsxDEV("bufferAttribute", { attach: "attributes-position", args: [positions, 3] }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
      lineNumber: 231,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
      lineNumber: 230,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("pointsMaterial", { size: 0.05, color: "#7dd3fc", transparent: true, opacity: 0.7, sizeAttenuation: true }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
      lineNumber: 233,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
    lineNumber: 229,
    columnNumber: 5
  }, this);
}
function InteractiveRig({ children }) {
  const group = useRef(null);
  const { pointer } = useThree();
  useFrame((_, delta) => {
    if (!group.current) return;
    const targetY = pointer.x * 0.5;
    const targetX = -pointer.y * 0.35;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3, delta);
    group.current.rotation.y += delta * 0.05;
  });
  return /* @__PURE__ */ jsxDEV("group", { ref: group, children }, void 0, false, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
    lineNumber: 253,
    columnNumber: 10
  }, this);
}
function KnowledgeConstellation() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    setMounted(true);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  if (!mounted) {
    return /* @__PURE__ */ jsxDEV("div", { className: "constellation-canvas", "aria-hidden": "true" }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
      lineNumber: 266,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      className: "constellation-canvas",
      role: "img",
      "aria-label": "Interactive 3D knowledge constellation connecting IGCSE subjects, mentors, and students",
      children: /* @__PURE__ */ jsxDEV(
        Canvas,
        {
          camera: { position: [0, 0, 10.5], fov: 42 },
          dpr: [1, 1.5],
          gl: { antialias: true, alpha: true, powerPreference: "high-performance" },
          frameloop: reducedMotion ? "demand" : "always",
          onCreated: ({ gl }) => {
            const canvas = gl.domElement;
            canvas.addEventListener(
              "webglcontextlost",
              (event) => {
                event.preventDefault();
              },
              false
            );
          },
          children: [
            /* @__PURE__ */ jsxDEV("ambientLight", { intensity: 0.4 }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
              lineNumber: 294,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ jsxDEV("directionalLight", { position: [5, 5, 5], intensity: 0.6, color: "#bae6fd" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
              lineNumber: 295,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ jsxDEV(InteractiveRig, { children: [
              /* @__PURE__ */ jsxDEV(GraduationCap, {}, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
                lineNumber: 297,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDEV(Connections, {}, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
                lineNumber: 298,
                columnNumber: 11
              }, this),
              NODES.map((node) => /* @__PURE__ */ jsxDEV(KnowledgeNode, { node }, node.label, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
                lineNumber: 300,
                columnNumber: 13
              }, this)),
              /* @__PURE__ */ jsxDEV(StarField, {}, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
                lineNumber: 302,
                columnNumber: 11
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
              lineNumber: 296,
              columnNumber: 9
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
          lineNumber: 275,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    false,
    {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/KnowledgeConstellation.tsx",
      lineNumber: 270,
      columnNumber: 5
    },
    this
  );
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
  return /* @__PURE__ */ jsxDEV("canvas", { ref: canvasRef, className: `particle-network ${className}`, "aria-hidden": "true" }, void 0, false, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/components/ParticleNetwork.tsx",
    lineNumber: 86,
    columnNumber: 10
  }, this);
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
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(event.target)).toString()
      });
      if (!response.ok) throw new Error("Contact form submission failed");
      event.currentTarget.reset();
      setContactStatus("sent");
    } catch {
      setContactStatus("error");
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxDEV(EntranceOverlay, {}, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
      lineNumber: 152,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "fixed top-16 left-1/2 -translate-x-1/2 z-40 w-full max-w-3xl px-4", children: /* @__PURE__ */ jsxDEV(AnnouncementBanner, {}, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
      lineNumber: 154,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
      lineNumber: 153,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("section", { className: "relative min-h-screen flex items-center overflow-hidden cinematic-surface grid-pattern pt-20", "data-sb-object-id": "content/pages/home.json", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "aurora-layer" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 158,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(ParticleNetwork, { density: 52 }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 159,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20", children: /* @__PURE__ */ jsxDEV("div", { className: "grid lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-2 items-center", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "hero-content", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "hero-kicker inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.16em] uppercase mb-8 animate-fade-in-up", "data-sb-field-path": "heroKicker", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 164,
              columnNumber: 17
            }, this),
            pageContent.heroKicker
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 163,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sky-200 font-medium tracking-[0.28em] uppercase text-xs mb-5", "data-sb-field-path": "heroEyebrow", children: pageContent.heroEyebrow }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 167,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-sb-object-id": "content/pages/home.json", "data-sb-field-path": "heroHeadline", children: /* @__PURE__ */ jsxDEV("h1", { "data-sb-field-path": "heroHeadline", className: "hero-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] mb-7", children: [
            pageContent.heroHeadline,
            " ",
            /* @__PURE__ */ jsxDEV("strong", { "data-sb-field-path": "heroHighlight", className: "gradient-text", children: pageContent.heroHighlight }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 170,
              columnNumber: 69
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 169,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 168,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300 text-lg sm:text-xl max-w-xl mb-9 leading-relaxed", "data-sb-field-path": "heroSubtitle", children: pageContent.heroSubtitle }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 173,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row gap-3 mb-12", children: [
            /* @__PURE__ */ jsxDEV(Link, { to: "/apply/mentor", className: "btn-shimmer px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-xl shadow-sky-900/30 hover:shadow-sky-500/30 hover:-translate-y-0.5 transition-all duration-300", "data-sb-field-path": "heroPrimaryCta", children: [
              pageContent.heroPrimaryCta,
              " ",
              /* @__PURE__ */ jsxDEV("span", { "aria-hidden": "true", children: "→" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                lineNumber: 177,
                columnNumber: 345
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 177,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(Link, { to: "/register/student", className: "btn-shimmer px-7 py-3.5 rounded-xl border border-sky-300/30 bg-sky-950/40 text-sky-100 font-semibold hover:bg-sky-900/50 hover:border-sky-200/60 transition-all duration-300", "data-sb-field-path": "heroSecondaryCta", children: pageContent.heroSecondaryCta }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 178,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 176,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 162,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative flex justify-center lg:justify-end", children: /* @__PURE__ */ jsxDEV(KnowledgeConstellation, {}, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 182,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 181,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 161,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 160,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-[10px] uppercase tracking-[0.2em]", children: [
        /* @__PURE__ */ jsxDEV("span", { children: "Explore the network" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 187,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "w-px h-9 bg-gradient-to-b from-sky-300 to-transparent animate-pulse" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 188,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 186,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
      lineNumber: 157,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("section", { id: "about", className: "py-24 px-4 sm:px-6 lg:px-8", "data-sb-object-id": "content/pages/home.json", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxDEV("div", { className: "section-fade grid md:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-teal-400 font-semibold tracking-wider uppercase text-sm", "data-sb-field-path": "aboutEyebrow", children: pageContent.aboutEyebrow }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 197,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "text-4xl sm:text-5xl font-black mt-3 mb-6 text-white", "data-sb-field-path": "aboutTitle", children: [
          pageContent.aboutTitle,
          /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 199,
            columnNumber: 65
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "gradient-text", children: "for students" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 200,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 198,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300 text-lg mb-6 leading-relaxed", "data-sb-field-path": "aboutBody1", children: pageContent.aboutBody1 }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 202,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300 text-lg mb-8 leading-relaxed", "data-sb-field-path": "aboutBody2", children: pageContent.aboutBody2 }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 205,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2", children: SUBJECTS.map((s) => /* @__PURE__ */ jsxDEV("span", { className: "px-3 py-1 rounded-full glass border border-blue-500/20 text-blue-300 text-sm", children: s }, s, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 210,
          columnNumber: 19
        }, this)) }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 208,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 196,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-600/20 to-teal-500/20 rounded-3xl blur-2xl" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 217,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative glass rounded-3xl p-8 space-y-4", "data-sb-object-id": "content/pages/home.json", "data-sb-field-path": "aboutCards", children: aboutCards.map(
          (item, index) => index === 3 ? null : /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors", "data-sb-field-path": `aboutCards.${index}`, children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-2xl", "data-sb-field-path": `aboutCards.${index}.icon`, children: item.icon }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 222,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: index === 0 ? /* @__PURE__ */ jsxDEV("p", { className: "text-white font-bold", "data-sb-field-path": `aboutCards.${index}.title`, children: [
              "Founded ",
              item.value,
              " By ",
              item.desc
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 225,
              columnNumber: 27
            }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-xs uppercase tracking-wider", "data-sb-field-path": `aboutCards.${index}.title`, children: item.title }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                lineNumber: 230,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-white font-bold", "data-sb-field-path": `aboutCards.${index}.value`, children: item.value }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                lineNumber: 231,
                columnNumber: 29
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 229,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 223,
              columnNumber: 23
            }, this),
            index !== 0 && /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-sm", "data-sb-field-path": `aboutCards.${index}.desc`, children: item.desc }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 235,
              columnNumber: 39
            }, this)
          ] }, item.title, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 221,
            columnNumber: 21
          }, this)
        ) }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 218,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 216,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
      lineNumber: 195,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
      lineNumber: 194,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
      lineNumber: 193,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("section", { id: "programs", className: "py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30", "data-sb-object-id": "content/pages/home.json", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "section-fade text-center mb-16", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-blue-400 font-semibold tracking-wider uppercase text-sm", "data-sb-field-path": "programsEyebrow", children: pageContent.programsEyebrow }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 249,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "text-4xl sm:text-5xl font-black mt-3 text-white", "data-sb-field-path": "programsTitle", children: [
          pageContent.programsTitle.replace("Support", "Support"),
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "gradient-text", children: "Support" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 251,
            columnNumber: 116
          }, this),
          " at Every Step"
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 250,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 248,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "section-fade grid md:grid-cols-2 gap-8", "data-sb-object-id": "content/pages/home.json", "data-sb-field-path": "programCards", children: programCards.map((card, index) => /* @__PURE__ */ jsxDEV("div", { className: "glass rounded-3xl p-8 card-glow glass-hover relative overflow-hidden group", "data-sb-field-path": `programCards.${index}`, children: [
        /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/15 transition-colors" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 257,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-2xl mb-6 shadow-lg shadow-blue-500/30", "data-sb-field-path": `programCards.${index}.icon`, children: card.icon }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 259,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 text-xs font-semibold uppercase tracking-wider", "data-sb-field-path": `programCards.${index}.eyebrow`, children: card.eyebrow }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 262,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-2xl font-black text-white mt-4 mb-3", "data-sb-field-path": `programCards.${index}.title`, children: card.title }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 263,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300 leading-relaxed mb-6", "data-sb-field-path": `programCards.${index}.description`, children: card.description }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 264,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("ul", { className: "space-y-2 text-slate-300 text-sm", children: card.benefits.map((item, bindex) => /* @__PURE__ */ jsxDEV("li", { "data-sb-field-path": `programCards.${index}.benefits.${bindex}`, className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-teal-400", children: "✓" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 270,
              columnNumber: 25
            }, this),
            " ",
            item
          ] }, `${index}-${bindex}`, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 269,
            columnNumber: 23
          }, this)) }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 267,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 258,
          columnNumber: 17
        }, this)
      ] }, card.title, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 256,
        columnNumber: 15
      }, this)) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 254,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
      lineNumber: 247,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
      lineNumber: 246,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("section", { className: "py-24 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "section-fade text-center mb-16", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-semibold tracking-wider uppercase text-sm", children: "Why Join GradeBridge" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 285,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "text-4xl sm:text-5xl font-black mt-3 text-white", children: [
          "Everything You Need to ",
          /* @__PURE__ */ jsxDEV("span", { className: "gradient-text", children: "Succeed" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 287,
            columnNumber: 38
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 286,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 284,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "section-fade grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: BENEFITS.map((benefit) => /* @__PURE__ */ jsxDEV("div", { className: "glass rounded-2xl p-6 glass-hover card-glow group cursor-default", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-3xl mb-4 group-hover:scale-110 transition-transform", children: benefit.icon }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 293,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "text-white font-bold text-lg mb-2", children: benefit.title }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 294,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-sm leading-relaxed", children: benefit.desc }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 295,
          columnNumber: 17
        }, this)
      ] }, benefit.title, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 292,
        columnNumber: 15
      }, this)) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 290,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
      lineNumber: 283,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
      lineNumber: 282,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("section", { className: "py-24 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "section-fade text-center mb-16", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-4xl sm:text-5xl font-black text-white", children: [
          "Ready to ",
          /* @__PURE__ */ jsxDEV("span", { className: "gradient-text", children: "Get Started?" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 307,
            columnNumber: 24
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 306,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 mt-4 text-lg", children: "Choose your path and join the GradeBridge community today." }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 309,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 305,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "section-fade grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/apply/mentor",
            className: "group relative block rounded-3xl overflow-hidden cursor-pointer",
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-br from-sky-600 to-blue-800 opacity-90 group-hover:opacity-100 transition-opacity" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                lineNumber: 316,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                lineNumber: 317,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                lineNumber: 318,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "relative p-10", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-xl", children: "🎓" }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                  lineNumber: 320,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "text-3xl font-black text-white mb-3", children: "Are You a Mentor?" }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                  lineNumber: 323,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-blue-100 text-lg mb-8 leading-relaxed", children: "Share your IGCSE knowledge and experience. Help the next generation achieve their goals." }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                  lineNumber: 324,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 text-white font-semibold text-lg group-hover:gap-5 transition-all", children: [
                  "Apply to Mentor ",
                  /* @__PURE__ */ jsxDEV("span", { children: "→" }, void 0, false, {
                    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                    lineNumber: 328,
                    columnNumber: 35
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                  lineNumber: 327,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                lineNumber: 319,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 312,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/register/student",
            className: "group relative block rounded-3xl overflow-hidden cursor-pointer",
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-br from-teal-600 to-cyan-700 opacity-90 group-hover:opacity-100 transition-opacity" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                lineNumber: 337,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                lineNumber: 338,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                lineNumber: 339,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "relative p-10", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-xl", children: "📖" }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                  lineNumber: 341,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "text-3xl font-black text-white mb-3", children: "Upcoming IGCSE Student?" }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                  lineNumber: 344,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-teal-100 text-lg mb-8 leading-relaxed", children: "Register to access free mentoring, tutoring sessions, and connect with experienced IGCSE graduates." }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                  lineNumber: 345,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 text-white font-semibold text-lg group-hover:gap-5 transition-all", children: [
                  "Register Now ",
                  /* @__PURE__ */ jsxDEV("span", { children: "→" }, void 0, false, {
                    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                    lineNumber: 349,
                    columnNumber: 32
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                  lineNumber: 348,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                lineNumber: 340,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 333,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 311,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
      lineNumber: 304,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
      lineNumber: 303,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("section", { id: "contact", className: "py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-4xl mx-auto section-fade text-center", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "text-blue-400 font-semibold tracking-wider uppercase text-sm", children: "Get In Touch" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 360,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("h2", { className: "text-4xl sm:text-5xl font-black mt-3 mb-6 text-white", children: [
        "Have Questions? ",
        /* @__PURE__ */ jsxDEV("span", { className: "gradient-text", children: "We're Here." }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 362,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 361,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300 text-lg mb-12", children: "Reach out through any of the platforms below. We'd love to hear from you." }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 364,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "form",
        {
          name: "contact",
          method: "POST",
          "data-netlify": "true",
          "netlify-honeypot": "bot-field",
          onSubmit: handleContactSubmit,
          className: "glass rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-900/20 mb-10 text-left",
          children: [
            /* @__PURE__ */ jsxDEV("input", { type: "hidden", name: "form-name", value: "contact" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 375,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "hidden", children: /* @__PURE__ */ jsxDEV("label", { children: [
              "Do not fill this out: ",
              /* @__PURE__ */ jsxDEV("input", { name: "bot-field" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                lineNumber: 378,
                columnNumber: 39
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 377,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 376,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid sm:grid-cols-2 gap-5 mb-5", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("label", { htmlFor: "contact-name", className: "block text-slate-300 text-sm font-medium mb-2", children: "Name" }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                  lineNumber: 383,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    id: "contact-name",
                    name: "name",
                    type: "text",
                    required: true,
                    className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all",
                    placeholder: "Your name"
                  },
                  void 0,
                  false,
                  {
                    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                    lineNumber: 384,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                lineNumber: 382,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("label", { htmlFor: "contact-email", className: "block text-slate-300 text-sm font-medium mb-2", children: "Email" }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                  lineNumber: 394,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    id: "contact-email",
                    name: "email",
                    type: "email",
                    required: true,
                    className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all",
                    placeholder: "you@example.com"
                  },
                  void 0,
                  false,
                  {
                    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                    lineNumber: 395,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                lineNumber: 393,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 381,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mb-5", children: [
              /* @__PURE__ */ jsxDEV("label", { htmlFor: "contact-subject", className: "block text-slate-300 text-sm font-medium mb-2", children: "Subject" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                lineNumber: 406,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  id: "contact-subject",
                  name: "subject",
                  type: "text",
                  className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all",
                  placeholder: "How can we help?"
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                  lineNumber: 407,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 405,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxDEV("label", { htmlFor: "contact-message", className: "block text-slate-300 text-sm font-medium mb-2", children: "Message" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                lineNumber: 416,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV(
                "textarea",
                {
                  id: "contact-message",
                  name: "message",
                  required: true,
                  rows: 5,
                  className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none",
                  placeholder: "Write your message..."
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                  lineNumber: 417,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 415,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center gap-4", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  type: "submit",
                  disabled: contactStatus === "sending",
                  className: "px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all btn-shimmer disabled:opacity-60 disabled:hover:scale-100",
                  children: contactStatus === "sending" ? "Sending..." : contactStatus === "sent" ? "Sent!" : "Send Message"
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                  lineNumber: 427,
                  columnNumber: 15
                },
                this
              ),
              contactStatus === "sent" && /* @__PURE__ */ jsxDEV("p", { className: "text-teal-300 text-sm font-medium", children: "Sent!" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                lineNumber: 435,
                columnNumber: 17
              }, this),
              contactStatus === "error" && /* @__PURE__ */ jsxDEV("p", { className: "text-red-300 text-sm font-medium", children: "Something went wrong. Please try again." }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
                lineNumber: 438,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 426,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 367,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "grid sm:grid-cols-3 gap-6", children: [
        { icon: "📧", label: "Email", value: "hello@gradebridge.com", href: "mailto:hello@gradebridge.com" },
        { icon: "📱", label: "Telegram", value: "@GradeBridge", href: "#" },
        { icon: "📸", label: "Instagram", value: "@gradebridge", href: "#" }
      ].map((c) => /* @__PURE__ */ jsxDEV("a", { href: c.href, className: "glass rounded-2xl p-6 glass-hover card-glow text-center block", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-3xl mb-3", children: c.icon }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 449,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-sm mb-1", children: c.label }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 450,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-white font-semibold", children: c.value }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 451,
          columnNumber: 17
        }, this)
      ] }, c.label, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 448,
        columnNumber: 15
      }, this)) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 442,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
      lineNumber: 359,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
      lineNumber: 358,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("footer", { className: "border-t border-white/5 py-16 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "grid md:grid-cols-4 gap-10 mb-12", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxDEV(GradeBridgeLogo, { compact: true }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 464,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white text-lg", children: "GradeBridge" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 465,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 463,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-sm leading-relaxed max-w-xs", children: "GradeBridge — a student-led academic community dedicated to empowering IGCSE students through mentorship and community." }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 467,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 462,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "text-white font-semibold mb-4", children: "Quick Links" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 472,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("ul", { className: "space-y-2 text-slate-400 text-sm", children: [
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("a", { href: "/#about", className: "hover:text-white transition-colors", children: "About GradeBridge" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 474,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 474,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("a", { href: "/#programs", className: "hover:text-white transition-colors", children: "Programs" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 475,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 475,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(Link, { to: "/apply/mentor", className: "hover:text-white transition-colors", children: "Become a Mentor" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 476,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 476,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(Link, { to: "/register/student", className: "hover:text-white transition-colors", children: "Student Registration" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 477,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 477,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(Link, { to: "/mentors", className: "hover:text-white transition-colors", children: "Mentor Directory" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 478,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 478,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 473,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 471,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "text-white font-semibold mb-4", children: "Connect" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 482,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("ul", { className: "space-y-2 text-slate-400 text-sm", children: [
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("a", { href: "#", className: "hover:text-white transition-colors", children: "Instagram" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 484,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 484,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("a", { href: "#", className: "hover:text-white transition-colors", children: "Telegram" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 485,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 485,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("a", { href: "#", className: "hover:text-white transition-colors", children: "WhatsApp" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 486,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 486,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("a", { href: "mailto:hello@gradebridge.com", className: "hover:text-white transition-colors", children: "Email Us" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 487,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
              lineNumber: 487,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
            lineNumber: 483,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 481,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 461,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-sm", children: [
        /* @__PURE__ */ jsxDEV("p", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " GradeBridge. All rights reserved."
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 492,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { children: "Student-Led · Free Forever · Community Driven" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
          lineNumber: 493,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
        lineNumber: 491,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
      lineNumber: 460,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
      lineNumber: 459,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/index.tsx",
    lineNumber: 151,
    columnNumber: 5
  }, this);
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
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen flex items-center justify-center px-4 pt-20 stars-bg", children: /* @__PURE__ */ jsxDEV("div", { className: "text-center max-w-md", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-4xl mx-auto mb-6 shadow-2xl shadow-teal-500/30 animate-pulse-glow", children: "🎉" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
        lineNumber: 69,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("h1", { className: "text-3xl font-black text-white mb-4", children: "Welcome to GradeBridge!" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
        lineNumber: 72,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300 mb-4 leading-relaxed", children: "Your account has been created. Please check your email to confirm your account — then you'll be able to sign in and access the mentor directory." }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
        lineNumber: 73,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-sm mb-8", children: "Once confirmed, sign in to find mentors, book sessions, and join our community." }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
        lineNumber: 76,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxDEV(Link, { to: "/login", className: "inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:opacity-90 transition-opacity text-center", children: "Sign In" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
          lineNumber: 80,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Link, { to: "/", className: "inline-block px-8 py-3 rounded-xl glass border border-white/10 text-slate-300 hover:text-white font-semibold transition-all text-center", children: "Back to Home" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
          lineNumber: 83,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
        lineNumber: 79,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
      lineNumber: 68,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
      lineNumber: 67,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen px-4 py-24 stars-bg grid-pattern", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-lg mx-auto", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxDEV(Link, { to: "/", className: "inline-flex items-center gap-2 mb-6 group", children: /* @__PURE__ */ jsxDEV(GradeBridgeLogo, {}, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
        lineNumber: 98,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
        lineNumber: 97,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-teal-500/20 text-teal-300 text-sm font-medium mb-6", children: "📖 Student Registration" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
        lineNumber: 100,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("h1", { className: "text-4xl font-black text-white mb-3", children: [
        "Join ",
        /* @__PURE__ */ jsxDEV("span", { className: "gradient-text", children: "GradeBridge Today" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
          lineNumber: 104,
          columnNumber: 18
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
        lineNumber: 103,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Register to access free mentoring, connect with experienced IGCSE graduates, and join our community." }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
        lineNumber: 106,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
      lineNumber: 96,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, className: "glass rounded-3xl p-8 shadow-2xl shadow-blue-900/20 space-y-5", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Full Name" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
            lineNumber: 114,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              value: form.fullName,
              onChange: (e) => set("fullName", e.target.value),
              required: true,
              placeholder: "Your full name",
              className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 transition-all"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
              lineNumber: 115,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
          lineNumber: 113,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Age" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
            lineNumber: 126,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
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
            },
            void 0,
            false,
            {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
              lineNumber: 127,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
          lineNumber: 125,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Grade Level" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
            lineNumber: 140,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              value: form.gradeLevel,
              onChange: (e) => set("gradeLevel", e.target.value),
              required: true,
              className: "w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-all appearance-none",
              children: [
                /* @__PURE__ */ jsxDEV("option", { value: "", children: "Select grade" }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
                  lineNumber: 147,
                  columnNumber: 17
                }, this),
                GRADE_LEVELS.map((g) => /* @__PURE__ */ jsxDEV("option", { value: g, children: g }, g, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
                  lineNumber: 148,
                  columnNumber: 42
                }, this))
              ]
            },
            void 0,
            true,
            {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
              lineNumber: 141,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
          lineNumber: 139,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Email Address" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
            lineNumber: 153,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "email",
              value: form.email,
              onChange: (e) => set("email", e.target.value),
              required: true,
              placeholder: "you@example.com",
              className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 transition-all"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
              lineNumber: 154,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
          lineNumber: 152,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Password" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
            lineNumber: 165,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "password",
              value: form.password,
              onChange: (e) => set("password", e.target.value),
              required: true,
              minLength: 8,
              placeholder: "Min. 8 characters",
              className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 transition-all"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
              lineNumber: 166,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
          lineNumber: 164,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
        lineNumber: 112,
        columnNumber: 11
      }, this),
      error && /* @__PURE__ */ jsxDEV("div", { className: "px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm", children: error }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
        lineNumber: 179,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-500 text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-teal-500/20 btn-shimmer",
          children: loading ? /* @__PURE__ */ jsxDEV("span", { className: "flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
              lineNumber: 189,
              columnNumber: 17
            }, this),
            "Creating account…"
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
            lineNumber: 188,
            columnNumber: 15
          }, this) : "Create My Account 🚀"
        },
        void 0,
        false,
        {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
          lineNumber: 182,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("p", { className: "text-center text-slate-500 text-sm", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsxDEV(Link, { to: "/login", className: "text-blue-400 hover:text-blue-300 transition-colors", children: "Sign in" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
          lineNumber: 197,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
        lineNumber: 195,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
      lineNumber: 111,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "mt-8 grid grid-cols-3 gap-4 text-center", children: [
      { icon: "🆓", label: "Always Free" },
      { icon: "🎓", label: "Expert Mentors" },
      { icon: "💬", label: "Live Q&As" }
    ].map((b) => /* @__PURE__ */ jsxDEV("div", { className: "glass rounded-2xl p-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-2xl mb-1", children: b.icon }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
        lineNumber: 209,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-xs", children: b.label }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
        lineNumber: 210,
        columnNumber: 15
      }, this)
    ] }, b.label, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
      lineNumber: 208,
      columnNumber: 13
    }, this)) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
      lineNumber: 202,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
    lineNumber: 94,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/register/student.tsx",
    lineNumber: 93,
    columnNumber: 5
  }, this);
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
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
      lineNumber: 21,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
      lineNumber: 20,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 stars-bg", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxDEV(AnnouncementBanner, { className: "mb-8" }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
      lineNumber: 29,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "mb-10", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-sm", children: "Student Dashboard" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
        lineNumber: 32,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("h1", { className: "text-3xl font-black text-white mt-1", children: [
        "Welcome back, ",
        /* @__PURE__ */ jsxDEV("span", { className: "gradient-text", children: user.name || user.email }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
          lineNumber: 34,
          columnNumber: 27
        }, this),
        " 👋"
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
        lineNumber: 33,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
      lineNumber: 31,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8", children: [
      { icon: "📚", label: "Weekly Sessions", value: "52/yr" },
      { icon: "💬", label: "Monthly Q&As", value: "12/yr" },
      { icon: "🎓", label: "Available Mentors", value: "25+" },
      { icon: "🆓", label: "Cost", value: "Free" }
    ].map((s) => /* @__PURE__ */ jsxDEV("div", { className: "glass rounded-2xl p-5 text-center card-glow", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-2xl mb-1", children: s.icon }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
        lineNumber: 47,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "text-xl font-black text-white", children: s.value }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
        lineNumber: 48,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-xs mt-0.5", children: s.label }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
        lineNumber: 49,
        columnNumber: 15
      }, this)
    ] }, s.label, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
      lineNumber: 46,
      columnNumber: 13
    }, this)) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
      lineNumber: 39,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid md:grid-cols-2 gap-6 mb-8", children: [
      /* @__PURE__ */ jsxDEV(
        Link,
        {
          to: "/mentors",
          className: "glass rounded-3xl p-8 card-glow glass-hover group block",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl mb-4 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform", children: "🎓" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
              lineNumber: 60,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold text-white mb-2", children: "Browse Mentor Directory" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
              lineNumber: 63,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-sm leading-relaxed", children: "Find your perfect mentor by subject, availability, or grade. Connect directly through their profile." }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
              lineNumber: 64,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mt-4 text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors", children: "View Directory →" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
              lineNumber: 67,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
          lineNumber: 56,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "glass rounded-3xl p-8", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-2xl mb-4 shadow-lg shadow-teal-500/20", children: "📅" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
          lineNumber: 73,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold text-white mb-2", children: "Upcoming Sessions" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
          lineNumber: 76,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 mt-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-white/5 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-teal-400 text-lg", children: "📚" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
              lineNumber: 79,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("p", { className: "text-white text-sm font-medium", children: "Weekly Tutoring" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
                lineNumber: 81,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-xs", children: "Every Saturday · 10:00 AM" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
                lineNumber: 82,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
              lineNumber: 80,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
            lineNumber: 78,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-white/5 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-blue-400 text-lg", children: "💬" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
              lineNumber: 86,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("p", { className: "text-white text-sm font-medium", children: "Monthly Q&A" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
                lineNumber: 88,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-xs", children: "First Sunday of each month" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
                lineNumber: 89,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
              lineNumber: 87,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
            lineNumber: 85,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
          lineNumber: 77,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
        lineNumber: 72,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
      lineNumber: 55,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "glass rounded-3xl p-8", children: [
      /* @__PURE__ */ jsxDEV("h3", { className: "text-white font-bold text-lg mb-4", children: "My Account" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
        lineNumber: 98,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-white/5", children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-xs uppercase tracking-wider mb-1", children: "Email" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
            lineNumber: 101,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-white font-medium", children: user.email }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
            lineNumber: 102,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
          lineNumber: 100,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-white/5", children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-xs uppercase tracking-wider mb-1", children: "Name" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
            lineNumber: 105,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-white font-medium", children: user.name || "—" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
            lineNumber: 106,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
          lineNumber: 104,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-white/5", children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-xs uppercase tracking-wider mb-1", children: "Account Type" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
            lineNumber: 109,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-teal-400 font-medium", children: "Student" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
            lineNumber: 110,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
          lineNumber: 108,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-white/5", children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-xs uppercase tracking-wider mb-1", children: "Membership" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
            lineNumber: 113,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-green-400 font-medium", children: "Free · Active" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
            lineNumber: 114,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
          lineNumber: 112,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
        lineNumber: 99,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => logout2().then(() => window.location.href = "/"),
          className: "mt-6 px-6 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-white/20 text-sm font-medium transition-all",
          children: "Sign Out"
        },
        void 0,
        false,
        {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
          lineNumber: 117,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
      lineNumber: 97,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
    lineNumber: 28,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/student.tsx",
    lineNumber: 27,
    columnNumber: 5
  }, this);
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
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
      lineNumber: 155,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
      lineNumber: 154,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 stars-bg", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxDEV(AnnouncementBanner, { className: "mb-8" }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
      lineNumber: 163,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between mb-10", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-sm", children: "Mentor Dashboard" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
          lineNumber: 166,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h1", { className: "text-3xl font-black text-white mt-1", children: [
          "Hello, ",
          /* @__PURE__ */ jsxDEV("span", { className: "gradient-text", children: user.name || user.email }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 168,
            columnNumber: 22
          }, this),
          " 🎓"
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
          lineNumber: 167,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
        lineNumber: 165,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => logout2().then(() => window.location.href = "/"),
          className: "px-4 py-2 rounded-lg border border-white/10 text-slate-300 hover:text-white text-sm transition-all",
          children: "Sign Out"
        },
        void 0,
        false,
        {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
          lineNumber: 171,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
      lineNumber: 164,
      columnNumber: 9
    }, this),
    saveMsg && /* @__PURE__ */ jsxDEV("div", { className: "mb-6 px-4 py-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 text-sm", children: [
      "✓ ",
      saveMsg
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
      lineNumber: 180,
      columnNumber: 11
    }, this),
    !profile ? /* @__PURE__ */ jsxDEV("div", { className: "glass rounded-3xl p-8 text-center", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-4xl mb-4", children: "⏳" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
        lineNumber: 187,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("h3", { className: "text-white font-bold text-xl mb-2", children: "Profile Under Review" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
        lineNumber: 188,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 leading-relaxed", children: "Your mentor application is being reviewed by our admin team. Once approved, you'll be able to set up your profile and appear in the mentor directory." }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
        lineNumber: 189,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-slate-500 text-sm mt-4", children: "Expected review time: 3–5 business days" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
        lineNumber: 192,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
      lineNumber: 186,
      columnNumber: 11
    }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "glass rounded-3xl p-8", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "text-white font-bold text-xl", children: "My Profile" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 199,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setEditing(!editing),
              className: `px-4 py-2 rounded-xl text-sm font-medium transition-all ${editing ? "bg-white/10 text-slate-300 hover:text-white" : "bg-blue-600 text-white hover:opacity-90 shadow-lg shadow-blue-500/20"}`,
              children: editing ? "Cancel" : "✏ Edit Profile"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 200,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
          lineNumber: 198,
          columnNumber: 15
        }, this),
        editing ? /* @__PURE__ */ jsxDEV("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Profile Picture URL" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 215,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                value: form.profilePicUrl || "",
                onChange: (e) => set("profilePicUrl", e.target.value),
                placeholder: "https://...",
                className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                lineNumber: 216,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 214,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Biography" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 225,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV(
              "textarea",
              {
                value: form.bio || "",
                onChange: (e) => set("bio", e.target.value),
                rows: 4,
                placeholder: "Tell students about yourself...",
                className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                lineNumber: 226,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 224,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-3", children: [
              "IGCSE Grades ",
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "(subject + grade)" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                lineNumber: 237,
                columnNumber: 36
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 236,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 mb-3", children: gradeInputs.map((g, i) => /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxDEV(
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
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                  lineNumber: 242,
                  columnNumber: 27
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
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
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                  lineNumber: 252,
                  columnNumber: 27
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("button", { onClick: () => setGradeInputs(gradeInputs.filter((_, idx) => idx !== i)), className: "px-3 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm transition-colors", children: "✕" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                lineNumber: 262,
                columnNumber: 27
              }, this)
            ] }, i, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 241,
              columnNumber: 25
            }, this)) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 239,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => setGradeInputs([...gradeInputs, { subject: "", grade: "" }]),
                className: "text-blue-400 hover:text-blue-300 text-sm transition-colors",
                children: "+ Add Grade"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                lineNumber: 266,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 235,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-3", children: "Subjects You Teach" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 276,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2", children: AVAILABLE_SUBJECTS$1.map((s) => /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => toggleSubject(s),
                className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${subjectsList.includes(s) ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-white/5 text-slate-300 border border-white/10 hover:border-blue-500/30"}`,
                children: s
              },
              s,
              false,
              {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                lineNumber: 279,
                columnNumber: 25
              },
              this
            )) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 277,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 275,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Why I Help Students" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 296,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV(
              "textarea",
              {
                value: form.reason || "",
                onChange: (e) => set("reason", e.target.value),
                rows: 3,
                placeholder: "What motivates you to mentor?",
                className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                lineNumber: 297,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 295,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: "Availability" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 307,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                value: form.availability || "",
                onChange: (e) => set("availability", e.target.value),
                placeholder: "e.g., Weekday evenings, Saturday mornings",
                className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                lineNumber: 308,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 306,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-3", children: "Contact & Social Media" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 318,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid sm:grid-cols-2 gap-3", children: [
              { field: "contactEmail", label: "📧 Email", placeholder: "contact@example.com" },
              { field: "instagram", label: "📸 Instagram", placeholder: "@username" },
              { field: "telegram", label: "✈ Telegram", placeholder: "@username" },
              { field: "whatsapp", label: "💬 WhatsApp", placeholder: "+1234567890" },
              { field: "linkedin", label: "💼 LinkedIn", placeholder: "https://linkedin.com/in/..." }
            ].map(({ field, label, placeholder }) => /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-400 text-xs mb-1", children: label }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                lineNumber: 328,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  value: form[field] || "",
                  onChange: (e) => set(field, e.target.value),
                  placeholder,
                  className: "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-sm transition-all"
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                  lineNumber: 329,
                  columnNumber: 27
                },
                this
              )
            ] }, field, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 327,
              columnNumber: 25
            }, this)) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 319,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 317,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: saveProfile,
              disabled: saving,
              className: "w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20",
              children: saving ? "Saving…" : "Save Profile ✓"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 340,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
          lineNumber: 213,
          columnNumber: 17
        }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-white/5", children: [
              /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-xs uppercase tracking-wider mb-1", children: "Email" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                lineNumber: 352,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-white font-medium", children: user.email }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                lineNumber: 353,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 351,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-white/5", children: [
              /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-xs uppercase tracking-wider mb-1", children: "Availability" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                lineNumber: 356,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-white font-medium", children: profile.availability || "Not set" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                lineNumber: 357,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 355,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 350,
            columnNumber: 19
          }, this),
          profile.bio && /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-white/5", children: [
            /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-xs uppercase tracking-wider mb-1", children: "Biography" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 362,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-white text-sm leading-relaxed", children: profile.bio }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 363,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 361,
            columnNumber: 21
          }, this),
          subjectsList.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-white/5", children: [
            /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-xs uppercase tracking-wider mb-2", children: "Subjects" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 368,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2", children: subjectsList.map((s) => /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-lg bg-blue-500/15 text-blue-300 text-xs", children: s }, s, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 371,
              columnNumber: 27
            }, this)) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 369,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 367,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-500 text-sm", children: "Your profile is visible in the mentor directory." }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 376,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
          lineNumber: 349,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
        lineNumber: 197,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "glass rounded-2xl p-6 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-lg", children: "✓" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
          lineNumber: 382,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-white font-semibold", children: "Approved Mentor" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 384,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-sm", children: "Your profile is live in the mentor directory" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 385,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
          lineNumber: 383,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "ml-auto flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "rounded-xl bg-white/5 px-3 py-2 text-sm text-slate-300", children: [
            "Total Hours Taught: ",
            /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-white", children: (profile.totalHoursTaught ?? 0).toFixed(1) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 389,
              columnNumber: 39
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 388,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(Link, { to: "/mentors", className: "px-4 py-2 rounded-xl bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 text-sm transition-colors", children: "View Directory →" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 391,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
          lineNumber: 387,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
        lineNumber: 381,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "glass rounded-3xl p-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-5", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs uppercase tracking-[0.24em] text-sky-300", children: "Sessions" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 400,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-black text-white", children: "Requests & Logbook" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 401,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 399,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex rounded-xl bg-white/5 p-1", children: [
            /* @__PURE__ */ jsxDEV("button", { type: "button", onClick: () => setSessionsView("requests"), className: `rounded-lg px-3 py-1.5 text-sm font-semibold ${sessionsView === "requests" ? "bg-blue-600 text-white" : "text-slate-300"}`, children: "Requests & Upcoming" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 404,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("button", { type: "button", onClick: () => setSessionsView("completed"), className: `rounded-lg px-3 py-1.5 text-sm font-semibold ${sessionsView === "completed" ? "bg-blue-600 text-white" : "text-slate-300"}`, children: "Completed Logs" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 405,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 403,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
          lineNumber: 398,
          columnNumber: 15
        }, this),
        sessionActionMsg && /* @__PURE__ */ jsxDEV("p", { className: "mb-4 rounded-xl bg-sky-500/10 px-3 py-2 text-sm text-sky-200", children: sessionActionMsg }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
          lineNumber: 409,
          columnNumber: 36
        }, this),
        sessionsView === "requests" ? /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
          pendingSessions.length === 0 && upcomingSessions.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-slate-400", children: "No session requests or upcoming sessions yet." }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 414,
            columnNumber: 21
          }, this) : null,
          pendingSessions.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Pending Requests" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 421,
              columnNumber: 23
            }, this),
            pendingSessions.map((session) => /* @__PURE__ */ jsxDEV("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-white font-semibold", children: session.studentName }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                  lineNumber: 426,
                  columnNumber: 31
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-sm text-slate-400", children: [
                  session.studentContact,
                  " · ",
                  session.subject,
                  " · ",
                  new Date(session.scheduledAt).toLocaleString()
                ] }, void 0, true, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                  lineNumber: 427,
                  columnNumber: 31
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "mt-2 text-sm text-slate-300", children: session.topicDescription }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                  lineNumber: 428,
                  columnNumber: 31
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                lineNumber: 425,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxDEV("button", { type: "button", onClick: () => updateSessionStatus(session.id, "approve"), className: "rounded-lg bg-teal-500 px-3 py-2 text-sm font-semibold text-white", children: "Approve" }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                  lineNumber: 431,
                  columnNumber: 31
                }, this),
                /* @__PURE__ */ jsxDEV("button", { type: "button", onClick: () => updateSessionStatus(session.id, "decline"), className: "rounded-lg bg-red-500/20 px-3 py-2 text-sm font-semibold text-red-300", children: "Decline" }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                  lineNumber: 432,
                  columnNumber: 31
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                lineNumber: 430,
                columnNumber: 29
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 424,
              columnNumber: 27
            }, this) }, session.id, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 423,
              columnNumber: 25
            }, this))
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 420,
            columnNumber: 21
          }, this),
          upcomingSessions.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Upcoming Sessions" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 442,
              columnNumber: 23
            }, this),
            upcomingSessions.map((session) => /* @__PURE__ */ jsxDEV("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-white font-semibold", children: session.studentName }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                  lineNumber: 447,
                  columnNumber: 31
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-sm text-slate-400", children: [
                  session.subject,
                  " · ",
                  new Date(session.scheduledAt).toLocaleString()
                ] }, void 0, true, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                  lineNumber: 448,
                  columnNumber: 31
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "mt-2 text-sm text-slate-300", children: session.topicDescription }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                  lineNumber: 449,
                  columnNumber: 31
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                lineNumber: 446,
                columnNumber: 29
              }, this),
              sessionNeedsLogging.some((item) => item.id === session.id) && /* @__PURE__ */ jsxDEV("div", { className: "rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-100", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "font-semibold", children: "Log Notes & Evidence" }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                  lineNumber: 453,
                  columnNumber: 33
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "mt-2 space-y-2", children: [
                  /* @__PURE__ */ jsxDEV("input", { value: logDrafts[session.id]?.actualDurationMinutes ?? "", onChange: (e) => setLogDrafts((prev) => ({ ...prev, [session.id]: { actualDurationMinutes: e.target.value, topicsCovered: prev[session.id]?.topicsCovered ?? "", evidenceLink: prev[session.id]?.evidenceLink ?? "" } })), placeholder: "Actual duration (minutes)", className: "w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white" }, void 0, false, {
                    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                    lineNumber: 455,
                    columnNumber: 35
                  }, this),
                  /* @__PURE__ */ jsxDEV("textarea", { rows: 3, value: logDrafts[session.id]?.topicsCovered ?? "", onChange: (e) => setLogDrafts((prev) => ({ ...prev, [session.id]: { actualDurationMinutes: prev[session.id]?.actualDurationMinutes ?? "", topicsCovered: e.target.value, evidenceLink: prev[session.id]?.evidenceLink ?? "" } })), placeholder: "Topics covered", className: "w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white" }, void 0, false, {
                    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                    lineNumber: 456,
                    columnNumber: 35
                  }, this),
                  /* @__PURE__ */ jsxDEV("input", { value: logDrafts[session.id]?.evidenceLink ?? "", onChange: (e) => setLogDrafts((prev) => ({ ...prev, [session.id]: { actualDurationMinutes: prev[session.id]?.actualDurationMinutes ?? "", topicsCovered: prev[session.id]?.topicsCovered ?? "", evidenceLink: e.target.value } })), placeholder: "Evidence link (optional)", className: "w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white" }, void 0, false, {
                    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                    lineNumber: 457,
                    columnNumber: 35
                  }, this),
                  /* @__PURE__ */ jsxDEV("button", { type: "button", onClick: () => handleLogSubmit(session.id), className: "rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white", children: "Submit Log" }, void 0, false, {
                    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                    lineNumber: 458,
                    columnNumber: 35
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                  lineNumber: 454,
                  columnNumber: 33
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                lineNumber: 452,
                columnNumber: 31
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 445,
              columnNumber: 27
            }, this) }, session.id, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 444,
              columnNumber: 25
            }, this))
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 441,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
          lineNumber: 412,
          columnNumber: 17
        }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
          completedSessions.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-slate-400", children: "No completed logs yet." }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 471,
            columnNumber: 21
          }, this) : null,
          completedSessions.map((session) => /* @__PURE__ */ jsxDEV("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-white font-semibold", children: session.studentName }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                  lineNumber: 479,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-sm text-slate-400", children: [
                  session.subject,
                  " · Completed ",
                  new Date(session.completedAt || session.scheduledAt).toLocaleString()
                ] }, void 0, true, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                  lineNumber: 480,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                lineNumber: 478,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-sm text-slate-300", children: [
                "Duration: ",
                session.actualDurationMinutes ?? 0,
                " min"
              ] }, void 0, true, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
                lineNumber: 482,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 477,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "mt-3 text-sm text-slate-300", children: session.topicsCovered || "No notes recorded." }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 484,
              columnNumber: 23
            }, this),
            session.evidenceLink && /* @__PURE__ */ jsxDEV("a", { href: session.evidenceLink, className: "mt-2 inline-block text-sm text-sky-300", children: "View evidence" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
              lineNumber: 485,
              columnNumber: 48
            }, this)
          ] }, session.id, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
            lineNumber: 476,
            columnNumber: 21
          }, this))
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
          lineNumber: 469,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
        lineNumber: 397,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
      lineNumber: 195,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
    lineNumber: 162,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/mentor.tsx",
    lineNumber: 161,
    columnNumber: 5
  }, this);
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
  return /* @__PURE__ */ jsxDEV("svg", { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.8, children: /* @__PURE__ */ jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", d: path }, void 0, false, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
    lineNumber: 122,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
    lineNumber: 121,
    columnNumber: 5
  }, this);
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
  const deleteMentor = async (id) => {
    if (!window.confirm("Remove this mentor profile from the directory? This cannot be undone.")) return;
    setActionLoading(id);
    try {
      const res = await fetch("/api/admin/mentors", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        flash(data?.action === "soft_delete" ? "Mentor soft-removed" : "Mentor removed");
        await loadMentors();
        await loadStats();
      } else {
        let bodyText = "";
        try {
          bodyText = await res.text();
        } catch {
        }
        let parsed = {};
        try {
          parsed = JSON.parse(bodyText);
        } catch {
        }
        const message = parsed?.error || parsed?.details || bodyText || `Status ${res.status}`;
        flash(`Failed to remove mentor: ${message}`);
        console.error("Delete mentor failed", res.status, parsed || bodyText);
      }
    } catch (err) {
      const msg = err?.message || String(err);
      flash(`Failed to remove mentor: ${msg}`);
      console.error("Delete mentor fetch error", err);
    }
    setActionLoading(null);
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
  const deleteStudent = async (id) => {
    if (!window.confirm("Permanently delete this student account? This cannot be undone.")) return;
    setActionLoading(id);
    try {
      const res = await fetch("/api/admin/students", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        flash(data?.action === "soft_delete" ? "Student soft-removed" : "Student removed");
        await loadStudents();
        await loadStats();
      } else {
        let bodyText = "";
        try {
          bodyText = await res.text();
        } catch {
        }
        let parsed = {};
        try {
          parsed = JSON.parse(bodyText);
        } catch {
        }
        const message = parsed?.error || parsed?.details || bodyText || `Status ${res.status}`;
        flash(`Failed to remove student: ${message}`);
        console.error("Delete student failed", res.status, parsed || bodyText);
      }
    } catch (err) {
      const msg = err?.message || String(err);
      flash(`Failed to remove student: ${msg}`);
      console.error("Delete student fetch error", err);
    }
    setActionLoading(null);
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
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 397,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 396,
      columnNumber: 7
    }, this);
  }
  const adminName = user.name || user.email?.split("@")[0] || "Administrator";
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50 text-slate-900 admin-shell", children: [
    mobileOpen && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 bg-slate-900/40 z-30 lg:hidden", onClick: () => setMobileOpen(false) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 408,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(
      "aside",
      {
        className: `fixed top-0 left-0 z-40 h-full bg-white text-slate-700 border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out
          ${collapsed ? "lg:w-20" : "lg:w-64"} w-64
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`,
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "h-16 flex items-center gap-3 px-5 border-b border-white/5 flex-shrink-0", children: [
            /* @__PURE__ */ jsxDEV(GradeBridgeLogo, { compact: true, className: "flex-shrink-0" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 416,
              columnNumber: 11
            }, this),
            !collapsed && /* @__PURE__ */ jsxDEV("span", { className: "sr-only", children: "GradeBridge" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 417,
              columnNumber: 26
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 415,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("nav", { className: "flex-1 px-3 py-5 space-y-1 overflow-y-auto", children: NAV.map((item) => {
            const active = view === item.key;
            return /* @__PURE__ */ jsxDEV(
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
                  /* @__PURE__ */ jsxDEV(Icon, { path: item.icon, className: "w-5 h-5 flex-shrink-0" }, void 0, false, {
                    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
                    lineNumber: 434,
                    columnNumber: 17
                  }, this),
                  !collapsed && /* @__PURE__ */ jsxDEV("span", { className: "truncate", children: item.label }, void 0, false, {
                    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
                    lineNumber: 435,
                    columnNumber: 32
                  }, this)
                ]
              },
              item.key,
              true,
              {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
                lineNumber: 424,
                columnNumber: 15
              },
              this
            );
          }) }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 420,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-4 border-t border-white/5 flex-shrink-0", children: /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => logout2().then(() => window.location.href = "/"),
              title: collapsed ? "Logout" : void 0,
              className: `w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-red-500/10 hover:text-red-300 transition-all
              ${collapsed ? "lg:justify-center" : ""}`,
              children: [
                /* @__PURE__ */ jsxDEV(Icon, { path: I.logout, className: "w-5 h-5 flex-shrink-0" }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
                  lineNumber: 448,
                  columnNumber: 13
                }, this),
                !collapsed && /* @__PURE__ */ jsxDEV("span", { children: "Logout" }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
                  lineNumber: 449,
                  columnNumber: 28
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 442,
              columnNumber: 11
            },
            this
          ) }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 441,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 410,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: `transition-all duration-300 ${collapsed ? "lg:pl-20" : "lg:pl-64"}`, children: [
      /* @__PURE__ */ jsxDEV("header", { className: "sticky top-0 z-20 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center gap-3 px-4 sm:px-6", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => window.innerWidth < 1024 ? setMobileOpen(true) : setCollapsed(!collapsed),
            className: "w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors",
            "aria-label": "Toggle sidebar",
            children: /* @__PURE__ */ jsxDEV(Icon, { path: I.menu }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 463,
              columnNumber: 13
            }, this)
          },
          void 0,
          false,
          {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 458,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("h1", { className: "text-lg font-bold text-slate-900 hidden sm:block", children: VIEW_TITLES[view] }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 465,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex-1 max-w-md mx-auto hidden md:block", children: /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400", children: /* @__PURE__ */ jsxDEV(Icon, { path: I.search, className: "w-4 h-4" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 470,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 469,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Search applications, mentors, students…",
              className: "w-full bg-slate-100 border border-transparent rounded-xl pl-9 pr-4 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 472,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 468,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 467,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 ml-auto md:ml-0", children: [
          /* @__PURE__ */ jsxDEV("button", { className: "relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors", "aria-label": "Notifications", children: [
            /* @__PURE__ */ jsxDEV(Icon, { path: I.bell }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 483,
              columnNumber: 15
            }, this),
            !!stats?.pendingApplications && /* @__PURE__ */ jsxDEV("span", { className: "absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 485,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 482,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 pl-2 sm:border-l sm:border-slate-200", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold", children: initials(adminName) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 489,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "hidden sm:block leading-tight", children: [
              /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-semibold text-slate-800", children: adminName }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
                lineNumber: 493,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400", children: "Administrator" }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
                lineNumber: 494,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 492,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 488,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 481,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 457,
        columnNumber: 9
      }, this),
      toast && /* @__PURE__ */ jsxDEV("div", { className: "fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 text-white text-sm shadow-2xl flex items-center gap-2 admin-fade-in", children: [
        /* @__PURE__ */ jsxDEV(Icon, { path: I.check, className: "w-4 h-4 text-blue-400" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 503,
          columnNumber: 13
        }, this),
        toast
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 502,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("main", { className: "p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto", children: [
        view === "dashboard" && /* @__PURE__ */ jsxDEV(DashboardHome, { name: adminName, stats, onGo: setView }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 509,
          columnNumber: 36
        }, this),
        view === "applications" && /* @__PURE__ */ jsxDEV(
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
          },
          void 0,
          false,
          {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 511,
            columnNumber: 13
          },
          this
        ),
        view === "announcements" && /* @__PURE__ */ jsxDEV(
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
          },
          void 0,
          false,
          {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 527,
            columnNumber: 13
          },
          this
        ),
        view === "mentors" && /* @__PURE__ */ jsxDEV(
          MentorsList,
          {
            mentors,
            loading: mentorsLoading,
            search,
            onRefresh: loadMentors,
            onDelete: deleteMentor,
            actionLoading
          },
          void 0,
          false,
          {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 537,
            columnNumber: 13
          },
          this
        ),
        view === "students" && /* @__PURE__ */ jsxDEV(
          StudentsList,
          {
            students: students2,
            loading: studentsLoading,
            search,
            onRefresh: loadStudents,
            onDelete: deleteStudent,
            actionLoading
          },
          void 0,
          false,
          {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 547,
            columnNumber: 13
          },
          this
        ),
        view === "sessions" && /* @__PURE__ */ jsxDEV(Placeholder, { title: "Tutoring Sessions", icon: I.sessions, desc: "Scheduled and past tutoring sessions will be managed from this space." }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 556,
          columnNumber: 35
        }, this),
        view === "settings" && /* @__PURE__ */ jsxDEV(SettingsPanel, { email: user.email || "" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 557,
          columnNumber: 35
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 508,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 455,
      columnNumber: 7
    }, this),
    editorOpen && /* @__PURE__ */ jsxDEV(
      AnnouncementEditor,
      {
        initial: editing,
        onClose: () => {
          setEditorOpen(false);
          setEditing(null);
        },
        onSave: saveAnnouncement
      },
      void 0,
      false,
      {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 562,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
    lineNumber: 405,
    columnNumber: 5
  }, this);
}
function StatCard({ label, value, icon, accent }) {
  return /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxDEV("div", { className: `w-11 h-11 rounded-xl flex items-center justify-center ${accent}`, children: /* @__PURE__ */ jsxDEV(Icon, { path: icon, className: "w-5 h-5" }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 579,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 578,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 577,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("p", { className: "text-3xl font-black text-slate-900 mt-4", children: value }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 582,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-500 mt-1", children: label }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 583,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
    lineNumber: 576,
    columnNumber: 5
  }, this);
}
function DashboardHome({ name, stats, onGo }) {
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-8 admin-fade-in", children: [
    /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl sm:text-3xl font-black text-slate-900", children: "Welcome back, Administrator." }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 592,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-slate-500 mt-1", children: [
        "Here's an overview of ",
        name ? "your platform" : "GradeBridge",
        " today."
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 593,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 591,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxDEV(StatCard, { label: "Pending Mentor Applications", value: stats?.pendingApplications ?? 0, icon: I.applications, accent: "bg-amber-50 text-amber-600" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 597,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(StatCard, { label: "Active Mentors", value: stats?.activeMentors ?? 0, icon: I.mentors, accent: "bg-blue-50 text-blue-600" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 598,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(StatCard, { label: "Registered Students", value: stats?.registeredStudents ?? 0, icon: I.students, accent: "bg-emerald-50 text-emerald-600" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 599,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(StatCard, { label: "Upcoming Tutoring Sessions", value: stats?.upcomingSessions ?? 0, icon: I.sessions, accent: "bg-indigo-50 text-indigo-600" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 600,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 596,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxDEV("button", { onClick: () => onGo("applications"), className: "text-left bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsxDEV(Icon, { path: I.applications }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 606,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 605,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-slate-900", children: "Review Mentor Applications" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 608,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-500 mt-1", children: "Approve, decline, or request more information from applicants." }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 609,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "inline-flex items-center gap-1 text-sm font-medium text-blue-600 mt-3", children: [
          "Go to applications ",
          /* @__PURE__ */ jsxDEV(Icon, { path: I.chevron, className: "w-4 h-4 -rotate-90" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 610,
            columnNumber: 118
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 610,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 604,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("button", { onClick: () => onGo("announcements"), className: "text-left bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsxDEV(Icon, { path: I.announcements }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 614,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 613,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-slate-900", children: "Manage Announcements" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 616,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-500 mt-1", children: "Publish updates shown across the landing page and dashboards." }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 617,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "inline-flex items-center gap-1 text-sm font-medium text-blue-600 mt-3", children: [
          "Go to announcements ",
          /* @__PURE__ */ jsxDEV(Icon, { path: I.chevron, className: "w-4 h-4 -rotate-90" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 618,
            columnNumber: 119
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 618,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 612,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 603,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
    lineNumber: 590,
    columnNumber: 5
  }, this);
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
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-5 admin-fade-in", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "inline-flex bg-slate-100 rounded-xl p-1", children: tabs.map((t) => /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setStatusFilter(t.key),
          className: `px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${statusFilter === t.key ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`,
          children: t.label
        },
        t.key,
        false,
        {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 655,
          columnNumber: 13
        },
        this
      )) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 653,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("button", { onClick: onRefresh, className: "text-sm text-slate-500 hover:text-slate-800 transition-colors", children: "↻ Refresh" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 666,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 652,
      columnNumber: 7
    }, this),
    passwordSetupWarning && /* @__PURE__ */ jsxDEV("div", { className: "rounded-2xl border border-amber-200 bg-amber-50 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-amber-800", children: "Password setup email delivery failed" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 672,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-amber-700", children: "The mentor account was created, but the password setup email was not delivered. Use the button below to resend it." }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 673,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 671,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => onResendPasswordSetup(passwordSetupWarning.applicationId),
          className: "inline-flex items-center justify-center rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 transition-colors",
          children: "Resend password setup email"
        },
        void 0,
        false,
        {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 675,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 670,
      columnNumber: 9
    }, this),
    loading ? /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 686,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 685,
      columnNumber: 9
    }, this) : filtered.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-2xl border border-slate-200 p-14 text-center", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxDEV(Icon, { path: I.applications, className: "w-6 h-6" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 691,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 690,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-slate-800", children: [
        "No ",
        statusFilter === "more_info" ? "awaiting-info" : statusFilter,
        " applications"
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 693,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-500 mt-1", children: "New submissions will appear here for review." }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 694,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 689,
      columnNumber: 9
    }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: filtered.map((app) => {
      const open = expanded === app.id;
      const grades = parseList(app.igcseGrades || "");
      return /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setExpanded(open ? null : app.id),
            className: "w-full p-4 sm:p-5 flex items-center gap-4 text-left hover:bg-slate-50 transition-colors",
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0", children: initials(app.fullName) }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
                lineNumber: 707,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-slate-900 truncate", children: app.fullName }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
                  lineNumber: 711,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-500 truncate", children: app.school }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
                  lineNumber: 712,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
                lineNumber: 710,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "hidden md:flex flex-wrap gap-1 max-w-xs justify-end", children: parseList(app.subjects).slice(0, 3).map((s) => /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium", children: s }, s, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
                lineNumber: 716,
                columnNumber: 23
              }, this)) }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
                lineNumber: 714,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(Icon, { path: I.chevron, className: `w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}` }, void 0, false, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
                lineNumber: 719,
                columnNumber: 19
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 703,
            columnNumber: 17
          },
          this
        ),
        open && /* @__PURE__ */ jsxDEV("div", { className: "border-t border-slate-100 p-5 sm:p-6 space-y-5 bg-slate-50/50", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxDEV(Field, { label: "Email", value: app.email }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 725,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV(Field, { label: "Phone", value: app.phone }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 726,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV(Field, { label: "School / University", value: app.school }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 727,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV(Field, { label: "Availability", value: app.availability }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 728,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 724,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2", children: "Subjects to Teach" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 732,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2", children: parseList(app.subjects).map((s) => /* @__PURE__ */ jsxDEV("span", { className: "px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium", children: s }, s, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 735,
              columnNumber: 27
            }, this)) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 733,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 731,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2", children: "IGCSE Grades" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 741,
              columnNumber: 23
            }, this),
            grades.length ? /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2", children: grades.map((g) => /* @__PURE__ */ jsxDEV("span", { className: "px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-medium", children: g }, g, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 745,
              columnNumber: 29
            }, this)) }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 743,
              columnNumber: 25
            }, this) : /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-500", children: "Detailed in the personal statement below." }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 749,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 740,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2", children: "Personal Statement" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 754,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-700 leading-relaxed bg-white rounded-xl p-4 border border-slate-200", children: app.statement }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 755,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 753,
            columnNumber: 21
          }, this),
          statusFilter !== "approved" && /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row gap-3 pt-1", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => onReview(app.id, "approve"),
                disabled: actionLoading === app.id,
                className: "flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm shadow-blue-600/20",
                children: [
                  /* @__PURE__ */ jsxDEV(Icon, { path: I.check, className: "w-4 h-4" }, void 0, false, {
                    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
                    lineNumber: 765,
                    columnNumber: 27
                  }, this),
                  " Approve Mentor"
                ]
              },
              void 0,
              true,
              {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
                lineNumber: 760,
                columnNumber: 25
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => onReview(app.id, "more_info"),
                disabled: actionLoading === app.id,
                className: "flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 disabled:opacity-50 transition-colors",
                children: [
                  /* @__PURE__ */ jsxDEV(Icon, { path: I.info, className: "w-4 h-4" }, void 0, false, {
                    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
                    lineNumber: 772,
                    columnNumber: 27
                  }, this),
                  " Request More Info"
                ]
              },
              void 0,
              true,
              {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
                lineNumber: 767,
                columnNumber: 25
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => onReview(app.id, "reject"),
                disabled: actionLoading === app.id,
                className: "flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-red-200 text-red-600 font-semibold hover:bg-red-50 disabled:opacity-50 transition-colors",
                children: [
                  /* @__PURE__ */ jsxDEV(Icon, { path: I.x, className: "w-4 h-4" }, void 0, false, {
                    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
                    lineNumber: 779,
                    columnNumber: 27
                  }, this),
                  " Decline Mentor"
                ]
              },
              void 0,
              true,
              {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
                lineNumber: 774,
                columnNumber: 25
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 759,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 723,
          columnNumber: 19
        }, this)
      ] }, app.id, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 702,
        columnNumber: 15
      }, this);
    }) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 697,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
    lineNumber: 651,
    columnNumber: 5
  }, this);
}
function Field({ label, value }) {
  return /* @__PURE__ */ jsxDEV("div", { children: [
    /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1", children: label }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 797,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-800 break-words", children: value || "—" }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 798,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
    lineNumber: 796,
    columnNumber: 5
  }, this);
}
function Announcements(props) {
  const { items, loading, onNew, onEdit, onDelete, onPatch } = props;
  const active = items.filter((a) => !a.archived);
  const archived = items.filter((a) => a.archived);
  const Card = ({ a }) => /* @__PURE__ */ jsxDEV("div", { className: `bg-white rounded-2xl border shadow-sm p-5 transition-all ${a.pinned ? "border-blue-300 ring-1 ring-blue-100" : "border-slate-200"}`, children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ jsxDEV("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
        a.pinned && /* @__PURE__ */ jsxDEV("span", { className: "inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md", children: [
          /* @__PURE__ */ jsxDEV(Icon, { path: I.pin, className: "w-3 h-3" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 820,
            columnNumber: 145
          }, this),
          " Pinned"
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 820,
          columnNumber: 26
        }, this),
        a.archived && /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md", children: "Archived" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 821,
          columnNumber: 28
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-slate-900 truncate", children: a.title }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 822,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 819,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-600 mt-2 leading-relaxed", children: a.body }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 824,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-3", children: [
        a.publishDate ? `Published ${new Date(a.publishDate).toLocaleDateString()}` : "Draft",
        a.expiresAt ? ` · Expires ${new Date(a.expiresAt).toLocaleDateString()}` : ""
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 825,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 818,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 817,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 mt-4 pt-4 border-t border-slate-100", children: [
      /* @__PURE__ */ jsxDEV(IconBtn, { label: a.pinned ? "Unpin" : "Pin", icon: I.pin, onClick: () => onPatch(a.id, { pinned: !a.pinned }), active: a.pinned }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 832,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(IconBtn, { label: "Edit", icon: I.edit, onClick: () => onEdit(a) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 833,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(IconBtn, { label: a.archived ? "Unarchive" : "Archive", icon: I.archive, onClick: () => onPatch(a.id, { archived: !a.archived }) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 834,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(IconBtn, { label: "Delete", icon: I.trash, onClick: () => onDelete(a.id), danger: true }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 835,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 831,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
    lineNumber: 816,
    columnNumber: 5
  }, this);
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 admin-fade-in", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-500", children: "Announcements appear on the landing page and student & mentor dashboards." }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 843,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("button", { onClick: onNew, className: "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20", children: [
        /* @__PURE__ */ jsxDEV(Icon, { path: I.plus, className: "w-4 h-4" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 845,
          columnNumber: 11
        }, this),
        " New Announcement"
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 844,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 842,
      columnNumber: 7
    }, this),
    loading ? /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 851,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 850,
      columnNumber: 9
    }, this) : items.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-2xl border border-slate-200 p-14 text-center", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxDEV(Icon, { path: I.announcements, className: "w-6 h-6" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 856,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 855,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-slate-800", children: "No announcements yet" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 858,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-500 mt-1", children: "Create your first announcement to broadcast it across the platform." }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 859,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 854,
      columnNumber: 9
    }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "grid gap-4 md:grid-cols-2", children: active.map((a) => /* @__PURE__ */ jsxDEV(Card, { a }, a.id, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 864,
        columnNumber: 32
      }, this)) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 863,
        columnNumber: 11
      }, this),
      archived.length > 0 && /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3", children: "Archived" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 868,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid gap-4 md:grid-cols-2 opacity-75", children: archived.map((a) => /* @__PURE__ */ jsxDEV(Card, { a }, a.id, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 870,
          columnNumber: 38
        }, this)) }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 869,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 867,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 862,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
    lineNumber: 841,
    columnNumber: 5
  }, this);
}
function IconBtn({ label, icon, onClick, danger, active }) {
  return /* @__PURE__ */ jsxDEV(
    "button",
    {
      onClick,
      title: label,
      className: `inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors
        ${danger ? "text-red-600 hover:bg-red-50" : active ? "text-blue-600 bg-blue-50" : "text-slate-500 hover:bg-slate-100"}`,
      children: [
        /* @__PURE__ */ jsxDEV(Icon, { path: icon, className: "w-4 h-4" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 888,
          columnNumber: 7
        }, this),
        " ",
        label
      ]
    },
    void 0,
    true,
    {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 882,
      columnNumber: 5
    },
    this
  );
}
function MentorsList({ mentors, loading, search, onRefresh, onDelete, actionLoading }) {
  const q = search.trim().toLowerCase();
  const filtered = q ? mentors.filter(
    (mentor) => [mentor.fullName, mentor.email, mentor.subjects, mentor.bio, mentor.contactEmail || ""].some((value) => value.toLowerCase().includes(q))
  ) : mentors;
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-5 admin-fade-in", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-500", children: "Approved mentor profiles and contact details." }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 913,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-400", children: "Use the search box to locate mentors by name, email, or subject." }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 914,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 912,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("button", { onClick: onRefresh, className: "inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors", children: "↻ Refresh" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 916,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 911,
      columnNumber: 7
    }, this),
    loading ? /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 923,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 922,
      columnNumber: 9
    }, this) : filtered.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-2xl border border-slate-200 p-14 text-center", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "font-semibold text-slate-900", children: "No mentors found" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 927,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-500 mt-2", children: "Approve mentor applications to populate this list." }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 928,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 926,
      columnNumber: 9
    }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: filtered.map((mentor) => /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "p-5 sm:p-6 grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs uppercase tracking-[0.18em] text-slate-400 mb-2", children: "Name" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 936,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-slate-900", children: mentor.fullName }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 937,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-500 mt-1", children: mentor.email }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 938,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 935,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs uppercase tracking-[0.18em] text-slate-400 mb-2", children: "Subjects" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 941,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2", children: parseList(mentor.subjects).map((subject) => /* @__PURE__ */ jsxDEV("span", { className: "inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700", children: subject }, subject, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 944,
          columnNumber: 23
        }, this)) }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 942,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 940,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs uppercase tracking-[0.18em] text-slate-400 mb-2", children: "Contact" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 951,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-600", children: mentor.contactEmail || mentor.email }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 952,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-2", children: mentor.isPublic ? "Public profile" : "Private profile" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 953,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-3", children: /* @__PURE__ */ jsxDEV(
          IconBtn,
          {
            label: "Remove",
            icon: I.trash,
            onClick: () => onDelete?.(mentor.id),
            danger: true,
            active: actionLoading === mentor.id
          },
          void 0,
          false,
          {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 955,
            columnNumber: 21
          },
          this
        ) }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 954,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 950,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 934,
      columnNumber: 15
    }, this) }, mentor.id, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 933,
      columnNumber: 13
    }, this)) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 931,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
    lineNumber: 910,
    columnNumber: 5
  }, this);
}
function StudentsList({ students: students2, loading, search, onRefresh, onDelete, actionLoading }) {
  const q = search.trim().toLowerCase();
  const filtered = q ? students2.filter(
    (student) => [student.fullName, student.email, student.gradeLevel].some((value) => value.toLowerCase().includes(q))
  ) : students2;
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-5 admin-fade-in", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-500", children: "Registered students in the system." }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 993,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-400", children: "Search by name, email, or grade level." }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 994,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 992,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("button", { onClick: onRefresh, className: "inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors", children: "↻ Refresh" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 996,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 991,
      columnNumber: 7
    }, this),
    loading ? /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 1003,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 1002,
      columnNumber: 9
    }, this) : filtered.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-2xl border border-slate-200 p-14 text-center", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "font-semibold text-slate-900", children: "No students found" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 1007,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-500 mt-2", children: "Student registrations will appear here after they sign up." }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 1008,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 1006,
      columnNumber: 9
    }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: filtered.map((student) => /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "p-5 sm:p-6 grid gap-4 sm:grid-cols-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs uppercase tracking-[0.18em] text-slate-400 mb-2", children: "Name" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1016,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-slate-900", children: student.fullName }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1017,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-500 mt-1", children: student.email }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1018,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 1015,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs uppercase tracking-[0.18em] text-slate-400 mb-2", children: "Grade" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1021,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-slate-900", children: student.gradeLevel }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1022,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 1020,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs uppercase tracking-[0.18em] text-slate-400 mb-2", children: "Age" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1025,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-slate-900", children: student.age }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1026,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 1024,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs uppercase tracking-[0.18em] text-slate-400 mb-2", children: "Joined" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1029,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-600", children: new Date(student.createdAt).toLocaleDateString() }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1030,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-3", children: /* @__PURE__ */ jsxDEV(
          IconBtn,
          {
            label: "Delete",
            icon: I.trash,
            onClick: () => onDelete?.(student.id),
            danger: true,
            active: actionLoading === student.id
          },
          void 0,
          false,
          {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 1032,
            columnNumber: 21
          },
          this
        ) }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1031,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 1028,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 1014,
      columnNumber: 15
    }, this) }, student.id, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 1013,
      columnNumber: 13
    }, this)) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 1011,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
    lineNumber: 990,
    columnNumber: 5
  }, this);
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
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm admin-fade-in", onClick: onClose, children: /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-100", children: [
      /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-slate-900", children: initial ? "Edit Announcement" : "New Announcement" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 1074,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100", children: /* @__PURE__ */ jsxDEV(Icon, { path: I.x, className: "w-4 h-4" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 1075,
        columnNumber: 135
      }, this) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 1075,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 1073,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: "Title" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1079,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            value: title,
            onChange: (e) => setTitle(e.target.value),
            placeholder: "Announcement title",
            className: "w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
          },
          void 0,
          false,
          {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 1080,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 1078,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: "Message" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1084,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "textarea",
          {
            value: body,
            onChange: (e) => setBody(e.target.value),
            rows: 4,
            placeholder: "Write the announcement…",
            className: "w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
          },
          void 0,
          false,
          {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 1085,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 1083,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: "Publish date" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 1090,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "date",
              value: publishDate,
              onChange: (e) => setPublishDate(e.target.value),
              className: "w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 1091,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1089,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-sm font-medium text-slate-700 mb-1.5", children: [
            "Expiration ",
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 font-normal", children: "(optional)" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 1095,
              columnNumber: 93
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
            lineNumber: 1095,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "date",
              value: expiresAt,
              onChange: (e) => setExpiresAt(e.target.value),
              className: "w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
              lineNumber: 1096,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1094,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 1088,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("label", { className: "flex items-center gap-3 cursor-pointer", children: [
        /* @__PURE__ */ jsxDEV("input", { type: "checkbox", checked: pinned, onChange: (e) => setPinned(e.target.checked), className: "w-4 h-4 rounded accent-blue-600" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1101,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-sm text-slate-700", children: "Pin to top across the platform" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1102,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 1100,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 1077,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex gap-3 px-6 py-4 border-t border-slate-100", children: [
      /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors", children: "Cancel" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 1106,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: submit,
          disabled: saving || !title.trim() || !body.trim(),
          className: "flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors",
          children: saving ? "Saving…" : initial ? "Save Changes" : "Publish"
        },
        void 0,
        false,
        {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1107,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 1105,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
    lineNumber: 1072,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
    lineNumber: 1071,
    columnNumber: 5
  }, this);
}
function Placeholder({ title, icon, desc: desc2 }) {
  return /* @__PURE__ */ jsxDEV("div", { className: "admin-fade-in bg-white rounded-2xl border border-slate-200 p-14 text-center", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxDEV(Icon, { path: icon, className: "w-7 h-7" }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 1121,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 1120,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-slate-900", children: title }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 1123,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed", children: desc2 }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 1124,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("span", { className: "inline-block mt-5 text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full", children: "Coming soon" }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 1125,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
    lineNumber: 1119,
    columnNumber: 5
  }, this);
}
function SettingsPanel({ email }) {
  return /* @__PURE__ */ jsxDEV("div", { className: "admin-fade-in space-y-5 max-w-2xl", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-2xl border border-slate-200 p-6", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "font-bold text-slate-900 mb-4", children: "Administrator Account" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 1134,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxDEV(Field, { label: "Email", value: email }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1136,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(Field, { label: "Role", value: "Administrator" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1137,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 1135,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 1133,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-2xl border border-slate-200 p-6", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "font-bold text-slate-900 mb-2", children: "Admin & Mentor Roles" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 1141,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-500 leading-relaxed", children: [
        "New administrators are added via ",
        /* @__PURE__ */ jsxDEV("strong", { className: "text-slate-700", children: "Netlify Dashboard → Identity → [User] → Roles" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1143,
          columnNumber: 44
        }, this),
        " by adding the ",
        /* @__PURE__ */ jsxDEV("code", { className: "text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded", children: "admin" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1144,
          columnNumber: 22
        }, this),
        " role. Approving a mentor application automatically grants the applicant the ",
        /* @__PURE__ */ jsxDEV("code", { className: "text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded", children: "mentor" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
          lineNumber: 1145,
          columnNumber: 50
        }, this),
        " role and Mentor Dashboard access."
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
        lineNumber: 1142,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
      lineNumber: 1140,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/dashboard/admin.tsx",
    lineNumber: 1132,
    columnNumber: 5
  }, this);
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
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen flex items-center justify-center px-4 pt-20 stars-bg", children: /* @__PURE__ */ jsxDEV("div", { className: "text-center max-w-md", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center text-4xl mx-auto mb-6 shadow-2xl shadow-teal-500/30 animate-pulse-glow", children: "✓" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
        lineNumber: 75,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("h1", { className: "text-3xl font-black text-white mb-4", children: "Application Submitted!" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
        lineNumber: 78,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300 mb-8 leading-relaxed", children: "Thank you for applying to become a GradeBridge mentor. Our team will review your application and get back to you within 3–5 business days." }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
        lineNumber: 79,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(Link, { to: "/", className: "inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:opacity-90 transition-opacity", children: "Return to Home" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
        lineNumber: 82,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
      lineNumber: 74,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
      lineNumber: 73,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen px-4 py-24 stars-bg grid-pattern", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxDEV(Link, { to: "/", className: "inline-flex items-center gap-2 mb-6 group", children: /* @__PURE__ */ jsxDEV(GradeBridgeLogo, {}, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
        lineNumber: 96,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
        lineNumber: 95,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-blue-300 text-sm font-medium mb-6", children: "🎓 Mentor Application" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
        lineNumber: 98,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("h1", { className: "text-4xl font-black text-white mb-3", children: [
        "Become a ",
        /* @__PURE__ */ jsxDEV("span", { className: "gradient-text", children: "GradeBridge Mentor" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
          lineNumber: 102,
          columnNumber: 22
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
        lineNumber: 101,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400", children: "Share your IGCSE expertise and help the next generation succeed. Applications are reviewed within 3–5 business days." }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
        lineNumber: 104,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
      lineNumber: 94,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 mb-8", children: [1, 2, 3].map((s) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 flex-1", children: [
      /* @__PURE__ */ jsxDEV("div", { className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-white/10 text-slate-400"}`, children: step > s ? "✓" : s }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
        lineNumber: 113,
        columnNumber: 15
      }, this),
      s < 3 && /* @__PURE__ */ jsxDEV("div", { className: `flex-1 h-0.5 ${step > s ? "bg-blue-600" : "bg-white/10"}` }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
        lineNumber: 118,
        columnNumber: 25
      }, this)
    ] }, s, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
      lineNumber: 112,
      columnNumber: 13
    }, this)) }, void 0, false, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
      lineNumber: 110,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-xs text-slate-400 mb-10 -mt-4", children: [
      /* @__PURE__ */ jsxDEV("span", { children: "Personal Info" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
        lineNumber: 123,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("span", { children: "Subjects" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
        lineNumber: 124,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("span", { children: "Statement" }, void 0, false, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
        lineNumber: 125,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
      lineNumber: 122,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, className: "glass rounded-3xl p-8 shadow-2xl shadow-blue-900/20", children: [
      step === 1 && /* @__PURE__ */ jsxDEV("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-white mb-6", children: "Personal Information" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
          lineNumber: 132,
          columnNumber: 15
        }, this),
        [
          { field: "fullName", label: "Full Name", type: "text", placeholder: "Your full name" },
          { field: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
          { field: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 000-0000" },
          { field: "school", label: "Current School / University", type: "text", placeholder: "Where are you studying?" }
        ].map(({ field, label, type, placeholder }) => /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: label }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
            lineNumber: 140,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type,
              value: form[field],
              onChange: (e) => set(field, e.target.value),
              required: true,
              placeholder,
              className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
              lineNumber: 141,
              columnNumber: 19
            },
            this
          )
        ] }, field, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
          lineNumber: 139,
          columnNumber: 17
        }, this)),
        /* @__PURE__ */ jsxDEV(
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
          },
          void 0,
          false,
          {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
            lineNumber: 151,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
        lineNumber: 131,
        columnNumber: 13
      }, this),
      step === 2 && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-white mb-2", children: "Subjects & Availability" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
          lineNumber: 171,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-3", children: [
            "Subjects You Can Teach ",
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "(select all that apply)" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
              lineNumber: 175,
              columnNumber: 42
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
            lineNumber: 174,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2", children: AVAILABLE_SUBJECTS.map((s) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => toggleSubject(s),
              className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${form.subjects.includes(s) ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-white/5 text-slate-300 border border-white/10 hover:border-blue-500/30 hover:text-white"}`,
              children: s
            },
            s,
            false,
            {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
              lineNumber: 179,
              columnNumber: 21
            },
            this
          )) }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
            lineNumber: 177,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
          lineNumber: 173,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-3", children: [
            "Availability ",
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "(select all that apply)" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
              lineNumber: 197,
              columnNumber: 32
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
            lineNumber: 196,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2", children: AVAILABILITY_OPTIONS.map((a) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => toggleAvailability(a),
              className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${form.availability.includes(a) ? "bg-teal-600 text-white shadow-md shadow-teal-500/20" : "bg-white/5 text-slate-300 border border-white/10 hover:border-teal-500/30 hover:text-white"}`,
              children: a
            },
            a,
            false,
            {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
              lineNumber: 201,
              columnNumber: 21
            },
            this
          )) }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
            lineNumber: 199,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
          lineNumber: 195,
          columnNumber: 15
        }, this),
        error && /* @__PURE__ */ jsxDEV("p", { className: "text-red-400 text-sm", children: error }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
          lineNumber: 217,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxDEV("button", { type: "button", onClick: () => setStep(1), className: "flex-1 py-3 rounded-xl glass border border-white/10 text-slate-300 hover:text-white font-semibold transition-all", children: "← Back" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
            lineNumber: 220,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
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
            },
            void 0,
            false,
            {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
              lineNumber: 223,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
          lineNumber: 219,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
        lineNumber: 170,
        columnNumber: 13
      }, this),
      step === 3 && /* @__PURE__ */ jsxDEV("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-white mb-2", children: "Personal Statement" }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
          lineNumber: 242,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-sm", children: "Tell us about yourself, your IGCSE experience, why you want to mentor, and what makes you a great candidate." }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
          lineNumber: 243,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 text-sm font-medium mb-1.5", children: [
            "Personal Statement ",
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "(min 100 words)" }, void 0, false, {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
              lineNumber: 248,
              columnNumber: 38
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
            lineNumber: 247,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "textarea",
            {
              value: form.statement,
              onChange: (e) => set("statement", e.target.value),
              required: true,
              minLength: 100,
              rows: 8,
              placeholder: "Share your IGCSE journey, the grades you achieved, your teaching style, and why you're passionate about helping fellow students...",
              className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
              lineNumber: 250,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-500 text-xs mt-1", children: [
            form.statement.split(/\s+/).filter(Boolean).length,
            " words"
          ] }, void 0, true, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
            lineNumber: 259,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
          lineNumber: 246,
          columnNumber: 15
        }, this),
        error && /* @__PURE__ */ jsxDEV("div", { className: "px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm", children: error }, void 0, false, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
          lineNumber: 263,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxDEV("button", { type: "button", onClick: () => setStep(2), className: "flex-1 py-3 rounded-xl glass border border-white/10 text-slate-300 hover:text-white font-semibold transition-all", children: "← Back" }, void 0, false, {
            fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
            lineNumber: 267,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "submit",
              disabled: loading,
              className: "flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20 btn-shimmer",
              children: loading ? /* @__PURE__ */ jsxDEV("span", { className: "flex items-center justify-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }, void 0, false, {
                  fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
                  lineNumber: 277,
                  columnNumber: 23
                }, this),
                "Submitting…"
              ] }, void 0, true, {
                fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
                lineNumber: 276,
                columnNumber: 21
              }, this) : "Submit Application 🚀"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
              lineNumber: 270,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
          lineNumber: 266,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
        lineNumber: 241,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
      lineNumber: 128,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
    lineNumber: 92,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/natis/OneDrive/Documents/source-6a5805d971c80a340eb569ee-c3f4a2000fa7abd5/src/routes/apply/mentor.tsx",
    lineNumber: 91,
    columnNumber: 5
  }, this);
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
      },
      DELETE: async ({ request }) => {
        try {
          if (!await getAdminUser()) {
            return Response.json({ error: "Access denied" }, { status: 403 });
          }
          let id;
          try {
            const body = await request.json().catch(() => ({}));
            id = body?.id;
          } catch {
          }
          console.log("Admin students DELETE called, parsed id=", id, "url=", request.url);
          if (!id) {
            const url = new URL(request.url);
            const q = url.searchParams.get("id");
            if (q) id = parseInt(q, 10);
          }
          if (!id || Number.isNaN(id)) {
            return Response.json({ error: "Invalid student id" }, { status: 400 });
          }
          const [student] = await db.select().from(students).where(students.id.eq(id));
          if (!student) return Response.json({ error: "Student not found" }, { status: 404 });
          const newIdentity = `removed-${student.id}-${Date.now()}`;
          await db.update(students).set({
            identityUserId: newIdentity,
            fullName: `[removed] ${student.fullName}`,
            email: ""
          }).where(students.id.eq(id));
          try {
            await db.delete(userAccounts).where(userAccounts.identityUserId.eq(student.identityUserId));
          } catch {
          }
          return Response.json({ success: true, action: "soft_delete" });
        } catch (err) {
          console.error("Admin students DELETE error", err);
          return Response.json({ error: "Failed to remove student", details: err?.message || String(err), stack: err?.stack }, { status: 500 });
        }
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
      },
      DELETE: async ({ request }) => {
        try {
          if (!await getAdminUser()) {
            return Response.json({ error: "Access denied" }, { status: 403 });
          }
          let id;
          try {
            const body = await request.json().catch(() => ({}));
            id = body?.id;
          } catch {
          }
          console.log("Admin mentors DELETE called, parsed id=", id, "url=", request.url);
          if (!id) {
            const url = new URL(request.url);
            const q = url.searchParams.get("id");
            if (q) id = parseInt(q, 10);
          }
          if (!id || Number.isNaN(id)) {
            return Response.json({ error: "Invalid mentor id" }, { status: 400 });
          }
          const [mentor] = await db.select().from(mentorProfiles).where(mentorProfiles.id.eq(id));
          if (!mentor) return Response.json({ error: "Mentor not found" }, { status: 404 });
          const newIdentity = `removed-${mentor.id}-${Date.now()}`;
          await db.update(mentorProfiles).set({
            isPublic: false,
            fullName: `[removed] ${mentor.fullName}`,
            email: "",
            contactEmail: null,
            profilePicUrl: null,
            identityUserId: newIdentity,
            updatedAt: /* @__PURE__ */ new Date()
          }).where(mentorProfiles.id.eq(id));
          return Response.json({ success: true, action: "soft_delete" });
        } catch (err) {
          console.error("Admin mentors DELETE error", err);
          return Response.json({ error: "Failed to remove mentor", details: err?.message || String(err), stack: err?.stack }, { status: 500 });
        }
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
const ResetPasswordRoute = Route$k.update({
  id: "/reset-password",
  path: "/reset-password",
  getParentRoute: () => Route$l
});
const MentorsRoute = Route$j.update({
  id: "/mentors",
  path: "/mentors",
  getParentRoute: () => Route$l
});
const LoginRoute = Route$i.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$l
});
const AssistantRoute = Route$h.update({
  id: "/assistant",
  path: "/assistant",
  getParentRoute: () => Route$l
});
const IndexRoute = Route$g.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$l
});
const RegisterStudentRoute = Route$f.update({
  id: "/register/student",
  path: "/register/student",
  getParentRoute: () => Route$l
});
const DashboardStudentRoute = Route$e.update({
  id: "/dashboard/student",
  path: "/dashboard/student",
  getParentRoute: () => Route$l
});
const DashboardMentorRoute = Route$d.update({
  id: "/dashboard/mentor",
  path: "/dashboard/mentor",
  getParentRoute: () => Route$l
});
const DashboardAdminRoute = Route$c.update({
  id: "/dashboard/admin",
  path: "/dashboard/admin",
  getParentRoute: () => Route$l
});
const ApplyMentorRoute = Route$b.update({
  id: "/apply/mentor",
  path: "/apply/mentor",
  getParentRoute: () => Route$l
});
const ApiAnnouncementsRoute = Route$a.update({
  id: "/api/announcements",
  path: "/api/announcements",
  getParentRoute: () => Route$l
});
const ApiRegisterStudentRoute = Route$9.update({
  id: "/api/register/student",
  path: "/api/register/student",
  getParentRoute: () => Route$l
});
const ApiMentorsSessionsRoute = Route$8.update({
  id: "/api/mentors/sessions",
  path: "/api/mentors/sessions",
  getParentRoute: () => Route$l
});
const ApiMentorsDirectoryRoute = Route$7.update({
  id: "/api/mentors/directory",
  path: "/api/mentors/directory",
  getParentRoute: () => Route$l
});
const ApiApplicationsMentorRoute = Route$6.update({
  id: "/api/applications/mentor",
  path: "/api/applications/mentor",
  getParentRoute: () => Route$l
});
const ApiAnnouncementsIdRoute = Route$5.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => ApiAnnouncementsRoute
});
const ApiAdminStudentsRoute = Route$4.update({
  id: "/api/admin/students",
  path: "/api/admin/students",
  getParentRoute: () => Route$l
});
const ApiAdminStatsRoute = Route$3.update({
  id: "/api/admin/stats",
  path: "/api/admin/stats",
  getParentRoute: () => Route$l
});
const ApiAdminMentorsRoute = Route$2.update({
  id: "/api/admin/mentors",
  path: "/api/admin/mentors",
  getParentRoute: () => Route$l
});
const ApiMentorsSessionsIdRoute = Route$1.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => ApiMentorsSessionsRoute
});
const ApiMentorsProfileUserIdRoute = Route.update({
  id: "/api/mentors/profile/$userId",
  path: "/api/mentors/profile/$userId",
  getParentRoute: () => Route$l
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
  AssistantRoute,
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
const routeTree = Route$l._addFileChildren(rootRouteChildren)._addFileTypes();
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
