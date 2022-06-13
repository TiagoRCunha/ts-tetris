import Unit from './Unit';

export default class UnitObject {
	nextUO: UnitObject;
	units: Unit[];

	constructor(units: Unit[]) {
		this.units = units;
	}
}