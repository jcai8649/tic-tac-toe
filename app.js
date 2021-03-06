
const Gameboard = (() => {
    const gameBoard = ['', '', '', '', '', '', '', '', ''];
    return {gameBoard};
})();

const displayController = (() =>{
    
    //add player symbol to the board and switch turn
    const addMarkAndSwitch = (id) =>{
        let turn = document.querySelector(".turn");
        if(Gameboard.gameBoard[id-1] === ""){
            if(player1.theirTurn){
                turn.innerText = `${player2.name}'s turn - ${player2.symbol}`
                Gameboard.gameBoard[id-1] = player1.symbol;
                render(Gameboard.gameBoard);
                checkWin(player1.symbol, player1.name);
                player1.theirTurn = false;
                player2.theirTurn = true;
            } else if (player2.theirTurn){
                turn.innerText = `${player1.name}'s turn - ${player1.symbol}`
                Gameboard.gameBoard[id-1] = player2.symbol;
                render(Gameboard.gameBoard);
                checkWin(player2.symbol, player2.name);
                player1.theirTurn = true;
                player2.theirTurn = false;
            }
        }
    }

    //check if a player's symbol positions have a combination of a winning array position
    //create a prompt if there is a winner or a tie and ask for a rematch
    const checkWin = (symbol, name) => {

        let win = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
        let newArr = [];
        for (let i = 0; i < Gameboard.gameBoard.length; i++){
            if (symbol === Gameboard.gameBoard[i]) {
                newArr.push(i+1);
            }
        }
        let turn = document.querySelector(".turn");
        let checker = (arr, target) => target.every(v => arr.includes(v));
        let squareList = document.querySelectorAll(".square")
        for (let i = 0; i < win.length; i++){
            //if a winner is detected, display winner and remove the onclick attritbute
            //to prevent further user input
            if (checker(newArr, win[i])){
                turn.innerText = `${name} wins! Restart for a rematch!` ;
                for (let square of squareList){
                    square.removeAttribute("onclick");
                }
                break;
            }
            else if (!Gameboard.gameBoard.includes("") && i === win.length - 1){
                turn.innerText = "It's a tie!"
                break;
            }
        } 
    }

    const render = (board) => {
        for (let i = 0; i < board.length; i++){
           let squareID = document.getElementById(`${i+1}`);
           squareID.innerText = board[i];
        }
    }
    return {addMarkAndSwitch, render};

})();



const GameStart = (() =>{

    let playerCount = 0;

    const createPlayer = (playerName) =>{
        if (playerCount === 0){
            playerCount++;
            return player1 = PlayerFactory(playerName, 'X', true);
        } else {
            playerCount++;
            return player2 = PlayerFactory(playerName, 'O', false); 
        } 
    }

    //create player and reset the board.
    const start = () =>{
        if (validation()){
            let player1 = document.getElementById("player1").value
            let player2 = document.getElementById("player2").value
            createPlayer(player1);
            createPlayer(player2);
            clear();
            createBoard();
        }
    }
    
    //clear the child of main element and reset the gameboard
    const clear = () =>{
        const main = document.querySelector("main");
        main.textContent = "";
        Gameboard.gameBoard = ['', '', '', '', '', '', '', '', ''];
    }
    
    const validation = () => {
        let player1 = document.getElementById("player1").value
        let player2 = document.getElementById("player2").value
        if (player1 === "" || player2 === ""){
            alert("Please enter a name of each player");
            return false;
        }
        return true;
    }
    
    //create board and restart button
    const createBoard = () =>{
        const main = document.querySelector("main");
        const numberOfSquare = 9;
        let grid = document.createElement("div");
        grid.setAttribute("class", "grid");
        main.append(grid);
    
        let body = document.querySelector("body");
        let turn = document.createElement("h6");
        turn.setAttribute("class","turn");
        turn.innerText = `${player1.name}'s turn  - ${player1.symbol}`;
        body.insertBefore(turn, body.childNodes[2]);
        
        let restart = document.createElement("button");
        restart.innerText = "restart";
        restart.setAttribute("class","restart");
        restart.setAttribute("class","btn-primary");
        restart.setAttribute("onclick","GameStart.restart()");
        main.appendChild(restart);

        for(let i = 1; i <= numberOfSquare; i++){
            let square = document.createElement("div")
            square.setAttribute("class", "square");
            square.setAttribute("id", i);
            square.setAttribute("onclick", `displayController.addMarkAndSwitch(${i})`)
            grid.append(square);
        }
    }

    //clear and reset to the board and player to their initial turn
    function restart(){
        let turn = document.querySelector(".turn");
        turn.remove();
        player1.theirTurn = true;
        player2.theirTurn = false;
        clear();
        createBoard();
    }
    return {createPlayer, start, restart}
})();


//player contructor
const PlayerFactory = (name, symbol, theirTurn) =>{  
    return {name, symbol, theirTurn}
}