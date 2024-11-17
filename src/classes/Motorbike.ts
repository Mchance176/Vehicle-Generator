// Importing Vehicle and Wheel classes  
import Vehicle from './Vehicle.js';  
import Wheel from './Wheel.js';  
  
// The Motorbike class extends the Vehicle class  
class Motorbike extends Vehicle {  
  // Declare properties of the Motorbike class  
  constructor(  
   public vin: string,  
   public color: string,  
   public make: string,  
   public model: string,  
   public year: number,  
   public weight: number,  
   public topSpeed: number,  
   public wheels: Wheel[]  
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
  
  // Override the displayInfo method from the Vehicle class  
  displayInfo(): void {  
   // Call the displayInfo method of the parent class  
   super.displayInfo();  
  
   // Log the details of the Motorbike  
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
    console.log(`  Wheel ${index + 1}: ${wheel.size}" ${wheel.brand}`);  
   });  
   console.log(`Power-to-Weight Ratio: ${this.getPowerToWeightRatio().toFixed(2)}`);  
  }  
  
  // Method to change a wheel  
  changeWheel(position: number, newWheel: Wheel): void {  
   if (position === 0 || position === 1) {  
    this.wheels[position] = newWheel;  
    console.log(`Changed wheel ${position + 1} to ${newWheel.size}" ${newWheel.brand}`);  
   } else {  
    console.log("Invalid wheel position. Motorbike has only 2 wheels.");  
   }  
  }  
  
  // Method to calculate and return the power-to-weight ratio  
  getPowerToWeightRatio(): number {  
   // Assuming topSpeed is somewhat proportional to power  
   const estimatedPower = this.topSpeed * 2; // This is a simplified estimation  
   return estimatedPower / this.weight;  
  }  
  
  // Method to compare this motorbike with another  
  compareTo(other: Motorbike): void {  
   console.log(`Comparing ${this.make} ${this.model} to ${other.make} ${other.model}:`);  
   console.log(`Weight difference: ${this.weight - other.weight} lbs`);  
   console.log(`Top speed difference: ${this.topSpeed - other.topSpeed} mph`);  
   console.log(`Year difference: ${this.year - other.year} years`);  
  }  
  
  // Method to simulate acceleration  
  accelerate(seconds: number): void {  
   const acceleration = this.topSpeed / 10; // Simplified acceleration model  
   const reachedSpeed = Math.min(acceleration * seconds, this.topSpeed);  
   console.log(`${this.make} ${this.model} accelerated to ${reachedSpeed.toFixed(2)} mph in ${seconds} seconds`);  
  }  
}  
  
// Export the Motorbike class as the default export  
export default Motorbike;