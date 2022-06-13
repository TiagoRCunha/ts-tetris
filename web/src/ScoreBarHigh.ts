import IDrawArea from './DrawArea';
import Variables from './Variables';
import { drawText } from './Utils'

export default class ScoreBarHigh implements IDrawArea {
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
    public top = 0,
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


    // Draw the trophy symbol

    var miniUnit, left, top, width, height;

    miniUnit = unitSize * 0.01;
    context.fillStyle = 'rgb(255,232,96)';

    // trophy base
    left = Math.floor(this.left + miniUnit * 33);
    top = Math.floor(this.top + this.H - miniUnit * 28);
    width = Math.floor(miniUnit * 30);
    height = Math.floor(miniUnit * 12);
    context.fillRect(left, top, width, height);

    // trophy trunk
    left = Math.floor(this.left + miniUnit * 42);
    top = Math.floor(this.top + this.H - miniUnit * 50);
    width = Math.floor(miniUnit * 12);
    height = Math.floor(miniUnit * 32);
    context.fillRect(left, top, width, height);

    // trophy bowl
    left = Math.floor(this.left + miniUnit * 48);
    top = Math.floor(this.top + this.H - miniUnit * 68);
    context.arc(left, top, miniUnit * 24, 0, Math.PI);
    context.fill();

    // draw the player's current score
    let text = ("00000000" + this.variables.scoreHigh).slice(-7);
    left = this.left + this.W - 4;
    top = this.top + unitSize * 0.8;
    let size = Math.floor(unitSize * 0.8) + 0.5;

    drawText(text, 'rgb(255,232,96)', '500', 'right', size, left, top, context);
  }

  calculateBounds(unitSize: number): void {
    this.left = this.leftBase * unitSize;
    this.top = this.topBase * unitSize;
    this.W = this.widthBase * unitSize;
    this.H = this.heightBase * unitSize;

    this.isDirty = true;
  }

}