import Vehicle from './Vehicle.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

// Truck class with towing capabilities
class Truck extends Vehicle implements AbleToTow {
  // Only declare the property unique to Truck
  towingCapacity: number;

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[],
    towingCapacity: number
  ) {
    // Pass vehicle properties to parent constructor
    super(vin, color, make, model, year, weight, topSpeed, wheels);
    
    // Initialize Truck-specific property
    this.towingCapacity = towingCapacity;

    // Set default wheels if not provided
    if (wheels.length !== 4) {
      this.wheels = [
        new Wheel(18, "Heavy Duty"),
        new Wheel(18, "Heavy Duty"),
        new Wheel(18, "Heavy Duty"),
        new Wheel(18, "Heavy Duty")
      ];
    }
  }

  // Checks if vehicle can be towed based on weight
  tow(vehicle: Truck | Motorbike | Car): void {
    const vehicleDescription = vehicle ? `${vehicle.make} ${vehicle.model}` : 'Unknown vehicle';
    if (vehicle.weight <= this.towingCapacity) {
      console.log(`Towing ${vehicleDescription}`);
    } else {
      console.log(`${vehicleDescription} is too heavy to be towed`);
    }
  }

  // Displays truck details including towing capacity
  override printDetails(): void {
    super.printDetails();
    console.log('\nTruck Specific Details:');
    console.log(`Towing Capacity: ${this.towingCapacity} kg`);
    console.log('Wheels:');
    this.wheels.forEach((wheel, index) => {
      console.log(`  Wheel ${index + 1}: ${wheel.diameter}" ${wheel.tireBrand}`);
    });
  }
}

export default Truck;