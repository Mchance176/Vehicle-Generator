import Truck from "../classes/Truck.js";
import Motorbike from "../classes/Motorbike.js";
import Car from "../classes/Car.js";

// Interface for vehicles that can tow other vehicles
interface AbleToTow {
  // Maximum weight capacity for towing
  towingCapacity: number;
  
  // Method to tow another vehicle
  tow(vehicle: Truck | Motorbike | Car): void;
}

export default AbleToTow;