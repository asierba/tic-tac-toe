/*global Board, Turn */

var Turn = {
    user: 0,
    cpu: 1
};

var CpuLogic = (function () {
    'use strict';
    function isSmaller(current, other) {
        if (other === undefined) {
            return true;
        }
        return current.score < other.score;
    }

    function isGreater(current, other) {
        if (other === undefined) {
            return true;
        }
        return current.score > other.score;
    }

    function getBestMove(board, turn, level) {
        var i,
            possibleBoard,
            bestMove,
            currentMove,
            possibleMoves,
            level = level || 0,
            nextTurn = (turn === Turn.user) ? Turn.cpu : Turn.user,
            isBetter = (turn === Turn.user) ? isGreater : isSmaller;

        if (board.cpuWins()) {
            return { score: 100 - level };
        }
        if (board.userWins()) {
            return { score: -100 };
        }
        if (board.isFull()) {
            return { score: 0 };
        }

        possibleMoves = board.emptySquares();

        for (i = 0; i < possibleMoves.length; i++) {
            possibleBoard = new Board(board.squares);

            if (turn === Turn.user) {
                possibleBoard.moveCpu(possibleMoves[i]);
            } else {
                possibleBoard.moveUser(possibleMoves[i]);
            }

            currentMove = getBestMove(possibleBoard, nextTurn, level + 1);

            if (isBetter(currentMove, bestMove)) {
                bestMove = currentMove;
                bestMove.position = possibleMoves[i];
            }
        }

        return bestMove;
    }

    function getBestPosition(mainBoard) {
        var middleSquare = { x: 1, y: 1 },
            move;
        if (mainBoard.isEmtpy()) {
            return middleSquare;
        }

        move = getBestMove(mainBoard, Turn.user);
        return move.position;
    }

    return {
        getBestPosition : getBestPosition
    };
}());