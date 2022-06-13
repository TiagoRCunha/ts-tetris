// import PieceBuilder from './PieceBuilder';
// import PieceObject from './PieceObject';
// import LinkedListUnit from './LinkedListUnit';
// import Unit from './Unit';
// import Game from './Game';
// import ScoreBarCurrent from './ScoreBarCurrent';
// import ScoreBarHigh from './ScoreBarHigh';
// import UpcomingA from './UpcomingA';
// import UpcomingB from './UpcomingB';
// import UpcomingC from './UpcomingC';
// import Variables from './Variables';

// export interface IPieceController {
//   current?: PieceObject;
//   projectedYPosition: number;
//   upcoming: [PieceObject, PieceObject, PieceObject];
//   generate: () => void;
//   freeze: () => void;
//   doGravity: () => void;
//   tryRotate: () => boolean;
//   tryMove: () => boolean;
//   tryDrop: () => boolean;
//   tryProject: () => number;
//   checkCollisions: (doRot: number, offsetX: number, offsetY: number) => number;
// }
// // inside GM
// export default class PieceController implements IPieceController {
// 	constructor(
// 		private variables: Variables,
// 		private game: Game,
// 		private scoreBarCur: ScoreBarCurrent,
// 		private scoreBarHigh: ScoreBarHigh,
// 		private upcomingA: UpcomingA,
// 		private upcomingB: UpcomingB,
// 		private upcomingC: UpcomingC,
// 	) {}

// }