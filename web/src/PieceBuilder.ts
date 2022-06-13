import Unit from './Unit';
import UnitObject from './UnitObject';
import LinkedListUnit from './LinkedListUnit';

// PcObj is used to create new piece object instances based on the
// passed in parameters. PcObj is called by predefined templates

export default class PieceBuilder {
  private x: number = 5;
  private y: number = 0;
  private color: string;
  private UO: LinkedListUnit;

	constructor() {}

	static setUnitObject(rotCount: number, units: Unit[]): LinkedListUnit {
		let nodes: UnitObject[] = [];

		nodes[0] = new UnitObject(units);

		for (let i = 0; i < rotCount; i++) {
			nodes[i] = new UnitObject([]);

			for (let j = 0; j < units.length; j++) {
        let x: number;
        let y: number;

        if (i === 0) {
          x = units[j].x;
          y = units[j].y;
        } else {
          x = nodes[i - 1].units[j].y * -1;
          y = nodes[i - 1].units[j].x;
        }

        nodes[i].units[j] = new Unit(x, y);
      }
		}
		console.log('nodes', nodes);

		return new LinkedListUnit(nodes);
	}
}
