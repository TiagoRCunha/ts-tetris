import UnitObject from './UnitObject';
import LinkedListUnit from './LinkedListUnit';

export default class PieceObject {
  public x: number = 5;
  public y: number = 0;
	public currentRotation: UnitObject;
	public color: string;

	private units: LinkedListUnit;

	constructor(color: string, pieceUnits: LinkedListUnit) {
		this.color = color;
		this.units = pieceUnits;
		this.currentRotation = this.units.first;
	}

	// rotate this piece by advancing to next unit obj of linked list
	rotate() {
		this.currentRotation = this.currentRotation.nextUO;
	}
}