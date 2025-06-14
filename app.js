//access the element
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-btn");
let startBtn = document.querySelector(".startBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let mainContainer = document.querySelector(".game-box");


// track whose turn is first
let turnO = true; //playerO, playerX
let count = 0;

// store the winning patterns on 2D array
  const winPatterns = [
	[0, 1, 2],
	[0, 3, 6],
	[0, 4, 8],
	[1, 4, 7],
	[2, 5, 8],
	[2, 4, 6],
	[3, 4, 5],
	[6, 7, 8],
  ];

// To add eventListener on all the boxes
boxes.forEach((box) => {
	box.addEventListener("click", () => {
		console.log("box was clicked");
		if(turnO === true) {
			box.innerText = "O";  //button text
			turnO = false; // set to false so it shouldn't be true again for next, bcoz the next player is "X"
		}else {
			box.innerText = "X";
			turnO = true; // set true Bcoz now it's player "O" turn
		}
		box.disabled = true; //Disable the button after click to prevent value changes
		count++;

		let isWinner = checkWinner();
		if(count === 9 && !isWinner) {
			gameDraw();
		}

		// //calling check function to check winner PlayerO or PlayerX when the button was clicked
		// checkWinner(); 
	});
});

const gameDraw = () => {
	msg.innerText = "Game was Draw";
	msgContainer.classList.remove("hide");
	mainContainer.classList.add("hide");

	disableBoxes();
};


//create a function for check winner
const checkWinner = () => {
	for(let pattern of winPatterns) { //used for of loop
		// console.log(pattern[0],pattern[1],pattern[2]); // 1,2 and 3rd position
		// console.log(
		// 	boxes[pattern[0]].innerText,  //inside box[] array again inside the pattern[],index check  
		// 	boxes[pattern[1]].innerText,
		// 	boxes[pattern[2]].innerText,
		// );


		//check value at each position and store in a variable
		let pos1Val = boxes[pattern[0]].innerText;
		let pos2Val = boxes[pattern[1]].innerText;
		let pos3Val = boxes[pattern[2]].innerText;

		if(pos1Val != "" && pos2Val != "" && pos3Val != "") {   //Check for win only if boxes aren’t empty
			if(pos1Val === pos2Val && pos2Val === pos3Val) { //Check if all three positions are equal for winner case
				console.log("Winner", pos1Val); //display the winner

				showWinner(pos1Val); // calling winner function
			}
		}
	}
};


const showWinner = (winner) => { 
	msg.innerText = `Congratulations, Winner is ${winner}`;
	msgContainer.classList.remove("hide"); //remove the class hide to display the winning msg
	mainContainer.classList.add("hide");

	disableBoxes();
};

//after winning pattern disable all the empty boxes 
const disableBoxes = () => {
	for(let box of boxes) {
		box.disabled = true;
	}
};

//on click resetGame or resetButton starts newGame acts as event 
const resetGame = () => {
	turnO = true;
 	count = 0;
	enableBoxes();
	msgContainer.classList.add("hide"); // hide winning msg when new game starts
	mainContainer.classList.remove("hide");

};

// enable all the boxes when new game or reset button is clicked
const enableBoxes = () => {
	for(let box of boxes) {
		box.disabled = false;
		box.innerText = "";
	}
};


// add event listener on both resetGame and resetButton 
newGameBtn.addEventListener("click", resetGame); // resetGame function acts as event here 
resetBtn.addEventListener("click", resetGame);
startBtn.addEventListener("click", resetGame);
