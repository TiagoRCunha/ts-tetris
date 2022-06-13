import IDrawArea from './DrawArea';
import Variables from './Variables';
import { drawText } from './Utils'

export default class ScoreBarCurrent implements IDrawArea {
  public W: number;
  public H: number;
  public isDirty: boolean;
  private leftBase: number;
  private topBase: number;
  private widthBase: number;
  private heightBase: number;

  constructor(
    private variables: Variables,
    public left = 10.5,
    public top = 1.1,
    public width = 4.5,
    public height = 1,
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
    context.fillStyle = 'rgb(28,30,34)';
    context.fillRect(this.left, this.top, this.W, this.H);

    // draw the player's current level
    var text, left, top, size, miniUnit;
    miniUnit = unitSize * 0.01;

    text = ('00' + this.variables.level).slice(-2);
    left = this.left + Math.floor(miniUnit * 50);
    top = this.top + unitSize * 0.8;
    size = Math.floor(unitSize * 0.5);

    drawText(text, 'rgb(128,128,128)', '900', 'center', size, left, top, context);


    // draw the player's current score
    text = ("00000000" + this.variables.scoreCur).slice(-7);
    left = this.left + this.W - 4;
    top = this.top + unitSize * 0.8;
    size = Math.floor(unitSize * 0.8) + 0.5;

    drawText(text, 'rgb(255,255,255)', '500', 'right', size, left, top, context);
  }

  calculateBounds(unitSize: number): void {
    this.left = this.leftBase * unitSize;
    this.top = this.topBase * unitSize;
    this.W = this.widthBase * unitSize;
    this.H = this.heightBase * unitSize;

    this.isDirty = true;
  }

}