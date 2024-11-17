// Interface for basic vehicle operations
interface Driveable {
  // Vehicle state
  started: boolean;
  currentSpeed: number;

  // Vehicle control methods
  start(): void;
  accelerate(change: number): void;
  decelerate(change: number): void;
  stop(): void;
  turn(direction: string): void;
  reverse(): void;
}

export default Driveable;