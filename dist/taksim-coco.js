function I(a) {
  return R(a);
}
function R(a) {
  const e = a.match(
    /^hsla?\(\s*([\d\.]+)(deg|rad|grad|turn)?\s*[,\s]\s*([\d\.]+)%\s*[,\s]\s*([\d\.]+)%\s*(?:[,\/]\s*([\d\.]+)(%)?)?\s*\)$/i
  );
  if (!e) return;
  let s = parseFloat(e[1]);
  const r = e[2], n = parseFloat(e[3]), f = parseFloat(e[4]);
  let t = 1;
  return e[5] && (t = parseFloat(e[5]), e[6] === "%" && (t /= 100)), r === "rad" ? s = s * 180 / Math.PI : r === "grad" ? s = s * 0.9 : r === "turn" && (s = s * 360), s = s % 360, s < 0 && (s += 360), {
    space: "hsl",
    coords: [s, n, f],
    alpha: Math.min(1, Math.max(0, t))
  };
}
function H(a) {
  const [e, s, r] = a.coords, n = a.alpha, f = Math.round(e), t = Math.round(s), o = Math.round(r);
  return n < 1 ? `hsla(${f}, ${t}%, ${o}%, ${n})` : `hsl(${f}, ${t}%, ${o}%)`;
}
function W(a) {
  const [e, s, r] = a.coords, n = a.alpha, f = (1 - Math.abs(2 * (r / 100) - 1)) * (s / 100), t = f * (1 - Math.abs(e / 60 % 2 - 1)), o = r / 100 - f / 2;
  let c = 0, i = 0, d = 0;
  return 0 <= e && e < 60 ? (c = f, i = t, d = 0) : 60 <= e && e < 120 ? (c = t, i = f, d = 0) : 120 <= e && e < 180 ? (c = 0, i = f, d = t) : 180 <= e && e < 240 ? (c = 0, i = t, d = f) : 240 <= e && e < 300 ? (c = t, i = 0, d = f) : 300 <= e && e < 360 && (c = f, i = 0, d = t), {
    space: "rgb",
    coords: [(c + o) * 255, (i + o) * 255, (d + o) * 255],
    alpha: n
  };
}
function L(a) {
  let [e, s, r] = a.coords;
  e /= 255, s /= 255, r /= 255;
  const n = Math.max(e, s, r), f = Math.min(e, s, r);
  let t = 0, o = 0;
  const c = (n + f) / 2;
  if (n !== f) {
    const i = n - f;
    switch (o = c > 0.5 ? i / (2 - n - f) : i / (n + f), n) {
      case e:
        t = (s - r) / i + (s < r ? 6 : 0);
        break;
      case s:
        t = (r - e) / i + 2;
        break;
      case r:
        t = (e - s) / i + 4;
        break;
    }
    t *= 60;
  }
  return {
    space: "hsl",
    coords: [t, o * 100, c * 100],
    alpha: a.alpha
  };
}
function F(a) {
  const e = a.match(
    /^hsva?\(\s*([\d\.]+)(deg|rad|grad|turn)?\s*[,\s]\s*([\d\.]+)%?\s*[,\s]\s*([\d\.]+)%?\s*(?:[,\/]\s*([\d\.]+)(%)?)?\s*\)$/i
  );
  if (!e) return;
  let s = parseFloat(e[1]);
  const r = e[2], n = parseFloat(e[3]), f = parseFloat(e[4]);
  let t = 1;
  return e[5] && (t = parseFloat(e[5]), e[6] === "%" && (t /= 100)), r === "rad" ? s = s * 180 / Math.PI : r === "grad" ? s = s * 0.9 : r === "turn" && (s = s * 360), s = s % 360, s < 0 && (s += 360), {
    space: "hsv",
    coords: [s, n, f],
    alpha: Math.min(1, Math.max(0, t))
  };
}
function _(a) {
  const [e, s, r] = a.coords, n = a.alpha;
  return n < 1 ? `hsva(${Math.round(e)}, ${Math.round(s)}%, ${Math.round(r)}%, ${n})` : `hsv(${Math.round(e)}, ${Math.round(s)}%, ${Math.round(r)}%)`;
}
function q(a) {
  const [e, s, r] = a.coords, n = a.alpha, f = s / 100, t = r / 100, o = t * f, c = o * (1 - Math.abs(e / 60 % 2 - 1)), i = t - o;
  let d = 0, l = 0, h = 0;
  return 0 <= e && e < 60 ? (d = o, l = c, h = 0) : 60 <= e && e < 120 ? (d = c, l = o, h = 0) : 120 <= e && e < 180 ? (d = 0, l = o, h = c) : 180 <= e && e < 240 ? (d = 0, l = c, h = o) : 240 <= e && e < 300 ? (d = c, l = 0, h = o) : 300 <= e && e < 360 && (d = o, l = 0, h = c), {
    space: "rgb",
    coords: [(d + i) * 255, (l + i) * 255, (h + i) * 255],
    alpha: n
  };
}
function C(a) {
  let [e, s, r] = a.coords;
  e /= 255, s /= 255, r /= 255;
  const n = Math.max(e, s, r), f = Math.min(e, s, r);
  let t = 0;
  const o = n - f, c = n === 0 ? 0 : o / n, i = n;
  if (n !== f) {
    switch (n) {
      case e:
        t = (s - r) / o + (s < r ? 6 : 0);
        break;
      case s:
        t = (r - e) / o + 2;
        break;
      case r:
        t = (e - s) / o + 4;
        break;
    }
    t *= 60;
  }
  return {
    space: "hsv",
    coords: [t, c * 100, i * 100],
    alpha: a.alpha
  };
}
function b(a, e) {
  return [
    a[0][0] * e[0] + a[0][1] * e[1] + a[0][2] * e[2],
    a[1][0] * e[0] + a[1][1] * e[1] + a[1][2] * e[2],
    a[2][0] * e[0] + a[2][1] * e[1] + a[2][2] * e[2]
  ];
}
function B(a) {
  return a.map((e) => {
    const s = e / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
}
function O(a) {
  return a.map((e) => {
    const s = e > 31308e-7 ? 1.055 * Math.pow(e, 0.4166666666666667) - 0.055 : 12.92 * e;
    return Math.round(Math.max(0, Math.min(1, s)) * 255);
  });
}
const z = [
  [0.8189330101, 0.3618667424, -0.1288597137],
  [0.0329845436, 0.9293118715, 0.0361456387],
  [0.0482003018, 0.2643662691, 0.633851707]
], T = [
  [1.2270138511, -0.5577532521, 0.2812038044],
  [-0.0405801784, 1.1122568696, -0.0716766787],
  [-0.0763812845, -0.4214819784, 1.5861632204]
], A = [
  [0.2104542553, 0.793617785, -0.0040720468],
  [1.9779984951, -2.428592205, 0.4505937099],
  [0.0259040371, 0.7827717662, -0.808675766]
], P = [
  [0.9999999985, 0.3963377774, 0.2158037573],
  [1.0000000089, -0.1055613458, -0.0638541728],
  [1.0000000547, -0.0894841775, -1.291485548]
];
function G(a) {
  return a.match(
    /^oklch\(\s*([\d\.]+)%?\s+([\d\.]+)(%?)\s+([\d\.]+)(deg|rad|grad|turn)?\s*(?:\/\s*([\d\.]+)%?)?\s*\)$/i
  ), k(a);
}
function k(a) {
  const e = a.match(
    /^oklch\(\s*([^\s\/,]+)[\s,]+([^\s\/,]+)[\s,]+([^\s\/,]+)(?:[\s\/,]+([^\s\)]+))?\s*\)$/i
  );
  if (!e) return;
  let s = parseFloat(e[1]);
  e[1].endsWith("%") && (s /= 100);
  let r = parseFloat(e[2]);
  e[2].endsWith("%") && (r = r / 100 * 0.4);
  let n = parseFloat(e[3]);
  e[3].endsWith("rad") ? n = n * 180 / Math.PI : e[3].endsWith("grad") ? n = n * 0.9 : e[3].endsWith("turn") && (n = n * 360);
  const f = e[4];
  let t = 1;
  return f && (t = parseFloat(f), f.endsWith("%") && (t /= 100)), {
    space: "oklch",
    coords: [s, r, n],
    alpha: Math.min(1, Math.max(0, t))
  };
}
function K(a) {
  const [e, s, r] = a.coords, n = Math.round(e * 1e3) / 1e3, f = Math.round(s * 1e3) / 1e3, t = Math.round(r * 100) / 100, o = a.alpha;
  return o < 1 ? `oklch(${n} ${f} ${t} / ${o})` : `oklch(${n} ${f} ${t})`;
}
function U(a) {
  const [e, s, r] = a.coords, n = a.alpha, f = r * Math.PI / 180, t = e, o = s * Math.cos(f), c = s * Math.sin(f), d = b(P, [t, o, c]).map((p) => p * p * p), l = b(T, d);
  return {
    space: "rgb",
    coords: O(l),
    alpha: n
  };
}
function V(a) {
  const [e, s, r] = a.coords, n = B([e, s, r]), t = b(z, n).map((h) => Math.cbrt(h)), [o, c, i] = b(A, t), d = Math.sqrt(c * c + i * i);
  let l = Math.atan2(i, c) * (180 / Math.PI);
  return l < 0 && (l += 360), {
    space: "oklch",
    coords: [o, d, l],
    alpha: a.alpha
  };
}
function M(a, e) {
  if (a.space === e) return a;
  e === "hex" && (e = "rgb");
  let s;
  if (a.space === "rgb")
    s = a;
  else if (a.space === "hsl")
    s = W(a);
  else if (a.space === "hsv")
    s = q(a);
  else if (a.space === "oklch")
    s = U(a);
  else
    throw new Error(`Unsupported source space: ${a.space}`);
  if (e === "rgb") return s;
  if (e === "hsl")
    return L(s);
  if (e === "hsv")
    return C(s);
  if (e === "oklch")
    return V(s);
  throw new Error(`Unsupported target space: ${e}`);
}
function $(a) {
  if (a.startsWith("#")) {
    const e = a.slice(1);
    if (e.match(/^[0-9a-f]{3}$/i))
      return {
        space: "rgb",
        coords: [
          parseInt(e[0] + e[0], 16),
          parseInt(e[1] + e[1], 16),
          parseInt(e[2] + e[2], 16)
        ],
        alpha: 1
      };
    if (e.match(/^[0-9a-f]{4}$/i))
      return {
        space: "rgb",
        coords: [
          parseInt(e[0] + e[0], 16),
          parseInt(e[1] + e[1], 16),
          parseInt(e[2] + e[2], 16)
        ],
        alpha: parseInt(e[3] + e[3], 16) / 255
      };
    if (e.match(/^[0-9a-f]{6}$/i))
      return {
        space: "rgb",
        coords: [
          parseInt(e.slice(0, 2), 16),
          parseInt(e.slice(2, 4), 16),
          parseInt(e.slice(4, 6), 16)
        ],
        alpha: 1
      };
    if (e.match(/^[0-9a-f]{8}$/i))
      return {
        space: "rgb",
        coords: [
          parseInt(e.slice(0, 2), 16),
          parseInt(e.slice(2, 4), 16),
          parseInt(e.slice(4, 6), 16)
        ],
        alpha: parseInt(e.slice(6, 8), 16) / 255
      };
  }
}
function w(a) {
  return j(a);
}
function j(a) {
  const { coords: e, alpha: s } = a, [r, n, f] = e.map(
    (o) => Math.round(Math.max(0, Math.min(255, o)))
  ), t = (o) => o.toString(16).padStart(2, "0");
  if (s < 1) {
    const o = Math.round(Math.max(0, Math.min(1, s)) * 255);
    return `#${t(r)}${t(n)}${t(f)}${t(o)}`;
  }
  return `#${t(r)}${t(n)}${t(f)}`;
}
function E(a) {
  const e = a.match(
    /^rgba?\(\s*([\d\.]+)(%?)\s*,\s*([\d\.]+)(%?)\s*,\s*([\d\.]+)(%?)\s*(?:,\s*([\d\.]+)(\%?))?\s*\)$/i
  );
  if (!e) {
    const s = a.match(
      /^rgba?\(\s*([\d\.]+)(%?)\s+([\d\.]+)(%?)\s+([\d\.]+)(%?)\s*(?:\/\s*([\d\.]+)(\%?))?\s*\)$/i
    );
    return s ? y(s) : void 0;
  }
  return y(e);
}
function y(a) {
  const e = u(a[1], a[2], 255), s = u(a[3], a[4], 255), r = u(a[5], a[6], 255), n = a[7] ? u(a[7], a[8], 1) : 1;
  return {
    space: "rgb",
    coords: [e, s, r],
    alpha: n
  };
}
function u(a, e, s) {
  let r = parseFloat(a);
  return e === "%" && (r = r / 100 * s), Math.min(Math.max(r, 0), s);
}
function N(a) {
  const { coords: e, alpha: s } = a, [r, n, f] = e.map((t) => Math.round(t));
  return s < 1 ? `rgba(${r}, ${n}, ${f}, ${s})` : `rgb(${r}, ${n}, ${f})`;
}
const g = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "0ff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "00f",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  burntsienna: "ea7e5d",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "0ff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "f0f",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "663399",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};
Object.entries(
  g
).reduce(
  (a, [e, s]) => (a[s] = e, a),
  {}
);
function m(a) {
  if (a = a.trim(), g[a.toLowerCase()])
    return $("#" + g[a.toLowerCase()]);
  if (a.startsWith("#")) return $(a);
  const e = a.toLowerCase();
  if (e.startsWith("rgb")) return E(a);
  if (e.startsWith("hsl")) return I(a);
  if (e.startsWith("hsv")) return F(a);
  if (e.startsWith("oklch")) return G(a);
}
function v(a, e) {
  return e === "hex" ? w(a) : e === "rgb" ? N(a) : e === "hsl" ? H(a) : e === "hsv" ? _(a) : e === "oklch" ? K(a) : w(a);
}
function x(a, e) {
  const s = m(a);
  if (!s) return;
  if (e) {
    const n = M(s, e);
    return v(n, e);
  }
  const r = M(s, "hex");
  return v(r, "hex");
}
x.isColor = (a) => !!m(a);
x.format = (a) => {
  if (g[a.toLowerCase()]) return "name";
  const e = m(a);
  return e ? a.startsWith("#") ? "hex" : e.space : void 0;
};
export {
  x as coco,
  M as convert,
  x as default,
  m as parse,
  v as serialize
};
