import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// Main CLI class for vehicle management
class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  shouldExit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // Generates random VIN
  static generateVin(): string {
    return Math.random().toString(36).substring(2, 15).toUpperCase();
  }

  // Creates vehicle based on type selection
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === 'Car') {
          this.createCar();
        } else if (answers.vehicleType === 'Truck') {
          this.createTruck();
        } else if (answers.vehicleType === 'Motorbike') {
          this.createMotorbike();
        }
      });
  }

  // Creates new car
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
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [
            new Wheel(16, "Standard"),
            new Wheel(16, "Standard"),
            new Wheel(16, "Standard"),
            new Wheel(16, "Standard")
          ]
        );
        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        console.log('Car created successfully!');
        this.performActions();
      });
  }

  // Creates new truck
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
          [
            new Wheel(18, "Heavy Duty"),
            new Wheel(18, "Heavy Duty"),
            new Wheel(18, "Heavy Duty"),
            new Wheel(18, "Heavy Duty")
          ],
          parseInt(answers.towingCapacity)
        );
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        console.log('Truck created successfully!');
        this.performActions();
      });
  }

  // Creates new motorbike
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
        }
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
          [
            new Wheel(17, "Sport"),
            new Wheel(17, "Sport")
          ]
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        console.log('Motorbike created successfully!');
        this.performActions();
      });
  }

  // Handles towing for trucks
  findVehicleToTow(truck: Truck): void {
    const otherVehicles = this.vehicles.filter(v => v.vin !== truck.vin);

    if (otherVehicles.length === 0) {
      console.log('No other vehicles available to tow');
      this.performActions();
      return;
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTow',
          message: 'Select a vehicle to tow',
          choices: otherVehicles.map(v => ({
            name: `${v.make} ${v.model}`,
            value: v.vin,
          })),
        },
      ])
      .then((answers) => {
        const vehicleToTow = this.vehicles.find(v => v.vin === answers.vehicleToTow);
        if (vehicleToTow) {
          truck.tow(vehicleToTow);
        }
        this.performActions();
      });
  }

  // Lets user select a vehicle
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
          choices: this.vehicles.map(v => ({
            name: `${v.make} ${v.model} (${v.vin})`,
            value: v.vin,
          })),
        },
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicle;
        this.performActions();
      });
  }

  // Shows available actions for selected vehicle
  performActions(): void {
    const selectedVehicle = this.vehicles.find(v => v.vin === this.selectedVehicleVin);

    if (!selectedVehicle) {
      console.log('No vehicle selected');
      this.startCli();
      return;
    }

    const isTruck = selectedVehicle instanceof Truck;
    const isMotorbike = selectedVehicle instanceof Motorbike;

    const actions = [
      'Start',
      'Stop',
      'Accelerate',
      'Decelerate',
      'Turn',
      'Reverse',
      'Print Details',
      'Choose Different Vehicle',
      'Create New Vehicle',
      'Exit'
    ];

    if (isTruck) actions.push('Tow Vehicle');
    if (isMotorbike) actions.push('Perform Wheelie');

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: actions,
        },
      ])
      .then((answers) => {
        if (answers.action === 'Start') {
          selectedVehicle.start();
        } else if (answers.action === 'Stop') {
          selectedVehicle.stop();
        } else if (answers.action === 'Accelerate') {
          selectedVehicle.accelerate(10);
        } else if (answers.action === 'Decelerate') {
          selectedVehicle.decelerate(10);
        } else if (answers.action === 'Turn') {
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'direction',
                message: 'Which direction?',
                choices: ['Left', 'Right'],
              },
            ])
            .then((directionAnswer) => {
              selectedVehicle.turn(directionAnswer.direction);
              this.performActions();
            });
          return;
        } else if (answers.action === 'Reverse') {
          selectedVehicle.reverse();
        } else if (answers.action === 'Print Details') {
          selectedVehicle.printDetails();
        } else if (answers.action === 'Choose Different Vehicle') {
          this.chooseVehicle();
          return;
        } else if (answers.action === 'Create New Vehicle') {
          this.createVehicle();
          return;
        } else if (answers.action === 'Exit') {
          this.exitProgram();
          return;
        } else if (answers.action === 'Tow Vehicle' && isTruck) {
          this.findVehicleToTow(selectedVehicle as Truck);
          return;
        } else if (answers.action === 'Perform Wheelie' && isMotorbike) {
          (selectedVehicle as Motorbike).wheelie();
        }

        this.performActions();
      });
  }

  // Starts the CLI interface
  startCli(): void {
    if (this.shouldExit) {
      this.exitProgram();
      return;
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'Create New Vehicle',
            'Choose Existing Vehicle',
            'Exit'
          ],
        },
      ])
      .then((answers) => {
        if (answers.action === 'Create New Vehicle') {
          this.createVehicle();
        } else if (answers.action === 'Choose Existing Vehicle') {
          if (this.vehicles.length === 0) {
            console.log('No vehicles available. Please create a vehicle first.');
            this.startCli();
          } else {
            this.chooseVehicle();
          }
        } else if (answers.action === 'Exit') {
          this.exitProgram();
        }
      });
  }

  // Exits the program
  exitProgram(): void {
    console.log('Thank you for using the Vehicle Management System. Goodbye!');
    process.exit();
  }
}

export default Cli;