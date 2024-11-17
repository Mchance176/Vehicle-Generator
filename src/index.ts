// Import required classes
import Truck from "./classes/Truck.js";  
import Car from "./classes/Car.js";  
import Motorbike from "./classes/Motorbike.js";  
import Wheel from "./classes/Wheel.js";  
import Cli from "./classes/Cli.js";  
import Vehicle from './classes/Vehicle.js';  

// Initialize vehicle array
const vehicles: Vehicle[] = [];

// sample vehicles
const truck1 = new Truck(
  Cli.generateVin(),
  'red',
  'Ford',
  'F-150',
  2021,
  5000,
  120,
  [
    new Wheel(20, "Goodyear"),
    new Wheel(20, "Goodyear"),
    new Wheel(20, "Goodyear"),
    new Wheel(20, "Goodyear"),
  ],
  10000 // towing capacity
);

const car1 = new Car(
  Cli.generateVin(),
  'blue',
  'Toyota',
  'Camry',
  2021,
  3000,
  130,
  [
    new Wheel(17, "Michelin"),
    new Wheel(17, "Michelin"),
    new Wheel(17, "Michelin"),
    new Wheel(17, "Michelin"),
  ]
);

const motorbike1 = new Motorbike(
  Cli.generateVin(),
  'black',
  'Harley Davidson',
  'Sportster',
  2021,
  500,
  125,
  [
    new Wheel(17, "Michelin"),
    new Wheel(17, "Michelin"),
  ]
);

// Add vehicles to array
vehicles.push(truck1, car1, motorbike1);

// Initialize and start CLI
const cli = new Cli(vehicles);
cli.startCli();