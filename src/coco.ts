import { convert, parse, serialize } from "./core/convert";
import { createCoco } from "./core/factory";
import { namedColors } from "./data/named-colors";

const coco = createCoco();

export * from "./core/types";
export { coco, convert, createCoco, namedColors, parse, serialize };
