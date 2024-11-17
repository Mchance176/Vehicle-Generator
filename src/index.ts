// import classes  
import Truck from "./classes/Truck.js";  
import Car from "./classes/Car.js";  
import Motorbike from "./classes/Motorbike.js";  
import Wheel from "./classes/Wheel.js";  
import Cli from "./classes/Cli.js";  
import inquirer from 'inquirer';  
import Vehicle from './classes/Vehicle.js';  
  
// Define the Vehicle class and its subclasses  
class Vehicle {  
  vin: string;  
  color: string;  
  make: string;  
  model: string;  
  year: number;  
  weight: number;  
  topSpeed: number;  
  wheels: Wheel[];  
  
  constructor(vin: string, color: string, make: string, model: string, year: number, weight: number, topSpeed: number, wheels: Wheel[]) {  
   this.vin = vin;  
   this.color = color;  
   this.make = make;  
   this.model = model;  
   this.year = year;  
   this.weight = weight;  
   this.topSpeed = topSpeed;  
   this.wheels = wheels;  
  }  
}  
  
class Car extends Vehicle {  
  constructor(vin: string, color: string, make: string, model: string, year: number, weight: number, topSpeed: number, wheels: Wheel[]) {  
   super(vin, color, make, model, year, weight, topSpeed, wheels);  
  }  
}  
  
class Truck extends Vehicle {  
  constructor(vin: string, color: string, make: string, model: string, year: number, weight: number, topSpeed: number, wheels: Wheel[]) {  
   super(vin, color, make, model, year, weight, topSpeed, wheels);  
  }  
}  
  
class Motorbike extends Vehicle {  
  constructor(vin: string, color: string, make: string, model: string, year: number, weight: number, topSpeed: number, wheels: Wheel[]) {  
   super(vin, color, make, model, year, weight, topSpeed, wheels);  
  }  
}  
  
class Wheel {  
  size: number;  
  brand: string;  
  
  constructor(size: number, brand: string) {  
   this.size = size;  
   this.brand = brand;  
  }  
}  
  
// Define the Cli class  
class Cli {  
  private vehicles: Vehicle[];  
  
  constructor(vehicles: Vehicle[]) {  
   this.vehicles = vehicles;  
  }  
  
  static generateVin(): string {  
   // Implementation of VIN generation  
   return Math.random().toString(36).substring(2, 15);  
  }  
  
  async startCli() {  
   while (true) {  
    const { action } = await inquirer.prompt([  
      {  
       type: 'list',  
       name: 'action',  
       message: 'What would you like to do?',  
       choices: ['Create new vehicle', 'Select existing vehicle', 'Exit'],  
      },  
    ]);  
  
    switch (action) {  
      case 'Create new vehicle':  
       const newVehicle = await this.createVehicle();  
       this.vehicles.push(newVehicle);  
       await this.performActions(newVehicle);  
       break;  
      case 'Select existing vehicle':  
       if (this.vehicles.length === 0) {  
        console.log('No vehicles available. Please create a vehicle first.');  
       } else {  
        const selectedVehicle = await this.selectVehicle();  
        await this.performActions(selectedVehicle);  
       }  
       break;  
      case 'Exit':  
       console.log('Goodbye!');  
       return;  
      default:  
       console.log('Invalid action. Please try again.');  
    }  
   }  
  }  
  
  private async createVehicle(): Promise<Vehicle> {  
   const { type } = await inquirer.prompt([  
    {  
      type: 'list',  
      name: 'type',  
      message: 'What type of vehicle would you like to create?',  
      choices: ['Car', 'Truck', 'Motorbike'],  
    },  
   ]);  
  
   const { color, make, model, year, weight, topSpeed } = await inquirer.prompt([  
    { type: 'input', name: 'color', message: 'Enter the color of the vehicle:' },  
    { type: 'input', name: 'make', message: 'Enter the make of the vehicle:' },  
    { type: 'input', name: 'model', message: 'Enter the model of the vehicle:' },  
    { type: 'number', name: 'year', message: 'Enter the year of the vehicle:' },  
    { type: 'number', name: 'weight', message: 'Enter the weight of the vehicle:' },  
    { type: 'number', name: 'topSpeed', message: 'Enter the top speed of the vehicle:' },  
   ]);  
  
   const wheels = await this.createWheels(type);  
  
   // Create the vehicle based on the type  
   switch (type) {  
    case 'Car':  
      return new Car(Cli.generateVin(), color, make, model, year, weight, topSpeed, wheels);  
    case 'Truck':  
      return new Truck(Cli.generateVin(), color, make, model, year, weight, topSpeed, wheels);  
    case 'Motorbike':  
      return new Motorbike(Cli.generateVin(), color, make, model, year, weight, topSpeed, wheels);  
    default:  
      throw new Error('Invalid vehicle type');  
   }  
  }  
  
  private async createWheels(vehicleType: string): Promise<Wheel[]> {  
   const wheelCount = vehicleType === 'Motorbike' ? 2 : 4;  
   const wheels: Wheel[] = [];  
  
   for (let i = 0; i < wheelCount; i++) {  
    const { size, brand } = await inquirer.prompt([  
      { type: 'number', name: 'size', message: `Enter the size of wheel ${i + 1}:` },  
      { type: 'input', name: 'brand', message: `Enter the brand of wheel ${i + 1}:` },  
    ]);  
    wheels.push(new Wheel(size, brand));  
   }  
  
   return wheels;  
  }  
  
  private async selectVehicle(): Promise<Vehicle> {  
   const choices = this.vehicles.map((vehicle, index) => ({  
    name: `${vehicle.constructor.name} - ${vehicle.make} ${vehicle.model}`,  
    value: index,  
   }));  
  
   const { selectedIndex } = await inquirer.prompt([  
    {  
      type: 'list',  
      name: 'selectedIndex',  
      message: 'Select a vehicle:',  
      choices,  
    },  
   ]);  
  
   return this.vehicles[selectedIndex];  
  }  
  
  private async performActions(vehicle: Vehicle) {  
   console.log('Vehicle selected:', vehicle);  
  
   while (true) {  
    const { action } = await inquirer.prompt([  
      {  
       type: 'list',  
       name: 'action',  
       message: 'What would you like to do with the selected vehicle?',  
       choices: ['View details', 'Edit details', 'Delete vehicle', 'Back'],  
      },  
    ]);  
  
    switch (action) {  
      case 'View details':  
       console.log('Vehicle details:');  
       console.log(`VIN: ${vehicle.vin}`);  
       console.log(`Color: ${vehicle.color}`);  
       console.log(`Make: ${vehicle.make}`);  
       console.log(`Model: ${vehicle.model}`);  
       console.log(`Year: ${vehicle.year}`);  
       console.log(`Weight: ${vehicle.weight}`);  
       console.log(`Top speed: ${vehicle.topSpeed}`);  
       console.log(`Wheels:`);  
       vehicle.wheels.forEach((wheel, index) => {  
        console.log(`  Wheel ${index + 1}:`);  
        console.log(`   Size: ${wheel.size}`);  
        console.log(`   Brand: ${wheel.brand}`);  
       });  
       break;  
      case 'Edit details':  
       const { color, make, model, year, weight, topSpeed } = await inquirer.prompt([  
        { type: 'input', name: 'color', message: 'Enter the new color of the vehicle:' },  
        { type: 'input', name: 'make', message: 'Enter the new make of the vehicle:' },  
        { type: 'input', name: 'model', message: 'Enter the new model of the vehicle:' },  
        { type: 'number', name: 'year', message: 'Enter the new year of the vehicle:' },  
        { type: 'number', name: 'weight', message: 'Enter the new weight of the vehicle:' },  
        { type: 'number', name: 'topSpeed', message: 'Enter the new top speed of the vehicle:' },  
       ]);  
       vehicle.color = color;  
       vehicle.make = make;  
       vehicle.model = model;  
       vehicle.year = year;  
       vehicle.weight = weight;  
       vehicle.topSpeed = topSpeed;  
       break;  
      case 'Delete vehicle':  
       const confirmDelete = await inquirer.prompt([  
        {  
          type: 'confirm',  
          name: 'confirm',  
          message: 'Are you sure you want to delete the vehicle?',  
        },  
       ]);  
       if (confirmDelete.confirm) {  
        this.vehicles.splice(this.vehicles.indexOf(vehicle), 1);  
        console.log('Vehicle deleted successfully.');  
       } else {  
        console.log('Deletion cancelled.');  
       }  
       return;  
      case 'Back':  
       return;  
      default:  
       console.log('Invalid action. Please try again.');  
    }  
   }  
  }  
}  
  
// Create an array of vehicles  
const vehicles: Vehicle[] = [];  
  
// Create a truck instance  
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
  ]  
);  
  
// Create a car instance  
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
  
// Create a motorbike instance  
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
  
// Push vehicles to array  
vehicles.push(truck1);  
vehicles.push(car1);  
vehicles.push(motorbike1);  
  
// Create a new instance of the Cli class  
const cli = new Cli(vehicles);  
  
// Start the cli  
cli.startCli();