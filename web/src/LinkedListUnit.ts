import Unit from './Unit';
import UnitObject from './UnitObject';

export default class LinkedListUnit {
	private _nodes: UnitObject[];

	constructor(nodes: UnitObject[]) {
		const last = nodes.length - 1;

		for (let i = 0; i < last; i++)
			nodes[i].nextUO = nodes[i + 1];

		nodes[last].nextUO = nodes[0];

		this._nodes = nodes;
	}

	get nodes(): UnitObject[] {
		return this._nodes;
	}

	get first(): UnitObject {
		return this._nodes[0];
	}
}