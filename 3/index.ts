import { readFileStr } from "https://deno.land/std/fs/read_file_str.ts";

type Direction = "R" | "L" | "U" | "D";

interface Instruction {
  direction: Direction;
  distance: number;
}

interface Coord {
  x: number;
  y: number;
}

const parseInstruction = (rawInstruction: string): Instruction => ({
  direction: rawInstruction.substr(0, 1) as Direction,
  distance: parseInt(rawInstruction.substring(1), 10)
});

const arrayRange = (from: number, to: number) => {
  const reverse = from > to;
  if (reverse) [from, to] = [to, from]; //swap
  let arr = [...Array(to - from + 1).keys()].map(x => x + from);
  return reverse ? arr.reverse() : arr;
};

const drawPath = (instruction: Instruction, from: Coord) => {
  let { direction, distance } = instruction;
  let positiveTranslation = direction === "R" || direction === "U";
  let xTranslation = direction === "L" || direction === "R";
  let fromI = xTranslation ? from.x : from.y;
  let toI = positiveTranslation ? fromI + distance : fromI - distance;
  let arr = arrayRange(fromI, toI);
  let coords = arr.map(i => {
    return {
      x: xTranslation ? i : from.x,
      y: !xTranslation ? i : from.y
    };
  });
  coords.shift(); // dont include the from coord
  return coords;
};

const drawRoute = (
  instructions: Instruction[],
  from: Coord = { x: 0, y: 0 }
) => {
  return instructions.reduce(
    (route, instruction, i) => {
      let path = drawPath(instruction, route[route.length - 1]);
      return [...route, ...path];
    },
    [from]
  );
};

const manhattanDistance = (a: Coord, b: Coord = { x: 0, y: 0 }) =>
  Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const rawInput: string = await readFileStr("./3/input.txt");
// const rawInput: string = await readFileStr("./3/test.txt");
const rawWires = rawInput.split("\n");
const wires = rawWires.map(wire => wire.split(",").map(parseInstruction));

let routes = wires.map(wire => {
  let route = drawRoute(wire);
  route.shift(); //remove 0,0 coord
  // route.sort((a, b) => manhattanDistance(a) - manhattanDistance(b));
  return route;
});

const coordIsSame = (a: Coord, b: Coord) => a.x === b.x && a.y === b.y;

const findFirstMatch = (a: Coord[], b: Coord[]) => {
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      let coordA = a[i];
      let coordB = b[j];
      if (coordIsSame(coordA, coordB)) {
        return coordA;
      }
    }
  }
};

// console.log(
//   "Part one:",
//   manhattanDistance(findFirstMatch(routes[0], routes[1]))
// );

// possible length of each wire for given sum (excludes 0s)
const getLengthCombos = (sum: number) => {
  let pairs = [];
  for (let i = 1; i <= sum; i++) {
    for (let j = 1; j <= sum; j++) {
      if (i + j === sum) pairs.push([i, j]);
    }
  }
  return pairs;
};

let found = false;
let sum = 3;
while (found === false) {
  let pairs = getLengthCombos(sum)
    .map(combo => {
      let lengthA = combo[0];
      let lengthB = combo[1];
      return {
        lengthA,
        lengthB,
        coordA: routes[0][lengthA - 1],
        coordB: routes[1][lengthB - 1]
      };
    })
    .filter(({ coordA, coordB }) => coordA && coordB); //remove nonexistent coords
  let foundIndex = pairs
    .map(({ coordA, coordB }) => coordIsSame(coordA, coordB))
    .indexOf(true);
  if (foundIndex > -1) {
    const obj = pairs[foundIndex];
    console.log(obj, obj.lengthA + obj.lengthB);
    found = true;
  }
  // console.log(JSON.stringify(x));
  sum++;
}

// console.log(getLengthCombos(3));
