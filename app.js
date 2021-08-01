document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const width = 8;
    const squares = [];
    let score = 0;


    const candyColors = [
        'red',
        'yellow',
        'orange',
        'purple',
        'green',
        'blue'
    ];

    // Create Board

    function createBoard() {
        for(let i = 0; i < width * width; i++) {
            const square = document.createElement('div');

            square.setAttribute('draggable', true);

            square.setAttribute('id', i)

            let randomColor = (Math.floor(Math.random() * candyColors.length));
            square.style.backgroundColor = candyColors[randomColor];
            
            grid.appendChild(square);
            squares.push(square);
        }
    }

    createBoard();

    // Drag the candies

    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;

    squares.forEach(square => square.addEventListener('dragstart', dragStart));
    squares.forEach(square => square.addEventListener('dragend', dragEnd));
    squares.forEach(square => square.addEventListener('dragover', dragOver));
    squares.forEach(square => square.addEventListener('dragenter', dragEnter));
    squares.forEach(square => square.addEventListener('dragleave', dragLeave));
    squares.forEach(square => square.addEventListener('drop', dragDrop));

    function dragStart() {
        colorBeingDragged = this.style.backgroundColor;
        squareIdBeingDragged = parseInt(this.id);
        console.log(colorBeingDragged);
        console.log(this.id, 'dragstart');
    }

    function dragEnd() {
        console.log(this.id, 'dragend');

        // what is a valid move?
        let validMoves = [
            
            //Chosen square's id minus 1
            squareIdBeingDragged -1,

            //Going above chosen square
            squareIdBeingDragged -width, 
            
            //Chosen square's id plus 1
            squareIdBeingDragged +1, 
            
            //Going below chosen square
            squareIdBeingDragged +width
        ]

        let validMove = validMoves.includes(squareIdBeingReplaced);

        // Valid Move
        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null;
        // Invalid Move
        } else if (squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
        } else {
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
        }

    }

    // Checking for matches

    // Check for row of Five
    function checkRowForFive() {
        //59 because total squares (ie. 64) - 5, the last row of four that can be made
        for (i = 0; i < 59; i++) {
            let rowOfFour = [i, i+1, i+2, i+3, i+4];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === '';

            //every index row of three should not start at
            const notValid = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55];
            if (notValid.includes(i)) {
                //to skip
                continue;
            }

            if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4;
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundColor = '';
                })
            }
        }
    }

    checkRowForFive();

    // Check for column of Five
    function checkColumnForFive() {
        //31 - the last index from which a column of five can be made
        for (i = 0; i < 31; i++) {
            let columnOfFive = [i, i+width, i+width*2, i+width*3, i+width*4];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === '';

            if (columnOfFive.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 5;
                columnOfFive.forEach(index => {
                    squares[index].style.backgroundColor = '';
                })
            }
        }
    }

    checkColumnForFive();

    // Check for row of Four
    function checkRowForFour() {
        //60 because total squares (ie. 64) - 4, the last row of four that can be made
        for (i = 0; i < 60; i++) {
            let rowOfFour = [i, i+1, i+2, i+3];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === '';

            //every index row of three should not start at
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55];
            if (notValid.includes(i)) {
                //to skip
                continue;
            }

            if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4;
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundColor = '';
                })
            }
        }
    }

    checkRowForFour();

    // Check for column of Four
    function checkColumnForFour() {
        //39 - the last index from which a column of four can be made
        for (i = 0; i < 39; i++) {
            let columnOfFour = [i, i+width, i+width*2, i+width*3];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === '';

            if (columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4;
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundColor = '';
                })
            }
        }
    }

    checkColumnForFour();

    // Check for row of Three
    function checkRowForThree() {
        //61 because total squares (ie. 64) - 3, the last row of three that can be made
        for (i = 0; i < 61; i++) {
           let rowOfThree = [i, i+1, i+2];
           let decidedColor = squares[i].style.backgroundColor;
           const isBlank = squares[i].style.backgroundColor === '';

           //every index row of three should not start at
           const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
           if (notValid.includes(i)) {
               //to skip
               continue;
           }

           if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
               score += 3;
               rowOfThree.forEach(index => {
                   squares[index].style.backgroundColor = '';
               })
           }
        }
    }

    checkRowForThree();

    // Check for column of Three
    function checkColumnForThree() {
        //47 - the last index from which a column of three can be made
        for (i = 0; i < 47; i++) {
           let columnOfThree = [i, i+width, i+width*2];
           let decidedColor = squares[i].style.backgroundColor;
           const isBlank = squares[i].style.backgroundColor === '';

           if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
               score += 3;
               columnOfThree.forEach(index => {
                   squares[index].style.backgroundColor = '';
               })
           }
        }
    }

    checkColumnForThree();

    //Checks the window for row of three every 100 miliseconds
    window.setInterval(function(){
        checkRowForFive();
        checkColumnForFive();
        checkRowForFour();
        checkColumnForFour();
        checkRowForThree();
        checkColumnForThree();  
    }, 100);

    function dragOver(e) {
        e.preventDefault();
        console.log(this.id, 'dragover');
    }

    function dragEnter(e) {
        e.preventDefault();
        console.log(this.id, 'dragenter');
    }

    function dragLeave() {
        console.log(this.id, 'dragleave');
    }

    function dragDrop() {
        console.log(this.id, 'dragdrop');
        colorBeingReplaced = this.style.backgroundColor;
        squareIdBeingReplaced = parseInt(this.id);

        // This replaces the color of the square being replaced
        this.style.backgroundColor = colorBeingDragged;

        // This replaces the color of the square being dragged
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
    }

})