import PieceObject from './PieceObject';

export default class Variables {
	// matrix of squares
	public staticUnits: (string | number)[][] = [];

	// player status
	public isAlive: boolean = false;

	// player score
	public level: number = 0;
	public piecesRemaining: number = 0;

	// score count
	public scoreHigh: number = 0;
	public scoreCur: number = 0;

	// next pieces
  public upcoming: [PieceObject, PieceObject, PieceObject];

	constructor() {}
}