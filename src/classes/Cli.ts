// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// define the Cli class
class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers) => {
        // set the selectedVehicleVin to the vin of the selected vehicle
        this.selectedVehicleVin = answers.selectedVehicleVin;
        // perform actions on the selected vehicle
        this.performActions();
      });
  }

  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          // TODO: Update the choices array to include Truck and Motorbike
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === 'Car') {
          // create a car
          this.createCar();
        }
        if (answers.vehicleType === 'Truck') {
          // create a car
          this.createTruck();
        }
        if (answers.vehicleType === 'Motorbike') {
          // create a car
          this.createMotorbike();
        }
        // TODO: add statements to create a truck or motorbike if the user selects the respective vehicle type
      });
  }

  // method to create a car
  createCar(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
      ])
      .then((answers) => {
        const car = new Car(
          // TODO: The generateVin method is static and should be called using the class name Cli, make sure to use Cli.generateVin() for creating a truck and motorbike as well!
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        // push the car to the vehicles array
        this.vehicles.push(car);
        // set the selectedVehicleVin to the vin of the car
        this.selectedVehicleVin = car.vin;
        // perform actions on the car
        this.performActions();
      });
  }

  // method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'towingCapacity',
          message: 'Enter Towing Capacity',
        },
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          parseInt(answers.towingCapacity)
        );
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        console.log('Truck created successfully!');
        this.performActions();
      });
  }

  // method to create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'frontWheelDiameter',
          message: 'Enter Front Wheel Diameter',
        },
        {
          type: 'input',
          name: 'frontWheelBrand',
          message: 'Enter Front Wheel Brand',
        },
        {
          type: 'input',
          name: 'rearWheelDiameter',
          message: 'Enter Rear Wheel Diameter',
        },
        {
          type: 'input',
          name: 'rearWheelBrand',
          message: 'Enter Rear Wheel Brand',
        },
      ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          {
            frontWheel: {
              diameter: parseInt(answers.frontWheelDiameter),
              brand: answers.frontWheelBrand
            },
            rearWheel: {
              diameter: parseInt(answers.rearWheelDiameter),
              brand: answers.rearWheelBrand
            }
          }
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        console.log('Motorbike created successfully!');
        this.performActions();
      });
  }

  findVehicleToTow(truck: Truck): void {
    const towableVehicles = this.vehicles.filter(v => v !== truck);

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTow',
          message: 'Select a vehicle to tow',
          choices: towableVehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle,
          })),
        },
      ])
      .then((answers) => {
        truck.tow(answers.vehicleToTow);
        this.performActions();
      });
  }

  performActions(): void {
    const selectedVehicle = this.vehicles.find(v => v.vin === this.selectedVehicleVin);
    if (!selectedVehicle) {
      console.log("No vehicle selected.");
      this.startCli();
      return;
    }

    const isTruck = selectedVehicle instanceof Truck;
if (isMotorbike) choices.push('Perform wheelie');

inquirer
  .prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Select an action',
      choices: choices,
    },
  ])
  .then((answers) => {
    // perform the selected action
    if (answers.action === 'Print details') {
      selectedVehicle.printDetails();
    } else if (answers.action === 'Start vehicle') {
      selectedVehicle.start();
    } else if (answers.action === 'Accelerate 5 MPH') {
      selectedVehicle.accelerate(5);
    } else if (answers.action === 'Decelerate 5 MPH') {
      selectedVehicle.decelerate(5);
    } else if (answers.action === 'Stop vehicle') {
      selectedVehicle.stop();
    } else if (answers.action === 'Turn right') {
      selectedVehicle.turn('right');
    } else if (answers.action === 'Turn left') {
      selectedVehicle.turn('left');
    } else if (answers.action === 'Reverse') {
      selectedVehicle.reverse();
    } else if (answers.action === 'Tow vehicle' && isTruck) {
      this.findVehicleToTow(selectedVehicle as Truck);
      return;
    } else if (answers.action === 'Perform wheelie' && isMotorbike) {
      (selectedVehicle as Motorbike).wheelie();
    } else if (answers.action === 'Select or create another vehicle') {
      this.startCli();
      return;
    } else if (answers.action === 'Exit') {
      this.exit = true;
      return;
    }

    if (!this.exit) {
      this.performActions();
    }
  });
}

startCli(): void {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'CreateOrSelect',
        message: 'Would you like to create a new vehicle or perform an action on an existing vehicle?',
        choices: ['Create a new vehicle', 'Select an existing vehicle'],
      },
    ])
    .then((answers) => {
      if (answers.CreateOrSelect === 'Create a new vehicle') {
        this.createVehicle();
      } else {
        this.chooseVehicle();
      }
    });
}

createVehicle(): void {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'vehicleType',
        message: 'What type of vehicle would you like to create?',
        choices: ['Car', 'Truck', 'Motorbike'],
      },
    ])
    .then((answers) => {
      if (answers.vehicleType === 'Car') {
        this.createCar();
      } else if (answers.vehicleType === 'Truck') {
        this.createTruck();
      } else {
        this.createMotorbike();
      }
    });
}
chooseVehicle(): void {
  if (this.vehicles.length === 0) {
    console.log('No vehicles available. Please create a vehicle first.');
    this.startCli();
    return;
  }

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'selectedVehicle',
        message: 'Select a vehicle:',
        choices: this.vehicles.map((vehicle) => ({
          name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
          value: vehicle.vin,
        })),
      },
    ])
    .then((answers) => {
      this.selectedVehicleVin = answers.selectedVehicle;
      this.performActions();
    });
}
    // method to create a new vehicle
    createVehicle(): void {
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'vehicleType',
            message: 'What type of vehicle would you like to create?',
            choices: ['Car', 'Truck', 'Motorbike'],
          },
        ])
        .then((answers) => {
          if (answers.vehicleType === 'Car') {
            this.createCar();
          } else if (answers.vehicleType === 'Truck') {
            this.createTruck();
          } else {
            this.createMotorbike();
          }
        });
    }
  
    // method to choose an existing vehicle
    chooseVehicle(): void {
      if (this.vehicles.length === 0) {
        console.log('No vehicles available. Please create a vehicle first.');
        this.startCli();
        return;
      }
  
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'selectedVehicle',
            message: 'Select a vehicle:',
            choices: this.vehicles.map((vehicle) => ({
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            })),
          },
        ])
        .then((answers) => {
          this.selectedVehicleVin = answers.selectedVehicle;
          this.performActions();
        });
    }
  
    // static method to generate a VIN
    static generateVin(): string {
      return Math.random().toString(36).substring(2, 15).toUpperCase();
    }
  
    // method to exit the CLI
    exit(): void {
      console.log('Thank you for using the Vehicle Management System. Goodbye!');
      process.exit();
    }
  }
  
  // export the Cli class
  export default Cli;
  