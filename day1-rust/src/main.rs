use std::fs;
use std::cmp;
use math::round;

fn get_masses() -> std::vec::Vec<i32> {
    let contents = fs::read_to_string("../1/input.txt").expect("Error reading file");
    let lines = contents.lines();
    let mut masses = vec![];
    for s in lines {
        let i = s.parse::<i32>().unwrap();
        masses.push(i);
    }
    return masses;
}

fn calculate_fuel(mass: i32) -> i32 {
    return cmp::max( round::floor(mass as f64 / 3f64, 0) as i32 - 2, 0)
}

fn calculate_fuel_rec(mass: i32) -> i32 {
    let extra_fuel = calculate_fuel(mass);
    if extra_fuel > 0 {
        return extra_fuel + calculate_fuel_rec(extra_fuel)
    }else{
        return extra_fuel;
    }
}

fn part_one(masses: std::vec::Vec<i32>) {
    let mut total = 0;
    for m in masses {
        total = total + calculate_fuel(m);
    }
    println!("Part one:{}", total);
}

fn part_two(masses: std::vec::Vec<i32>) {
    let mut total = 0;
    for m in masses {
        total = total + calculate_fuel_rec(m);
    }
    println!("Part two:{}", total);
}

fn main() {
    let masses = get_masses();
    part_one(masses.to_vec());
    part_two(masses.to_vec());
}
         
