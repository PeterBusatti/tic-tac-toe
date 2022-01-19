const gameBoard = (() => {
    const boardDom = document.getElementById("gameboard");
    
    const boardArray = [];
    
    const init = () => {
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
        init,
    };

})();

gameBoard.init();

const Player = (mark) => {
    mark;


    return {
        mark,
    }
}
const player1 = Player("X")
const player2 = Player("O")

const controller = (() => {
    let currentPlayer = player1;
    const squares = document.querySelectorAll(".square");
    
    const addMark = (e) => {
        if (e.target.textContent === "") {
            e.target.textContent = currentPlayer.mark;
            togglePlayer();
        } 
    }

    squares.forEach(square => {
        square.addEventListener("click", addMark);
    });

    const clearBoard = () => {
        squares.forEach(square => {
            square.textContent = "";
        });
    }

    const togglePlayer = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        }
        else {currentPlayer = player1;}
    }

    return {
        clearBoard,
    }
})();