import { readFileStr } from "https://deno.land/std/fs/read_file_str.ts";
const rawInput: string = await readFileStr("./22/input.txt");

const deckLength = 10007;
let deck = [...Array(deckLength).keys()];

let deal = (index, deckLength) => deckLength - 1 - index;
let cut = n => (index, deckLength) => {
  n = n < 0 ? n + deckLength : n;
  return index < n ? index + deckLength - n : index - n;
};
let dealByIncrement = n => (index, deckLength) => (index * n) % deckLength;

let instructions = rawInput.split("\n").map(str => {
  if (str === "deal into new stack") {
    return deal;
  }
  if (str.includes("cut ")) {
    let arg = parseInt(str.substring(4), 10);
    return cut(arg);
  }
  if (str.includes("deal with increment ")) {
    let arg = parseInt(str.substring(20), 10);
    return dealByIncrement(arg);
  }
});

let applyInstructions = arr => {
  return arr.map(x => {
    return instructions.reduce((newIndex, fn) => {
      return fn(newIndex, deck.length);
    }, x);
  });
};

let indexes = applyInstructions(deck);

let reOrder = (deck, indexes) => {
  return deck.reduce((arr, v, i) => {
    let newIndex = indexes[i];
    arr[newIndex] = v;
    return arr;
  }, []);
};

console.log("Part 1:", reOrder(deck, indexes).indexOf(2019));

// should work but will take too long
theLoop: for (let i = 0; i < 119315717514047; i++) {
  let newIndex = i;
  for (let j = 0; j < 101741582076661; j++) {
    newIndex = applyInstructions([newIndex])[0];
  }
  if (newIndex === 2020) {
    console.log("Part 2:", i);
    break theLoop;
  }
}
