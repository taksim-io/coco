import {
  convert,
  hue2hex,
  hue2hsl,
  hue2hsv,
  hue2lab,
  hue2lch,
  hue2oklab,
  hue2oklch,
  hue2rgb,
  hue2xyz,
  parse,
  serialize,
} from "./core/convert";
import { createCoco } from "./core/factory";
import { namedColors } from "./data/named-colors";

const coco = createCoco();

export {
  coco,
  convert,
  createCoco,
  hue2hex,
  hue2hsl,
  hue2hsv,
  hue2lab,
  hue2lch,
  hue2oklab,
  hue2oklch,
  hue2rgb,
  hue2xyz,
  namedColors,
  parse,
  serialize,
};
