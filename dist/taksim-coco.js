function N(s) {
  return S(s);
}
function S(s) {
  const t = s.match(
    /^hsla?\(\s*([-+]?[\d\.]+)(deg|rad|grad|turn)?\s*[,\s]\s*([-+]?[\d\.]+)%\s*[,\s]\s*([-+]?[\d\.]+)%\s*(?:[,\/]\s*([-+]?[\d\.]+)(%)?)?\s*\)$/i
  );
  if (!t) return;
  let a = parseFloat(t[1]);
  const n = t[2], e = parseFloat(t[3]), o = parseFloat(t[4]);
  let r = 1;
  t[5] && (r = parseFloat(t[5]), t[6] === "%" && (r /= 100)), n === "rad" ? a = a * 180 / Math.PI : n === "grad" ? a = a * 0.9 : n === "turn" && (a = a * 360), a = a % 360, a < 0 && (a += 360);
  const c = s.match(/\.\d+/g) || [], h = c.length > 0 ? Math.max(...c.map((i) => i.length - 1)) : 0;
  return {
    space: "hsl",
    coords: [a, Math.min(100, Math.max(0, e)), Math.min(100, Math.max(0, o))],
    alpha: Math.min(1, Math.max(0, r)),
    meta: { precision: h }
  };
}
function T(s) {
  const [t, a, n] = s.coords, e = s.alpha, o = s.meta?.precision ?? 3, r = Math.pow(10, o), c = Math.round(t * r) / r, h = Math.round(a * r) / r, i = Math.round(n * r) / r, l = Math.round(e * 1e3) / 1e3;
  return l < 1 ? `hsla(${c}, ${h}%, ${i}%, ${l})` : `hsl(${c}, ${h}%, ${i}%)`;
}
function Y(s) {
  const [t, a, n] = s.coords, e = s.alpha, o = (1 - Math.abs(2 * (n / 100) - 1)) * (a / 100), r = o * (1 - Math.abs(t / 60 % 2 - 1)), c = n / 100 - o / 2;
  let h = 0, i = 0, l = 0;
  return 0 <= t && t < 60 ? (h = o, i = r, l = 0) : 60 <= t && t < 120 ? (h = r, i = o, l = 0) : 120 <= t && t < 180 ? (h = 0, i = o, l = r) : 180 <= t && t < 240 ? (h = 0, i = r, l = o) : 240 <= t && t < 300 ? (h = r, i = 0, l = o) : 300 <= t && t < 360 && (h = o, i = 0, l = r), {
    space: "rgb",
    coords: [(h + c) * 255, (i + c) * 255, (l + c) * 255],
    alpha: e
  };
}
function Z(s) {
  let [t, a, n] = s.coords;
  t /= 255, a /= 255, n /= 255;
  const e = Math.max(t, a, n), o = Math.min(t, a, n);
  let r = 0, c = 0;
  const h = (e + o) / 2;
  if (e !== o) {
    const i = e - o;
    switch (c = h > 0.5 ? i / (2 - e - o) : i / (e + o), e) {
      case t:
        r = (a - n) / i + (a < n ? 6 : 0);
        break;
      case a:
        r = (n - t) / i + 2;
        break;
      case n:
        r = (t - a) / i + 4;
        break;
    }
    r *= 60;
  }
  return {
    space: "hsl",
    coords: [r, c * 100, h * 100],
    alpha: s.alpha
  };
}
function J(s) {
  const t = s.match(
    /^hsva?\(\s*([-+]?[\d\.]+)(deg|rad|grad|turn)?\s*[,\s]\s*([-+]?[\d\.]+)%?\s*[,\s]\s*([-+]?[\d\.]+)%?\s*(?:[,\/]\s*([-+]?[\d\.]+)(%)?)?\s*\)$/i
  );
  if (!t) return;
  let a = parseFloat(t[1]);
  const n = t[2], e = parseFloat(t[3]), o = parseFloat(t[4]);
  let r = 1;
  t[5] && (r = parseFloat(t[5]), t[6] === "%" && (r /= 100)), n === "rad" ? a = a * 180 / Math.PI : n === "grad" ? a = a * 0.9 : n === "turn" && (a = a * 360), a = a % 360, a < 0 && (a += 360);
  const c = s.match(/\.\d+/g) || [], h = c.length > 0 ? Math.max(...c.map((i) => i.length - 1)) : 0;
  return {
    space: "hsv",
    coords: [a, Math.min(100, Math.max(0, e)), Math.min(100, Math.max(0, o))],
    alpha: Math.min(1, Math.max(0, r)),
    meta: { precision: h }
  };
}
function H(s) {
  const [t, a, n] = s.coords, e = s.alpha, o = s.meta?.precision ?? 3, r = Math.pow(10, o), c = Math.round(t * r) / r, h = Math.round(a * r) / r, i = Math.round(n * r) / r, l = Math.round(e * 1e3) / 1e3;
  return l < 1 ? `hsva(${c}, ${h}%, ${i}%, ${l})` : `hsv(${c}, ${h}%, ${i}%)`;
}
function Q(s) {
  const [t, a, n] = s.coords, e = s.alpha, o = a / 100, r = n / 100, c = r * o, h = c * (1 - Math.abs(t / 60 % 2 - 1)), i = r - c;
  let l = 0, u = 0, d = 0;
  return 0 <= t && t < 60 ? (l = c, u = h, d = 0) : 60 <= t && t < 120 ? (l = h, u = c, d = 0) : 120 <= t && t < 180 ? (l = 0, u = c, d = h) : 180 <= t && t < 240 ? (l = 0, u = h, d = c) : 240 <= t && t < 300 ? (l = h, u = 0, d = c) : 300 <= t && t < 360 && (l = c, u = 0, d = h), {
    space: "rgb",
    coords: [(l + i) * 255, (u + i) * 255, (d + i) * 255],
    alpha: e
  };
}
function tt(s) {
  let [t, a, n] = s.coords;
  t /= 255, a /= 255, n /= 255;
  const e = Math.max(t, a, n), o = Math.min(t, a, n);
  let r = 0;
  const c = e - o, h = e === 0 ? 0 : c / e, i = e;
  if (e !== o) {
    switch (e) {
      case t:
        r = (a - n) / c + (a < n ? 6 : 0);
        break;
      case a:
        r = (n - t) / c + 2;
        break;
      case n:
        r = (t - a) / c + 4;
        break;
    }
    r *= 60;
  } else
    r = 0;
  return {
    space: "hsv",
    coords: [r, h * 100, i * 100],
    alpha: s.alpha
  };
}
function p(s, t) {
  return [
    s[0][0] * t[0] + s[0][1] * t[1] + s[0][2] * t[2],
    s[1][0] * t[0] + s[1][1] * t[1] + s[1][2] * t[2],
    s[2][0] * t[0] + s[2][1] * t[1] + s[2][2] * t[2]
  ];
}
function _(s) {
  return s.map((t) => {
    const a = t / 255;
    return a <= 0.04045 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  });
}
function I(s) {
  return s.map((t) => {
    const a = t > 31308e-7 ? 1.055 * Math.pow(t, 0.4166666666666667) - 0.055 : 12.92 * t;
    return Math.round(Math.max(0, Math.min(1, a)) * 255);
  });
}
const W = [
  [0.4122214708, 0.5363325363, 0.0514459929],
  [0.2119034982, 0.6806995451, 0.1073969566],
  [0.0883024619, 0.2817188376, 0.6299787005]
], w = [
  [4.0767416621, -3.3077115913, 0.2309699292],
  [-1.2684380046, 2.6097574011, -0.3413193965],
  [-0.0041960863, -0.7034186147, 1.707614701]
], A = [
  [0.2104542553, 0.793617785, -0.0040720468],
  [1.9779984951, -2.428592205, 0.4505937099],
  [0.0259040371, 0.7827717662, -0.808675766]
], O = [
  [0.9999999985, 0.3963377774, 0.2158037573],
  [1.0000000089, -0.1055613458, -0.0638541728],
  [1.0000000547, -0.0894841775, -1.291485548]
], st = [
  [0.4124564, 0.3575761, 0.1804375],
  [0.2126729, 0.7151522, 0.072175],
  [0.0193339, 0.119192, 0.9503041]
], at = [
  [3.2404542, -1.5371385, -0.4985314],
  [-0.969266, 1.8760108, 0.041556],
  [0.0556434, -0.2040259, 1.0572252]
], nt = [
  [1.0478112, 0.0228866, -0.050127],
  [0.0295424, 0.9904844, -0.0170491],
  [-92345e-7, 0.0150436, 0.7521316]
], rt = [
  [0.9555766, -0.0230393, 0.0631636],
  [-0.0282895, 1.0099416, 0.0210077],
  [0.0122982, -0.020483, 1.3299098]
], M = [0.96422, 1, 0.82521];
function et(s) {
  return s.match(
    /^oklch\(\s*([-+]?[\d\.]+)%?\s+([-+]?[\d\.]+)(%?)\s+([-+]?[\d\.]+)(deg|rad|grad|turn)?\s*(?:\/\s*([-+]?[\d\.]+)%?)?\s*\)$/i
  ), L(s);
}
function L(s) {
  const t = s.match(
    /^oklch\(\s*([^\s\/,]+)[\s,]+([^\s\/,]+)[\s,]+([^\s\/,]+)(?:[\s\/,]+([^\s\)]+))?\s*\)$/i
  );
  if (!t) return;
  let a = parseFloat(t[1]);
  t[1].endsWith("%") && (a /= 100);
  let n = parseFloat(t[2]);
  t[2].endsWith("%") && (n = n / 100 * 0.4);
  let e = parseFloat(t[3]);
  t[3].endsWith("rad") ? e = e * 180 / Math.PI : t[3].endsWith("grad") ? e = e * 0.9 : t[3].endsWith("turn") && (e = e * 360), e = e % 360, e < 0 && (e += 360);
  const o = t[4];
  let r = 1;
  return o && (r = parseFloat(o), o.endsWith("%") && (r /= 100)), {
    space: "oklch",
    coords: [a, n, e],
    alpha: Math.min(1, Math.max(0, r)),
    meta: {
      precision: (s.match(/\.\d+/g) || []).length > 0 ? Math.max(...(s.match(/\.\d+/g) || []).map((c) => c.length - 1)) : 0
    }
  };
}
function B(s) {
  const [t, a, n] = s.coords, e = s.meta?.precision ?? 3, o = Math.pow(10, e), r = Math.round(t * o) / o, c = Math.round(a * o) / o, h = Math.round(n * o) / o, i = Math.round(s.alpha * 1e3) / 1e3;
  return i < 1 ? `oklch(${r} ${c} ${h} / ${i})` : `oklch(${r} ${c} ${h})`;
}
function ot(s) {
  const [t, a, n] = s.coords, e = s.alpha, o = n * Math.PI / 180, r = t, c = a * Math.cos(o), h = a * Math.sin(o), l = p(O, [r, c, h]).map(($) => $ * $ * $), u = p(w, l);
  return {
    space: "rgb",
    coords: I(u),
    alpha: e
  };
}
function ct(s) {
  const [t, a, n] = s.coords, e = _([t, a, n]), r = p(W, e).map((d) => Math.cbrt(d)), [c, h, i] = p(A, r), l = Math.sqrt(h * h + i * i);
  let u;
  return l < 1e-4 ? u = 0 : (u = Math.atan2(i, h) * (180 / Math.PI), u < 0 && (u += 360)), {
    space: "oklch",
    coords: [c, l, u],
    alpha: s.alpha
  };
}
function ht(s) {
  const t = s.match(
    /^color\(xyz\s+([-+]?[\d\.]+)\s+([-+]?[\d\.]+)\s+([-+]?[\d\.]+)(?:\s*\/\s*([-+]?[\d\.]+)%?)?\)$/i
  );
  if (!t) return;
  const [a, n, e, o, r] = t;
  return {
    space: "xyz",
    coords: [parseFloat(n), parseFloat(e), parseFloat(o)],
    alpha: r ? parseFloat(r) : 1,
    meta: {
      precision: (s.match(/\.\d+/g) || []).length > 0 ? Math.max(...(s.match(/\.\d+/g) || []).map((c) => c.length - 1)) : 0
    }
  };
}
function C(s) {
  const t = s.meta?.precision ?? 4, a = Math.pow(10, t), [n, e, o] = s.coords.map((c) => Math.round(c * a) / a), r = Math.round(s.alpha * 1e3) / 1e3;
  return r < 1 ? `color(xyz ${n} ${e} ${o} / ${r})` : `color(xyz ${n} ${e} ${o})`;
}
function D(s) {
  const t = s.coords, a = p(at, t);
  return {
    space: "rgb",
    coords: I(a),
    alpha: s.alpha
  };
}
function P(s) {
  const t = _(s.coords);
  return {
    space: "xyz",
    coords: p(st, t),
    alpha: s.alpha
  };
}
const R = 216 / 24389, x = 24389 / 27;
function it(s) {
  const t = s.match(
    /^lab\(\s*([-+]?[\d\.]+)%?\s+([-+]?[\d\.]+)\s+([-+]?[\d\.]+)(?:\s*\/\s*([-+]?[\d\.]+)%?)?\)$/i
  );
  if (!t) return;
  const [a, n, e, o, r] = t;
  return {
    space: "lab",
    coords: [parseFloat(n), parseFloat(e), parseFloat(o)],
    alpha: r ? parseFloat(r) : 1,
    meta: {
      precision: (s.match(/\.\d+/g) || []).length > 0 ? Math.max(...(s.match(/\.\d+/g) || []).map((c) => c.length - 1)) : 0
    }
  };
}
function G(s) {
  const t = s.meta?.precision ?? 3, a = Math.pow(10, t), [n, e, o] = s.coords.map((c) => Math.round(c * a) / a), r = Math.round(s.alpha * 1e3) / 1e3;
  return r < 1 ? `lab(${n} ${e} ${o} / ${r})` : `lab(${n} ${e} ${o})`;
}
function lt(s) {
  const [t, a, n] = s, e = t / M[0], o = a / M[1], r = n / M[2], c = (z) => z > R ? Math.cbrt(z) : (x * z + 16) / 116, h = c(e), i = c(o), l = c(r), u = 116 * i - 16, d = 500 * (h - i), $ = 200 * (i - l);
  return [u, d, $];
}
function ut(s) {
  const [t, a, n] = s, e = (t + 16) / 116, o = a / 500 + e, r = e - n / 200, c = (u) => u * u * u > R ? u * u * u : (116 * u - 16) / x, h = c(o), i = t > x * R ? Math.pow((t + 16) / 116, 3) : t / x, l = c(r);
  return [h * M[0], i * M[1], l * M[2]];
}
function X(s) {
  const t = s.coords, a = ut(t), n = p(rt, a);
  return D({
    coords: n,
    alpha: s.alpha
  });
}
function K(s) {
  const a = P(s).coords, n = p(nt, a);
  return {
    space: "lab",
    coords: lt(n),
    alpha: s.alpha
  };
}
function dt(s) {
  const t = s.match(
    /^lch\(\s*([-+]?[\d\.]+)%?\s+([-+]?[\d\.]+)\s+([-+]?[\d\.]+)(deg|rad|grad|turn)?\s*(?:\/\s*([-+]?[\d\.]+)%?)?\s*\)$/i
  );
  if (!t) return;
  const [a, n, e, o, r, c] = t;
  let h = parseFloat(o);
  return r === "rad" ? h = h * 180 / Math.PI : r === "grad" ? h = h * 0.9 : r === "turn" && (h = h * 360), h = h % 360, h < 0 && (h += 360), {
    space: "lch",
    coords: [parseFloat(n), parseFloat(e), h],
    alpha: c ? parseFloat(c) : 1,
    meta: {
      precision: (s.match(/\.\d+/g) || []).length > 0 ? Math.max(...(s.match(/\.\d+/g) || []).map((i) => i.length - 1)) : 0
    }
  };
}
function E(s) {
  const t = s.meta?.precision ?? 3, a = Math.pow(10, t), [n, e, o] = s.coords, r = Math.round(n * a) / a, c = Math.round(e * a) / a, h = Math.round(o * a) / a, i = Math.round(s.alpha * 1e3) / 1e3;
  return i < 1 ? `lch(${r} ${c} ${h} / ${i})` : `lch(${r} ${c} ${h})`;
}
function pt(s) {
  const [t, a, n] = s.coords, e = n * Math.PI / 180, o = a * Math.cos(e), r = a * Math.sin(e);
  return X({
    coords: [t, o, r],
    alpha: s.alpha
  });
}
function ft(s) {
  const t = K(s), [a, n, e] = t.coords, o = Math.sqrt(n * n + e * e);
  let r;
  return o < 1e-4 ? r = 0 : (r = Math.atan2(e, n) * 180 / Math.PI, r < 0 && (r += 360)), {
    space: "lch",
    coords: [a, o, r],
    alpha: s.alpha
  };
}
function bt(s) {
  const t = s.match(
    /^oklab\(\s*([-+]?[\d\.]+)%?\s+([-+]?[\d\.]+)\s+([-+]?[\d\.]+)(?:\s*\/\s*([-+]?[\d\.]+)%?)?\s*\)$/i
  );
  if (!t) return;
  const [a, n, e, o, r] = t;
  let c = parseFloat(n);
  return t[1].endsWith("%") && (c /= 100), {
    space: "oklab",
    coords: [c, parseFloat(e), parseFloat(o)],
    alpha: r ? parseFloat(r) : 1,
    meta: {
      precision: (s.match(/\.\d+/g) || []).length > 0 ? Math.max(...(s.match(/\.\d+/g) || []).map((h) => h.length - 1)) : 0
    }
  };
}
function U(s) {
  const t = s.meta?.precision ?? 3, a = Math.pow(10, t), [n, e, o] = s.coords, r = Math.round(n * a) / a, c = Math.round(e * a) / a, h = Math.round(o * a) / a, i = Math.round(s.alpha * 1e3) / 1e3;
  return i < 1 ? `oklab(${r} ${c} ${h} / ${i})` : `oklab(${r} ${c} ${h})`;
}
function Mt(s) {
  const [t, a, n] = s.coords, e = s.alpha, r = p(O, [t, a, n]).map((i) => i * i * i), c = p(w, r);
  return {
    space: "rgb",
    coords: I(c),
    alpha: e
  };
}
function mt(s) {
  const [t, a, n] = s.coords, e = _([t, a, n]), r = p(W, e).map((h) => Math.cbrt(h));
  return {
    space: "oklab",
    coords: p(A, r),
    alpha: s.alpha
  };
}
function k(s) {
  if (s.startsWith("#")) {
    const t = s.slice(1);
    if (t.match(/^[0-9a-f]{3}$/i))
      return {
        space: "rgb",
        coords: [
          parseInt(t[0] + t[0], 16),
          parseInt(t[1] + t[1], 16),
          parseInt(t[2] + t[2], 16)
        ],
        alpha: 1
      };
    if (t.match(/^[0-9a-f]{4}$/i))
      return {
        space: "rgb",
        coords: [
          parseInt(t[0] + t[0], 16),
          parseInt(t[1] + t[1], 16),
          parseInt(t[2] + t[2], 16)
        ],
        alpha: parseInt(t[3] + t[3], 16) / 255
      };
    if (t.match(/^[0-9a-f]{6}$/i))
      return {
        space: "rgb",
        coords: [
          parseInt(t.slice(0, 2), 16),
          parseInt(t.slice(2, 4), 16),
          parseInt(t.slice(4, 6), 16)
        ],
        alpha: 1
      };
    if (t.match(/^[0-9a-f]{8}$/i))
      return {
        space: "rgb",
        coords: [
          parseInt(t.slice(0, 2), 16),
          parseInt(t.slice(2, 4), 16),
          parseInt(t.slice(4, 6), 16)
        ],
        alpha: parseInt(t.slice(6, 8), 16) / 255
      };
  }
}
function V(s) {
  const { coords: t, alpha: a } = s, [n, e, o] = t.map(
    (h) => Math.round(Math.max(0, Math.min(255, h)))
  ), r = (h) => h.toString(16).padStart(2, "0"), c = Math.round(Math.max(0, Math.min(1, a)) * 255);
  return `#${r(n)}${r(e)}${r(o)}${r(c)}`;
}
function j(s) {
  const { coords: t } = s, [a, n, e] = t.map(
    (r) => Math.round(Math.max(0, Math.min(255, r)))
  ), o = (r) => r.toString(16).padStart(2, "0");
  return `#${o(a)}${o(n)}${o(e)}`;
}
function $t(s) {
  const t = V(s);
  return t[1] === t[2] && t[3] === t[4] && t[5] === t[6] && t[7] === t[8] ? `#${t[1]}${t[3]}${t[5]}${t[7]}` : t;
}
function gt(s) {
  const t = j(s);
  return t[1] === t[2] && t[3] === t[4] && t[5] === t[6] ? `#${t[1]}${t[3]}${t[5]}` : t;
}
function y(s) {
  return xt(s);
}
function xt(s) {
  const { coords: t, alpha: a } = s, [n, e, o] = t.map(
    (c) => Math.round(Math.max(0, Math.min(255, c)))
  ), r = (c) => c.toString(16).padStart(2, "0");
  if (a < 1) {
    const c = Math.round(Math.max(0, Math.min(1, a)) * 255);
    return `#${r(n)}${r(e)}${r(o)}${r(c)}`;
  }
  return `#${r(n)}${r(e)}${r(o)}`;
}
function zt(s) {
  const t = s.match(
    /^rgba?\(\s*([-+]?[\d\.]+)(%?)\s*,\s*([-+]?[\d\.]+)(%?)\s*,\s*([-+]?[\d\.]+)(%?)\s*(?:,\s*([-+]?[\d\.]+)(\%?))?\s*\)$/i
  );
  if (!t) {
    const a = s.match(
      /^rgba?\(\s*([-+]?[\d\.]+)(%?)\s+([-+]?[\d\.]+)(%?)\s+([-+]?[\d\.]+)(%?)\s*(?:\/\s*([-+]?[\d\.]+)(\%?))?\s*\)$/i
    );
    return a ? F(a) : void 0;
  }
  return F(t);
}
function F(s) {
  const t = g(s[1], s[2], 255), a = g(s[3], s[4], 255), n = g(s[5], s[6], 255), e = s[7] ? g(s[7], s[8], 1) : 1;
  return {
    space: "rgb",
    coords: [t, a, n],
    alpha: e
  };
}
function g(s, t, a) {
  let n = parseFloat(s);
  return t === "%" && (n = n / 100 * a), Math.min(Math.max(n, 0), a);
}
function q(s) {
  const { coords: t, alpha: a } = s, [n, e, o] = t.map((c) => Math.round(c)), r = Math.round(a * 1e3) / 1e3;
  return r < 1 ? `rgba(${n}, ${e}, ${o}, ${r})` : `rgb(${n}, ${e}, ${o})`;
}
function m(s, t) {
  if (s.space === t) return s;
  const a = kt(s);
  if (t === "rgb") return a;
  if (t === "hsl") return Z(a);
  if (t === "hsv") return tt(a);
  if (t === "oklch") return ct(a);
  if (t === "xyz") return P(a);
  if (t === "lab") return K(a);
  if (t === "lch") return ft(a);
  if (t === "oklab") return mt(a);
  if (t.startsWith("hex"))
    return a;
  throw new Error(`Unsupported target space: ${t}`);
}
function kt(s) {
  if (s.space === "rgb") return s;
  if (s.space === "hsl") return Y(s);
  if (s.space === "hsv") return Q(s);
  if (s.space === "oklch") return ot(s);
  if (s.space === "xyz") return D(s);
  if (s.space === "lab") return X(s);
  if (s.space === "lch") return pt(s);
  if (s.space === "oklab") return Mt(s);
  if (s.space.startsWith("hex"))
    return { ...s, space: "rgb" };
  throw new Error(`Unsupported source space: ${s.space}`);
}
function b(s, { namedColors: t, nameResolver: a } = {}) {
  if (!s)
    return;
  if (s = s.trim(), a) {
    const e = a(s);
    if (e)
      return k("#" + e.replace("#", ""));
  }
  if (t) {
    const e = t[s];
    if (e)
      return k("#" + e.replace("#", ""));
  }
  if (s.startsWith("#")) return k(s);
  const n = s.toLowerCase();
  if (n.startsWith("rgb")) return zt(s);
  if (n.startsWith("hsl")) return N(s);
  if (n.startsWith("hsv")) return J(s);
  if (n.startsWith("oklch")) return et(s);
  if (n.startsWith("color(xyz")) return ht(s);
  if (n.startsWith("lab")) return it(s);
  if (n.startsWith("lch")) return dt(s);
  if (n.startsWith("oklab")) return bt(s);
}
function v(s, t) {
  return t === "hex" ? y(s) : t === "hex3" ? gt(s) : t === "hex4" ? $t(s) : t === "hex6" ? j(s) : t === "hex8" ? V(s) : t === "rgb" ? q(s) : t === "hsl" ? T(s) : t === "hsv" ? H(s) : t === "oklch" ? B(s) : t === "xyz" ? C(s) : t === "lab" ? G(s) : t === "lch" ? E(s) : t === "oklab" ? U(s) : y(s);
}
function _t(s) {
  return y(
    m(
      { space: "hsl", coords: [f(s), 100, 50], alpha: 1 },
      "rgb"
    )
  );
}
function It(s) {
  const t = m(
    { space: "hsl", coords: [f(s), 100, 50], alpha: 1 },
    "rgb"
  );
  return q(t);
}
function Lt(s) {
  return T({
    coords: [f(s), 100, 50],
    alpha: 1
  });
}
function Ft(s) {
  return H({
    coords: [f(s), 100, 100],
    alpha: 1
  });
}
function vt(s) {
  return B({
    coords: [0.7, 0.2, f(s)],
    alpha: 1
  });
}
function Tt(s) {
  const t = m(
    { space: "hsl", coords: [f(s), 100, 50], alpha: 1 },
    "xyz"
  );
  return C(t);
}
function Ht(s) {
  const n = f(s) * Math.PI / 180;
  return G({
    coords: [53, 104 * Math.cos(n), 104 * Math.sin(n)],
    alpha: 1
  });
}
function Wt(s) {
  return E({
    coords: [53, 104, f(s)],
    alpha: 1
  });
}
function wt(s) {
  const n = f(s) * Math.PI / 180;
  return U({
    coords: [0.7, 0.2 * Math.cos(n), 0.2 * Math.sin(n)],
    alpha: 1
  });
}
function f(s) {
  return (s % 360 + 360) % 360;
}
function Rt(s = {}) {
  const a = (n, e) => {
    const o = b(n, s);
    if (o)
      return e = e ?? "hex", v(m(o, e), e);
  };
  return a.isColor = (n) => !!b(n, s), a.getType = (n) => {
    if (s.nameResolver?.(n) || s.namedColors?.[n])
      return "x11";
    const e = b(n, s);
    return e ? n.startsWith("#") ? "hex" : e.space : void 0;
  }, a.getAlpha = (n) => {
    const e = b(n, s)?.alpha ?? 1;
    return Math.round(e * 1e3) / 1e3;
  }, a.setAlpha = (n, e) => {
    const o = b(n, s);
    if (!o) return;
    o.alpha = Math.min(1, Math.max(0, e));
    const r = n.startsWith("#") ? "hex" : o.space;
    return v(o, r);
  }, a.removeAlpha = (n) => a.setAlpha(n, 1), a.isEqual = (n, e) => {
    if (n === e) return !0;
    if (!n || !e) return !1;
    const o = b(n, s), r = b(e, s);
    if (!o || !r) return !1;
    const c = m(o, "rgb"), h = m(r, "rgb"), i = 0.5;
    return Math.abs(c.coords[0] - h.coords[0]) < i && Math.abs(c.coords[1] - h.coords[1]) < i && Math.abs(c.coords[2] - h.coords[2]) < i && Math.abs(c.alpha - h.alpha) < 0.01;
  }, a;
}
const yt = {};
Object.entries(
  yt
).reduce(
  (s, [t, a]) => (s[a] = t, s),
  {}
);
const At = Rt();
export {
  At as coco,
  m as convert,
  Rt as createCoco,
  _t as hue2hex,
  Lt as hue2hsl,
  Ft as hue2hsv,
  Ht as hue2lab,
  Wt as hue2lch,
  wt as hue2oklab,
  vt as hue2oklch,
  It as hue2rgb,
  Tt as hue2xyz,
  yt as namedColors,
  b as parse,
  v as serialize
};
