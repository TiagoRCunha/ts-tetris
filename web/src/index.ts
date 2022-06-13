import Page from './Page'
import Swal from 'sweetalert2'
import GameManager from './GameManager';
import Variables from './Variables';
import Game from './Game';
import ScoreBarCurrent from './ScoreBarCurrent';
import ScoreBarHigh from './ScoreBarHigh';
import UpcomingA from './UpcomingA';
import UpcomingB from './UpcomingB';
import UpcomingC from './UpcomingC';
const HowToPlayImage = require('./assets/how-to-play.jpg')

// declare global for debug
// WARNING not working for production
declare global {
  interface Window {
    page: Page;
  }
}

let page: Page;
let GM: GameManager;
let variables = new Variables();

if (process.env.NODE_ENV === 'development') {
  global.window.page = page;
}

if (typeof window !== 'undefined') {
  window.onresize = function (event) {
    page?.windowChanged()
  }
}

if (typeof document !== 'undefined') {
  let startMenu = document.querySelector('#startMenu');

  let startBtnNew = document.querySelector('.js-start-btn');
  startBtnNew.addEventListener('click', function (e) {
    startMenu.classList.add("hidden");
    GM = new GameManager(variables);

    GM.game = new Game(variables, GM);
    GM.scoreBarCur = new ScoreBarCurrent(variables);
    GM.scoreBarHigh = new ScoreBarHigh(variables);
    GM.upcomingA = new UpcomingA(variables);
    GM.upcomingB = new UpcomingB(variables);
    GM.upcomingC = new UpcomingC(variables);

    page = new Page(variables, GM, GM.game, [
      GM.game,
      GM.scoreBarCur,
      GM.scoreBarHigh,
      GM.upcomingA,
      GM.upcomingB,
      GM.upcomingC,
    ]);
    GM.generateStartingPieces();

    /** 
     *  Main game loop. Updates GM object to check if tick can be
     *  performed. Then, if the page is dirty, performs a Draw.
     */
    function loop() {
      page.update();
      if (variables.isAlive) {
        GM.update();
      }

      window.requestAnimationFrame(loop);
    }
    loop()
  })

  let htpButton = document.querySelector('.how-to-play-button')

  htpButton.addEventListener("click", function (e) {
    Swal.fire({
      template: '#modal',
      imageUrl: HowToPlayImage,
      background: '#141414',
      confirmButtonColor: '#33a133'
    })
  })

  document.addEventListener('keydown', (event) => {
    var key = event.key;
    console.log('key', key)

    if (variables.isAlive) {
      switch (key) {
        // Up arrow OR W = rotate     
        case 'w':
        case 'ArrowUp':
          page.setGameDirty(GM.tryRotate());
          break;
        // Left arrow OR A = move left
        case 'a':
        case 'ArrowLeft':
          page.setGameDirty(GM.tryMove(-1, 0));
          break;
        // Right arrow OR D = move right  
        case 'd':
        case 'ArrowRight':
          page.setGameDirty(GM.tryMove(1, 0));
          break;
        // Down arrow OR S = move down  
        case 's':
        case 'ArrowDown':
          page.setGameDirty(GM.tryMove(0, 1));
          break;
        // Spacebar to drop the current piece
        case ' ':
          page.setGameDirty(GM.tryDrop());
          break;
        default: break;
      }

      //if board was dirtied, cast fresh projection for current piece
      if (page.getGameDirty()) {
        GM.projectedYPosition = GM.tryProject();
      }
    }

    // if player not alive, reset the game
    else {
      variables = new Variables()
      GM = new GameManager(variables);
      GM.game = new Game(variables, GM);
      GM.scoreBarCur = new ScoreBarCurrent(variables);
      GM.scoreBarHigh = new ScoreBarHigh(variables);
      GM.upcomingA = new UpcomingA(variables);
      GM.upcomingB = new UpcomingB(variables);
      GM.upcomingC = new UpcomingC(variables);

      page = new Page(variables, GM, GM.game, [
        GM.game,
        GM.scoreBarCur,
        GM.scoreBarHigh,
        GM.upcomingA,
        GM.upcomingB,
        GM.upcomingC,
      ]);
    }

  }, false);
}