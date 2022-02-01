const gameBoard = (() => {
    const gameWrapper = document.getElementById("main-wrapper");
    const boardDom = document.getElementById("gameboard");
    const boardArray = [];
    
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

    const toggleOpacity = () => {
        const opacity = window.getComputedStyle(boardDom).getPropertyValue("opacity");
        
        if (opacity === "1") {
            boardDom.style.opacity = "0.5";
        }
        else if (opacity === "0.5") {
            boardDom.style.opacity = "1";
        }
    }
    
    const getGameArray = () => {
        return boardArray;
    }

    return {
        render,
        toggleOpacity,
        getGameArray,
    };

})();


const Player = (mark) => {
    mark;
    const name = "";
    const placeMark = (e) => {
        if (e.target.textContent === "") {
            e.target.textContent = mark;
        }
    };

    return {
        mark,
        name,
        placeMark,
    };
}

const controller = (() => {
    const readyBtn = document.getElementById("ready-btn");
    const restartBtn = document.getElementById("restart-btn");
    const infoDisplayArea = document.getElementById("display-area");

    const player1 = Player("X");
    const player2 = Player("O");
    
    let _firstPlayer = player1;
    let _currentPlayer;

    const takeTurn = (e) => {
        _currentPlayer.placeMark(e);        
            
        if (isWin(gameBoard.getGameArray())) {
            endGame();
            return;
        }
        else if (isDraw(gameBoard.getGameArray()) && !isWin(gameBoard.getGameArray())) {
            endGame(); 
            return;
        }
            
        togglePlayer();
        turnIndicator();   
    };

    const togglePlayer = () => {
        if (_currentPlayer === player1) {
            _currentPlayer = player2;
        }
        else if (_currentPlayer === player2) {
            _currentPlayer = player1;
        }    
    };

    const turnIndicator = () => {
        infoDisplayArea.textContent = `${_currentPlayer.name}'s Turn (${_currentPlayer.mark}'s)`;
    };

    const isWin = (array) => {
        const mark = _currentPlayer.mark
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
        const signUp = document.getElementById("signup-wrapper");
        
        _currentPlayer = _firstPlayer;
        fillNames();
        gameBoard.render();
        turnIndicator();
        signUp.style.display = "none";

        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            square.addEventListener("click", takeTurn);
        });
    };

    const fillNames = () => {
        const p1scorecard = document.getElementById("player-one-card");
        const p2scorecard = document.getElementById("player-two-card");

        player1.name = document.getElementById("p1-input").value;
        player2.name = document.getElementById("p2-input").value;

        p1scorecard.textContent = `${player1.name} (${player1.mark}'s)`;
        p2scorecard.textContent = `${player2.name} (${player2.mark}'s)`;
    };

    readyBtn.addEventListener("click", startGame);

    const endGame = () => {        
        if (isWin(gameBoard.getGameArray())) {
            infoDisplayArea.textContent = `${_currentPlayer.name} Wins!!`;
        }
        else {
            infoDisplayArea.textContent = "Tie! No winner";
        }

        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            square.removeEventListener("click", takeTurn);
        });

        gameBoard.toggleOpacity();
        restartBtn.style.display = "block";
    };

    const restartGame = () => {
        clearBoard();
        gameBoard.toggleOpacity();

        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            square.addEventListener("click", takeTurn);
        });

        restartBtn.style.display = "none";

        /* changing who starts a new round first */
        if (_firstPlayer === player1) {
            _firstPlayer = player2;
        }
        else if (_firstPlayer === player2) {
            _firstPlayer = player1;
        }

        _currentPlayer = _firstPlayer;
        turnIndicator();
    };

    const clearBoard = () => {
        gameBoard.getGameArray().forEach(square => {
            square.textContent = "";
        });
    };
    
    restartBtn.addEventListener("click", restartGame);

    return { 
        
    };
})();