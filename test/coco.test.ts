import { describe, it, expect } from "vitest";
import {
  hue2hex,
  hue2rgb,
  hue2hsl,
  hue2hsv,
  hue2oklch,
  hue2xyz,
  hue2lab,
  hue2lch,
  hue2oklab,
  createCoco,
  namedColors,
} from "../src/coco";

const coco = createCoco({ namedColors });

const x11 = "red";
const hex3 = "#f00";
const hex6 = "#ff0000";
const hex4 = "#f00f";
const hex4_80 = "#f00c";
const hex8 = "#ff0000ff";
const hex8_80 = "#ff0000cc";
const rgb = "rgb(255, 0, 0)";
const rgb_80 = "rgba(255, 0, 0, 0.8)";
const hsl = "hsl(0, 100%, 50%)";
const hsl_80 = "hsla(0, 100%, 50%, 0.8)";
const hsv = "hsv(0, 100%, 100%)";
const hsv_80 = "hsva(0, 100%, 100%, 0.8)";
const xyz = "color(xyz 0.4125 0.2127 0.0193)";
const xyz_80 = "color(xyz 0.4125 0.2127 0.0193 / 0.8)";
const lab = "lab(54.292 80.812 69.885)";
const lab_80 = "lab(54.292 80.812 69.885 / 0.8)";
const lch = "lch(54.292 106.839 40.853)";
const lch_80 = "lch(54.292 106.839 40.853 / 0.8)";
const oklab = "oklab(0.628 0.225 0.126)";
const oklab_80 = "oklab(0.628 0.225 0.126 / 0.8)";
const oklch = "oklch(0.628 0.258 29.23)";
const oklch_80 = "oklch(0.628 0.258 29.23 / 0.8)";

describe("Taksim-Coco Library", () => {
  describe("x11", () => {
    it("hex", () => expect(coco(x11, "hex")).toBe(hex6));
    it("hex3", () => expect(coco(x11, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(x11, "hex4")).toBe(hex4));
    it("hex6", () => expect(coco(x11, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(x11, "hex8")).toBe(hex8));
    it("rgb", () => expect(coco(x11, "rgb")).toBe(rgb));
    it("hsl", () => expect(coco(x11, "hsl")).toBe(hsl));
    it("hsv", () => expect(coco(x11, "hsv")).toBe(hsv));
    it("xyz", () => expect(coco(x11, "xyz")).toBe(xyz));
    it("lab", () => expect(coco(x11, "lab")).toBe(lab));
    it("lch", () => expect(coco(x11, "lch")).toBe(lch));
    it("oklab", () => expect(coco(x11, "oklab")).toBe(oklab));
    it("oklch", () => expect(coco(x11, "oklch")).toBe(oklch));
  });

  describe("hex3", () => {
    it("hex", () => expect(coco(hex3, "hex")).toBe(hex6));
    it("hex3", () => expect(coco(hex3, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(hex3, "hex4")).toBe(hex4));
    it("hex6", () => expect(coco(hex3, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(hex3, "hex8")).toBe(hex8));
    it("rgb", () => expect(coco(hex3, "rgb")).toBe(rgb));
    it("hsl", () => expect(coco(hex3, "hsl")).toBe(hsl));
    it("hsv", () => expect(coco(hex3, "hsv")).toBe(hsv));
    it("xyz", () => expect(coco(hex3, "xyz")).toBe(xyz));
    it("lab", () => expect(coco(hex3, "lab")).toBe(lab));
    it("lch", () => expect(coco(hex3, "lch")).toBe(lch));
    it("oklab", () => expect(coco(hex3, "oklab")).toBe(oklab));
    it("oklch", () => expect(coco(hex3, "oklch")).toBe(oklch));
  });

  describe("hex6", () => {
    it("hex", () => expect(coco(hex6, "hex")).toBe(hex6));
    it("hex3", () => expect(coco(hex6, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(hex6, "hex4")).toBe(hex4));
    it("hex6", () => expect(coco(hex6, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(hex6, "hex8")).toBe(hex8));
    it("rgb", () => expect(coco(hex6, "rgb")).toBe(rgb));
    it("hsl", () => expect(coco(hex6, "hsl")).toBe(hsl));
    it("hsv", () => expect(coco(hex6, "hsv")).toBe(hsv));
    it("xyz", () => expect(coco(hex6, "xyz")).toBe(xyz));
    it("lab", () => expect(coco(hex6, "lab")).toBe(lab));
    it("lch", () => expect(coco(hex6, "lch")).toBe(lch));
    it("oklab", () => expect(coco(hex6, "oklab")).toBe(oklab));
    it("oklch", () => expect(coco(hex6, "oklch")).toBe(oklch));
  });

  describe("hex4", () => {
    it("hex", () => expect(coco(hex4, "hex")).toBe(hex6));
    it("hex3", () => expect(coco(hex4, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(hex4, "hex4")).toBe(hex4));
    it("hex6", () => expect(coco(hex4, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(hex4, "hex8")).toBe(hex8));
    it("rgb", () => expect(coco(hex4, "rgb")).toBe(rgb));
    it("hsl", () => expect(coco(hex4, "hsl")).toBe(hsl));
    it("hsv", () => expect(coco(hex4, "hsv")).toBe(hsv));
    it("xyz", () => expect(coco(hex4, "xyz")).toBe(xyz));
    it("lab", () => expect(coco(hex4, "lab")).toBe(lab));
    it("lch", () => expect(coco(hex4, "lch")).toBe(lch));
    it("oklab", () => expect(coco(hex4, "oklab")).toBe(oklab));
    it("oklch", () => expect(coco(hex4, "oklch")).toBe(oklch));
  });

  describe("hex4_80", () => {
    it("hex", () => expect(coco(hex4_80, "hex")).toBe(hex8_80));
    it("hex3", () => expect(coco(hex4_80, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(hex4_80, "hex4")).toBe(hex4_80));
    it("hex6", () => expect(coco(hex4_80, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(hex4_80, "hex8")).toBe(hex8_80));
    it("rgb", () => expect(coco(hex4_80, "rgb")).toBe(rgb_80));
    it("hsl", () => expect(coco(hex4_80, "hsl")).toBe(hsl_80));
    it("hsv", () => expect(coco(hex4_80, "hsv")).toBe(hsv_80));
    it("xyz", () => expect(coco(hex4_80, "xyz")).toBe(xyz_80));
    it("lab", () => expect(coco(hex4_80, "lab")).toBe(lab_80));
    it("lch", () => expect(coco(hex4_80, "lch")).toBe(lch_80));
    it("oklab", () => expect(coco(hex4_80, "oklab")).toBe(oklab_80));
    it("oklch", () => expect(coco(hex4_80, "oklch")).toBe(oklch_80));
  });

  describe("hex8", () => {
    it("hex", () => expect(coco(hex8, "hex")).toBe(hex6));
    it("hex3", () => expect(coco(hex8, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(hex8, "hex4")).toBe(hex4));
    it("hex6", () => expect(coco(hex8, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(hex8, "hex8")).toBe(hex8));
    it("rgb", () => expect(coco(hex8, "rgb")).toBe(rgb));
    it("hsl", () => expect(coco(hex8, "hsl")).toBe(hsl));
    it("hsv", () => expect(coco(hex8, "hsv")).toBe(hsv));
    it("xyz", () => expect(coco(hex8, "xyz")).toBe(xyz));
    it("lab", () => expect(coco(hex8, "lab")).toBe(lab));
    it("lch", () => expect(coco(hex8, "lch")).toBe(lch));
    it("oklab", () => expect(coco(hex8, "oklab")).toBe(oklab));
    it("oklch", () => expect(coco(hex8, "oklch")).toBe(oklch));
  });

  describe("hex8_80", () => {
    it("hex", () => expect(coco(hex8_80, "hex")).toBe(hex8_80));
    it("hex3", () => expect(coco(hex8_80, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(hex8_80, "hex4")).toBe(hex4_80));
    it("hex6", () => expect(coco(hex8_80, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(hex8_80, "hex8")).toBe(hex8_80));
    it("rgb", () => expect(coco(hex8_80, "rgb")).toBe(rgb_80));
    it("hsl", () => expect(coco(hex8_80, "hsl")).toBe(hsl_80));
    it("hsv", () => expect(coco(hex8_80, "hsv")).toBe(hsv_80));
    it("xyz", () => expect(coco(hex8_80, "xyz")).toBe(xyz_80));
    it("lab", () => expect(coco(hex8_80, "lab")).toBe(lab_80));
    it("lch", () => expect(coco(hex8_80, "lch")).toBe(lch_80));
    it("oklab", () => expect(coco(hex8_80, "oklab")).toBe(oklab_80));
    it("oklch", () => expect(coco(hex8_80, "oklch")).toBe(oklch_80));
  });

  describe("rgb", () => {
    it("hex", () => expect(coco(rgb, "hex")).toBe(hex6));
    it("hex3", () => expect(coco(rgb, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(rgb, "hex4")).toBe(hex4));
    it("hex6", () => expect(coco(rgb, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(rgb, "hex8")).toBe(hex8));
    it("rgb", () => expect(coco(rgb, "rgb")).toBe(rgb));
    it("hsl", () => expect(coco(rgb, "hsl")).toBe(hsl));
    it("hsv", () => expect(coco(rgb, "hsv")).toBe(hsv));
    it("xyz", () => expect(coco(rgb, "xyz")).toBe(xyz));
    it("lab", () => expect(coco(rgb, "lab")).toBe(lab));
    it("lch", () => expect(coco(rgb, "lch")).toBe(lch));
    it("oklab", () => expect(coco(rgb, "oklab")).toBe(oklab));
    it("oklch", () => expect(coco(rgb, "oklch")).toBe(oklch));
  });

  describe("rgb_80", () => {
    it("hex", () => expect(coco(rgb_80, "hex")).toBe(hex8_80));
    it("hex3", () => expect(coco(rgb_80, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(rgb_80, "hex4")).toBe(hex4_80));
    it("hex6", () => expect(coco(rgb_80, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(rgb_80, "hex8")).toBe(hex8_80));
    it("rgb", () => expect(coco(rgb_80, "rgb")).toBe(rgb_80));
    it("hsl", () => expect(coco(rgb_80, "hsl")).toBe(hsl_80));
    it("hsv", () => expect(coco(rgb_80, "hsv")).toBe(hsv_80));
    it("xyz", () => expect(coco(rgb_80, "xyz")).toBe(xyz_80));
    it("lab", () => expect(coco(rgb_80, "lab")).toBe(lab_80));
    it("lch", () => expect(coco(rgb_80, "lch")).toBe(lch_80));
    it("oklab", () => expect(coco(rgb_80, "oklab")).toBe(oklab_80));
    it("oklch", () => expect(coco(rgb_80, "oklch")).toBe(oklch_80));
  });

  describe("hsl", () => {
    it("hex", () => expect(coco(hsl, "hex")).toBe(hex6));
    it("hex3", () => expect(coco(hsl, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(hsl, "hex4")).toBe(hex4));
    it("hex6", () => expect(coco(hsl, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(hsl, "hex8")).toBe(hex8));
    it("rgb", () => expect(coco(hsl, "rgb")).toBe(rgb));
    it("hsl", () => expect(coco(hsl, "hsl")).toBe(hsl));
    it("hsv", () => expect(coco(hsl, "hsv")).toBe(hsv));
    it("xyz", () => expect(coco(hsl, "xyz")).toBe(xyz));
    it("lab", () => expect(coco(hsl, "lab")).toBe(lab));
    it("lch", () => expect(coco(hsl, "lch")).toBe(lch));
    it("oklab", () => expect(coco(hsl, "oklab")).toBe(oklab));
    it("oklch", () => expect(coco(hsl, "oklch")).toBe(oklch));
  });

  describe("hsl_80", () => {
    it("hex", () => expect(coco(hsl_80, "hex")).toBe(hex8_80));
    it("hex3", () => expect(coco(hsl_80, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(hsl_80, "hex4")).toBe(hex4_80));
    it("hex6", () => expect(coco(hsl_80, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(hsl_80, "hex8")).toBe(hex8_80));
    it("rgb", () => expect(coco(hsl_80, "rgb")).toBe(rgb_80));
    it("hsl", () => expect(coco(hsl_80, "hsl")).toBe(hsl_80));
    it("hsv", () => expect(coco(hsl_80, "hsv")).toBe(hsv_80));
    it("xyz", () => expect(coco(hsl_80, "xyz")).toBe(xyz_80));
    it("lab", () => expect(coco(hsl_80, "lab")).toBe(lab_80));
    it("lch", () => expect(coco(hsl_80, "lch")).toBe(lch_80));
    it("oklab", () => expect(coco(hsl_80, "oklab")).toBe(oklab_80));
    it("oklch", () => expect(coco(hsl_80, "oklch")).toBe(oklch_80));
  });

  describe("hsv", () => {
    it("hex", () => expect(coco(hsv, "hex")).toBe(hex6));
    it("hex3", () => expect(coco(hsv, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(hsv, "hex4")).toBe(hex4));
    it("hex6", () => expect(coco(hsv, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(hsv, "hex8")).toBe(hex8));
    it("rgb", () => expect(coco(hsv, "rgb")).toBe(rgb));
    it("hsl", () => expect(coco(hsv, "hsl")).toBe(hsl));
    it("hsv", () => expect(coco(hsv, "hsv")).toBe(hsv));
    it("xyz", () => expect(coco(hsv, "xyz")).toBe(xyz));
    it("lab", () => expect(coco(hsv, "lab")).toBe(lab));
    it("lch", () => expect(coco(hsv, "lch")).toBe(lch));
    it("oklab", () => expect(coco(hsv, "oklab")).toBe(oklab));
    it("oklch", () => expect(coco(hsv, "oklch")).toBe(oklch));
  });

  describe("hsv_80", () => {
    it("hex", () => expect(coco(hsv_80, "hex")).toBe(hex8_80));
    it("hex3", () => expect(coco(hsv_80, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(hsv_80, "hex4")).toBe(hex4_80));
    it("hex6", () => expect(coco(hsv_80, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(hsv_80, "hex8")).toBe(hex8_80));
    it("rgb", () => expect(coco(hsv_80, "rgb")).toBe(rgb_80));
    it("hsl", () => expect(coco(hsv_80, "hsl")).toBe(hsl_80));
    it("hsv", () => expect(coco(hsv_80, "hsv")).toBe(hsv_80));
    it("xyz", () => expect(coco(hsv_80, "xyz")).toBe(xyz_80));
    it("lab", () => expect(coco(hsv_80, "lab")).toBe(lab_80));
    it("lch", () => expect(coco(hsv_80, "lch")).toBe(lch_80));
    it("oklab", () => expect(coco(hsv_80, "oklab")).toBe(oklab_80));
    it("oklch", () => expect(coco(hsv_80, "oklch")).toBe(oklch_80));
  });

  describe("xyz", () => {
    it("hex", () => expect(coco(xyz, "hex")).toBe(hex6));
    it("hex3", () => expect(coco(xyz, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(xyz, "hex4")).toBe(hex4));
    it("hex6", () => expect(coco(xyz, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(xyz, "hex8")).toBe(hex8));
    it("rgb", () => expect(coco(xyz, "rgb")).toBe(rgb));
    it("hsl", () => expect(coco(xyz, "hsl")).toBe(hsl));
    it("hsv", () => expect(coco(xyz, "hsv")).toBe(hsv));
    it("xyz", () => expect(coco(xyz, "xyz")).toBe(xyz));
    it("lab", () => expect(coco(xyz, "lab")).toBe(lab));
    it("lch", () => expect(coco(xyz, "lch")).toBe(lch));
    it("oklab", () => expect(coco(xyz, "oklab")).toBe(oklab));
    it("oklch", () => expect(coco(xyz, "oklch")).toBe(oklch));
  });

  describe("xyz_80", () => {
    it("hex", () => expect(coco(xyz_80, "hex")).toBe(hex8_80));
    it("hex3", () => expect(coco(xyz_80, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(xyz_80, "hex4")).toBe(hex4_80));
    it("hex6", () => expect(coco(xyz_80, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(xyz_80, "hex8")).toBe(hex8_80));
    it("rgb", () => expect(coco(xyz_80, "rgb")).toBe(rgb_80));
    it("hsl", () => expect(coco(xyz_80, "hsl")).toBe(hsl_80));
    it("hsv", () => expect(coco(xyz_80, "hsv")).toBe(hsv_80));
    it("xyz", () => expect(coco(xyz_80, "xyz")).toBe(xyz_80));
    it("lab", () => expect(coco(xyz_80, "lab")).toBe(lab_80));
    it("lch", () => expect(coco(xyz_80, "lch")).toBe(lch_80));
    it("oklab", () => expect(coco(xyz_80, "oklab")).toBe(oklab_80));
    it("oklch", () => expect(coco(xyz_80, "oklch")).toBe(oklch_80));
  });

  describe("lab", () => {
    it("hex", () => expect(coco(lab, "hex")).toBe(hex6));
    it("hex3", () => expect(coco(lab, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(lab, "hex4")).toBe(hex4));
    it("hex6", () => expect(coco(lab, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(lab, "hex8")).toBe(hex8));
    it("rgb", () => expect(coco(lab, "rgb")).toBe(rgb));
    it("hsl", () => expect(coco(lab, "hsl")).toBe(hsl));
    it("hsv", () => expect(coco(lab, "hsv")).toBe(hsv));
    it("xyz", () => expect(coco(lab, "xyz")).toBe(xyz));
    it("lab", () => expect(coco(lab, "lab")).toBe(lab));
    it("lch", () => expect(coco(lab, "lch")).toBe(lch));
    it("oklab", () => expect(coco(lab, "oklab")).toBe(oklab));
    it("oklch", () => expect(coco(lab, "oklch")).toBe(oklch));
  });

  describe("lab_80", () => {
    it("hex", () => expect(coco(lab_80, "hex")).toBe(hex8_80));
    it("hex3", () => expect(coco(lab_80, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(lab_80, "hex4")).toBe(hex4_80));
    it("hex6", () => expect(coco(lab_80, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(lab_80, "hex8")).toBe(hex8_80));
    it("rgb", () => expect(coco(lab_80, "rgb")).toBe(rgb_80));
    it("hsl", () => expect(coco(lab_80, "hsl")).toBe(hsl_80));
    it("hsv", () => expect(coco(lab_80, "hsv")).toBe(hsv_80));
    it("xyz", () => expect(coco(lab_80, "xyz")).toBe(xyz_80));
    it("lab", () => expect(coco(lab_80, "lab")).toBe(lab_80));
    it("lch", () => expect(coco(lab_80, "lch")).toBe(lch_80));
    it("oklab", () => expect(coco(lab_80, "oklab")).toBe(oklab_80));
    it("oklch", () => expect(coco(lab_80, "oklch")).toBe(oklch_80));
  });

  describe("lch", () => {
    it("hex", () => expect(coco(lch, "hex")).toBe(hex6));
    it("hex3", () => expect(coco(lch, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(lch, "hex4")).toBe(hex4));
    it("hex6", () => expect(coco(lch, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(lch, "hex8")).toBe(hex8));
    it("rgb", () => expect(coco(lch, "rgb")).toBe(rgb));
    it("hsl", () => expect(coco(lch, "hsl")).toBe(hsl));
    it("hsv", () => expect(coco(lch, "hsv")).toBe(hsv));
    it("xyz", () => expect(coco(lch, "xyz")).toBe(xyz));
    it("lab", () => expect(coco(lch, "lab")).toBe(lab));
    it("lch", () => expect(coco(lch, "lch")).toBe(lch));
    it("oklab", () => expect(coco(lch, "oklab")).toBe(oklab));
    it("oklch", () => expect(coco(lch, "oklch")).toBe(oklch));
  });

  describe("lch_80", () => {
    it("hex", () => expect(coco(lch_80, "hex")).toBe(hex8_80));
    it("hex3", () => expect(coco(lch_80, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(lch_80, "hex4")).toBe(hex4_80));
    it("hex6", () => expect(coco(lch_80, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(lch_80, "hex8")).toBe(hex8_80));
    it("rgb", () => expect(coco(lch_80, "rgb")).toBe(rgb_80));
    it("hsl", () => expect(coco(lch_80, "hsl")).toBe(hsl_80));
    it("hsv", () => expect(coco(lch_80, "hsv")).toBe(hsv_80));
    it("xyz", () => expect(coco(lch_80, "xyz")).toBe(xyz_80));
    it("lab", () => expect(coco(lch_80, "lab")).toBe(lab_80));
    it("lch", () => expect(coco(lch_80, "lch")).toBe(lch_80));
    it("oklab", () => expect(coco(lch_80, "oklab")).toBe(oklab_80));
    it("oklch", () => expect(coco(lch_80, "oklch")).toBe(oklch_80));
  });

  describe("oklab", () => {
    it("hex", () => expect(coco(oklab, "hex")).toBe(hex6));
    it("hex3", () => expect(coco(oklab, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(oklab, "hex4")).toBe(hex4));
    it("hex6", () => expect(coco(oklab, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(oklab, "hex8")).toBe(hex8));
    it("rgb", () => expect(coco(oklab, "rgb")).toBe(rgb));
    it("hsl", () => expect(coco(oklab, "hsl")).toBe(hsl));
    it("hsv", () => expect(coco(oklab, "hsv")).toBe(hsv));
    it("xyz", () => expect(coco(oklab, "xyz")).toBe(xyz));
    it("lab", () => expect(coco(oklab, "lab")).toBe(lab));
    it("lch", () => expect(coco(oklab, "lch")).toBe(lch));
    it("oklab", () => expect(coco(oklab, "oklab")).toBe(oklab));
    it("oklch", () => expect(coco(oklab, "oklch")).toBe(oklch));
  });

  describe("oklab_80", () => {
    it("hex", () => expect(coco(oklab_80, "hex")).toBe(hex8_80));
    it("hex3", () => expect(coco(oklab_80, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(oklab_80, "hex4")).toBe(hex4_80));
    it("hex6", () => expect(coco(oklab_80, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(oklab_80, "hex8")).toBe(hex8_80));
    it("rgb", () => expect(coco(oklab_80, "rgb")).toBe(rgb_80));
    it("hsl", () => expect(coco(oklab_80, "hsl")).toBe(hsl_80));
    it("hsv", () => expect(coco(oklab_80, "hsv")).toBe(hsv_80));
    it("xyz", () => expect(coco(oklab_80, "xyz")).toBe(xyz_80));
    it("lab", () => expect(coco(oklab_80, "lab")).toBe(lab_80));
    it("lch", () => expect(coco(oklab_80, "lch")).toBe(lch_80));
    it("oklab", () => expect(coco(oklab_80, "oklab")).toBe(oklab_80));
    it("oklch", () => expect(coco(oklab_80, "oklch")).toBe(oklch_80));
  });

  describe("oklch", () => {
    it("hex", () => expect(coco(oklch, "hex")).toBe(hex6));
    it("hex3", () => expect(coco(oklch, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(oklch, "hex4")).toBe(hex4));
    it("hex6", () => expect(coco(oklch, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(oklch, "hex8")).toBe(hex8));
    it("rgb", () => expect(coco(oklch, "rgb")).toBe(rgb));
    it("hsl", () => expect(coco(oklch, "hsl")).toBe(hsl));
    it("hsv", () => expect(coco(oklch, "hsv")).toBe(hsv));
    it("xyz", () => expect(coco(oklch, "xyz")).toBe(xyz));
    it("lab", () => expect(coco(oklch, "lab")).toBe(lab));
    it("lch", () => expect(coco(oklch, "lch")).toBe(lch));
    it("oklab", () => expect(coco(oklch, "oklab")).toBe(oklab));
    it("oklch", () => expect(coco(oklch, "oklch")).toBe(oklch));
  });

  describe("oklch_80", () => {
    it("hex", () => expect(coco(oklch_80, "hex")).toBe(hex8_80));
    it("hex3", () => expect(coco(oklch_80, "hex3")).toBe(hex3));
    it("hex4", () => expect(coco(oklch_80, "hex4")).toBe(hex4_80));
    it("hex6", () => expect(coco(oklch_80, "hex6")).toBe(hex6));
    it("hex8", () => expect(coco(oklch_80, "hex8")).toBe(hex8_80));
    it("rgb", () => expect(coco(oklch_80, "rgb")).toBe(rgb_80));
    it("hsl", () => expect(coco(oklch_80, "hsl")).toBe(hsl_80));
    it("hsv", () => expect(coco(oklch_80, "hsv")).toBe(hsv_80));
    it("xyz", () => expect(coco(oklch_80, "xyz")).toBe(xyz_80));
    it("lab", () => expect(coco(oklch_80, "lab")).toBe(lab_80));
    it("lch", () => expect(coco(oklch_80, "lch")).toBe(lch_80));
    it("oklab", () => expect(coco(oklch_80, "oklab")).toBe(oklab_80));
    it("oklch", () => expect(coco(oklch_80, "oklch")).toBe(oklch_80));
  });

  describe("RGB", () => {
    describe("Clamping/Edge Cases", () => {
      it("clamps negative RGB values to 0", () => {
        expect(coco("rgb(-1, -1, -1)", "hex")).toBe("#000000");
      });
      it("clamps RGB values > 255 to 255", () => {
        expect(coco("rgb(256, 256, 256)", "hex")).toBe("#ffffff");
      });
    });
  });

  describe("HSL", () => {
    describe("Edge Cases", () => {
      it("clamps negative HSL values", () => {
        expect(coco("hsl(-1, -1%, -1%)", "hex")).toBe("#000000");
      });
      it("clamps HSL values > 100%", () => {
        expect(coco("hsl(361, 101%, 101%)", "hex")).toBe("#ffffff");
      });
      it("normalizes negative hue", () => {
        expect(coco("hsl(-1, 100%, 50%)", "hex")).toMatch(/^#ff[0-9a-f]{4}$/);
      });
      it("normalizes hue > 360", () => {
        expect(coco("hsl(361, 100%, 50%)", "hex")).toMatch(/^#ff[0-9a-f]{4}$/);
      });
    });
  });

  describe("HSV", () => {
    it("parses signed values", () => {
      expect(coco("hsv(-120, 100%, 50%)", "hsv")).toBe("hsv(240, 100%, 50%)");
    });
  });

  describe("XYZ", () => {
    it("parses and serializes", () => {
      // Signed input check
      expect(coco("color(xyz -0.1 0.2 0.3)", "xyz")).toBe(
        "color(xyz -0.1 0.2 0.3)"
      );
    });
  });

  describe("LAB", () => {
    it("parses and serializes", () => {
      expect(coco("lab(50 -20 -30)", "lab")).toBe("lab(50 -20 -30)");
    });
  });

  describe("LCH", () => {
    it("parses and serializes", () => {
      expect(coco("lch(50 50 -90)", "lch")).toBe("lch(50 50 270)");
    });
  });

  describe("OKLAB", () => {
    it("parses and serializes", () => {
      expect(coco(oklab, "oklab")).toBe(oklab);
      expect(coco("oklab(0.5 -0.1 -0.1)", "oklab")).toBe(
        "oklab(0.5 -0.1 -0.1)"
      );
    });
  });

  describe("OKLCH", () => {
    it("parses and serializes", () => {
      expect(coco("oklch(0.5 0.1 -90)", "oklch")).toBe("oklch(0.5 0.1 270)");
    });
  });

  describe("Core Parsing & Validation", () => {
    it("validates isColor", () => {
      expect(coco.isColor(x11)).toBe(true);
      expect(coco.isColor(hex3)).toBe(true);
      expect(coco.isColor(hex4)).toBe(true);
      expect(coco.isColor(hex6)).toBe(true);
      expect(coco.isColor(hex8)).toBe(true);
      expect(coco.isColor(rgb)).toBe(true);
      expect(coco.isColor(hsl)).toBe(true);
      expect(coco.isColor(hsv)).toBe(true);
      expect(coco.isColor(oklch)).toBe(true);
      expect(coco.isColor(oklab)).toBe(true);
      expect(coco.isColor(lab)).toBe(true);
      expect(coco.isColor(lch)).toBe(true);
      expect(coco.isColor(xyz)).toBe(true);
      expect(coco.isColor("foo")).toBe(false);
    });

    it("identifies space via getType", () => {
      expect(coco.getType(x11)).toBe("x11");
      expect(coco.getType(hex3)).toBe("hex");
      expect(coco.getType(hex4)).toBe("hex");
      expect(coco.getType(hex6)).toBe("hex");
      expect(coco.getType(hex8)).toBe("hex");
      expect(coco.getType(rgb)).toBe("rgb");
      expect(coco.getType(hsl)).toBe("hsl");
      expect(coco.getType(hsv)).toBe("hsv");
      expect(coco.getType(oklch)).toBe("oklch");
      expect(coco.getType(oklab)).toBe("oklab");
      expect(coco.getType(lab)).toBe("lab");
      expect(coco.getType(lch)).toBe("lch");
      expect(coco.getType(xyz)).toBe("xyz");
    });

    it("returns undefined for totally invalid input", () => {
      expect(coco("invalid_color")).toBe(undefined);
    });

    it("returns undefined for garbage rgb string", () => {
      expect(coco("rgb(foo, bar, baz)")).toBe(undefined);
    });

    it("does not support raw comma numbers by default", () => {
      expect(coco("75, 79, 33")).toBe(undefined);
    });

    it("does not support named colors by default", () => {
      const leanCoco = createCoco();
      expect(leanCoco(x11)).toBe(undefined);
    });
  });

  describe("Factory Configuration", () => {
    it("supports custom named colors", () => {
      const cocoWithNamedColors = createCoco({ namedColors });
      expect(cocoWithNamedColors(x11, "hex")).toBe(hex6);
    });

    it("supports custom resolver", () => {
      const cocoWithNameResolver = createCoco({
        nameResolver: (n: string) => (n === "mycolor" ? "f00" : undefined),
      });
      expect(cocoWithNameResolver("mycolor", "hex")).toBe(hex6);
    });
  });

  describe("Utilities", () => {
    describe("Hue Helpers", () => {
      it("hue2hex", () => expect(hue2hex(120)).toBe("#00ff00"));
      it("hue2rgb", () => expect(hue2rgb(120)).toBe("rgb(0, 255, 0)"));
      it("hue2hsl", () => expect(hue2hsl(240)).toBe("hsl(240, 100%, 50%)"));
      it("hue2hsv", () => expect(hue2hsv(300)).toBe("hsv(300, 100%, 100%)"));
      it("hue2oklch", () => expect(hue2oklch(180)).toBe("oklch(0.7 0.2 180)"));
      it("hue2lab", () => expect(hue2lab(0)).toBe("lab(53 104 0)"));
      it("hue2lch", () => expect(hue2lch(40)).toBe("lch(53 104 40)"));
      it("hue2oklab", () => expect(hue2oklab(0)).toBe("oklab(0.7 0.2 0)"));
      it("hue2xyz", () =>
        expect(hue2xyz(120)).toBe("color(xyz 0.3576 0.7152 0.1192)"));
    });

    describe("Alpha Manipulation (get/set)", () => {
      it("gets alpha from rgba", () =>
        expect(coco.getAlpha("rgba(0,0,0,0.5)")).toBe(0.5));
      it("gets alpha from hex8", () =>
        expect(coco.getAlpha("#ff000080")).toBeCloseTo(0.5019, 2));
      it("gets alpha defaulting to 1", () =>
        expect(coco.getAlpha("red")).toBe(1));
      it("gets alpha from oklch", () =>
        expect(coco.getAlpha("oklch(0.5 0.1 100 / 0.5)")).toBe(0.5));

      it("sets alpha on named color", () =>
        expect(coco.setAlpha("red", 0.5)).toBe("rgba(255, 0, 0, 0.5)"));
      it("sets alpha on hex", () =>
        expect(coco.setAlpha("#f00", 0.5)).toBe("#ff000080"));
      it("updates existing alpha", () =>
        expect(coco.setAlpha("rgba(0, 0, 0, 0.5)", 0.8)).toBe(
          "rgba(0, 0, 0, 0.8)"
        ));
      it("removes alpha from rgba", () =>
        expect(coco.removeAlpha("rgba(0, 0, 0, 0.5)")).toBe("rgb(0, 0, 0)"));
      it("removes alpha from hex8", () =>
        expect(coco.removeAlpha("#ff000080")).toBe("#ff0000"));

      // Alpha Edge Cases
      it("handles alpha > 1 in input", () =>
        expect(coco("rgba(0, 0, 0, 1.5)", "hex8")).toBe("#000000ff"));
      it("handles negative alpha", () =>
        expect(coco("rgba(0,0,0,-0.5)", "hex8")).toBe("#00000000"));
    });

    describe("Equality (isEqual)", () => {
      it("compares same colors", () => {
        expect(coco.isEqual("red", "#f00")).toBe(true);
        expect(coco.isEqual("rgb(255, 0, 0)", "hsl(0, 100%, 50%)")).toBe(true);
      });
      it("compares different colors", () => {
        expect(coco.isEqual("red", "blue")).toBe(false);
      });
      it("respects alpha in equality", () => {
        expect(coco.isEqual("#ff0000", "#ff000080")).toBe(false);
      });
    });
  });

  // =========================================
  // 5. Integration & External Data
  // =========================================
  describe("Integration & Reference Tests (External Coverage)", () => {
    it("Validates specific conversions", () => {
      expect(coco("hsl(0, 0%, 0%)", "hsv")).toBe("hsv(0, 0%, 0%)");
      expect(coco("rgb(0, 0, 0)", "lab")).toBe("lab(0 0 0)");
      expect(coco("rgb(255, 255, 255)", "lab")).toBe("lab(100 0 0)");
      expect(coco("rgb(128, 128, 128)", "hsl")).toBe("hsl(0, 0%, 50%)");
      expect(coco("bisque", "rgb")).toBe("rgb(255, 228, 196)");
      expect(coco("blue", "lab")).toBe("lab(29.568 68.299 -112.029)");
      expect(coco("oklch(0.64 0.22 295)", "rgb")).toBe("rgb(154, 101, 255)");
      expect(coco("oklab(0.64 0.09 -0.20)", "rgb")).toBe("rgb(152, 102, 255)");
      expect(coco("lab(75 20 -30)", "rgb")).toBe("rgb(201, 173, 240)");
      expect(coco("color(xyz 0.25 0.40 0.15)", "rgb")).toBe("rgb(97, 190, 85)");
      expect(coco("rgb(92, 191, 84)", "lch")).toBe("lch(69.66 63.724 136.482)");
      expect(coco("rgb(92, 191, 84)", "lab")).toBe("lab(69.66 -46.21 43.879)");
      expect(coco("rgb(92, 191, 84)", "xyz")).toBe(
        "color(xyz 0.2464 0.4018 0.1484)"
      );
      expect(coco("rgb(153, 102, 255)", "oklab")).toBe(
        "oklab(0.64 0.091 -0.197)"
      );
      expect(coco("rgb(153, 102, 255)", "oklch")).toBe(
        "oklch(0.64 0.217 294.87)"
      );
    });
  });
});
