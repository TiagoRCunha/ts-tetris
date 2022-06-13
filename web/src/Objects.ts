import PieceBuilder from './PieceBuilder';
import PieceObject from './PieceObject';
import Unit from './Unit';

// O - Square piece definition
export const O = () => new PieceObject(
	'rgb(255,232,51)',
	PieceBuilder.setUnitObject(
		1,
		[
			new Unit(-1, 0),
			new Unit(0, 0),
			new Unit(-1, 1),
			new Unit(0, 1),
		]
	)
)

// I - Line piece definition
export const I = () => new PieceObject(
	'rgb(51,255,209)',
	PieceBuilder.setUnitObject(
		2,
		[
			new Unit(-2, 0),
			new Unit(-1, 0),
			new Unit(0, 0),
			new Unit(1, 0),
		]
	)
);

// S - Right facing zigzag piece definition
export const S = () => new PieceObject(
	'rgb(106,255,51)',
	PieceBuilder.setUnitObject(
		2,
		[
			new Unit(0, 0),
			new Unit(1, 0),
			new Unit(-1, 1),
			new Unit(0, 1),
		]
	)
);

// Z - Left facing zigzag piece definition
export const Z = () => new PieceObject(
	'rgb(255,51,83)',
	PieceBuilder.setUnitObject(
		2,
		[
			new Unit(-1, 0),
			new Unit(0, 0),
			new Unit(0, 1),
			new Unit(1, 1),
		]
	)
);

// L - Right facing angle piece definition
export const L = () => new PieceObject(
	'rgb(255,129,51)',
	PieceBuilder.setUnitObject(
		4,
		[
			new Unit(-1, 0),
			new Unit(0, 0),
			new Unit(1, 0),
			new Unit(-1, -1),
		]
	)
);

// J - Left facing angle piece definition
export const J = () => new PieceObject(
	'rgb(64,100,255)',
	PieceBuilder.setUnitObject(
		4,
		[
			new Unit(-1, 0),
			new Unit(0, 0),
			new Unit(1, 0),
			new Unit(1, -1),
		]
	)
);

// T - Hat shaped piece definition
export const T = () => new PieceObject(
	'rgb(160,62,255)',
	PieceBuilder.setUnitObject(
		4,
		[
			new Unit(-1, 0),
			new Unit(0, 0),
			new Unit(1, 0),
			new Unit(0, -1),
		]
	)
);