import { convert, parse, serialize } from "./core/convert";
import { createCoco } from "./core/factory";
import { namedColors } from "./data/named-colors";

const coco = createCoco();

export { coco, convert, createCoco, namedColors, parse, serialize };
