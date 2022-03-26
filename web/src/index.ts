import Game from './game'

// declare global for debug
declare global {
    interface Window {
        game: Game;
    }
}

window.game = new Game();
