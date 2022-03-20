interface IScreen {
  width: number | string;
  height: number | string;
}

interface IPlayer {}

interface IState {
  player: IPlayer;
  lines: number;
  screen: IScreen;
}

interface IGame {
  state: IState;
}

export default class Game implements IGame {
  state = {
    player: {},
    lines: 0,
    screen: {
      width: 280,
      height: 450,
    },
  };

  constructor() {
    this.test();
  }

  test() {
    console.log("hello world from class");
  }
}
