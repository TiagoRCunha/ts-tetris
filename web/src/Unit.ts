export default class Unit {
  constructor(private _x = 0, private _y = 0) {
    this._x = _x;
    this._y = _y
  }

  public get x() : number {
    return this._x;
  }

  public get y() : number {
    return this._y
  }
}