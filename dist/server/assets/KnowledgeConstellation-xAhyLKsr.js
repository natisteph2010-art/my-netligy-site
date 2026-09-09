import { jsxDEV } from "react/jsx-dev-runtime";
import { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Line, Float, Html } from "@react-three/drei";
import * as THREE from "three";
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
function StarField({ count = 120 }) {
  const points = useRef(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);
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
export {
  KnowledgeConstellation
};
