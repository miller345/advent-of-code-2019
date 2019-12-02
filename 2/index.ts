import { readFileStr } from "https://deno.land/std/fs/read_file_str.ts";

const rawInput = await readFileStr("./2/input.txt");
const program = rawInput.split(",").map(str => parseInt(str, 10));

const runProgram = (program, index = 0) => {
  let opCode = program[index];
  let a = program[program[index + 1]];
  let b = program[program[index + 2]];
  if (opCode === 1) program[program[index + 3]] = a + b;
  if (opCode === 2) program[program[index + 3]] = a * b;
  return opCode === 99 ? program[0] : runProgram(program, index + 4);
};

const useNounAndVerb = (program, noun, verb) => {
  let newProgram = [...program]; // don't mutate
  newProgram[1] = noun;
  newProgram[2] = verb;
  return newProgram;
};

console.log("Part one:", runProgram(useNounAndVerb(program, 12, 2)));

theLoop: for (let noun = 0; noun <= 99; noun++) {
  for (let verb = 0; verb <= 99; verb++) {
    if (runProgram(useNounAndVerb(program, noun, verb)) === 19690720) {
      console.log("Part two:", 100 * noun + verb);
      break theLoop;
    }
  }
}
