// import PieceController from './PieceController';
import PieceBuilder from './PieceBuilder';
import PieceObject from './PieceObject';
import LinkedListUnit from './LinkedListUnit';
import Unit from './Unit';
import Game from './Game';
import ScoreBarCurrent from './ScoreBarCurrent';
import ScoreBarHigh from './ScoreBarHigh';
import UpcomingA from './UpcomingA';
import UpcomingB from './UpcomingB';
import UpcomingC from './UpcomingC';
import Variables from './Variables';
import { O, I, S, Z, L, J, T } from './Objects';

export default class GameManager {

	//-- VARS ---------*/

	// timers
	private timeCur: number = 0;
	private timeEvent: number = 0;
	private tickRate: number = 0;

	// current piece score modifiers
	private scoreBonus: number = 0;
	private difficultFlag: boolean = false;

	public current?: PieceObject = undefined;
	public projectedYPosition: number;

	public game: Game;
	public scoreBarCur: ScoreBarCurrent;
	public scoreBarHigh: ScoreBarHigh;
	public upcomingA: UpcomingA;
	public upcomingB: UpcomingB;
	public upcomingC: UpcomingC;

	constructor(
		private variables: Variables,
	) {
		// Set up intial game var values
		// reset current piece vars
		this.current = undefined;
		this.projectedYPosition = 0;

		// populate the GM's static unit array with 0's (empty)
		for (var i = 0; i < 10; i++) {
			this.variables.staticUnits[i] = [];
			for (var j = 0; j < 20; j++) {
				this.variables.staticUnits[i][j] = 0;
			}
		}

		// reset timer
		this.timeCur = 0;
		this.timeEvent = 0;
		this.tickRate = 500;

		// set up level values for level 1
		this.variables.piecesRemaining = 10;
		this.variables.level = 1;

		// reset the score and set player to alive
		this.variables.scoreCur = 0;
		this.variables.isAlive = true;
	}

	generateStartingPieces() {
		this.generate();
		this.generate();
		this.generate();
	}

	// updates time each frame and executing logic if a tick has passed
	update() {
		this.timeCur = new Date().getTime();

		if (this.timeCur >= this.timeEvent) {

			if (this.current === undefined && this.variables.isAlive) {
				this.generate();
			}
			else {
				console.log('gasdffasdfs')
				this.doGravity();
				this.projectedYPosition = this.tryProject();
				this.game.isDirty = true;
			}

			this.refreshTimer();
		}
	}

	// reset the tick timer (generates a new TimeEvent target)
	refreshTimer() {
		this.timeEvent = new Date().getTime() + this.tickRate;
	}

	// advance level, recalculate TickRate, reset pieces remaining
	advanceLevel() {
		this.variables.level++;

		this.tickRate = Math.floor(555 * Math.exp(this.variables.level / -10));
		this.variables.piecesRemaining = Math.floor((5000 / this.tickRate));

		this.scoreBarCur.isDirty = true;
	}

	// check specified rows to see if any can be cleared
	checkUnits(checkRowsRaw: any[]) {
		let scoreMult = 0;
		let pieceScore = 0;
		let checkRows: number[] = [];

		// add the scoreBonus for dropping
		if (this.scoreBonus > 0) {
			pieceScore += this.scoreBonus;
		}

		// sort the rows
		for (let a = 0; a < 20; a++) {
			if (checkRowsRaw.indexOf(a) >= 0) {
				checkRows.push(a);
			}
		}

		for (let i = 0; i < checkRows.length; i++) {
			let hasGap = false;
			let checkIndex = checkRows[i];

			for (var j = 0; j < this.variables.staticUnits.length; j++) {
				if (this.variables.staticUnits[j][checkIndex] === 0) {
					hasGap = true;
					break;
				}
			}


			if (!hasGap) {
				for (let k = 0; k < this.variables.staticUnits.length; k++) {
					this.variables.staticUnits[k].splice(checkIndex, 1);
					this.variables.staticUnits[k].unshift(0);
				}

				pieceScore += 100 + 200 * scoreMult;
				if (scoreMult > 2) {
					pieceScore += 100;
				}
				scoreMult++;
			}
		}

		if (this.difficultFlag) {
			pieceScore = Math.floor(pieceScore * 1.5);
			this.difficultFlag = false;
		}

		if (pieceScore > 0) {
			this.variables.scoreCur += pieceScore;
			this.scoreBarCur.isDirty = true;

			this.scoreBonus = 0;

			if (scoreMult > 3) {
				this.difficultFlag = true;
			}
		}
	}

	//--------------------------------------------------//
	//    ACTIVE PIECE CONTROLLER                       //
	//--------------------------------------------------//

	// push upcoming piece to current & randomize new upcoming piece
	generate() {
		this.current = this.variables.upcoming[0];
		this.variables.upcoming[0] = this.variables.upcoming[1];
		this.variables.upcoming[1] = this.variables.upcoming[2];

		// check if the player lost
		if (this.current !== undefined) {
			const spawnCollisions = this.checkCollisions(0, 0, 0);
			if (spawnCollisions > 0) {
				this.gameOver();
				this.freeze();
			}
		}

		// if player is alive, generate random upcoming piece
		if (this.variables.isAlive) {
			switch (Math.floor(Math.random() * 7)) {
				case 0:
					this.variables.upcoming[2] = O();
					break;

				case 1:
					this.variables.upcoming[2] = I();
					break;

				case 2:
					this.variables.upcoming[2] = S();
					break;

				case 3:
					this.variables.upcoming[2] = Z();
					break;

				case 4:
					this.variables.upcoming[2] = L();
					break;

				case 5:
					this.variables.upcoming[2] = J();
					break;

				case 6:
					this.variables.upcoming[2] = T();
					break;

				default:
					break;
			}

			// if a current piece was set, inform the GM
			if (this.current !== null) {
				this.pieceSpawned();
				this.game.isDirty = true;
			}

			this.upcomingA.isDirty = true;
			this.upcomingB.isDirty = true;
			this.upcomingC.isDirty = true;
		}
	}

	// freeze the current piece's position and rotation
	freeze() {
		if (this.variables.isAlive) {
			let affectedRows: number[] = [];

			if (this.current !== undefined) {
				for (let i = 0; i < this.current.currentRotation.units.length; i++) {
					let staticX = this.current.x + this.current.currentRotation.units[i].x;
					let staticY = this.current.y + this.current.currentRotation.units[i].y;

					if (staticY >= 0 && staticY <= this.variables.staticUnits[0].length) {
						this.variables.staticUnits[staticX][staticY] = this.current.color;
					}

					if (affectedRows.indexOf(staticY) < 0) {
						affectedRows.push(staticY);
					}
				}
			}

			this.checkUnits(affectedRows);
			this.generate();
		}
	}

	// apply gravity to the current piece, checking for collisions
	doGravity() {
		if (this.current !== undefined) {
			let collisions = this.checkCollisions(0, 0, 1);

			if (collisions === 0) {
				this.current.y++;
			} else {
				this.freeze();
			}
		}

		this.refreshTimer();
	}

	tryRotate() {
		console.log(this.current)
		if (this.current !== undefined) {
			var collisions = this.checkCollisions(1, 0, 0);

			if (collisions === 0) {
				console.log('rotation')
				this.current.rotate();
				return true;
			}
		}

		return false;
	}

	// attempt to move current piece base on given XY, returns bool
	tryMove(moveX: number, moveY: number) {
		if (this.current !== undefined) {
			var collisions = this.checkCollisions(0, moveX, moveY);

			if (collisions === 0) {
				this.current.x += moveX;
				this.current.y += moveY;

				if (moveY > 0) {
					this.refreshTimer();
					this.scoreBonus++;
				}
				return true;
			}
		}
		return false;
	}

	// attempt to drop the current piece until it collides, returns bool
	tryDrop() {
		let squaresDropped = 0;

		if (this.current !== undefined) {
			while (this.tryMove(0, 1) === true && squaresDropped < 22) {
				squaresDropped++;
			}
		}

		if (squaresDropped > 0) {
			this.scoreBonus += 2 * squaresDropped;
			this.freeze();
			return true;
		} else {
			return false;
		}
	}

	// attempt to find (and return) projected drop point of current piece
	tryProject() {
		let squaresDropped = 0;

		if (this.current !== undefined) {
			while (this.checkCollisions(0, 0, squaresDropped) === 0 &&
				squaresDropped < 22) {
				squaresDropped++;
			}
		}
		return squaresDropped - 1;
	}

	// return collision count OR -1 if test piece out of bounds
	checkCollisions(doRot: number, offsetX: number, offsetY: number) {
		let unitArr: Unit[] = [];
		let collisionCount = 0;

		if (this.current !== undefined) {
			if (doRot === 1) {
				unitArr = this.current.currentRotation.nextUO.units;
			} else {
				unitArr = this.current.currentRotation.units;
			}

			for (let i = 0; i < unitArr.length; i++) {
				let testX = this.current.x + unitArr[i].x + offsetX;
				let testY = this.current.y + unitArr[i].y + offsetY;
				let limitX = this.variables.staticUnits.length;
				let limitY = this.variables.staticUnits[0].length;


				if (testX < 0 || testX >= limitX || testY >= limitY) {
					return -1;
				} else if (testY > 0 && this.variables.staticUnits[testX][testY] !== 0) {
					collisionCount++;
				}
			}
		}
		return collisionCount;
	}

	// called when a piece is spawned, advances level if needed
	pieceSpawned() {
		this.variables.piecesRemaining--;
		if (this.variables.piecesRemaining <= 0) {
			this.advanceLevel();
		}
	}

	gameOver() {
		this.game.isDirty = true;
		this.scoreBarCur.isDirty = true;

		if (this.variables.scoreCur > this.variables.scoreHigh) {
			this.variables.scoreHigh = this.variables.scoreCur;
			this.scoreBarHigh.isDirty = true;
			console.log(this.variables.scoreHigh);
		}

		this.variables.isAlive = false;
	}
}