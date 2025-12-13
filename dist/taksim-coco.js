function y(t) {
  if (t.startsWith("#")) {
    const a = t.slice(1);
    if (a.match(/^[0-9a-f]{3}$/i))
      return {
        space: "rgb",
        coords: [
          parseInt(a[0] + a[0], 16),
          parseInt(a[1] + a[1], 16),
          parseInt(a[2] + a[2], 16)
        ],
        alpha: 1
      };
    if (a.match(/^[0-9a-f]{4}$/i))
      return {
        space: "rgb",
        coords: [
          parseInt(a[0] + a[0], 16),
          parseInt(a[1] + a[1], 16),
          parseInt(a[2] + a[2], 16)
        ],
        alpha: parseInt(a[3] + a[3], 16) / 255
      };
    if (a.match(/^[0-9a-f]{6}$/i))
      return {
        space: "rgb",
        coords: [
          parseInt(a.slice(0, 2), 16),
          parseInt(a.slice(2, 4), 16),
          parseInt(a.slice(4, 6), 16)
        ],
        alpha: 1
      };
    if (a.match(/^[0-9a-f]{8}$/i))
      return {
        space: "rgb",
        coords: [
          parseInt(a.slice(0, 2), 16),
          parseInt(a.slice(2, 4), 16),
          parseInt(a.slice(4, 6), 16)
        ],
        alpha: parseInt(a.slice(6, 8), 16) / 255
      };
  }
}
function F(t) {
  const { coords: a, alpha: e } = t, [s, r, o] = a.map(
    (h) => Math.round(Math.max(0, Math.min(255, h)))
  ), n = (h) => h.toString(16).padStart(2, "0"), c = Math.round(Math.max(0, Math.min(1, e)) * 255);
  return `#${n(s)}${n(r)}${n(o)}${n(c)}`;
}
function T(t) {
  const { coords: a } = t, [e, s, r] = a.map(
    (n) => Math.round(Math.max(0, Math.min(255, n)))
  ), o = (n) => n.toString(16).padStart(2, "0");
  return `#${o(e)}${o(s)}${o(r)}`;
}
function N(t) {
  const a = F(t);
  return a[1] === a[2] && a[3] === a[4] && a[5] === a[6] && a[7] === a[8] ? `#${a[1]}${a[3]}${a[5]}${a[7]}` : a;
}
function S(t) {
  const a = T(t);
  return a[1] === a[2] && a[3] === a[4] && a[5] === a[6] ? `#${a[1]}${a[3]}${a[5]}` : a;
}
function z(t) {
  return Y(t);
}
function Y(t) {
  const { coords: a, alpha: e } = t, [s, r, o] = a.map(
    (c) => Math.round(Math.max(0, Math.min(255, c)))
  ), n = (c) => c.toString(16).padStart(2, "0");
  if (e < 1) {
    const c = Math.round(Math.max(0, Math.min(1, e)) * 255);
    return `#${n(s)}${n(r)}${n(o)}${n(c)}`;
  }
  return `#${n(s)}${n(r)}${n(o)}`;
}
function Z(t) {
  return J(t);
}
function J(t) {
  const a = t.match(
    /^hsla?\(\s*([-+]?[\d\.]+)(deg|rad|grad|turn)?\s*[,\s]\s*([-+]?[\d\.]+)%\s*[,\s]\s*([-+]?[\d\.]+)%\s*(?:[,\/]\s*([-+]?[\d\.]+)(%)?)?\s*\)$/i
  );
  if (!a) return;
  let e = parseFloat(a[1]);
  const s = a[2], r = parseFloat(a[3]), o = parseFloat(a[4]);
  let n = 1;
  a[5] && (n = parseFloat(a[5]), a[6] === "%" && (n /= 100)), s === "rad" ? e = e * 180 / Math.PI : s === "grad" ? e = e * 0.9 : s === "turn" && (e = e * 360), e = e % 360, e < 0 && (e += 360);
  const c = t.match(/\.\d+/g) || [], h = c.length > 0 ? Math.max(...c.map((i) => i.length - 1)) : 0;
  return {
    space: "hsl",
    coords: [e, Math.min(100, Math.max(0, r)), Math.min(100, Math.max(0, o))],
    alpha: Math.min(1, Math.max(0, n)),
    meta: { precision: h }
  };
}
function H(t) {
  const [a, e, s] = t.coords, r = t.alpha, o = t.meta?.precision ?? 3, n = Math.pow(10, o), c = Math.round(a * n) / n, h = Math.round(e * n) / n, i = Math.round(s * n) / n, l = Math.round(r * 1e3) / 1e3;
  return l < 1 ? `hsla(${c}, ${h}%, ${i}%, ${l})` : `hsl(${c}, ${h}%, ${i}%)`;
}
function Q(t) {
  const [a, e, s] = t.coords, r = t.alpha, o = (1 - Math.abs(2 * (s / 100) - 1)) * (e / 100), n = o * (1 - Math.abs(a / 60 % 2 - 1)), c = s / 100 - o / 2;
  let h = 0, i = 0, l = 0;
  return 0 <= a && a < 60 ? (h = o, i = n, l = 0) : 60 <= a && a < 120 ? (h = n, i = o, l = 0) : 120 <= a && a < 180 ? (h = 0, i = o, l = n) : 180 <= a && a < 240 ? (h = 0, i = n, l = o) : 240 <= a && a < 300 ? (h = n, i = 0, l = o) : 300 <= a && a < 360 && (h = o, i = 0, l = n), {
    space: "rgb",
    coords: [(h + c) * 255, (i + c) * 255, (l + c) * 255],
    alpha: r
  };
}
function aa(t) {
  let [a, e, s] = t.coords;
  a /= 255, e /= 255, s /= 255;
  const r = Math.max(a, e, s), o = Math.min(a, e, s);
  let n = 0, c = 0;
  const h = (r + o) / 2;
  if (r !== o) {
    const i = r - o;
    switch (c = h > 0.5 ? i / (2 - r - o) : i / (r + o), r) {
      case a:
        n = (e - s) / i + (e < s ? 6 : 0);
        break;
      case e:
        n = (s - a) / i + 2;
        break;
      case s:
        n = (a - e) / i + 4;
        break;
    }
    n *= 60;
  }
  return {
    space: "hsl",
    coords: [n, c * 100, h * 100],
    alpha: t.alpha
  };
}
function ta(t) {
  const a = t.match(
    /^hsva?\(\s*([-+]?[\d\.]+)(deg|rad|grad|turn)?\s*[,\s]\s*([-+]?[\d\.]+)%?\s*[,\s]\s*([-+]?[\d\.]+)%?\s*(?:[,\/]\s*([-+]?[\d\.]+)(%)?)?\s*\)$/i
  );
  if (!a) return;
  let e = parseFloat(a[1]);
  const s = a[2], r = parseFloat(a[3]), o = parseFloat(a[4]);
  let n = 1;
  a[5] && (n = parseFloat(a[5]), a[6] === "%" && (n /= 100)), s === "rad" ? e = e * 180 / Math.PI : s === "grad" ? e = e * 0.9 : s === "turn" && (e = e * 360), e = e % 360, e < 0 && (e += 360);
  const c = t.match(/\.\d+/g) || [], h = c.length > 0 ? Math.max(...c.map((i) => i.length - 1)) : 0;
  return {
    space: "hsv",
    coords: [e, Math.min(100, Math.max(0, r)), Math.min(100, Math.max(0, o))],
    alpha: Math.min(1, Math.max(0, n)),
    meta: { precision: h }
  };
}
function W(t) {
  const [a, e, s] = t.coords, r = t.alpha, o = t.meta?.precision ?? 3, n = Math.pow(10, o), c = Math.round(a * n) / n, h = Math.round(e * n) / n, i = Math.round(s * n) / n, l = Math.round(r * 1e3) / 1e3;
  return l < 1 ? `hsva(${c}, ${h}%, ${i}%, ${l})` : `hsv(${c}, ${h}%, ${i}%)`;
}
function ea(t) {
  const [a, e, s] = t.coords, r = t.alpha, o = e / 100, n = s / 100, c = n * o, h = c * (1 - Math.abs(a / 60 % 2 - 1)), i = n - c;
  let l = 0, f = 0, d = 0;
  return 0 <= a && a < 60 ? (l = c, f = h, d = 0) : 60 <= a && a < 120 ? (l = h, f = c, d = 0) : 120 <= a && a < 180 ? (l = 0, f = c, d = h) : 180 <= a && a < 240 ? (l = 0, f = h, d = c) : 240 <= a && a < 300 ? (l = h, f = 0, d = c) : 300 <= a && a < 360 && (l = c, f = 0, d = h), {
    space: "rgb",
    coords: [(l + i) * 255, (f + i) * 255, (d + i) * 255],
    alpha: r
  };
}
function sa(t) {
  let [a, e, s] = t.coords;
  a /= 255, e /= 255, s /= 255;
  const r = Math.max(a, e, s), o = Math.min(a, e, s);
  let n = 0;
  const c = r - o, h = r === 0 ? 0 : c / r, i = r;
  if (r !== o) {
    switch (r) {
      case a:
        n = (e - s) / c + (e < s ? 6 : 0);
        break;
      case e:
        n = (s - a) / c + 2;
        break;
      case s:
        n = (a - e) / c + 4;
        break;
    }
    n *= 60;
  } else
    n = 0;
  return {
    space: "hsv",
    coords: [n, h * 100, i * 100],
    alpha: t.alpha
  };
}
function u(t, a) {
  return [
    t[0][0] * a[0] + t[0][1] * a[1] + t[0][2] * a[2],
    t[1][0] * a[0] + t[1][1] * a[1] + t[1][2] * a[2],
    t[2][0] * a[0] + t[2][1] * a[1] + t[2][2] * a[2]
  ];
}
function v(t) {
  return t.map((a) => {
    const e = a / 255;
    return e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
  });
}
function R(t) {
  return t.map((a) => {
    const e = a > 31308e-7 ? 1.055 * Math.pow(a, 0.4166666666666667) - 0.055 : 12.92 * a;
    return Math.round(Math.max(0, Math.min(1, e)) * 255);
  });
}
const A = [
  [0.4122214708, 0.5363325363, 0.0514459929],
  [0.2119034982, 0.6806995451, 0.1073969566],
  [0.0883024619, 0.2817188376, 0.6299787005]
], B = [
  [4.0767416621, -3.3077115913, 0.2309699292],
  [-1.2684380046, 2.6097574011, -0.3413193965],
  [-0.0041960863, -0.7034186147, 1.707614701]
], O = [
  [0.2104542553, 0.793617785, -0.0040720468],
  [1.9779984951, -2.428592205, 0.4505937099],
  [0.0259040371, 0.7827717662, -0.808675766]
], C = [
  [0.9999999985, 0.3963377774, 0.2158037573],
  [1.0000000089, -0.1055613458, -0.0638541728],
  [1.0000000547, -0.0894841775, -1.291485548]
], na = [
  [0.4124564, 0.3575761, 0.1804375],
  [0.2126729, 0.7151522, 0.072175],
  [0.0193339, 0.119192, 0.9503041]
], ra = [
  [3.2404542, -1.5371385, -0.4985314],
  [-0.969266, 1.8760108, 0.041556],
  [0.0556434, -0.2040259, 1.0572252]
], oa = [
  [1.0478112, 0.0228866, -0.050127],
  [0.0295424, 0.9904844, -0.0170491],
  [-92345e-7, 0.0150436, 0.7521316]
], ca = [
  [0.9555766, -0.0230393, 0.0631636],
  [-0.0282895, 1.0099416, 0.0210077],
  [0.0122982, -0.020483, 1.3299098]
], m = [0.96422, 1, 0.82521];
function ha(t) {
  const a = t.match(
    /^color\(xyz\s+([-+]?[\d\.]+)\s+([-+]?[\d\.]+)\s+([-+]?[\d\.]+)(?:\s*\/\s*([-+]?[\d\.]+)%?)?\)$/i
  );
  if (!a) return;
  const [e, s, r, o, n] = a;
  return {
    space: "xyz",
    coords: [parseFloat(s), parseFloat(r), parseFloat(o)],
    alpha: n ? parseFloat(n) : 1,
    meta: {
      precision: (t.match(/\.\d+/g) || []).length > 0 ? Math.max(...(t.match(/\.\d+/g) || []).map((c) => c.length - 1)) : 0
    }
  };
}
function D(t) {
  const a = t.meta?.precision ?? 4, e = Math.pow(10, a), [s, r, o] = t.coords.map((c) => Math.round(c * e) / e), n = Math.round(t.alpha * 1e3) / 1e3;
  return n < 1 ? `color(xyz ${s} ${r} ${o} / ${n})` : `color(xyz ${s} ${r} ${o})`;
}
function P(t) {
  const a = t.coords, e = u(ra, a);
  return {
    space: "rgb",
    coords: R(e),
    alpha: t.alpha
  };
}
function q(t) {
  const a = v(t.coords);
  return {
    space: "xyz",
    coords: u(na, a),
    alpha: t.alpha
  };
}
const w = 216 / 24389, x = 24389 / 27;
function ia(t) {
  const a = t.match(
    /^lab\(\s*([-+]?[\d\.]+)%?\s+([-+]?[\d\.]+)\s+([-+]?[\d\.]+)(?:\s*\/\s*([-+]?[\d\.]+)%?)?\)$/i
  );
  if (!a) return;
  const [e, s, r, o, n] = a;
  return {
    space: "lab",
    coords: [parseFloat(s), parseFloat(r), parseFloat(o)],
    alpha: n ? parseFloat(n) : 1,
    meta: {
      precision: (t.match(/\.\d+/g) || []).length > 0 ? Math.max(...(t.match(/\.\d+/g) || []).map((c) => c.length - 1)) : 0
    }
  };
}
function G(t) {
  const a = t.meta?.precision ?? 3, e = Math.pow(10, a), [s, r, o] = t.coords.map((c) => Math.round(c * e) / e), n = Math.round(t.alpha * 1e3) / 1e3;
  return n < 1 ? `lab(${s} ${r} ${o} / ${n})` : `lab(${s} ${r} ${o})`;
}
function la(t) {
  const [a, e, s] = t, r = a / m[0], o = e / m[1], n = s / m[2], c = (k) => k > w ? Math.cbrt(k) : (x * k + 16) / 116, h = c(r), i = c(o), l = c(n), f = 116 * i - 16, d = 500 * (h - i), M = 200 * (i - l);
  return [f, d, M];
}
function fa(t) {
  const [a, e, s] = t, r = (a + 16) / 116, o = e / 500 + r, n = r - s / 200, c = (f) => f * f * f > w ? f * f * f : (116 * f - 16) / x, h = c(o), i = a > x * w ? Math.pow((a + 16) / 116, 3) : a / x, l = c(n);
  return [h * m[0], i * m[1], l * m[2]];
}
function X(t) {
  const a = t.coords, e = fa(a), s = u(ca, e);
  return P({
    coords: s,
    alpha: t.alpha
  });
}
function K(t) {
  const e = q(t).coords, s = u(oa, e);
  return {
    space: "lab",
    coords: la(s),
    alpha: t.alpha
  };
}
function da(t) {
  const a = t.match(
    /^lch\(\s*([-+]?[\d\.]+)%?\s+([-+]?[\d\.]+)\s+([-+]?[\d\.]+)(deg|rad|grad|turn)?\s*(?:\/\s*([-+]?[\d\.]+)%?)?\s*\)$/i
  );
  if (!a) return;
  const [e, s, r, o, n, c] = a;
  let h = parseFloat(o);
  return n === "rad" ? h = h * 180 / Math.PI : n === "grad" ? h = h * 0.9 : n === "turn" && (h = h * 360), h = h % 360, h < 0 && (h += 360), {
    space: "lch",
    coords: [parseFloat(s), parseFloat(r), h],
    alpha: c ? parseFloat(c) : 1,
    meta: {
      precision: (t.match(/\.\d+/g) || []).length > 0 ? Math.max(...(t.match(/\.\d+/g) || []).map((i) => i.length - 1)) : 0
    }
  };
}
function E(t) {
  const a = t.meta?.precision ?? 3, e = Math.pow(10, a), [s, r, o] = t.coords, n = Math.round(s * e) / e, c = Math.round(r * e) / e, h = Math.round(o * e) / e, i = Math.round(t.alpha * 1e3) / 1e3;
  return i < 1 ? `lch(${n} ${c} ${h} / ${i})` : `lch(${n} ${c} ${h})`;
}
function ua(t) {
  const [a, e, s] = t.coords, r = s * Math.PI / 180, o = e * Math.cos(r), n = e * Math.sin(r);
  return X({
    coords: [a, o, n],
    alpha: t.alpha
  });
}
function pa(t) {
  const a = K(t), [e, s, r] = a.coords, o = Math.sqrt(s * s + r * r);
  let n;
  return o < 1e-4 ? n = 0 : (n = Math.atan2(r, s) * 180 / Math.PI, n < 0 && (n += 360)), {
    space: "lch",
    coords: [e, o, n],
    alpha: t.alpha
  };
}
function ba(t) {
  const a = t.match(
    /^oklab\(\s*([-+]?[\d\.]+)%?\s+([-+]?[\d\.]+)\s+([-+]?[\d\.]+)(?:\s*\/\s*([-+]?[\d\.]+)%?)?\s*\)$/i
  );
  if (!a) return;
  const [e, s, r, o, n] = a;
  let c = parseFloat(s);
  return a[1].endsWith("%") && (c /= 100), {
    space: "oklab",
    coords: [c, parseFloat(r), parseFloat(o)],
    alpha: n ? parseFloat(n) : 1,
    meta: {
      precision: (t.match(/\.\d+/g) || []).length > 0 ? Math.max(...(t.match(/\.\d+/g) || []).map((h) => h.length - 1)) : 0
    }
  };
}
function U(t) {
  const a = t.meta?.precision ?? 3, e = Math.pow(10, a), [s, r, o] = t.coords, n = Math.round(s * e) / e, c = Math.round(r * e) / e, h = Math.round(o * e) / e, i = Math.round(t.alpha * 1e3) / 1e3;
  return i < 1 ? `oklab(${n} ${c} ${h} / ${i})` : `oklab(${n} ${c} ${h})`;
}
function ma(t) {
  const [a, e, s] = t.coords, r = t.alpha, n = u(C, [a, e, s]).map((i) => i * i * i), c = u(B, n);
  return {
    space: "rgb",
    coords: R(c),
    alpha: r
  };
}
function ga(t) {
  const [a, e, s] = t.coords, r = v([a, e, s]), n = u(A, r).map((h) => Math.cbrt(h));
  return {
    space: "oklab",
    coords: u(O, n),
    alpha: t.alpha
  };
}
function Ma(t) {
  return t.match(
    /^oklch\(\s*([-+]?[\d\.]+)%?\s+([-+]?[\d\.]+)(%?)\s+([-+]?[\d\.]+)(deg|rad|grad|turn)?\s*(?:\/\s*([-+]?[\d\.]+)%?)?\s*\)$/i
  ), _(t);
}
function _(t) {
  const a = t.match(
    /^oklch\(\s*([^\s\/,]+)[\s,]+([^\s\/,]+)[\s,]+([^\s\/,]+)(?:[\s\/,]+([^\s\)]+))?\s*\)$/i
  );
  if (!a) return;
  let e = parseFloat(a[1]);
  a[1].endsWith("%") && (e /= 100);
  let s = parseFloat(a[2]);
  a[2].endsWith("%") && (s = s / 100 * 0.4);
  let r = parseFloat(a[3]);
  a[3].endsWith("rad") ? r = r * 180 / Math.PI : a[3].endsWith("grad") ? r = r * 0.9 : a[3].endsWith("turn") && (r = r * 360), r = r % 360, r < 0 && (r += 360);
  const o = a[4];
  let n = 1;
  return o && (n = parseFloat(o), o.endsWith("%") && (n /= 100)), {
    space: "oklch",
    coords: [e, s, r],
    alpha: Math.min(1, Math.max(0, n)),
    meta: {
      precision: (t.match(/\.\d+/g) || []).length > 0 ? Math.max(...(t.match(/\.\d+/g) || []).map((c) => c.length - 1)) : 0
    }
  };
}
function V(t) {
  const [a, e, s] = t.coords, r = t.meta?.precision ?? 3, o = Math.pow(10, r), n = Math.round(a * o) / o, c = Math.round(e * o) / o, h = Math.round(s * o) / o, i = Math.round(t.alpha * 1e3) / 1e3;
  return i < 1 ? `oklch(${n} ${c} ${h} / ${i})` : `oklch(${n} ${c} ${h})`;
}
function $a(t) {
  const [a, e, s] = t.coords, r = t.alpha, o = s * Math.PI / 180, n = a, c = e * Math.cos(o), h = e * Math.sin(o), l = u(C, [n, c, h]).map((M) => M * M * M), f = u(B, l);
  return {
    space: "rgb",
    coords: R(f),
    alpha: r
  };
}
function xa(t) {
  const [a, e, s] = t.coords, r = v([a, e, s]), n = u(A, r).map((d) => Math.cbrt(d)), [c, h, i] = u(O, n), l = Math.sqrt(h * h + i * i);
  let f;
  return l < 1e-4 ? f = 0 : (f = Math.atan2(i, h) * (180 / Math.PI), f < 0 && (f += 360)), {
    space: "oklch",
    coords: [c, l, f],
    alpha: t.alpha
  };
}
function ka(t) {
  const a = t.match(
    /^rgba?\(\s*([-+]?[\d\.]+)(%?)\s*,\s*([-+]?[\d\.]+)(%?)\s*,\s*([-+]?[\d\.]+)(%?)\s*(?:,\s*([-+]?[\d\.]+)(\%?))?\s*\)$/i
  );
  if (!a) {
    const e = t.match(
      /^rgba?\(\s*([-+]?[\d\.]+)(%?)\s+([-+]?[\d\.]+)(%?)\s+([-+]?[\d\.]+)(%?)\s*(?:\/\s*([-+]?[\d\.]+)(\%?))?\s*\)$/i
    );
    return e ? I(e) : void 0;
  }
  return I(a);
}
function I(t) {
  const a = $(t[1], t[2], 255), e = $(t[3], t[4], 255), s = $(t[5], t[6], 255), r = t[7] ? $(t[7], t[8], 1) : 1;
  return {
    space: "rgb",
    coords: [a, e, s],
    alpha: r
  };
}
function $(t, a, e) {
  let s = parseFloat(t);
  return a === "%" && (s = s / 100 * e), Math.min(Math.max(s, 0), e);
}
function j(t) {
  const { coords: a, alpha: e } = t, [s, r, o] = a.map((c) => Math.round(c)), n = Math.round(e * 1e3) / 1e3;
  return n < 1 ? `rgba(${s}, ${r}, ${o}, ${n})` : `rgb(${s}, ${r}, ${o})`;
}
function g(t, a) {
  if (t.space === a) return t;
  const e = ya(t);
  if (a === "rgb") return e;
  if (a === "hsl") return aa(e);
  if (a === "hsv") return sa(e);
  if (a === "oklch") return xa(e);
  if (a === "xyz") return q(e);
  if (a === "lab") return K(e);
  if (a === "lch") return pa(e);
  if (a === "oklab") return ga(e);
  if (a.startsWith("hex"))
    return e;
  throw new Error(`Unsupported target space: ${a}`);
}
function ya(t) {
  if (t.space === "rgb") return t;
  if (t.space === "hsl") return Q(t);
  if (t.space === "hsv") return ea(t);
  if (t.space === "oklch") return $a(t);
  if (t.space === "xyz") return P(t);
  if (t.space === "lab") return X(t);
  if (t.space === "lch") return ua(t);
  if (t.space === "oklab") return ma(t);
  if (t.space.startsWith("hex"))
    return { ...t, space: "rgb" };
  throw new Error(`Unsupported source space: ${t.space}`);
}
function b(t, { namedColors: a, nameResolver: e } = {}) {
  if (!t)
    return;
  if (t = t.trim(), e) {
    const r = e(t);
    if (r)
      return y("#" + r.replace("#", ""));
  }
  if (a) {
    const r = a[t];
    if (r)
      return y("#" + r.replace("#", ""));
  }
  if (t.startsWith("#")) return y(t);
  const s = t.toLowerCase();
  if (s.startsWith("rgb")) return ka(t);
  if (s.startsWith("hsl")) return Z(t);
  if (s.startsWith("hsv")) return ta(t);
  if (s.startsWith("oklch")) return Ma(t);
  if (s.startsWith("color(xyz")) return ha(t);
  if (s.startsWith("lab")) return ia(t);
  if (s.startsWith("lch")) return da(t);
  if (s.startsWith("oklab")) return ba(t);
}
function L(t, a) {
  return a === "hex" ? z(t) : a === "hex3" ? S(t) : a === "hex4" ? N(t) : a === "hex6" ? T(t) : a === "hex8" ? F(t) : a === "rgb" ? j(t) : a === "hsl" ? H(t) : a === "hsv" ? W(t) : a === "oklch" ? V(t) : a === "xyz" ? D(t) : a === "lab" ? G(t) : a === "lch" ? E(t) : a === "oklab" ? U(t) : z(t);
}
function wa(t) {
  return z(
    g(
      { space: "hsl", coords: [p(t), 100, 50], alpha: 1 },
      "rgb"
    )
  );
}
function va(t) {
  const a = g(
    { space: "hsl", coords: [p(t), 100, 50], alpha: 1 },
    "rgb"
  );
  return j(a);
}
function Ra(t) {
  return H({
    coords: [p(t), 100, 50],
    alpha: 1
  });
}
function _a(t) {
  return W({
    coords: [p(t), 100, 100],
    alpha: 1
  });
}
function Ia(t) {
  return V({
    coords: [0.7, 0.2, p(t)],
    alpha: 1
  });
}
function La(t) {
  const a = g(
    { space: "hsl", coords: [p(t), 100, 50], alpha: 1 },
    "xyz"
  );
  return D(a);
}
function Fa(t) {
  const s = p(t) * Math.PI / 180;
  return G({
    coords: [53, 104 * Math.cos(s), 104 * Math.sin(s)],
    alpha: 1
  });
}
function Ta(t) {
  return E({
    coords: [53, 104, p(t)],
    alpha: 1
  });
}
function Ha(t) {
  const s = p(t) * Math.PI / 180;
  return U({
    coords: [0.7, 0.2 * Math.cos(s), 0.2 * Math.sin(s)],
    alpha: 1
  });
}
function p(t) {
  return (t % 360 + 360) % 360;
}
function za(t = {}) {
  const e = (s, r) => {
    const o = b(s, t);
    if (o)
      return r = r ?? "hex", L(g(o, r), r);
  };
  return e.isColor = (s) => !!b(s, t), e.getType = (s) => {
    if (t.nameResolver?.(s) || t.namedColors?.[s])
      return "x11";
    const r = b(s, t);
    return r ? s.startsWith("#") ? "hex" : r.space : void 0;
  }, e.getAlpha = (s) => {
    const r = b(s, t)?.alpha ?? 1;
    return Math.round(r * 1e3) / 1e3;
  }, e.setAlpha = (s, r) => {
    const o = b(s, t);
    if (!o) return;
    o.alpha = Math.min(1, Math.max(0, r));
    const n = s.startsWith("#") ? "hex" : o.space;
    return L(o, n);
  }, e.removeAlpha = (s) => e.setAlpha(s, 1), e.isEqual = (s, r) => {
    if (s === r) return !0;
    if (!s || !r) return !1;
    const o = b(s, t), n = b(r, t);
    if (!o || !n) return !1;
    const c = g(o, "rgb"), h = g(n, "rgb"), i = 0.5;
    return Math.abs(c.coords[0] - h.coords[0]) < i && Math.abs(c.coords[1] - h.coords[1]) < i && Math.abs(c.coords[2] - h.coords[2]) < i && Math.abs(c.alpha - h.alpha) < 0.01;
  }, e;
}
const Wa = {
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
}, Aa = za();
export {
  Aa as coco,
  g as convert,
  za as createCoco,
  wa as hue2hex,
  Ra as hue2hsl,
  _a as hue2hsv,
  Fa as hue2lab,
  Ta as hue2lch,
  Ha as hue2oklab,
  Ia as hue2oklch,
  va as hue2rgb,
  La as hue2xyz,
  Wa as namedColors,
  b as parse,
  L as serialize
};
