import IDrawArea from './DrawArea';
import Variables from './Variables';
import GameManager from './GameManager';

import { colorWithAlpha, drawText } from './Utils';

export default class Game implements IDrawArea {
  public W: number;
  public H: number;
  public isDirty: boolean;
  private leftBase: number;
  private topBase: number;
  private widthBase: number;
  private heightBase: number;

  constructor(
		private variables: Variables,
		private gameManager: GameManager,
		// private pieceController: PieceController,
    public left = 0,
    public top = 0,
    public width = 10,
    public height = 20,
		) {
    // bounds in UNITS
    this.leftBase = left;
    this.topBase = top;
    this.widthBase = width;
    this.heightBase = height;

    // bounds in PIXELS
    this.left = 0;
    this.top = 0;
    this.W = 0;
    this.H = 0;

    // dirty flag (clean yourself up flag, you're better than that)
    this.isDirty = false;

    // push this area into the area arr
    // Page.AreaArr.push(this);
  }

  draw(unitSize: number, context: CanvasRenderingContext2D) {
      // unitSize minus a couple pixels of separation
      let uDrawSize = unitSize - 2;
			let drawL;
			let drawT;

      // redraws the background elements for game area
      context.fillStyle = 'rgb(28,30,34)';
      context.fillRect(this.left, this.top, this.W, this.H);

      // draw the static unit blocks
      for (var i = 0; i < this.variables.staticUnits.length; i++) {
        for (var j = 0; j < this.variables.staticUnits[i].length; j++) {

          // get the unit value for this index pair
          var uValue = this.variables.staticUnits[i][j];

          // if this unit value is not 0, draw the unit
          if (uValue !== 0) {
            drawL = i * unitSize + 1;
            drawT = j * unitSize + 1;

            // fill this square with color based on player alive status
            context.fillStyle = (this.variables.isAlive) ? uValue.toString() : 'rgb(34,36,42)';
            context.fillRect(drawL, drawT, uDrawSize, uDrawSize);
          }
        }
      }

      // draw the current active projection and piece (if exists)
      if (this.gameManager.current !== undefined && this.variables.isAlive) {
        var projColor = colorWithAlpha(this.gameManager.current.color, 0.1);

        for (var k = 0; k < this.gameManager.current.currentRotation.units.length; k++) {
          drawL = (this.gameManager.current.x + this.gameManager.current.currentRotation.units[k].x) * unitSize + 1;
          drawT = (this.gameManager.current.y + this.gameManager.current.currentRotation.units[k].y) * unitSize + 1;

          context.fillStyle = this.gameManager.current.color;
          context.fillRect(drawL, drawT, uDrawSize, uDrawSize);

          // also draw the projection (if one exists)
          if (this.variables.isAlive && this.gameManager.projectedYPosition !== 0) {
            drawT += this.gameManager.projectedYPosition * unitSize;

            context.fillStyle = projColor;
            context.fillRect(drawL, drawT, uDrawSize, uDrawSize);
          }
        }
      }

      // if the player is dead, draw the game over text
      if (!this.variables.isAlive) {
        drawText(
					"GAME OVER",
					'rgb(255,255,255)',
					'500',
					'center',
					uDrawSize,
					this.W / 2,
					this.H / 4,
					context,
				);
      }
  }

  calculateBounds(unitSize: number): void {
    this.left = this.leftBase * unitSize;
    this.top = this.topBase * unitSize;
    this.W = this.widthBase * unitSize;
    this.H = this.heightBase * unitSize;

    this.isDirty = true;
  }
}