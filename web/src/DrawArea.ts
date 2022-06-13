import Page from './page';

// interface IScreen {
//   width: number | string;
//   height: number | string;
// }

// interface IElement extends IScreen { }

// interface IPlayer { }

// interface IState {
//   player: IPlayer;
//   lines: number;
//   columns: number;
//   screen: IScreen;
//   element: IElement;
// }

// interface IGame {
//   state: IState;
// }

export default interface IDrawArea {
  left: number;
  top: number;
  W: number;
  H: number;
  isDirty: boolean;
  draw: (unitSize: number, context: CanvasRenderingContext2D) => void;
  calculateBounds: (unitSize: number) => void;
}

// export default class DrawArea implements IDrawArea {
//   public W: number;
//   public H: number;
//   public isDirty = false;
//   private leftBase: number;
//   private topBase: number;
//   private widthBase: number;
//   private heightBase: number;

//   constructor(
//     public left = 0,
//     public top = 0,
//     public width = 0,
//     public height = 0
// 		) {
//     // bounds in UNITS
//     this.leftBase = left;
//     this.topBase = top;
//     this.widthBase = width;
//     this.heightBase = height;

//     // bounds in PIXELS
//     this.left = 0;
//     this.top = 0;
//     this.W = 0;
//     this.H = 0;

//     // dirty flag (clean yourself up flag, you're better than that)
//     this.isDirty = false;

//     // push this area into the area arr
//     // Page.AreaArr.push(this);
//   }

//   draw(unitSize: number, context: CanvasRenderingContext2D) {

//   }

//   calculateBounds() {
//     // this.left = this.leftBase * Page.unitSize;
//     // this.top = this.topBase * Page.unitSize;
//     // this.W = this.widthBase * Page.unitSize;
//     // this.H = this.heightBase * Page.unitSize;

//     this.isDirty = true;
//   }

// }