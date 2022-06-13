import './styles.css';
import IDrawArea from './DrawArea';
import Game from './Game'
import GameManager from './GameManager'
import Variables from './Variables'

/**
  * Super class of game initialization
  * @author Tiago Rodrigues <tiago.r.c.sn@gmail.com>
  * @author Lucio Ewald <lucioew28@gmail.com>
  * @author Henrique Klayton <henrique70031@gmail.com>
 */
export default class Page {
  static drawArea: IDrawArea;

  private body: HTMLElement = document.getElementsByTagName('body')[0];
  private canvas: HTMLCanvasElement = document.createElement('canvas');

  private unitSize = 0;
  private AreaArr: IDrawArea[] = [];
  private isSetup = false;
  private context: CanvasRenderingContext2D;

  constructor(private variables: Variables, private gameManager: GameManager, private game: Game, private areas: IDrawArea[]) {
    // console.log(this.shadow);
    // if page has not been setup, do initial setup
    if (this.isSetup === false) {
      document.body.appendChild(this.canvas);

      this.body.style.overflow = 'hidden';
      this.body.style.backgroundColor = 'rgb(19,21,25)';
      this.canvas.style.position = 'absolute';
      this.context = this.canvas.getContext('2d');

      this.isSetup = true;
    }

		this.AreaArr = areas;

    // dirty all draw areas
    for (let i = 0; i < this.AreaArr.length; i++) {
      this.AreaArr[i].isDirty = true;
    }

    this.windowChanged();

    // GM.Initialize();
  }

  setGameDirty(state: boolean) {
    this.game.isDirty = state;
  }

  getGameDirty() {
    return this.game.isDirty;
  }

  /**
   * calculates the unit size, canvas bounds, and canvas positioning
   * this procedure gives to unitSize the calculation of minimum window width and height
   */
  public windowChanged(): void {
    const bodyW = document.documentElement.clientWidth;
		const bodyH = document.documentElement.clientHeight;
		const newUnitW = (bodyW - (bodyW % 80)) / 16;
		const newUnitH = (bodyH - (bodyH % 100)) / 20;
		const newUnitMin = Math.max(Math.min(newUnitW, newUnitH), 20);
		console.log(
			bodyW,
			bodyH,
			newUnitW,
			newUnitH,
			newUnitMin,
		)

    this.unitSize = newUnitMin;
		console.log('unit size', this.unitSize);

    let rightLimit = 0;
		let bottomLimit = 0;

    for (let i = 0; i < this.AreaArr.length; i++) {
      this.AreaArr[i].calculateBounds(this.unitSize);

      rightLimit = Math.max(this.AreaArr[i].left + this.AreaArr[i].W, rightLimit);
      bottomLimit = Math.max(this.AreaArr[i].top + this.AreaArr[i].H, bottomLimit);
    }

    this.canvas.width = rightLimit;
    this.canvas.height = bottomLimit;

    // left pos uses Game.W because ideally that area is centered
    let topPos = (bodyH - bottomLimit) / 2;
		let leftPos = (bodyW / 2) - (this.game.W / 2);
		let rightOffset = bodyW - (leftPos + rightLimit) - this.unitSize * 0.5;

    // if default canvas positioning extends beyond screen, adjust it
    if (rightOffset < 0) {
      leftPos = Math.max(this.unitSize * 0.5, leftPos + rightOffset);
    }

    this.canvas.style.left = leftPos + 'px';
    this.canvas.style.top = topPos + 'px';
  }

  update() {
		console.log(this.unitSize);
    for (let i = 0; i < this.AreaArr.length; i++) {
      if (this.AreaArr[i].isDirty) {
        this.AreaArr[i].draw(this.unitSize, this.context);
        this.AreaArr[i].isDirty = false;
      }
    }
  }
}