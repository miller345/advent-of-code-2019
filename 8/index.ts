import { readFileStr } from "https://deno.land/std/fs/read_file_str.ts";

const rawInput: string = await readFileStr("./8/input.txt");

const WIDTH = 25;
const HEIGHT = 6;

let getLayerNumber = (index: number, width = WIDTH, height = HEIGHT) =>
  Math.floor(index / (width * height));

let data = rawInput.split("").reduce((arr, s, i) => {
  let layer = getLayerNumber(i);
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

let img = rawInput
  .split("")
  .reduce((arr, s, i) => {
    let layer = getLayerNumber(i);
    let pixelIndex = i - WIDTH * HEIGHT * layer;
    if (arr[pixelIndex] == null || arr[pixelIndex] === "2") {
      arr[pixelIndex] = s;
    }
    return arr;
  }, [])
  .map(x => (x == "1" ? "X" : " "));

console.log("Part 2:");
for (let i = 0; i < HEIGHT; i++) {
  console.log(img.splice(0, WIDTH).join(""));
}
