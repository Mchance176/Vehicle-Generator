/**
 * Represents a wheel with diameter and tire brand information
 */
class Wheel {
  // Private properties to ensure encapsulation
  private _diameter: number;
  private _tireBrand: string;

  /**
   * Creates a new Wheel instance
   * @param diameter - The diameter of the wheel in inches (defaults to 18)
   * @param tireBrand - The brand of tire (defaults to "GoodYear")
   */
  constructor(diameter: number = 18, tireBrand: string = "GoodYear") {
    this._diameter = diameter;
    this._tireBrand = tireBrand;
  }

  /**
   * Gets the wheel's diameter
   * @returns The diameter in inches
   */
  get diameter(): number {
    return this._diameter;
  }

  /**
   * Gets the wheel's tire brand
   * @returns The tire brand name
   */
  get tireBrand(): string {
    return this._tireBrand;
  }

  /**
   * Sets the wheel's diameter
   * @param value - The new diameter in inches
   */
  set diameter(value: number) {
    this._diameter = value;
  }

  /**
   * Sets the wheel's tire brand
   * @param value - The new tire brand name
   */
  set tireBrand(value: string) {
    this._tireBrand = value;
  }
}

export default Wheel;