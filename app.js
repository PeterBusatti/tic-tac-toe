const gameBoard = (() => {
    const boardDom = document.getElementById("gameboard");
    
    const boardArray = [];
    
    const render = () => {
        for (let i = 0; i <= 8; i++) {
            const square = document.createElement("div");
                
            square.classList.add("square");
            if (i === 1 || i === 7) {
                square.classList.add("middle-column");
            }
            else if (i === 3 || i === 5) {
                square.classList.add("middle-row");
            }
            else if (i === 4) {
                square.classList.add("middle-square")
            }
                
            boardArray.push(square);
            boardDom.appendChild(square);
        }
    };
 
    return {
        render,
        boardArray,
    };

})();

gameBoard.render();

const Player = (mark) => {
    mark;

    return {
        mark,
    };
}
const player1 = Player("X")
const player2 = Player("O")

const controller = (() => {
    let currentPlayer = player1;
    const squares = document.querySelectorAll(".square");
    
    const takeTurn = (e) => {
        if (e.target.textContent === "") {
            e.target.textContent = currentPlayer.mark;            
            
            if (isWin(gameBoard.boardArray)) {
                console.log(`${currentPlayer.mark}'s Win` );
            }
            else if (isDraw(gameBoard.boardArray) && !isWin(gameBoard.boardArray)) {
                console.log("tie");
            }
            
            togglePlayer();  
        } 
    };

    const clearBoard = () => {
        gameBoard.boardArray.forEach(square => {
            square.textContent = "";
        });
    };

    const togglePlayer = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        }
        else {currentPlayer = player1;}
    };

    squares.forEach(square => {
        square.addEventListener("click", takeTurn);
    });

    const isWin = (array) => {
        const mark = currentPlayer.mark
        const winningArrays = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7 ,8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winningArrays.some(combo => {
            return combo.every(index => {
                if (array[index].textContent === mark) {
                    return true;
                }
                else {return false}
            })
        })
    };

    const isDraw = (array) => {
        return array.every(square => {
            if (square.textContent != "") {
                return true;
            }
            else {return false}
        })
    };

    return {
        clearBoard, 
    };
})();