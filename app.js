const gameBoard = (() => {
    const gameWrapper = document.getElementById("wrapper");
    const boardDom = document.getElementById("gameboard");
    const boardArray = [];
    const checkingArray = boardArray
    
    const render = () => {
        gameWrapper.style.display = "flex";
        gameWrapper.style.width = "75vw";
        boardDom.style.width = "600px";
        boardDom.style.height = "600px";
        boardDom.style.display = "flex";

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
        checkingArray,
    };

})();

//gameBoard.render();

const Player = (mark) => {
    mark;

    return {
        mark,
    };
}

const controller = (() => {
    const ready = document.getElementById("ready-btn");
    const p1scorecard = document.getElementById("player-one-name");
    const p2scorecard = document.getElementById("player-two-name");
    const player1 = Player("X");
    const player2 = Player("O");
    let currentPlayer = player1;
    
    const takeTurn = (e) => {
        if (e.target.textContent === "") {
            e.target.textContent = currentPlayer.mark;            
            
            if (isWin(gameBoard.checkingArray)) {
                console.log(`${currentPlayer.mark}'s Win`);
            }
            else if (isDraw(gameBoard.checkingArray) && !isWin(gameBoard.checkingArray)) {
                console.log("tie");
            }
            
            togglePlayer();  
        } 
    };

    const clearBoard = () => {
        gameBoard.checkingArray.forEach(square => {
            square.textContent = "";
        });
    };

    const togglePlayer = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        }
        else {currentPlayer = player1;}
        p1scorecard.classList.toggle("turn");
        p2scorecard.classList.toggle("turn");
    };

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

    const startGame = () => {
        fillNames();
        gameBoard.render();
        
        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            square.addEventListener("click", takeTurn);
        });
    }

    const fillNames = () => {
        const p1Name = document.getElementById("player1input").value;
        const p2Name = document.getElementById("player2input").value;
        const signUp = document.getElementById("signup-wrapper");

        p1scorecard.textContent = `${p1Name} (X's)`;
        p2scorecard.textContent = `${p2Name} (O's)`;
        signUp.style.display = "none";
    }

    ready.addEventListener("click", startGame);

    
    return {
        clearBoard, 
    };
})();