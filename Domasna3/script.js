window.onload = function () {
    const eightLetterWords = [
        'Orange',
        'Chair',
        'Head',
        'Phone',
        'Laptop',
        'Mouse',
        'Display',
        'Book',
        'Glass',
        'Pencil',
        'Necklace',
        'Jeans',
        'Watch',
        'Coat',
        'Outlet',
        'Signal',
        'Boots',
        'Door',
        'Curtain',
        'Pillow'
    ];

    let currentWord;
    let finalArray;
    let controlArray;

    let attempts = 5;
    let timer;



    document.getElementById("Start").addEventListener("click", function () {
        setup(eightLetterWords, currentWord, finalArray, controlArray, attempts);
        document.getElementById("gameElements").style.display = 'flex';
        document.getElementById("Start").style.display = 'none';
        startTimer();

    });

    document.getElementById("checkButton").addEventListener("click", function () {
        if (attempts > 1) {
            attempts--;
            updateAttemptsDisplay(attempts);
        } else {
            updateAttemptsDisplay(0);
            alert("No attempts left.");
            document.getElementById("game").style.display = 'none';
            document.getElementById("restart").style.display = 'flex';
            document.getElementById("restart").addEventListener("click", function () {
                location.reload(); 
            });
            stopTimer();   
        }
    });

}


function setup(array, currentWord, final, controlArray, attempts) {
   
    currentWord = array[parseInt(Math.random() * array.length)].toUpperCase();

    finalArray = new Array(currentWord.length).fill(0);

    controlArray = new Array(currentWord.length);

    for (let index = 0; index < currentWord.length; index++) {
        controlArray[index] = [currentWord[index], 0];
    }

    let chosenCount = 0;

    while (chosenCount < 3) {
        let randomIndex = parseInt(Math.random() * currentWord.length);

        if (controlArray[randomIndex][1] == 0) {
            finalArray[randomIndex] = currentWord[randomIndex];
            controlArray[randomIndex][1] = 1;
            chosenCount++;
        }
    }

    for (let index = 0; index < currentWord.length; index++) {
        console.log(finalArray[index]);
    }

    console.log(currentWord);

    generateInputs(parseInt(currentWord.length), controlArray, finalArray);
    
    document.getElementById("checkButton").addEventListener("click", function () {
        console.log(getValuesOfInputs(finalArray));
        const inputValues = getValuesOfInputs(finalArray);

        for (let index = 0; index < currentWord.length; index++) {

            if (inputValues[index] === currentWord[index]) {
                finalArray[index] = inputValues[index];
                
            }
        }
            console.log(finalArray);

        generateInputs(parseInt(currentWord.length), controlArray, finalArray);

        if (finalArray.join('') == currentWord) {
            const elapsedTime = document.getElementById("timerDisplay").textContent;
            alert("The word is correct\n" + elapsedTime);
            document.getElementById("game").style.display = 'none';
            document.getElementById("restart").style.display = 'flex';
            document.getElementById("restart").addEventListener("click", function () {
                location.reload(); 
            });
        }
    });

    updateAttemptsDisplay(attempts);

}

function updateAttemptsDisplay(attemptsLeft) {
    document.getElementById("AttemptsLeft").textContent = attemptsLeft + " more attempts," ;
}

function startTimer() {
    let seconds = 0;
    timer = setInterval(function () {
        seconds++;
        document.getElementById("timerDisplay").textContent = "Time: " + seconds + "s";
    }, 1000);

    return seconds;
}

function stopTimer() {
    clearInterval(timer);
}

function generateInputs(numOfInputs, arr1, arr2) {
    const inputCount = parseInt(numOfInputs);

    const inputContainer = document.getElementById('inputContainer');

    if (!inputContainer) {
        console.error("Error: 'inputContainer' element not found.");
        return;
    }

    inputContainer.innerHTML = ''; 

    for (let index = 0; index < inputCount; index++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'LetterInput' + index;
        input.maxLength = 1;
        inputContainer.appendChild(input);
        if (arr1[index][1] == 1) {
            input.defaultValue = arr2[index];
            input.disabled = true;
        }
    }
}

function getValuesOfInputs(arr) {
    let inputArray = new Array();
    for (let index = 0; index < arr.length; index++) {
        let temp = document.getElementById(`LetterInput${index}`);

        if (temp == null) {
            inputArray[index] = arr[index];
        } else {
            inputArray[index] = temp.value.toUpperCase();
        }
    }

    return inputArray;
}