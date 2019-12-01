import { readFileStr } from "https://deno.land/std/fs/read_file_str.ts";

const rawInput = await readFileStr("./1/input.txt");
const masses = rawInput.split("\n").map(str => parseInt(str, 10));
const sumReducer = (x, total) => total + x;
const calculateFuel = mass => Math.max(Math.floor(mass / 3) - 2, 0);
const totalFuel = masses.map(calculateFuel).reduce(sumReducer, 0);
console.log("Part one:", totalFuel);

const calculateFuelRec = fuel => {
  let extraFuel = calculateFuel(fuel);
  return extraFuel > 0 ? extraFuel + calculateFuelRec(extraFuel) : extraFuel;
};
const fuelPerModuleRec = masses.map(calculateFuelRec);
const totalFuelRec = fuelPerModuleRec.reduce(sumReducer, 0);
console.log("Part two:", totalFuelRec);
