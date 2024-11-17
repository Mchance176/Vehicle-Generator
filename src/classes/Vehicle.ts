// import Driveable interface
import Driveable from '../interfaces/Driveable.js';
import Wheel from './Wheel.js';

// Vehicle class that implements Driveable interface
class Vehicle implements Driveable {
  // Declare properties of the Vehicle class
  started: boolean;
  currentSpeed: number;
  readonly vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];

  // Constructor for the Vehicle class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[]
  ) {
    this.started = false;
    this.currentSpeed = 0;
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    
    //  default wheel initialization here
    if (!wheels || wheels.length === 0) {
      this.wheels = [
        new Wheel(16, "Standard"),
        new Wheel(16, "Standard"),
        new Wheel(16, "Standard"),
        new Wheel(16, "Standard")
      ];
    } else {
      this.wheels = wheels;
    }
  }

  // print vehicle details
  printDetails(): void {
    console.log(`Vehicle Details:`);
    console.log(`VIN: ${this.vin}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Color: ${this.color}`);
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
    console.log(`Current Speed: ${this.currentSpeed} mph`);
    console.log(`Started: ${this.started}`);
    console.log(`Wheels: ${this.wheels.length}`);
    this.wheels.forEach((wheel, index) => {
      console.log(`  Wheel ${index + 1}: ${wheel.diameter}" ${wheel.tireBrand}`);
    });
  }

  //  start the vehicle
  start(): void {
    this.started = true;
    console.log(`${this.make} ${this.model} started`);
  }

  //  accelerate the vehicle
  accelerate(change: number): void {
    if (this.started) {
      this.currentSpeed = Math.min(this.currentSpeed + change, this.topSpeed);
      console.log(`${this.make} ${this.model} accelerated to ${this.currentSpeed} mph`);
    } else {
      console.log('Start the vehicle first');
    }
  }

  // decelerate the vehicle
  decelerate(change: number): void {
    if (this.started) {
      this.currentSpeed = Math.max(this.currentSpeed - change, 0);
      console.log(`${this.make} ${this.model} decelerated to ${this.currentSpeed} mph`);
    } else {
      console.log('Start the vehicle first');
    }
  }

  //  stop the vehicle
  stop(): void {
    this.currentSpeed = 0;
    this.started = false;
    console.log(`${this.make} ${this.model} stopped`);
  }

  // turn the vehicle
  turn(direction: string): void {
    if (this.started) {
      console.log(`${this.make} ${this.model} turned ${direction}`);
    } else {
      console.log('Start the vehicle first');
    }
  }

  // reverse the vehicle
  reverse(): void {
    if (this.started) {
      console.log(`${this.make} ${this.model} reversed`);
    } else {
      console.log('Start the vehicle first');
    }
  }
}

// Export the Vehicle class
export default Vehicle;
