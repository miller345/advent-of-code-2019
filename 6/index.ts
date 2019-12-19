import { readFileStr } from "https://deno.land/std/fs/read_file_str.ts";

const rawInput: string = await readFileStr("./6/input.txt");

interface Orb {
  id: string;
  orbits: string;
}

let input = rawInput.split("\n").reduce((obj, line) => {
  let x = line.split(")");
  return {
    ...obj,
    [x[1]]: { id: x[1], orbits: x[0] }
  };
}, {}) as { [id: string]: Orb };

let bodies = Object.keys(input);

let ancestors = (id, arr = []) => {
  let orbits = input[id].orbits;
  arr = [...arr, orbits];
  return orbits === "COM" ? arr : ancestors(orbits, arr);
};

console.log("Part 1:", bodies.map(b => ancestors(b)).flat().length);

let myAnc = ancestors("YOU");
let hisAnc = ancestors("SAN");

let getCommon = (a, b) => {
  for (const anc of myAnc) {
    if (hisAnc.includes(anc)) {
      return anc;
    }
  }
};

let common = getCommon(myAnc, hisAnc);
let hops = myAnc.indexOf(common) + hisAnc.indexOf(common);

console.log("Part 2:", hops);
