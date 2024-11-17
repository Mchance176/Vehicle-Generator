// Importing Vehicle and Wheel classes  
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// Motorbike class with wheelie and acceleration capabilities
class Motorbike extends Vehicle {
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
    // Call the constructor of the parent class, Vehicle  
    super(vin, color, make, model, year, weight, topSpeed, wheels);

    // Check if the wheels array has 2 elements and create 2 new default Wheel objects if it does not  
    if (this.wheels.length !== 2) {
      this.wheels = [new Wheel(17, "Default"), new Wheel(17, "Default")];
    }
  }

  // Implement the wheelie method  
  wheelie(): void {
    console.log(`Motorbike ${this.make} ${this.model} is doing a wheelie!`);
  }

  // Displays motorbike details including power ratio
  override printDetails(): void {
    super.printDetails();
    console.log(`Motorbike Details:`);
    console.log(`VIN: ${this.vin}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
    console.log(`Color: ${this.color}`);
    console.log(`Wheels: ${this.wheels.length}`);
    this.wheels.forEach((wheel, index) => {
      console.log(`  Wheel ${index + 1}: ${wheel.diameter}" ${wheel.tireBrand}`);
    });
    console.log(`Power-to-Weight Ratio: ${this.getPowerToWeightRatio().toFixed(2)}`);
  }

  // Changes wheel at specified position
  changeWheel(position: number, newWheel: Wheel): void {
    if (position === 0 || position === 1) {
      this.wheels[position] = newWheel;
      console.log(`Changed wheel ${position + 1} to ${newWheel.diameter}" ${newWheel.tireBrand}`);
    } else {
      console.log("Invalid wheel position. Motorbike has only 2 wheels.");
    }
  }

  // Calculates power-to-weight ratio based on speed
  getPowerToWeightRatio(): number {
    const estimatedPower = this.topSpeed * 2;
    return estimatedPower / this.weight;
  }

  // Compares specs with another motorbike
  compareTo(other: Motorbike): void {
    console.log(`Comparing ${this.make} ${this.model} to ${other.make} ${other.model}:`);
    console.log(`Weight difference: ${this.weight - other.weight} lbs`);
    console.log(`Top speed difference: ${this.topSpeed - other.topSpeed} mph`);
    console.log(`Year difference: ${this.year - other.year} years`);
  }

  // Simulates acceleration over time
  override accelerate(seconds: number): void {
    const acceleration = this.topSpeed / 10;
    const reachedSpeed = Math.min(acceleration * seconds, this.topSpeed);
    console.log(`${this.make} ${this.model} accelerated to ${reachedSpeed.toFixed(2)} mph in ${seconds} seconds`);
  }
}

export default Motorbike;