/*

It is a six-digit number.
The value is within the range given in your puzzle input.
Two adjacent digits are the same (like 22 in 122345).
Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
Other than the range rule, the following are true:

111111 meets these criteria (double 11, never decreases).
223450 does not meet these criteria (decreasing pair of digits 50).
123789 does not meet these criteria (no double).
How many different passwords within the range given in your puzzle input meet these criteria?

Your puzzle input is 367479-893698.

*/

fn main() {
    let from = 367479;
    let to = 893698;
    let mut pass = vec![];
    for i in from..to {
        let code_str = i.to_string();
        let digits_iter = code_str.chars().map(|c| c.to_digit(10).unwrap());
        let digits: Vec<u32> = digits_iter.collect();
        let mut adjacent_digits = false;
        let mut increasing = true;
        for d in 0..digits.len() {
            let current = digits[d];
            if d >= 1 {
                let previous = digits[d - 1];
                if current == previous {
                    adjacent_digits = true;
                }
                if current < previous {
                    increasing = false;
                    break;
                }
            }
        }
        if adjacent_digits && increasing {
            println!("PASS-{}", i);
            pass.push(i);
        }
    }
    println!("PASS-COUNT {}", pass.len());
}
