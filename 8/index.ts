import { readFileStr } from "https://deno.land/std/fs/read_file_str.ts";

const rawInput: string = await readFileStr("./8/input.txt");

let getLayerNumber = (index: number, width: number, height: number) =>
  Math.floor(index / (width * height));

let data = rawInput.split("").reduce((arr, s, i) => {
  let layer = getLayerNumber(i, 25, 6);
  let counts = arr[layer] ? arr[layer] : {};
  arr[layer] = { ...counts, [s]: counts[s] ? counts[s] + 1 : 1 };
  return arr;
}, []);

let layer = data.reduce((obj, counts, layer) => {
  let zeros = counts[0] ? counts[0] : 0;
  if (!obj || zeros < obj.zeros) {
    return { layer, zeros };
  }
  return obj;
}, null).layer;

console.log("Part 1:", data[layer][1] * data[layer][2]);
