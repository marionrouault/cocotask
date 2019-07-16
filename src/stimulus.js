//Function to draw blankstimulus
function drawStimulus(numDots, size) {
    var canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //create black stimulus box
    var squareWidth = 250;
    var sqystartpoint = (canvas.height - squareWidth) / 2;
    var sqxstartpoint = (canvas.width - squareWidth) / 2;

    ctx.fillStyle = "#000000 "; // the colour is defined outside the function
    ctx.fillRect(sqxstartpoint, sqystartpoint, squareWidth, squareWidth); // Fill black square (stimulus background)

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
                ctx.beginPath();
                ctx.arc(x + (cellSize / 2), y + (cellSize / 2), 2, 0, 2 * Math.PI);
                if (dotmatrix[k] === 1) {
                    ctx.fillStyle = "#FFFFFF";
                } else {
                    ctx.fillStyle = "#000000";
                }
                ctx.fill();
                k++;
            }
        }
    }
    var string4stimulus = canvas.toDataURL();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return string4stimulus;
}
