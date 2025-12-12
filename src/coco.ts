import { createCoco } from "./core/factory";
import {
  convert,
  hue2hex,
  hue2rgb,
  hue2hsl,
  hue2hsv,
  parse,
  serialize,
} from "./core/convert";
import { namedColors } from "./data/named-colors";

const coco = createCoco();

export {
  coco,
  createCoco,
  convert,
  parse,
  serialize,
  hue2hex,
  hue2rgb,
  hue2hsl,
  hue2hsv,
  namedColors,
};
