import IDrawArea from './DrawArea';
import Variables from './Variables';

export default class UpcomingC implements IDrawArea {
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
    public top = 7.8,
    public width = 2.5,
    public height = 2.5,
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
    let uDrawSize = Math.floor(unitSize / 2);
		let pcC = this.variables.upcoming[2];

    // next box background
    context.fillStyle = 'rgb(28,30,34)';
    context.fillRect(this.left, this.top, this.W, this.H);

    // draw the upcoming piece (if one exists)
    if (pcC !== undefined) {
      context.fillStyle = pcC.color;

      var totalL = 0,
        totalT = 0,
        countedL = [],
        countedT = [];

      // calculate average positions of units in order to center
      for (var i = 0; i < pcC.currentRotation.units.length; i++) {
        var curX = pcC.currentRotation.units[i].x,
          curY = pcC.currentRotation.units[i].y;

        if (countedL.indexOf(curX) < 0) {
          countedL.push(curX);
          totalL += curX;
        }
        if (countedT.indexOf(curY) < 0) {
          countedT.push(curY);
          totalT += curY;
        }
      }

      var avgL = uDrawSize * (totalL / countedL.length + 0.5),
        avgT = uDrawSize * (totalT / countedT.length + 0.5),
        offsetL = this.left + this.W / 2,
        offsetT = this.top + this.H / 2;

      console.log(avgL + ", " + avgT);

      // now draw the upcoming piece, using avg vars to center
      for (var j = 0; j < pcC.currentRotation.units.length; j++) {
        var drawL = Math.floor(offsetL - avgL + pcC.currentRotation.units[j].x * uDrawSize),
          drawT = Math.floor(offsetT - avgT + pcC.currentRotation.units[j].y * uDrawSize);

        context.fillRect(drawL, drawT, uDrawSize - 1, uDrawSize - 1);
      }
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