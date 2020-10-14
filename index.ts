// application

// const board = new Board(DefaultOptions) // 初期配置盤面先手番
// const app = new Application(board)
// app.run()


class Command {
  from: PiecePosition // 普通は「どこから」は言わないけど、わかりやすいように明示指定する
  to: PiecePosition
  isPromotion?: boolean
}

class PiecePosition {
  position: Position
  piece: Piece
}

class Position {
  row: number
  column: number
}

class Piece {
  
}

// 論理盤
interface LogicBoard {
  isBlackTurn: boolean                                 // 手番が先手か。black: 先手 white: 後手 https://yaneurao.hatenadiary.com/entry/20101128/p1
  cells: ShogiBoardCell                                // 論理盤面
  commands: [...Command[]]                             // 棋譜 

  isCheck(): boolean                                   // 王手がかかっているか
  isCheckMate(): boolean                               // 詰みか

  isValid(command: Command)                            // コマンドが実現可能手か  （駒ごとのRuleValidatorなどを使用する）
  exec(command: Command)                               // コマンドを実行し、論理盤面を更新

  // この辺は別オブジェクトに任したほうがいいかも: interface ShogiUI {}
}


// 物理盤
interface ShogiUI {
  logicBoard: LogicBoard                               // 論理盤

  render()                                             // 物理盤面を更新
  renderRangeOfMotion(piecePosition: PiecePosition)    // 駒を選択した時に置けるマス目を点灯させる
  renderPromotionPrompter(command: Command): Command   // 駒を成るかならないか聞くモーダルを出す
  renderStart()                                        // ゲーム開始
  renderGameOver()                                     // ゲーム終了
}

// Example
// this.logicBoard.exec(command)
// this.render()


// マス目
type ShogiBoardCell = [
  [Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece],
  [Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece],
  [Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece],
  [Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece],
  [Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece],
  [Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece],
  [Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece],
  [Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece],
  [Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece],
  [[...Piece[]], [...Piece[]]], // 駒台: 先手、後手
]

// ルール
class Rule {

}
// Rule
// - コマの可動範囲（独立）
// - 障害物との関係（自駒、取る、飛び越える）
// - マス目の限界（駒台から落ちる）
// - マス目の限界（行き先のない駒: 桂馬7段目まで、歩・香車8段目まで）
// - 駒の配置関係（王手放置・ピン）
// - 駒の配置関係（2歩）
// - 駒の配置関係（打ち歩詰め: 持ち駒の歩＆詰み）
// - 引き分け手順（千日手）
// - 負け手順（連続王手の千日手）



// TODO 持将棋..

// TODO 棋譜 parser: 

// TODO 将棋AIとのUSIプロトコル通信実装