import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

/**
 * Represents a Car vehicle type
 * Extends the base Vehicle class with car-specific functionality
 */
class Car extends Vehicle {
  /**
   * Creates a new Car instance
   * @param vin - Vehicle Identification Number
   * @param color - Car color
   * @param make - Manufacturer
   * @param model - Car model
   * @param year - Manufacturing year
   * @param weight - Weight in pounds
   * @param topSpeed - Maximum speed in mph
   * @param wheels - Array of Wheel objects
   */
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
    // Call parent constructor with all vehicle properties
    super(vin, color, make, model, year, weight, topSpeed, wheels);

    // Initialize wheels if not provided or incorrect number
    if (wheels.length !== 4) {
      this.wheels = [
        new Wheel(16, "Generic"),
        new Wheel(16, "Generic"),
        new Wheel(16, "Generic"),
        new Wheel(16, "Generic")
      ];
    }
  }

  /**
   * Displays detailed information about the car
   * Overrides the base Vehicle printDetails method
   */
  override printDetails(): void {
    super.printDetails();
    
    // Print car-specific details
    console.log('\nCar Details:');
    console.log(`VIN: ${this.vin}`);
    console.log(`Color: ${this.color}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);

    // Print wheel information
    console.log('\nWheel Information:');
    this.wheels.forEach((wheel, index) => {
      console.log(`Wheel ${index + 1}: ${wheel.diameter}" ${wheel.tireBrand}`);
    });
  }
}

export default Car;