# Vehicle Generator

A TypeScript-based command-line interface (CLI) application for managing different types of vehicles.

## Features

### Vehicle Types
- Cars
- Trucks (with towing capability)
- Motorbikes (with wheelie capability)

### Core Functionality
- Create new vehicles with custom specifications
- View vehicle details
- Perform vehicle actions:
  - Start/Stop
  - Accelerate/Decelerate
  - Turn (Left/Right)
  - Reverse
  - Print Details
- Each vehicle includes:
  - VIN (Vehicle Identification Number)
  - Make and Model
  - Year
  - Color
  - Weight
  - Top Speed
  - Wheel Configuration

### Special Features
- Trucks can tow other vehicles (with weight capacity check)
- Motorbikes can perform wheelies
- Custom wheel configurations (diameter and tire brand)

## Installation

1. Clone the repository:

2. Install dependencies:

4. Start the application:

5. bash - npm start


## Usage

The CLI provides an interactive menu system:

1. Main Menu Options:
   - Create New Vehicle
   - Choose Existing Vehicle
   - Exit

2. Vehicle Creation:
   - Select vehicle type
   - Enter specifications
   - Automatic VIN generation

3. Vehicle Actions:
   - Basic controls (Start, Stop, etc.)
   - Vehicle-specific actions (Towing for trucks, Wheelies for motorbikes)
   - View detailed information

## Technologies Used

- TypeScript
- Node.js
- Inquirer.js (for CLI interface)
- Object-Oriented Programming principles
- Interface-based design

## Project Structure

src/
├── classes/
│ ├── Car.ts
│ ├── Truck.ts
│ ├── Motorbike.ts
│ ├── Vehicle.ts
│ ├── Wheel.ts
│ └── Cli.ts
├── interfaces/
│ ├── AbleToTow.ts
│ └── Driveable.ts
└── index.ts


## Video Walkthrough

[Watch the demonstration video here](https://drive.google.com/file/d/1kTx3M8VL6bDJHzMjU07nXpgJxzOyUVW7/view)

## Future Enhancements

- Save vehicle data to persistent storage
- Add more vehicle types
- Implement fuel/battery management
- Add maintenance tracking
- Support for vehicle modifications

## Contributing

### Contribution Guidelines
- Follow the existing code style
- Write descriptive commit messages
- Update documentation as needed
- Test your changes before submitting
- Create one pull request per feature

### Bug Reports
- Use the GitHub Issues tab
- Include detailed steps to reproduce
- Specify your environment (OS, Node version, etc.)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - [matt.chacne176@gmail.com]
Project Link: [(https://github.com/Mchance176/Vehicle-Generator)]