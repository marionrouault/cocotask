//Function to draw blankstimulus
function drawStimulus(canvasId, numDots) {
    var stimCanvas = document.getElementById(canvasId);
    var stimContext = stimCanvas.getContext("2d");
    stimContext.clearRect(0, 0, stimCanvas.width, stimCanvas.height);

    //create black stimulus box
    var squareWidth = 250;
    var sqystartpoint = (stimCanvas.height - squareWidth) / 2;
    var sqxstartpoint = (stimCanvas.width - squareWidth) / 2;

    stimContext.fillStyle = "#000000 "; // the colour is defined outside the function
    stimContext.fillRect(sqxstartpoint, sqystartpoint, squareWidth, squareWidth); // Fill black square (stimulus background)

    //specification
    if (numDots != 0) {
        var cellSize = 10;
        var myarray = Array.from(Array(625).keys());
        var dotindex = jsPsych.randomization.repeat(myarray, 1);
        var dotmatrix = [];
        for (var j = 0; j < dotindex.length; j++) {
            if (dotindex[j] < (312 + numDots)) {
                dotmatrix[j] = 1;
            } // white dots
            else {
                dotmatrix[j] = 0;
            } // black dots
        }
        //fill the grid:
        var k = 0;
        for (var x = sqxstartpoint; x < sqxstartpoint + squareWidth; x += cellSize) {
            for (var y = sqystartpoint; y < sqystartpoint + squareWidth; y += cellSize) {
                stimContext.beginPath();
                stimContext.arc(x + (cellSize / 2), y + (cellSize / 2), 2, 0, 2 * Math.PI);
                if (dotmatrix[k] === 1) {
                    stimContext.fillStyle = "#FFFFFF";
                } else {
                    stimContext.fillStyle = "#000000";
                }
                stimContext.fill();
                k++;
            }
        }
    }
    var string4stimulus = stimCanvas.toDataURL();
    stimContext.clearRect(0, 0, stimCanvas.width, stimCanvas.height);
    return string4stimulus;
}
