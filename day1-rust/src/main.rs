use math::round;
use std::cmp;
use std::fs;

fn get_masses() -> Vec<i32> {
    let contents = fs::read_to_string("../1/input.txt").expect("Error reading file");
    return contents
        .lines()
        .into_iter()
        .map(|s| s.parse::<i32>().unwrap())
        .collect();
}

fn calculate_fuel(mass: i32) -> i32 {
    return cmp::max(round::floor(mass as f64 / 3f64, 0) as i32 - 2, 0);
}

fn calculate_fuel_rec(mass: i32) -> i32 {
    let extra_fuel = calculate_fuel(mass);
    return if extra_fuel > 0 {
        extra_fuel + calculate_fuel_rec(extra_fuel)
    } else {
        extra_fuel
    };
}

fn main() {
    let masses = get_masses();
    let part_one: i32 = masses.iter().map(|m| calculate_fuel(*m)).sum();
    println!("Part one:{}", part_one);
    let part_two: i32 = masses.iter().map(|m| calculate_fuel_rec(*m)).sum();
    println!("Part two:{}", part_two);
}
